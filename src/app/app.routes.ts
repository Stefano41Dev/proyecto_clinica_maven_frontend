import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardAdministrador } from './pages/dashboard/dashboard-administrador/dashboard-administrador';
import { DashboardPaciente } from './pages/dashboard/dashboard-paciente/dashboard-paciente';
import { RoleGuard } from './core/guards/role-guard/role-guard';
import { MedicoListado } from './pages/medico/medico-listado/medico-listado';
import { MedicoInformacion } from './pages/medico/medico-informacion/medico-informacion';
import { MedicoRegistrar } from './pages/medico/medico-registrar/medico-registrar';


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
    ,
    {
        path: 'medicos',
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] },
        children: [
        { path: '', component: MedicoListado },
        { path: 'registrar', component: MedicoRegistrar},
        { path: ':id', component: MedicoInformacion }
        
        ]
    }
    
    
];

