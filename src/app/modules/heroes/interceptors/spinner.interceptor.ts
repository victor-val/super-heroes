import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { SpinnerHandlerService } from '../services/spinner-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(public spinnerHandler: SpinnerHandlerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerHandler.handleRequest('plus');
    return next
      .handle(request)
      .pipe(delay(1000), finalize(this.finalize.bind(this)));
  }

  finalize = (): void => this.spinnerHandler.handleRequest();
}
