import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RtlDirective } from './directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { DataPropertyGetterPipe } from './components/custom-table/pipe/data-property-getter.pipe';
import { ClickOutsideDirective } from './components/custom-table/directive/clickOutside.directive';
import { ClickStopPropagationDirective } from './components/custom-table/directive/clickStopPropagation';
import { CustomColumnModalComponent } from './components/custom-table/custom-column-modal/custom-column-modal.component';
import { ReusableComponentsModule } from 'realsoft-reusable-components';

@NgModule({
  declarations: [
    RtlDirective,
    CustomTableComponent,
    DataPropertyGetterPipe,
    CustomColumnModalComponent,
    ClickOutsideDirective,
    ClickStopPropagationDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ReusableComponentsModule,
  ],
  exports: [
    MaterialModule,
    RouterModule,
    TranslateModule,
    RtlDirective,
    FormsModule,
    ReactiveFormsModule,
    CustomTableComponent,
    CustomColumnModalComponent,
    ReusableComponentsModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
