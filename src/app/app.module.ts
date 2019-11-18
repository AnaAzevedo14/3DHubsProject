import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HangmanComponent } from './hangman/hangman.component';
import { WordComponent } from './word/word.component';
import { UtilsService } from './utils.service'

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HangmanComponent,
    WordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
