import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignRolesComponent } from './campaign-roles/campaign-roles.component';
import { CampaignTeamComponent } from './campaign-team.component';

const routes: Routes = [
  {
    path:'',
    component:CampaignTeamComponent,
    children: [
      { path: '', redirectTo: 'roles', pathMatch: 'full' },
      {
        path:'roles',
        component:CampaignRolesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignTeamRoutingModule { }
