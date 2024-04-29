import { Injectable, importProvidersFrom, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeys } from '../enums';
import { SweetalertService } from './sweetalert.service';
import { Language } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
private readonly translateService = inject(TranslateService);
private readonly alertService =inject(SweetalertService);
 readonly Languages = ['en', 'ka'];


  constructor() { 
    this.init();
  }

  init(){
    const prevLanguage = localStorage.getItem(LocalStorageKeys.Language) || this.Languages[0];
    this.translateService.use(prevLanguage);
    localStorage.setItem(LocalStorageKeys.Language, prevLanguage);
  };

  loadLanguage (language: Language){
    if(!this.Languages.includes(language
    )){
      this.alertService.toast('error', 'error', 'red');
      console.log("ariqa mushaobs")
      return;
    }
    this.translateService.use(language);
    localStorage.setItem(LocalStorageKeys.Language, language);
  }

}
