import { Routes } from '@angular/router';
import { TutorComponent } from './dashboards/tutor/tutor.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PlayerComponent } from './player/player.component';
import { AdvertiseComponent } from './advertise/advertise.component';

export const routes: Routes = [
    {
        path:"dashboardTutor",
        component:TutorComponent
    },
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"schedule",
        component:ScheduleComponent
    },
    {
        path:"video",
        component:PlayerComponent
    },
    {
        path:"advertise",
        component:AdvertiseComponent
    }
];
