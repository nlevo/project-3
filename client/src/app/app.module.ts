import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PropertyTableComponent } from './property-table/property-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PropertyCreateComponent } from './property-create/property-create.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from "./services/session-service.service";
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'properties', component: PropertyTableComponent },
  { path: 'users/:id', component: UserProfileComponent},
  { path: 'properties/new', component: PropertyCreateComponent},
  { path: '', component: LoginComponent},
  { path: 'signup', component: RegisterComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyTableComponent,
    UserProfileComponent,
    PropertyCreateComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
