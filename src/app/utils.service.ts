import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Description
 * This service is used as an utils class
 */
@Injectable()
export class UtilsService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get the page base URL
   */
  private baseUrl(): string {
    const re = new RegExp(/^.*\//);
    return re.exec(window.location.href)[0];
  }

  /**
   * Get all words from file
   */
  public getWords(): Observable<string[]> {
    const url = this.baseUrl();
    return this.http.get(url + 'assets/words.txt', { responseType: 'text' })
      .pipe(
        map(text => text.split('\n')),
      )
  }
}
