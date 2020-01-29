import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSelectChange } from '@angular/material';

import { InspectionService } from '../inspection.service';
import { Inspectors, Inspections } from './../inspection.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  inspectorsSub: Subscription;
  inspectionsSub: Subscription;

  inspectors: Inspectors[] = [];
  customerOrStatusFilter = '';
  inspectorSelected: Inspectors;

  displayedColumns: string[] = ['inspector', 'inspectionDate', 'address', 'observations', 'status', 'customActions'];
  inspections = new MatTableDataSource<Inspections>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private inspectionService: InspectionService,
    private snackBar: MatSnackBar
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
      }, err => this.showError(err));
  }

  private loadInspections() {
    const customer = null;
    const inspectorId = null; //this?.inspectorSelected?.id;

    this.inspectorsSub = this.inspectionService.getInspections(customer, inspectorId)
      .subscribe(inspections => {
        this.inspections = new MatTableDataSource<Inspections>(inspections);
      }, err => this.showError(err));
  }

  onInspectorsSelectionChanged(inspector: MatSelectChange) {
    console.log('', inspector);
    this.loadInspections();
  }

  onDelete(inspectionId) {
    console.log('', inspectionId);
  }

  private showError(errMessage: string) {
    this.snackBar.open(
      errMessage,
      '',
      { duration: 5000 }
    );
  }

}
