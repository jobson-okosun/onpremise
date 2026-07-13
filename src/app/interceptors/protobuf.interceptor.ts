import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProtobufService } from '../services/protobuf';

export const protobufInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const protobufService = inject(ProtobufService);
  let modifiedReq = req;

  if (req.url.includes('/candidate/auto_save/')) {
    if (req.body) {
      try {
        const blob = protobufService.encodeAutoSave(req.body);
        modifiedReq = req.clone({
          body: blob,
          headers: req.headers.set('Content-Type', 'application/x-protobuf')
        });
      } catch (error) {
        console.error('Error encoding Protobuf auto_save payload:');
      }
    }
  } else if (req.url.includes('/candidate/end_exam/')) {
    if (req.body) {
      try {
        const blob = protobufService.encodeEndExam(req.body);
        modifiedReq = req.clone({
          body: blob,
          headers: req.headers.set('Content-Type', 'application/x-protobuf')
        });
      } catch (error) {
        console.error('Error encoding Protobuf end_exam payload:');
      }
    }
  }

  if (req.url.includes('/auth/candidate_login')) {
    modifiedReq = modifiedReq.clone({ responseType: 'arraybuffer' });
  }

  return next(modifiedReq).pipe(
    map(event => {
      if (event instanceof HttpResponse && req.url.includes('/auth/candidate_login')) {
        if (event.body instanceof ArrayBuffer) {
          try {
            const decodedBody = protobufService.decodeLoginResponse(event.body);
            return event.clone({ body: decodedBody });
          } catch (error) {
            console.error('Error decoding Protobuf response:');
          }
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      // If the backend returns an error (like 400 Bad Request) as JSON, 
      // Angular will have read it as an ArrayBuffer because we forced responseType: 'arraybuffer'.
      // We must decode the ArrayBuffer back to a JSON object so the UI can display the correct error message.
      if (req.url.includes('/auth/candidate_login') && error.error instanceof ArrayBuffer) {
        try {
          const decoder = new TextDecoder('utf-8');
          const errorString = decoder.decode(error.error);
          const errorJson = JSON.parse(errorString);
          
          const parsedError = new HttpErrorResponse({
            error: errorJson,
            headers: error.headers,
            status: error.status,
            statusText: error.statusText,
            url: error.url || undefined
          });
          throw parsedError;
        } catch (e) { }
      }

      throw error;
    })
  );
}
