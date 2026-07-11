import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { encode, decode } from '@msgpack/msgpack';

export const messagePackInterceptor:HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  let modifiedReq = req;

  if (req.url.includes('/candidate/auto_save/') || req.url.includes('/candidate/end_exam/')) {
    if (req.body) {
      try {
        const encodedBody = encode(req.body, { ignoreUndefined: true });
        modifiedReq = req.clone({
          body: new Blob([encodedBody], { type: 'application/msgpack' }),
          headers: req.headers.set('Content-Type', 'application/msgpack')
        });
      } catch (error) {
        console.error('Error encoding MessagePack payload:', error);
      }
    }
  }

  if (req.url.includes('/auth/candidate_login')) {
    modifiedReq = modifiedReq.clone({
      responseType: 'arraybuffer'
    });
  }

  return next(modifiedReq).pipe(
    map(event => {
      if (event instanceof HttpResponse && req.url.includes('/auth/candidate_login')) {
        if (event.body instanceof ArrayBuffer) {
          try {
            const decodedBody = decode(new Uint8Array(event.body));
            return event.clone({ body: decodedBody });
          } catch (error) {
            console.error('Error decoding MessagePack response:', error);
          }
        }
      }
      return event;
    })
  );
}
