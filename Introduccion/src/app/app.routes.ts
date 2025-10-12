import { Routes } from '@angular/router';
import { Contador } from './contador/contador';
import { Matatopos } from './matatopos/matatopos';
import { Carrera } from './carrera/carrera';
import { PasoParametros } from './paso-parametros/paso-parametros';
import { EyeCandy } from './eye-candy/eye-candy';
import { ListaPersonajes } from './ListaPersonajes/lista-personajes/lista-personajes';

export const routes: Routes = [
    {path: 'contador', component: Contador},
    {path: 'matatopos', component: Matatopos},
    {path: 'carrera', component: Carrera},
    {path: 'paso-parametros/:num', component: PasoParametros},
    {path:'eye-candy',component:EyeCandy},
    {path: 'lista-personajes',component: ListaPersonajes}
];
