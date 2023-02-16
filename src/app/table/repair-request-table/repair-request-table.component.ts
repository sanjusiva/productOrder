import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
interface input_emit{
  tables: any[];
  cols: any[] ;
  title: string;
}
@Component({
  selector: 'app-repair-request-table',
  templateUrl: './repair-request-table.component.html',
  styleUrls: ['./repair-request-table.component.scss']
})
export class RepairRequestTableComponent implements OnInit {
  // tables:any[]=[];
  // cols:any[]=[];
  editCols:any[]=[];
  // title='repairRequest'
  input:input_emit={
    tables: [],
    cols:  [],
    title : 'repairRequest',
  }
  constructor(private service:ServiceService){}
  ngOnInit(){
    this.refresh();
  }
  editResponse(res:any){
    console.log("receive repairRequest");

    if(res[0]=='1' ||Object.keys(res).includes('id')){
      this.refresh(1);
    }
  }
  refresh(times=0){
    this.service.tableRepair().subscribe((res:any)=>{
      this.input.tables=res;
      if(times==0){
      Object.keys(res[0]).forEach((ele: any) => {
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
     })
  }
  fieldFilterValue(data:any){
    console.log("filter repairRequest: ",data);
    
  }

}
