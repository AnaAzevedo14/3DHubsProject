import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';

/**
 * Description
 * This component is where the guessed word is displayes
 * On each correct try the correct letter is updated
 *
 * Inputs - word: string
 */
@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
  inputs: ["word"]
})
export class WordComponent implements OnChanges {

  /**
   * Word to display
   */
  public word:  Array<string>;

  constructor() { }

  /**
   * Component OnChanges
   * Update word on change
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.word) {
      this.word = changes.word.currentValue;
    }
  }

}
