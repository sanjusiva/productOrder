import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

interface input_emit{
  tables: any[];
  cols: any[] ;
  title: string;
}
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  // tables: any[] = [];
  // cols: any[] = [];
  // title = 'order';
  formly = true;
  rrList: any[] = [];

  input:input_emit={
    tables: [],
    cols:  [],
    title : 'order',
  }

  constructor(private service: ServiceService) {}
  ngOnInit(): void {
    this.refresh();
  }
  editResponse(res: any) {
    console.log("receive order");
    
    if (res[0] == '1') {
      this.refresh(1);
    }
  }
  refresh(times = 0) {
    this.service.tableOrder().subscribe((res: any) => {
      this.input.tables = res;
      if (times == 0) {
        Object.keys(res[0]).forEach((ele: any) => {
          if (ele != 'createdAt' && ele != 'updatedAt' && ele != 'formData') {
            this.input.cols.push(ele);
          }
        });
        this.service.tableRepair().subscribe((res: any) => {
          console.log('formly field request: ', res);
          this.rrList = res;
        });
      }
    });
  }
  formlyUpdate(data:any){
    console.log("update formly in order: ",data);
    this.service.updateFormly(data[0],data[1]).subscribe((res: any) => {
        // this.tableDialog = false;
        this.editResponse(res)
      });
  }
  fieldFilterValue(data:any){
    console.log("filter order: ",data);
    //  this.service
    //       .filterField(data[0], data[1], this.title)
    //       .subscribe((res: any) => {
    //         console.log('success res for filter: ', res);
    //         this.tables = res[0].data;
    //       });
    this.service.tableOrder(data[0],data[1]).subscribe((res:any)=>{
      console.log("oiugfx: ",res);
      
    })
  }
}
