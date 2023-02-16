import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
})
export class FormlyComponent implements OnChanges {
  @Input() tableEdit: any;
  @Input() formlyPatch: any;
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model = {};
  @Output() FormSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: ServiceService) {}
  ngOnChanges(changes: SimpleChanges) {
    if (!!(this.tableEdit)) {
      this.service.formlyConfig(this.tableEdit.productId).subscribe((res: any) => 
      {
        this.fields = res;
        console.log("formly config: ",this.formlyPatch);
        
      });
      this.model=this.formlyPatch;
    }
  }
  onSubmit(value: any) {
    this.FormSubmit.emit(value)
  }
}
