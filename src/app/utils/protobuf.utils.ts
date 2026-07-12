/**
 * Helper to convert JSON-serialized Uint8Arrays back to actual Uint8Arrays.
 * When frontend sends a byte array (like UUID) in JSON, it often stringifies into {"0": 51, "1": 12}.
 * This function recursively finds these dictionaries and converts them back to Uint8Array so Protobuf can encode them.
 */
export const fixBytesArrays = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    // If it's a primitive string that looks exactly like a UUID, convert to 16-byte Uint8Array
    if (typeof obj === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(obj)) {
      const hex = obj.replace(/-/g, '');
      const bytes = new Uint8Array(16);
      for (let i = 0; i < 16; i++) {
        bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
      }
      return bytes;
    }
    return obj;
  }
  if (obj instanceof Uint8Array) return obj;
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => { obj[index] = fixBytesArrays(item); });
    return obj;
  }
  
  // Check if it's a byte dictionary like {"0": 51, "1": 12, ... }
  const keys = Object.keys(obj);
  if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k, 10)))) {
    // Validate they are sequential numeric keys starting at 0
    const isSequential = keys.every((k, idx) => parseInt(k, 10) === idx);
    if (isSequential) {
      return new Uint8Array(Object.values(obj) as number[]);
    }
  }
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = fixBytesArrays(obj[key]);
    }
  }
  return obj;
};

/**
 * Helper to convert a byte array (Uint8Array) to a UUID string.
 */
export const bytesToUuid = (bytes: Uint8Array | number[] | any): string => {
  if (!bytes) return '';
  // Convert dictionary { "0": 51, "1": 12 ... } to array if needed
  let arr = bytes;
  if (bytes && !Array.isArray(bytes) && !(bytes instanceof Uint8Array) && typeof bytes === 'object') {
     arr = Object.values(bytes) as number[];
  }
  const hex = Array.from(arr as number[] | Uint8Array).map(b => b.toString(16).padStart(2, '0')).join('');
  if (hex.length === 32) {
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
  return hex;
};

/**
 * Formats the raw Protobuf object into the clean format the Angular app expects.
 * Specifically converts:
 * - 16-byte Uint8Arrays to UUID strings
 * - Protobuf Long objects to standard Numbers
 * - google.protobuf.Timestamp to ISO Date strings
 */
export const formatProtobufResponse = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj;

  // If it's a Long object (has low, high, unsigned), convert to number
  if ('low' in obj && 'high' in obj && 'unsigned' in obj) {
    // Basic conversion for 53-bit safe integers
    return obj.low >>> 0; 
  }

  // If it's a Protobuf Timestamp (has seconds and nanos)
  if ('seconds' in obj && 'nanos' in obj && Object.keys(obj).length === 2) {
    let secs = obj.seconds;
    if (typeof secs === 'object' && 'low' in secs) {
      secs = secs.low >>> 0;
    }
    const date = new Date(secs * 1000 + Math.floor(obj.nanos / 1000000));
    return date.toISOString();
  }

  // If it's a byte array representing an ID (often 16 bytes for UUID)
  if (obj instanceof Uint8Array || Array.isArray(obj)) {
    if (obj.length === 16) {
      // It's highly likely a UUID
      return bytesToUuid(obj);
    }
    // Process children if it's a standard array
    if (Array.isArray(obj)) {
      return obj.map(item => formatProtobufResponse(item));
    }
  }

  // Also check if it's a parsed byte dictionary {"0": 12, "1": ...} with exactly 16 keys
  const keys = Object.keys(obj);
  if (keys.length === 16 && keys.every(k => !isNaN(parseInt(k, 10)))) {
    return bytesToUuid(obj);
  }

  // Recursively format object properties
  const formatted: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formatted[key] = formatProtobufResponse(obj[key]);
    }
  }

  // Handle specific backend-to-frontend mapping quirks at the root level of login response
  if (formatted.candidate_data) {
    formatted.candidate_data.id = String(formatted.candidate_data.id);
    formatted.candidate_data.passport = formatted.candidate_data.passport || '';
  }
  
  if (formatted.assessment_data) {
    formatted.assessment_data.exam_type = formatted.assessment_data.exam_type || 'EXAMALPHA';
    
    // Map backend snake_case to frontend typos
    if ('inactivity_warning_sec' in formatted.assessment_data) {
      formatted.assessment_data.inactivity_waring_sec = formatted.assessment_data.inactivity_warning_sec;
    }
    if ('allow_end_exam_after_x_questions' in formatted.assessment_data) {
      formatted.assessment_data.allow_end_exam_after_xquestions = formatted.assessment_data.allow_end_exam_after_x_questions;
    }
  }

  // Ensure sections_questions has question_blocks array initialized
  if (formatted.sections_questions && Array.isArray(formatted.sections_questions)) {
    formatted.sections_questions.forEach((sq: any) => {
      sq.question_blocks = sq.question_blocks || [];
      sq.question_blocks.forEach((qb: any) => {
        qb.items = qb.items || [];
        qb.items.forEach((item: any) => {
          // Ensure responses is always an array, since ProtobufJS drops empty arrays
          item.responses = item.responses || [];
        });
        
        qb.passages = qb.passages || [];
        qb.passages.forEach((passage: any) => {
          passage.items = passage.items || [];
          passage.items.forEach((item: any) => {
            item.responses = item.responses || [];
          });
        });
      });
    });
  }

  return formatted;
};
