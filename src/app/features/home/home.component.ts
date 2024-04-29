import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { InternationalizationModule } from '../shared/modules';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatGridListModule, InternationalizationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
