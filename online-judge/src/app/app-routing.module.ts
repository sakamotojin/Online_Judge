import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProblemComponent } from './add-problem/add-problem.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProblemSetComponent } from './problem-set/problem-set.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'problem-set', component: ProblemSetComponent },
  { path: 'add-problem', component: AddProblemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
