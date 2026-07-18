import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProtobufService } from '../services/data/protobuf';

export const protobufInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const protobufService = inject(ProtobufService);
  let modifiedReq = req;

  if (req.url.includes('/candidate/auto_save/')) {
    console.log('autosave', req.body)
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
      if ((req.url.includes('/auth/candidate_login') || req.url.includes('/candidate/end_exam/')) && error.error) {
        
        const createAndThrowError = (errorJson: any) => {
          const parsedError = new HttpErrorResponse({
            error: errorJson,
            headers: error.headers,
            status: error.status,
            statusText: error.statusText,
            url: error.url || undefined
          });
          return throwError(() => parsedError);
        };

        if (error.error instanceof ArrayBuffer || error.error instanceof Uint8Array) {
          try {
            const decoder = new TextDecoder('utf-8');
            const errorString = decoder.decode(error.error);
            const errorJson = JSON.parse(errorString);
            return createAndThrowError(errorJson);
          } catch (e) {
            return createAndThrowError({ error: 'Failed to parse error response' });
          }
        } 
        else if (typeof error.error === 'string') {
          try {
            const errorJson = JSON.parse(error.error);
            return createAndThrowError(errorJson);
          } catch (e) {
            return createAndThrowError({ error: error.error });
          }
        } 
        else if (error.error instanceof Blob) {
           return throwError(() => error);
        }
        else if (typeof error.error === 'object') {
           // It's already parsed
           return createAndThrowError(error.error);
        }
      }

      return throwError(() => error);
    })
  );
}
