import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { DisplaysComponent } from './dsiplays.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { RepairRequestTableComponent } from './repair-request-table/repair-request-table.component';
import { TableComponent } from '../display/table.component';

import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import  {DialogModule} from 'primeng/dialog';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyComponent } from '../formly/formly.component';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import {PaginatorModule} from 'primeng/paginator';

export function ErrorMsgPattern(err: any, field: FormlyFieldConfig) {
  console.log("err: ", err);
  console.log("field: ", field);

  return `Invalid ${field.key}`;
}

export function ErrorMsgMinLength(err: any, field: FormlyFieldConfig) {
  console.log("err: ", err);

  return `Invalid length for the ${field.key}.This field ${field.key} required ${err.requiredLength} characters but you have entered ${err.actualLength} characters`;
}

@NgModule({
  declarations: [
    DisplaysComponent,
    OrderTableComponent,
    ProductTableComponent,
    RepairRequestTableComponent,
    TableComponent,
    FormlyComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    FormlyBootstrapModule,
    PaginatorModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: "pattern", message: ErrorMsgPattern },
        { name: "minLength", message: ErrorMsgMinLength }
      ],
    })
  ]
})
export class DisplaysModule { }
