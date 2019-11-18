import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../utils.service";


/**
 * Description
 * This component is the game main component
 * It is used to display the game information and the keyboard to play the game
 *
 * Imports UtilsService - Used to get the text information
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [UtilsService],

})
export class GameComponent implements OnInit {

  /**
   * Store selected letters.
   * Set of strings because it can't repeat the same letter
   */
  private _selectedLetters: Set<string> = new Set<string>();

  /**
   * Selected word
   */
  private _word: string = null;

  /**
   * Numbers row of keys - 1 to 0
   */
  private _numbersRow: Array<string> = '1234567890'.split('');

  /**
   * Top row of keys - Q to P
   */
  private _topLetterQtoP: Array<string> = 'QWERTYUIOP'.split('');

  /**
   * Middle row of keys - A to L
   */
  private _middleLetterAtoL: Array<string> = 'ASDFGHJKL'.split('');

  /**
   * Bottom row of keys - Z to M
   */
  private _bottomLetterZtoM: Array<string> = 'ZXCVBNM'.split('');

  /**
   * Array of all keys order by numbers, top to bottom
   */
  public letters: Array<Array<string>> = [this._numbersRow, this._topLetterQtoP, this._middleLetterAtoL, this._bottomLetterZtoM];

  /**
   * Guess state word
   */
  public guessedWord: Array<string> = null;

  /**
   * Current number of tries
   */
  public tries: number = 0;

  /**
   * Flag indicationg the game has started
   */
  public gameStarted: boolean = false;

  /**
   * Flag indicating the game finished
   */
  public gameFinish: boolean = false;

  /**
   * Result message
   */
  public result: string = null;

  /**
   * Game time counter
   */
  private _timeLeft: number = 500;

  /**
   * Interval timer
   */
  private _interval;


  constructor(private utils: UtilsService) { }

  ngOnInit() {

  }

  /**
   * New Game method, calls the UtilsService to return the possible words
   * Selects a radom word from the list returned by the service
   */
  private async newGame() {
    await this.utils.getWords().subscribe(res => this.selectRandomWord(res));
    this.tries = 0;
  }

  /**
   * Select a ramdom word from an array of strings
   * @param words array of words to select random word
   */
  private selectRandomWord(words: Array<string>) {
    let word: string = null;
    if (words && words.length > 0) {
      const position = Math.floor(Math.random() * words.length - 1) + 1;
      word = words[position];
    }
    // Uppercase the word to compare to selected letters
    this._word = word.toUpperCase();
    // Word to be filled on every try and displayed on the word section
    // Replace each letter with _, to begin the game without any letter
    this.guessedWord = word.replace(/[0-9a-zA-Z_]/g, '_').trim().split('');
  }

  /**
   * Timer to keep track of the game time
   * Each time the timer finishes double the time
   */
  private startTimer() {
    this._interval = setInterval(() => {
      if (this._timeLeft > 0) {
        this._timeLeft--;
      } else {
        this._timeLeft = 500 * 2;
      }
    }, 1000)
  }


  /**
   * Verify if the letter is selected
   * @param letter selected leter to verify
   */
  public isLetterSelected(letter: string): boolean {
    return this._selectedLetters.has(letter);
  }

  /**
   * On letter button click event
   * @param letter selected letter
   */
  public onLetterClick(letter: string) {
    this._selectedLetters.add(letter);

    // Check if letter exists in the word
    if (this._word.includes(letter)) {
      this._word.split('').map((x, i) => {
        if (x === letter) {
          // replace _ with the selected letter on the right place
          this.guessedWord[i] = letter;
        }
      })
      // if guessed word equals the actual word, game finish, user wins
      if (this.guessedWord.toString() === this._word.trim().split('').toString()) {
        this.gameFinish = true;
        this.gameStarted = false;
        const score = this._timeLeft
        this.result = "Congratulations!! Your score was " + score + " points";
      }
      // if letter doesn't exist, increase tries counter
    } else {
      this.tries++;
      if (this.tries === 5) {
        this.gameFinish = true;
        this.gameStarted = false;
        this.result = "You Lost!"
      }
    }
  }

  /**
   * On start button click
   * Reset the game, to start a new one
   */
  public onStartClick() {
    this.gameStarted = true;
    this.tries = 0;
    this.startTimer();
    this.newGame();
    this._selectedLetters = new Set<string>();
  }

}
