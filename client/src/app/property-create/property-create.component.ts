import { Component, OnInit } from '@angular/core';
import { PropertyEntriesService } from '../services/property-service.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
  providers: [PropertyEntriesService],
})
export class PropertyCreateComponent implements OnInit {
  
  property: { name: string, floor_plan: Number, comments: string } = { name: '', floor_plan: 0, comments: '' }

  constructor(private propertiesService: PropertyEntriesService) { }

  ngOnInit() {
  }

  submitEntry(entry){
    this.propertiesService.createProperty(entry)
      .then(
        (res) => {
          this.property = { name: '', floor_plan: 0, comments: '' }
        }
      )
      .catch(
        err => this.property = entry
      )
  }
}