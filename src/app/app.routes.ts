import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardAdministrador } from './pages/dashboard/dashboard-administrador/dashboard-administrador';
import { DashboardPaciente } from './pages/dashboard/dashboard-paciente/dashboard-paciente';
import { RoleGuard } from './core/guards/role-guard/role-guard';
import { MedicoListado } from './pages/medico/medico-listado/medico-listado';
import { MedicoInformacion } from './pages/medico/medico-informacion/medico-informacion';
import { MedicoRegistrar } from './pages/medico/medico-registrar/medico-registrar';
import { PacienteListado } from './pages/paciente/paciente-listado/paciente-listado';
import { PacienteInformacion } from './pages/paciente/paciente-informacion/paciente-informacion';
import { PacienteRegistrar } from './pages/paciente/paciente-registrar/paciente-registrar';
import { CitaListado } from './pages/cita/cita-listado/cita-listado';
import { CitaRegistrar } from './pages/cita/cita-registrar/cita-registrar';
import { CitaInformacion } from './pages/cita/cita-informacion/cita-informacion';
import { Configuration } from './pages/configuration/configuration';
import { MedicoActualizar } from './pages/medico/medico-actualizar/medico-actualizar';
import { PacienteActualizar } from './pages/paciente/paciente-actualizar/paciente-actualizar';
import { CitaActualizar } from './pages/cita/cita-actualizar/cita-actualizar';
import { HistorialMedicoListado } from './pages/historial-medico/historial-medico-listado/historial-medico-listado';
import { CitaListadoPaciente } from './pages/cita/cita-listado-paciente/cita-listado-paciente';


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
    },
     
    { 
        path: 'historial-medico', canActivate: [RoleGuard],
        data: { roles: ['PACIENTE'] },
        children: [
        { path: '', component: HistorialMedicoListado }
        ]
    },
    {
        path: 'cita-paciente', canActivate: [RoleGuard],
        data: { roles: ['PACIENTE'] },
        children: [
        { path: '', component: CitaListadoPaciente }
        ]
    }
    ,
    {
        path: 'medicos',
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] },
        children: [
        { path: '', component: MedicoListado },
        { path: 'registrar', component: MedicoRegistrar},
        { path: 'actualizar/:id', component: MedicoActualizar},
        { path: ':id', component: MedicoInformacion }
        
        ]
    },
    {
        path: 'pacientes',
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] },
        children: [
        { path: '', component: PacienteListado },
        { path: 'registrar', component: PacienteRegistrar},
        { path: 'actualizar/:id', component: PacienteActualizar},
        { path: ':id', component: PacienteInformacion }
        
        ]
    },
   {
    path: 'citas',
    children: [

        { 
        path: '',
        component: CitaListado,
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] }
        },

        { 
        path: 'registrar',
        component: CitaRegistrar,
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] }
        },

        { 
        path: 'actualizar/:id',
        component: CitaActualizar,
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR'] }
        },

        { 
        path: ':id',
        component: CitaInformacion,
        canActivate: [RoleGuard],
        data: { roles: ['ADMINISTRADOR', 'PACIENTE'] } 
        }

        ]
    },
    {
        path: 'configuracion', canActivate: [RoleGuard], component: Configuration,
        data: { roles: ['ADMINISTRADOR'] } 
    }
    
    
];

