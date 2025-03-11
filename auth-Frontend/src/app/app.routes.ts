import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {path:'',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'users',component:UsersComponent},
    {path:'users/edit/:id',component:EditComponent},

];
