import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { InfoModalService } from './infrastructure/services/info-modal.service';

@Injectable()
export class ApiError implements HttpInterceptor {
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
        this.showInfoModal(error.status);
        return throwError(() => error);
      })
    );
  }

  private showInfoModal(status: number) {
    switch (status) {
      case 500:
        this.infoModal.showModal('Pies nam zjadł, popsute!');
        break;
      case 404:
        this.infoModal.showModal('Kot się schował, nie można znaleźć!');
        break;
      case 400:
        this.infoModal.showModal('Czego ode mnie chcesz człowieku? Błędne dane!');
        break;
    }
  }
}
