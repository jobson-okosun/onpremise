import * as fs from 'fs';
import { candidate_http } from '../../src/app/store/model/protobuf/candidate_http';
import { fixBytesArrays } from '../../src/app/utils/protobuf.utils';

try {
  const payloadStr = fs.readFileSync('unit-test/protobuf/test_payload.json', 'utf8');
  const payload = JSON.parse(payloadStr);
  
  fixBytesArrays(payload);
  
  const message = candidate_http.CandidateAutoSaveHttpProto.fromObject(payload);
  
  console.log("Mapped duration_ms on event 11:", message.pending_events[11].duration_ms);
  
  const buffer = candidate_http.CandidateAutoSaveHttpProto.encode(message).finish();
  console.log("Encoded successfully! Size in bytes:", buffer.length);
  
  // Decode back to test validity
  const decoded = candidate_http.CandidateAutoSaveHttpProto.decode(buffer);
  
  console.log("Decoded events_session_id byte array on event 0 length:", decoded?.pending_events?.[0].events_session_id?.length);
  
  console.log("SUCCESS!");
} catch (error) {
  console.error("FAILED:");
  console.error(error);
}
