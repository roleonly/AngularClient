import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent,ExtendDicPremadeComponent,ExtendDicMapComponent,RastertiffComponent ,RasterComponent} from './_components';
import { AuthGuard } from "./_guards";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  
  {
    path : 'home',
    component : HomeComponent,
    //canActivate : [AuthGuard]
  }
,
  {
    path : 'ex_dic_pre',
    component : ExtendDicPremadeComponent,
    canActivate : [AuthGuard]
  }
, {
  path : 'ex_dic_map',
  component : ExtendDicMapComponent,
  canActivate : [AuthGuard]
},
{
  path : 'raster',
  component : RasterComponent,
  canActivate : [AuthGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
