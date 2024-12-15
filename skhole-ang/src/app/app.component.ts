import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navs/navigation/navigation.component';
import { TutorComponent } from './dashboards/tutor/tutor.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent,TutorComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skhole-ang';
}

