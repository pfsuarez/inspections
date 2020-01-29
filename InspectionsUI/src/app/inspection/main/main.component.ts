import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSelectChange, MatDialog } from '@angular/material';
import * as moment from 'moment';

import { InspectionService } from '../inspection.service';
import { Inspectors, Inspections } from './../inspection.model';
import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  inspectorsSub: Subscription;
  inspectionsSub: Subscription;

  currentDate = moment(new Date());
  inspectors: Inspectors[] = [];
  inspectorSelectedValue: number;

  customerOrStatusFilter = '';
  set CustomerOrStatusFilter(value: string) {
    this.customerOrStatusFilter = value;
    this.loadInspections();
  }
  get CustomerOrStatusFilter() {
    return this.customerOrStatusFilter;
  }

  displayedColumns: string[] = ['inspector', 'customer', 'inspectionDate', 'address', 'observations', 'status', 'customActions'];
  inspections = new MatTableDataSource<Inspections>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private inspectionService: InspectionService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.inspections.paginator = this.paginator;
    this.loadInspectors();
    this.loadInspections();
  }

  ngOnDestroy() {
    if (this.inspectorsSub) {
      this.inspectorsSub.unsubscribe();
    }
    if (this.inspectionsSub) {
      this.inspectionsSub.unsubscribe();
    }
  }

  private loadInspectors() {
    this.inspectorsSub = this.inspectionService.getInspectors()
      .subscribe(inspectors => {
        this.inspectors = inspectors;
      }, err => this.showMessage(err));
  }

  private loadInspections() {
    const customer = this.CustomerOrStatusFilter ? this.customerOrStatusFilter : null;
    // const inspectorId = this.inspectorSelectedValue ?? null;
    const inspectorId = this.inspectorSelectedValue ? this.inspectorSelectedValue : null;

    this.inspectionsSub = this.inspectionService.getInspections(customer, inspectorId)
      .subscribe(inspections => {
        this.inspections = new MatTableDataSource<Inspections>(inspections);
        console.log('', inspections);
      }, err => this.showMessage(err));
  }

  private deleteInspection(deleteId) {
    this.inspectionsSub = this.inspectionService.deleteInspection(deleteId)
      .subscribe(result => {
        this.loadInspections();
        this.showMessage('Inspection Deleted');
      }, err => this.showMessage(err));
  }

  onInspectorsSelectionChanged(inspector: MatSelectChange) {
    this.loadInspections();
  }

  onDelete(inspection: Inspections) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: inspection
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === 'OK') {
        this.deleteInspection(inspection.id);
      }
    });
  }

  validateDate(currentInspectionDate) {
    const inspectionDate = moment(new Date(currentInspectionDate));
    return inspectionDate.startOf('day').isBefore(this.currentDate.startOf('day')) ? false : true;
  }

  private showMessage(message: string) {
    this.snackBar.open(
      message,
      '',
      { duration: 5000 }
    );
  }
}
