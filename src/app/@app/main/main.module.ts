import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { LandingRoutingModule, COMPONENTS } from './main-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    ...COMPONENTS,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ThemeModule,
    SharedModule,
  ],
  providers: [],
})
export class MainModule { }
