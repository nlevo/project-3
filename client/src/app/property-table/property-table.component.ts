import { Component, OnInit, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyEntriesService } from '../services/property-service.service';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css'],
  providers: [PropertyEntriesService],
})  
export class PropertyTableComponent implements OnInit {
  properties: Object[]
  property: { title: string, content: string } = { title: '', content: '' }

  constructor(private propertiesService: PropertyEntriesService) { }

  ngOnInit() {
    this.propertiesService.getProperties()
      .then( (res) => {
        this.properties = res;
      })
  }
}