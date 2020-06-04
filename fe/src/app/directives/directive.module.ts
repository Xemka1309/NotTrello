import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentEditableModelDirective} from './ContentEditableModelDirective';

@NgModule({
  declarations: [ContentEditableModelDirective],
  imports: [
    CommonModule
  ],
  entryComponents: [],
  exports: [
    ContentEditableModelDirective
  ],
  providers: [],
})
export class DirectiveModule {}
