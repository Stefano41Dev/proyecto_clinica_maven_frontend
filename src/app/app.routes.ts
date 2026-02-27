import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardAdministrador } from './pages/dashboard/dashboard-administrador/dashboard-administrador';
import { DashboardPaciente } from './pages/dashboard/dashboard-paciente/dashboard-paciente';
import { RoleGuard } from './core/guards/role-guard/role-guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { 
        path: 'dashboard-admin', component: DashboardAdministrador, canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] }
    },
    {   
        path: 'dashboard-paciente', component: DashboardPaciente, canActivate: [RoleGuard],
        data: { roles: ['PACIENTE']}
    }
];

