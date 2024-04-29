import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "./features/footer/footer.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthServiceService } from './features/shared/services/auth-service.service';
import { AfterAuthNav, BeforeAuthNav } from './features/shared/const/navigation';
import { Languages } from './features/shared/const/language';
import { InternationalizationModule } from './features/shared/modules/internationalization.module';
import { LanguageService } from './features/shared/services';
import { Language } from './features/shared/interfaces';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatIconModule, RouterModule, FooterComponent, CommonModule, MatButtonModule, MatMenuModule, InternationalizationModule,]
})
export class AppComponent {
private readonly languageService = inject(LanguageService);

//switchLanguage(arg0: string) {
//throw new Error('Method not implemented.');
//}
  private readonly authService = inject(AuthServiceService)

  readonly user$ = this.authService.user$;
  readonly beforeAuth = BeforeAuthNav
  readonly afterAuth = AfterAuthNav
  readonly languages = Languages;



  logOut(){
    this.authService.logOut()
  }

  switchLanguage(language: Language){
    this.languageService.loadLanguage(language);
  }
}
