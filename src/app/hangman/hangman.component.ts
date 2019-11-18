import { Component, ViewChild, ElementRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';

/**
 * Description
 * This component is where the gallows and hangman is drawn
 * On each try a new body part is drawn
 * 
 * Inputs - tries: number
 */
@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css'],
  inputs: ["tries"]
})
export class HangmanComponent implements OnInit, OnChanges {

   /**
   * Game tries input
   */
  public tries: number;

  /**
   * Gallows canvas element ref
   */
  @ViewChild('gallows')
  private _gallows: ElementRef;

    /**
   * Hangman canvas element ref
   */
  @ViewChild('hangman')
  private _hangman: ElementRef;

  /**
   * Gallos canvas HTML element
   */
  private _canvasGallows: HTMLCanvasElement;

    /**
   * Gallos canvas HTML element
   */
  public _canvasHangman: HTMLCanvasElement;

  /**
   * Gallows canvas height
   */
  private canvasHeight: number = 400;

  /**
   * Gallows canvas width
   */
  private canvasWidth: number = 600;

  constructor() {
  }

  /**
   * Component OnChanges
   * If input tries changes update body
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tries) {
      this.tries = changes.tries.currentValue;
      this.drawBody(this.tries);
    }
  }

  /**
   * Component OnInit
   * Init gallows canvas with dimensions and actual draw
   */
  public ngOnInit() {
    let context: CanvasRenderingContext2D;
    if (this._gallows) {
      const canvasGallows = this._gallows.nativeElement;
      context = canvasGallows.getContext('2d');
      if (canvasGallows) {
          canvasGallows.height = this.canvasHeight;
          canvasGallows.width  = this.canvasWidth;
      }
      this.drawGallows(context);
    }
  }

  private drawGallows(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      const lineWidth = 3;
      // fixed values on draw
      ctx.lineWidth = lineWidth ;
      ctx.strokeStyle = "black";

      ctx.beginPath() ;

      // Base - across the width
      ctx.moveTo(0, 400) ;
      ctx.lineTo(600, 400);
      ctx.stroke() ;

      // Pilar - full height
      ctx.moveTo(20, 400) ;
      ctx.lineTo(20, 0);
      ctx.stroke() ;

      // Top Bar - to the middle
      ctx.moveTo(20, 0) ;
      ctx.lineTo(300, 0);
      ctx.stroke();

      // Noose
      ctx.moveTo(300, 0) ;
      ctx.lineTo(300, 60);
      ctx.stroke();
    }
  }

  /**
   * Draw hangman body on every try
   * Clear canvas on each function call
   * @param tries
   */
  private drawBody(tries: number) : void {

    const canvasHangman = this._hangman.nativeElement;
    if (canvasHangman) {
      const context = canvasHangman.getContext('2d');

      // Clear everything before new draw
      context.clearRect(0, 0, canvasHangman.width, canvasHangman.height);

      // Const values to draw pieces
      context.lineWidth = 3;
      context.strokeStyle = "red";
      // radius of the head
      const radius   = canvasHangman.height / 12;
      // diameter to calculate legs and arms rotation
      const diameter = canvasHangman.height / 6;
      // center of the body and head
      const bodyCenterX = canvasHangman.width >> 1;
      const headCenterY = radius + diameter;

      // Draw the head on game start
      if (-1 < tries) {
        context.beginPath() ;
        context.arc(bodyCenterX, headCenterY, radius, 0, 2 * Math.PI, false) ;
        context.stroke();
      }

      // Draw the torso
      if (0 < tries) {
        context.beginPath() ;
        context.moveTo(bodyCenterX, diameter << 1);
        context.lineTo(bodyCenterX, diameter << 2);
      }

      // Draw a leg.
      if (1 < tries) {
        context.lineTo(bodyCenterX + diameter, diameter * 5);
      }

      // Draw a leg
      if (2 < tries) {
        context.moveTo(bodyCenterX, diameter << 2);
        context.lineTo(bodyCenterX - diameter, diameter * 5);
      }

      // Draw an arm.
      if (3 < tries) {
        context.moveTo(bodyCenterX, diameter * 2.5);
        context.lineTo(bodyCenterX + radius * 2, diameter << 1);
      }

      // Draw an arm.
      if (4 < tries) {
        context.moveTo(bodyCenterX, diameter * 2.5);
        context.lineTo(bodyCenterX - radius * 2, diameter << 1);
      }

      context.stroke();
    }
  }

}
