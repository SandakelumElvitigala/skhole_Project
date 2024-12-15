import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TutorNavComponent } from '../navs/tutor-nav/tutor-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertise',
  imports: [RouterOutlet, TutorNavComponent, CommonModule],
  templateUrl: './advertise.component.html',
  styleUrl: './advertise.component.css'
})
export class AdvertiseComponent {
  
}