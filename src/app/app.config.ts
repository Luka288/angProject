import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { everrestService } from './features/shared/const';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(withFetch(),),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem("access_token"),
          allowedDomains: [everrestService],
        },
      }),
         TranslateModule.forRoot({
     loader: {
       provide: TranslateLoader,
       useFactory: HttpLoaderFactory,
       deps: [HttpClient]
     }
   })
    ),
  ],
  // TranslateModule.forRoot({
  //   loader: {
  //     provide: TranslateLoader,
  //     useFactory: HttpLoaderFactory,
  //     deps: [HttpClient]
  //   }
  // })
};
