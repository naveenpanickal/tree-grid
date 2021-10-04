import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  TreeGridModule,
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
} from '@syncfusion/ej2-angular-treegrid';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeGridModule, FormsModule],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
