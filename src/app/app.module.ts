import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {HttpClientModule} from '@angular/common/http';
import {BoardCardComponent} from './board-card/board-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
