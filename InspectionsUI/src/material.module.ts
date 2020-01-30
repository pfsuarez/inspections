import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatDatepickerModule,
  MatCommonModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCommonModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
