import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PropertyEntriesService {
  BASE_URL: string = 'http://localhost:3000/api';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProperties(){
    return this.http.get(`${this.BASE_URL}/properties`, { withCredentials: true })
      .toPromise()
      .then((res: Response) => res.json())
  }

  getPropertyById(id){
    return this.http.get(`${this.BASE_URL}/properties/${id}`, { withCredentials: true })
      .toPromise()
      .then((res: Response) => res.json())
  }

  createProperty(property){
    const stringified = JSON.stringify(property);
    const options = { headers: this.headers, withCredentials: true };
    console.log("SERVICE PROPERTY:",property);
    return this.http.post(
      `${this.BASE_URL}/properties`, 
      stringified,
      options
    )
      .toPromise()
      .then((response: Response) => response.json())
      .catch((error: Response) => Promise.reject(error ))
  }
}