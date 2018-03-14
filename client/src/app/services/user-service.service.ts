import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserServiceService {
  BASE_URL: string = 'http://localhost:3000/api';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(`${this.BASE_URL}/users`)
      .toPromise()
      .then((res: Response) => res.json())
  }

  getUser(id){
    return this.http.get(`${this.BASE_URL}/users/${id}`)
      .toPromise()
      .then((res: Response) => res.json())
  }

  createUser(newUser){
    const stringified = JSON.stringify(newUser);
    const options = { headers: this.headers };

    return this.http.post(
      `${this.BASE_URL}/users`,
      stringified,
      options
    )
      .toPromise()
      .then((response: Response) => response.json())
      .catch((error: Response) => Promise.reject(error ))
  }
}