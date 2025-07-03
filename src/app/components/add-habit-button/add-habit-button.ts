import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { debounce, filter, map, of, timer } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { AddHabitDialog } from '../add-habit-dialog/add-habit-dialog';

@Component({
  selector: 'app-add-habit-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltip],
  templateUrl: './add-habit-button.html',
  styleUrl: './add-habit-button.scss',
})
export class AddHabitButton {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  // why: to show or hide 'add habit button'
  private routeSignal = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects)
    ),
    { initialValue: '/' }
  );

  protected showButton = computed(() => this.routeSignal() === '/');

  // conditionally rendering so there is no
  // animation of disabled button sliding out
  // during window resizing/refreshing
  protected renderButton = toSignal(
    toObservable(this.showButton).pipe(
      debounce((v) => (v ? of({}) : timer(550)))
    ),
    { initialValue: true }
  );

  openAddHabitDialog() {
    // Removing focus from button after click
    // To prevent "Blocked aria-hidden ..." warning
    (document.activeElement as HTMLElement).blur();

    this.dialog.open(AddHabitDialog, {
      maxWidth: '800px',
    });
  }
}
