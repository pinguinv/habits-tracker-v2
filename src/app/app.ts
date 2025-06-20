import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [RouterModule, MatTabsModule, MatButtonModule, MatIcon],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private router = inject(Router);

  // why: to show or hide 'add habit button'
  protected routeSignal = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects)
    )
  );

  protected showButton = computed(() => this.routeSignal() === '/');

  ngOnInit(): void {
    // remove preload class with plain JS
    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 500);
  }
}
