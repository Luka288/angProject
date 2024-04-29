import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  exports:[TranslateModule],
  imports: [
    CommonModule, TranslateModule,
  ],
})
export class InternationalizationModule { }
