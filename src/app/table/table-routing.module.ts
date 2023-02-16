import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTableComponent } from './order-table/order-table.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { RepairRequestTableComponent } from './repair-request-table/repair-request-table.component';
import { DisplaysComponent } from './dsiplays.component';

const routes: Routes = [
  {
    path: '',
    component: DisplaysComponent,
    children: [
      {
        path: 'order',
        component: OrderTableComponent,
      },
      {
        path: 'product',
        component: ProductTableComponent,
      },
      {
        path: 'repair',
        component: RepairRequestTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
