import { Component, OnInit } from '@angular/core';
import { PropertyEntriesService } from '../services/property-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
  providers: [PropertyEntriesService],
})
export class PropertyCreateComponent implements OnInit {
  
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
    floor_plan: 0,
    max_occupancy: 0,
    comments: "",
    special_instructions: "",
    rating: "Standard",
    bathrooms: 0,
    owned_by: "",
    bedrooms: []
  }

  errorMessage: String;

  constructor(private propertiesService: PropertyEntriesService, private myRouter: Router) { }

  ngOnInit() {
  }

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
}