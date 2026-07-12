import { Injectable } from '@angular/core';
import { candidate_http } from '../store/model/protobuf/candidate_http';
import { fixBytesArrays, formatProtobufResponse } from '../utils/protobuf.utils';

@Injectable({
  providedIn: 'root'
})
export class ProtobufService {
  constructor() {}

  public encodeAutoSave(body: any): Blob {
    const bodyWithBytes = fixBytesArrays(JSON.parse(JSON.stringify(body)));
    const message = candidate_http.CandidateAutoSaveHttpProto.fromObject(bodyWithBytes);
    const encodedBody = candidate_http.CandidateAutoSaveHttpProto.encode(message).finish();
    return new Blob([encodedBody as any], { type: 'application/x-protobuf' });
  }

  public encodeEndExam(body: any): Blob {
    const bodyWithBytes = fixBytesArrays(JSON.parse(JSON.stringify(body)));
    const message = candidate_http.CandidateEndExamHttpProto.fromObject(bodyWithBytes);
    const encodedBody = candidate_http.CandidateEndExamHttpProto.encode(message).finish();
    return new Blob([encodedBody as any], { type: 'application/x-protobuf' });
  }

  public decodeLoginResponse(buffer: ArrayBuffer): any {
    const decodedBody = candidate_http.CandidateLoginResponseProto.decode(new Uint8Array(buffer));
    const rawObject = candidate_http.CandidateLoginResponseProto.toObject(decodedBody, { defaults: true, arrays: true, objects: true, enums: String });
    return formatProtobufResponse(rawObject);
  }
}
