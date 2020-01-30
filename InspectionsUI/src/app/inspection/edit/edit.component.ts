import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { InspectionService } from './../inspection.service';
import { Inspections, Inspectors, Status } from '../inspection.model';

type PageModeType = 'Create' | 'Update';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  inspectionSub: Subscription;
  inspectorsSub: Subscription;
  statusSub: Subscription;

  pageMode: PageModeType = 'Create';
  pageTitle = 'Create Inspection';
  inspectionId: number;
  inspection: Inspections;
  inspectionForm: FormGroup;

  inspectors: Inspectors[] = [];
  statuses: Status[] = [];

  constructor(
    private inspectionService: InspectionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.configureForm();
    this.initialCombosLoad();

    if (this.route.snapshot.paramMap.has('id')) {
      this.inspectionId = +this.route.snapshot.paramMap.get('id');
      this.pageMode = 'Update';
      this.pageTitle = 'Update Inspection';
      this.loadInspection();
    }
  }

  ngOnDestroy() {
    if (this.inspectionSub) {
      this.inspectionSub.unsubscribe();
    }
    if (this.inspectorsSub) {
      this.inspectorsSub.unsubscribe();
    }
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.inspectionForm.valid) {
      return;
    }

    this.inspectionService.saveInspection(this.inspectionForm.value, this.inspectionId)
      .subscribe(result => {
        this.router.navigateByUrl('/inspections');
      }, err => this.showMessage(err));

  }

  private configureForm() {
    this.inspectionForm = this.fb.group({
      inspectorId: ['', Validators.required],
      statusId: ['', Validators.required],
      customer: ['', [Validators.required, Validators.maxLength(100)]],
      inspectionDate: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      observations: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  private initialCombosLoad() {
    this.inspectorsSub = this.inspectionService.getInspectors()
      .subscribe(inspectors => {
        this.inspectors = inspectors;
      }, err => this.showMessage(err));

    this.statusSub = this.inspectionService.getStatuses()
      .subscribe(statuses => {
        this.statuses = statuses;
      }, err => this.showMessage(err));
  }

  private loadInspection() {
    this.inspectionSub = this.inspectionService.getInspectionById(this.inspectionId)
      .subscribe(inspection => {
        this.inspection = inspection;
        this.loadFormData();
      }, err => this.showMessage(err));
  }

  private loadFormData() {
    console.log('ConfigureForm', this.inspection);

    this.inspectionForm.patchValue({
      inspectorId: this.inspection.inspector.id,
      statusId: this.inspection.status.id,
      customer: this.inspection.customer,
      inspectionDate: this.inspection.inspectionDate,
      address: this.inspection.address,
      observations: this.inspection.observations
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(
      message,
      '',
      { duration: 5000 }
    );
  }
}
