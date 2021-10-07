import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {
  TreeGridModule,
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  EditService,
  ContextMenu,
  ContextMenuService,
} from '@syncfusion/ej2-angular-treegrid';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TreeGridModule,
    FormsModule,
    DialogModule,
    ContextMenuModule,
    GridAllModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService,
    EditService,
    ContextMenuService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
