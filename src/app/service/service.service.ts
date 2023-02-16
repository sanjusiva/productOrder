import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  public tableOrder(col='',val='') {
    return this.http.get(`http://192.168.111.132:3003/order/list?filter[${col}]=${val}`).pipe(//https://run.mocky.io/v3/9b792fe9-6bbe-4f71-aeb4-1e123546f088   // http://192.168.111.132:3003/order/list
      map((res: any) => {
        return res;
      })
    );
  }
  public tableProduct(pageNumber=1,limit=10,col='',val=''){
    return this.http.get(`http://192.168.111.132:3003/product/list?page=${pageNumber}&limit=${limit}&filter[${col}]=${val}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public tableRepair(col='',val=''){
    return this.http.get('http://192.168.111.132:3003/order/repair-list?filter[${col}]=${val}').pipe(map((res:any)=>{ //http://192.168.111.132:3003/order/repair-list   //https://run.mocky.io/v3/d23d1d31-8e60-4058-8a79-1caf22d01478
      return res;
    }))
  }
  public formlyConfig(id:any){
    return this.http.get(`http://192.168.111.132:3003/form/form-field/${id}`).pipe(map((res:any)=>{    //http://192.168.111.132:3003/form/form-field/${id}
      return res;
  }))
  }
  public updateTable(id:any,data:any,title:string){
    console.log("id: ",id," data: ",data," title: ",title);
    if(title=='product'){
      return this.http.put(`http://192.168.111.132:3003/product/update/${id}`,data)
    }
    else if(title=='order'){
      return this.http.post(`http://192.168.111.132:3003/order/formData/${id}`,data)
    }
    else{
      return this.http.put(`http://192.168.111.132:3003/form/config/statusUpdate/${id}`,data)   
    }
  }
  public newProduct(data:any){
    return this.http.post(`http://192.168.111.132:3003/product/create`,data)
  }
  public updateFormly(id:any,formData:any){
    return this.http.post(`http://192.168.111.132:3003/order/formData/${id}`,formData)
  }
  public filterField(col:any,val:any,title:any){
    if(title=='repairRequest'){
      return this.http.get('http://192.168.111.132:3003/order/repair-list?filter[${col}]=${val}').pipe(map((res:any)=>{ //http://192.168.111.132:3003/order/repair-list   //https://run.mocky.io/v3/d23d1d31-8e60-4058-8a79-1caf22d01478
        return res;
    }))
    }
    else{
    return this.http.get(`http://192.168.111.132:3003/${title}/list?filter[${col}]=${val}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
}
