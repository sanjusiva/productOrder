import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
interface input_emit{
  tables: any[];
  cols: any[] ;
  title: string;
}
interface pagination_emit{
  rows:any;
  // totalRecords:any;
  havePaginator:boolean;
}
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit{
// tables:any[]=[]
// cols:any[]=[]
title="product";
editCols:any[]=[]
addnew=true;
totalRecords:any;
// rows:any;
// havePaginator=true;

input:input_emit={
  tables: [],
  cols:  [],
  title : 'product',
}
page:pagination_emit={
  rows:0,
  // totalRecords:17,
  havePaginator:true,
}

constructor(private service:ServiceService){}
ngOnInit(): void {
  this.refresh(0);
 }
 editResponse(res:any){
  console.log("receive product");

  console.log("success",Object.keys(res).includes('id'));
  if(res[0]=='1' ||Object.keys(res).includes('id')){
  console.log("success");
    this.refresh(1);
  }
}
refresh(times=0){
  this.service.tableProduct().subscribe((res:any)=>{
console.log("prod: ",new Date());

    this.totalRecords=res[0].count;
    console.log("times: ",times,this.totalRecords);
    this.page.rows=res[0].pages
    this.input.tables=res[0].data
   if(times==0){
    Object.keys(res[0].data[0]).forEach((ele: any) => {
      if (ele != 'createdAt' && ele != 'updatedAt' && ele!='formData') {
        this.input.cols.push(ele);
      }
    });
    this.input.cols.filter((ele:any)=>{
     if(!(ele.includes('Id') || ele.includes('id')))
     {
       this.editCols.push(ele)
     }
   })
  }
   console.log("colsEdit: ",this.editCols);
   
   })
}
emitPageNumber(event:any){
  console.log("pageNumber event: ",event);
   this.service.tableProduct(event).subscribe((res: any) => {
      console.log('success res: ', res);
      this.input.tables = res[0].data;
    });
}
emitPageLimit(event:any){
  console.log("pageLimit event: ",event);
   this.service.tableProduct(event[0],event[1]).subscribe((res: any) => {
      console.log('success res: ', res);
      this.input.tables = res[0].data;
    })
}
addNewProduct(value:any){
  console.log("new product: ",value);
  this.service.newProduct(value).subscribe((res: any) => {
    this.editResponse(res)
    this.emitPageNumber(this.page.rows)
  });
}
fieldFilterValue(data:any){
  console.log("filter product: ",data);
  this.service.tableProduct(1,10,data[0],data[1]).subscribe((res:any)=>{
    console.log("oiugfx: ",res);
    this.input.tables=res[0].data
    
  })
}
}
