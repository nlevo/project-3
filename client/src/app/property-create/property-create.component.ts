import { Property } from './../interfaces/property';
import { Component, OnInit } from '@angular/core';
import { PropertyEntriesService } from '../services/property-service.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
  providers: [PropertyEntriesService],
})
export class PropertyCreateComponent implements OnInit {

  public myForm: FormGroup; // our form model

  property = { 
    name: "", 
    building: "", 
    unit: "",
    isActive: false,
    address: {
      apartment_num: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    effective_date: Date,
    end_date: Date,
    floor_plan: Number,
    max_occupancy: Number,
    comments: "",
    special_instructions: "",
    rating: "Standard",
    bathrooms: Number,
    owned_by: "",
    bedrooms: []
  }

  errorMessage: String;

  constructor(
    private propertiesService: PropertyEntriesService, 
    private myRouter: Router,
    private _fb: FormBuilder
    
  ) { }

  ngOnInit() {
     // we will initialize our form here
     this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      building: ['', [Validators.required, Validators.minLength(4)]],
      unit: ['', [Validators.required, Validators.minLength(4)]],
      bedrooms: this._fb.array([
        this.initBedroom(),
    ]),
      isActive: [false],
      address: {
          apartment_num: '',
          street: '',
          city: '',
          state: '',
          zip: '',
        },
      effective_date: Date,
      end_date: Date,
      floor_plan: Number,
      max_occupancy: Number,
      comments: '',
      special_instructions: this._fb.array([
        this.initInstruction(),
    ]),
      rating: '',
      bathrooms: Number
  })
}


///////////INIT/////////////
  initBedroom() {
    // initialize our bedroom
    return this._fb.group({
      bedroom_type: ['', Validators.required],
      bedsize: ''
    });
  }

  initInstruction() {
    // initialize our instruction
    return this._fb.group({
      instruction: '',
    });
  }
///////////INIT-END////////

///////////ADD/////////////
  addBedroom() {
    // add bedroom to the list
    const control = <FormArray>this.myForm.controls['bedrooms'];
    control.push(this.initBedroom());
  }

  addInstruction() {
    // add instruction to the list
    const control = <FormArray>this.myForm.controls['special_instructions'];
    control.push(this.initInstruction());
  }
///////////ADD-END/////////////

///////////REMOVE/////////////
  removeBedroom(i: number) {
    // remove bedroom from the list
    const control = <FormArray>this.myForm.controls['bedrooms'];
    control.removeAt(i);
  }

  removeInstruction(i: number) {
    // remove instruction from the list
    const control = <FormArray>this.myForm.controls['special_instructions'];
    control.removeAt(i);
  }

///////////REMOVE-END////////

  saveNewProperty(){
    console.log("COMPONENT PROPERTY:",this.property);
    this.property.address.apartment_num = this.property.unit
    this.propertiesService.createProperty(this.property)
      .then(
        (res) => {
          this.myRouter.navigate(['/properties'])
        }
      )
      .catch(
        err => this.errorMessage = err
      )
  }

  save(model: Property) {
    // call API to save customer
    console.log(model);
  }
  
}