import { Component } from '@angular/core';
import { NavigationComponent } from '../navs/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
