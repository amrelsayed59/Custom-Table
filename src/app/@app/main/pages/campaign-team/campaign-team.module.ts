import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignTeamRoutingModule } from './campaign-team-routing.module';
import { CampaignTeamComponent } from './campaign-team.component';
import { CampaignRolesComponent } from './campaign-roles/campaign-roles.component';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';

@NgModule({
  declarations: [
    CampaignTeamComponent,
    CampaignRolesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThemeModule,
    CampaignTeamRoutingModule
  ],
})
export class CampaignTeamModule { }
