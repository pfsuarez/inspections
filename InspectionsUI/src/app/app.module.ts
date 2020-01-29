import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './../material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './inspection/main/main.component';
import { EditComponent } from './inspection/edit/edit.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EditComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
