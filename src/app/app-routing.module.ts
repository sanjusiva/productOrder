import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "table",
    loadChildren: () => import("./table/table.module").then((mod) => mod.DisplaysModule),
  },
  {
    path: "",
    redirectTo: "table",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
