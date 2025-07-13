import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyScheduleComponent } from './pages/my-schedule/my-schedule.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'mySchedule', component: MyScheduleComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];
