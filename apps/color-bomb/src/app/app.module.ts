import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BinComponent } from './components/bin/bin.component';
import { BombComponent } from './components/bomb/bomb.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, BinComponent, BombComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
