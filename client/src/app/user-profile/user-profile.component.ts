import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users: Object[]
  user: { name: string, first: string, last: string, phone: string } = { name: '', first: '', last: '', phone: '' }

  constructor(private usersService: UserServiceService) { }

  ngOnInit() {
  }

  submitEntry(entry){
    this.usersService.createUser(entry)
      .then(
        (res) => {
          this.user = { name: '', first: '', last: '', phone: ''}
        }
      )
      .catch(
        err => this.user = entry
      )
  }
}