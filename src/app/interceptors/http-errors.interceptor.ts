import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError as observableThrowError } from 'rxjs';


@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(){}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        return observableThrowError(err);
      })
    )

  }

}
