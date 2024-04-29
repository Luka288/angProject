import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { BaseUser, User } from '../interfaces/user';
import { API, authSerAPI } from '../const';
import { JwtTokens } from '../interfaces';
import { LocalStorageKeys } from '../enums';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly httpUser = inject(HttpClient)
  private readonly route = inject(Router)
  private readonly jwtHelperService = inject(JwtHelperService)
  private readonly sweetAlerts = inject(SweetalertService)

  readonly authApi = authSerAPI;


  readonly #user$ = new BehaviorSubject<User | null>(null)
  readonly user$ = this.#user$.asObservable();

  get user(){
    return this.#user$.value
  }

  set user(user: User | null){
    this.#user$.next(user);
  }

  get accessToken(){
    return localStorage.getItem(LocalStorageKeys.AccessToken)
  }

  set accessToken(token: string | null){
    localStorage.setItem(LocalStorageKeys.AccessToken, token || '')
  }

  get refreshToken(){
    return localStorage.getItem(LocalStorageKeys.RefreshToken) || '';
  }

  set refreshToken(token: string){
    localStorage.setItem(LocalStorageKeys.RefreshToken, token);
  }

  constructor(){
    this.init();
  }

  init(){
    if(this.accessToken && this.refreshToken) {
      this.user = this.jwtHelperService.decodeToken(this.accessToken)
    }
  }

  signIn(email: string, password: string){
    return this.httpUser.post<JwtTokens>(`${this.authApi}sign_in`, {email, password}).pipe(
      tap((token) => {
        this.accessToken = token.access_token;
        this.refreshToken = token.refresh_token;
        this.user = this.jwtHelperService.decodeToken(token.access_token)
      }),
    );
  }

  signUp(user: BaseUser) {
    return this.httpUser.post<BaseUser>(`${this.authApi}sign_up`, user);
  }

  logOut(){
    this.sweetAlerts.toast("Signed Out", "success", "green")
    localStorage.removeItem(LocalStorageKeys.AccessToken)
    localStorage.removeItem(LocalStorageKeys.RefreshToken) 
    this.route.navigateByUrl('')
    this.user = null
  };


  isUserAuth(){
    if(this.jwtHelperService.isTokenExpired(this.accessToken)){
      this.route.navigateByUrl('/auth')
      return false
    }
    return true
  }

  canUserAuth(){
    if(this.accessToken || this.refreshToken){
      this.route.navigateByUrl('profile')
      return false
    }else{
      return true
    }
  }
}

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthServiceService).isUserAuth();
};


export const canUserAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthServiceService).canUserAuth();
};