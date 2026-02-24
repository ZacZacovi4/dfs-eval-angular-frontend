import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dfs-eval-angular-frontend');
  private api = inject(ApiService);

  testBackend() {
    this.api.test().subscribe((res) => console.log(res));
  }
}
