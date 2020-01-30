import { Inspectors, Inspections, Status } from './inspection.model';
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
  private statusControllerUrl: string;

  constructor(private http: HttpClient) {
    this.inspectionsControllerUrl = `${environment.serverUrl}/inspections`;
    this.inspectorsControllerUrl = `${environment.serverUrl}/inspectors`;
    this.statusControllerUrl = `${environment.serverUrl}/status`;
  }

  public getInspectors() {
    return this.http.get<Inspectors[]>(this.inspectorsControllerUrl)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public getStatuses() {
    return this.http.get<Status[]>(this.statusControllerUrl)
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

  public getInspectionById(inspectionId: number) {
    return this.http.get<Inspections>(`${this.inspectionsControllerUrl}/${inspectionId}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public ValidateCreate(inspectorId?: number, inspectionDate?: string) {
    let params = new HttpParams();

    if (inspectorId) {
      params = params.append('inspectorId', inspectorId.toString());
    }

    if (inspectionDate) {
      params = params.append('inspectionDate', inspectionDate);
    }

    return this.http.get<boolean>(`${this.inspectionsControllerUrl}/ValidateCreate`, { params })
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

  public saveInspection(formData, id?: number) {
    if (id) {
      formData.id = id;
      return this.http.put<Inspections>(`${this.inspectionsControllerUrl}/${id}`, formData)
        .pipe(
          catchError(err => this.handleError(err))
        );
    } else {
      return this.http.post<Inspections>(`${this.inspectionsControllerUrl}`, formData)
        .pipe(
          catchError(err => this.handleError(err))
        );
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'Se ha producido un error. Intente nuevamente.';

    if (errorRes.error) {
      return throwError(errorRes.error);
    }

    return throwError(errorMessage);
  }
}
