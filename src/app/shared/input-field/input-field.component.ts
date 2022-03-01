import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input() label?:string;
  @Input() inputType?: string;
  @Input() control?:any;

  constructor() { }

  ngOnInit(): void {
  }

  showErrors(){
    const { errors, touched, dirty } = this.control;
    return errors && touched && dirty;
  }

}
