import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddHabitDialog } from './components/add-habit-dialog/add-habit-dialog';

@Component({
  imports: [
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatIcon,
    MatDialogModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  // why: to show or hide 'add habit button'
  private routeSignal = toSignal(
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

  openAddHabitDialog() {
    // const dialogRef = this.dialog.open(AddHabitDialog);
    this.dialog.open(AddHabitDialog, {
      maxWidth: '800px',
    });
  }
}
