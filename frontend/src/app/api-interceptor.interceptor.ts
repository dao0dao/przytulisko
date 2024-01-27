import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { InfoModalService } from './infrastructure/services/info-modal.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private infoModal: InfoModalService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpResponse<any>>> {
    const cloneReq = request.clone({
      withCredentials: isDevMode(),
    });
    return next.handle(cloneReq).pipe(
      catchError<any, any>((error) => {
        if (!(error instanceof HttpErrorResponse)) {
          return error;
        }
        this.infoModal.showModal('Oj coś poszło nie tak!');
        return throwError(() => error);
      })
    );
  }
}
