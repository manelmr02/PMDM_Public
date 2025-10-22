import { Routes } from '@angular/router';
import { Contador } from './contador/contador';
import { Matatopos } from './matatopos/matatopos';
import { Carrera } from './carrera/carrera';
import { PasoParametros } from './paso-parametros/paso-parametros';
import { EyeCandy } from './eye-candy/eye-candy';
import { ListaPersonajes } from './ListaPersonajes/lista-personajes/lista-personajes';
import { FormularioRegistro } from './formulario-registro/formulario-registro';
import { Inicio } from './inicio/inicio';
import { TableroKanban } from './tablero-kanban/tablero-kanban';

export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'contador/:esHalloween', component: Contador},
    {path: 'matatopos/:esHalloween', component: Matatopos},
    {path: 'carrera', component: Carrera},
    {path: 'paso-parametros/:num', component: PasoParametros},
    {path:'eye-candy/:esHalloween',component:EyeCandy},
    {path: 'lista-personajes/:esHalloween',component: ListaPersonajes},
    {path: 'formulario-registro',component: FormularioRegistro},
    {path: 'tablero-kanban',component: TableroKanban}
];
