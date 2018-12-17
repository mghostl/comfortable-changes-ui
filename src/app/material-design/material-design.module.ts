import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule, MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class MaterialDesignModule { }
