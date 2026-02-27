import { Component, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const RoleGuard: CanActivateFn = (route) =>{
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decoded: any = jwtDecode(token);
  const rolUsuario = decoded.rol;

  const rolesPermitidos = route.data?.['roles'];

  if (rolesPermitidos && !rolesPermitidos.includes(rolUsuario)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}
