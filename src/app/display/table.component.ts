import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit{
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    if(this.page){
      console.log("table: ",new Date());
      console.log("count: ",this.totalRecords);
    }
  }

  @Input() editCols: any;
  @Input() addnew: any;
  @Input() formly: any;
  @Input() rrList: any;
  @Input() totalRecords: any;
  
  // @Input() tables: any;
  // @Input() title: any;
  // @Input() cols: any;
  // @Input() rows: any;
  // @Input() havePaginator: any;

  @Input() input:any
  @Input() page: any;

  @Output() EditResponse: EventEmitter<any> = new EventEmitter<any>();
  @Output() EmitPageNumber: EventEmitter<any> = new EventEmitter<any>();
  @Output() EmitPageLimit: EventEmitter<any> = new EventEmitter<any>();
  @Output() EmitNewProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() EmitFormlyUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() EmitFieldFilterValue: EventEmitter<any> = new EventEmitter<any>();


  tableDialog = false;
  tableEdit: any;
  formlyPatch: any;
  limit: any;
  pageNumber: any;
  filterVal: any;
  // totalRecords:any

  editProduct(table: any, tableId: any) {
    this.tableDialog = true;
    this.tableEdit = { ...table };
    console.log("table Edit: ",this.tableEdit);
    

    //patch value for formly fields
    if (this.rrList) {
      for (let i = 0; i < this.rrList.length; i++) {
        var index = this.rrList.findIndex((x: any) => x.orderId === tableId);
        if (tableId == this.rrList[i].orderId) {
          console.log('rr: ', this.rrList[index].formData);
          this.formlyPatch = this.rrList[index].formData;
        }
      }
    }
  }
  addNew() {
    this.tableEdit = {};
    this.tableDialog = true;
  }
  hideDialog() {
    this.tableDialog = false;
  }
  saveField(id: any) {
    this.tableDialog = false;
    if (id) {
      console.log('existing');
      this.service
        .updateTable(id, this.tableEdit, this.input.title)
        .subscribe((res: any) => {
          this.EditResponse.emit(res);
        });
    } 
    else {
      console.log('new');
      this.EmitNewProduct.emit(this.tableEdit)
    }
  }
  paginate(event: any): void {
    this.pageNumber = event.page + 1;
    this.EmitPageNumber.emit(this.pageNumber);
  }
  formSubmit(event: any) {
    var formData=[this.tableEdit.id,event]
    this.EmitFormlyUpdate.emit(formData)
    this.tableDialog=false
  }
  changeBlur(limit: any) {
    console.log('blur: ', limit);
    var pageLimit = [this.pageNumber, limit];
    this.EmitPageLimit.emit(pageLimit);
    this.pageLimitReset().then((v) => {
      this.limit = v;
    });
  }
  filterColumn(val: any) {
    if (val) {
      console.log('filter value: ', val);
      var text = val.split('=');
      console.log(text);
      console.log(this.input.cols.includes(text[0]));
      if (text[1] == undefined) {
        alert('type field name and value to be searched,eg:id=1');
      } else if (!this.input.cols.includes(text[0])) {
        alert('field name is incorrect');
      } else {
        var fieldFilterValue=[text[0],text[1]];
        this.EmitFieldFilterValue.emit(fieldFilterValue)
      }
    }
  }
  pageLimitReset() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(''), 500);
    });
  }
}
