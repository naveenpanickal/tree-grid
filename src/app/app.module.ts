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
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeGridModule, FormsModule,provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),],
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
