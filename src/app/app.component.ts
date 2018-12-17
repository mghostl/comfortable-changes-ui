import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  from: string;
  to: string;

  public setFrom(from: string) {
    this.from = from;
    this.to = null;
  }

  public setTo(to: string) {
    this.to = to;
  }
}
