import { Component, inject } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder,} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EMPTY, catchError, tap } from 'rxjs';
import { BaseUser, User } from '../shared/interfaces/user';
import { AuthServiceService } from '../shared/services/auth-service.service';
import {MatSelectModule} from '@angular/material/select';
import { SweetalertService } from '../shared/services/sweetalert.service';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [MatTabsModule, RouterModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})

export default class AuthPageComponent {
  private readonly fb = inject(FormBuilder);
  
  private readonly route = inject(Router)
  private readonly authService = inject(AuthServiceService)
  private readonly sweetAlerts = inject(SweetalertService)

  tabIndex = 0
  readonly signUpForm = this.fb.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),

    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],

    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(22),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),

    age: new FormControl(10, [
      Validators.required,
      Validators.minLength(2),
      Validators.min(10),
      Validators.max(150),
    ]),
    
    zipcode: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(6),
    ]),
    gender: new FormControl('MALE', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(2)]),
  })


  signIn(){
    const email =this.signUpForm.value.email
    const password = this.signUpForm.value.password
    if (!email || !password) {
      this.sweetAlerts.toast('Error check fields ! ', 'error', 'red');
      return;
    }
    this.authService.signIn(email, password).pipe(
      tap(userToken => {
        this.route.navigateByUrl('');
        this.sweetAlerts.toast('Signed In', 'success', 'green');
        this.signUpForm.reset()
      }),
      catchError((err) => {
        this.sweetAlerts.alert('Check email or password', 'error', `Are you registerd?`)
        return EMPTY;
      }),

    ).subscribe()

  }

  register(){
    const user = this.signUpForm.value as BaseUser;
    user.avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.firstName}`;
    this.authService.signUp(user).pipe(
      tap(user => {
        if(user._id){
          this.sweetAlerts.toast('Registered', 'success', 'green')
          this.tabIndex = 0
        }
        this.signUpForm.reset()
      })
    ).subscribe()
    if(!user.email || !user.password){
      this.sweetAlerts.toast('Error check fields ! ', 'error', 'red');
      return;
    }
  }

  tabChange(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }

}
