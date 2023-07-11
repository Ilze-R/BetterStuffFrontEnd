import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Page, Profile } from '../interface/appstates';
import { User } from '../interface/user';
import { Key } from '../enum/key.enum';
import { Stats } from '../interface/stats';
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly server: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  customers$ = (page: number = 0) =>
    <Observable<CustomHttpResponse<Page & User & Stats>>>(
      this.http
        .get<CustomHttpResponse<Page & User & Stats>>(
          `${this.server}/customer/list?page=${page}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  newCustomer$ = (customer: Customer) =>
    <Observable<CustomHttpResponse<Page & User>>>(
      this.http
        .post<CustomHttpResponse<Page & User>>(
          `${this.server}/customer/create`,
          customer
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
