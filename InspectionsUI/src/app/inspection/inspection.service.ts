import { Inspectors, Inspections } from './inspection.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private inspectionsControllerUrl: string;
  private inspectorsControllerUrl: string;

  constructor(private http: HttpClient) {
    this.inspectionsControllerUrl = `${environment.serverUrl}/inspections`;
    this.inspectorsControllerUrl = `${environment.serverUrl}/inspectors`;
  }

  public getInspectors() {
    return this.http.get<Inspectors[]>(this.inspectorsControllerUrl)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public getInspections(customerOrStatus?: string, inspectorId?: number) {
    let params = new HttpParams();

    if (customerOrStatus) {
      params = params.append('customerOrStatus', customerOrStatus);
    }

    if (inspectorId) {
      params = params.append('inspectorId', inspectorId.toString());
    }

    return this.http.get<Inspections[]>(this.inspectionsControllerUrl, { params })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public deleteInspection(id: number) {
    return this.http.delete<Inspections>(`${this.inspectionsControllerUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'Se ha producido un error. Intente nuevamente.';

    if (errorRes.error && errorRes.error.ExceptionMessage) {
      return throwError(errorRes.error.ExceptionMessage);
    }

    return throwError(errorMessage);
  }
}
