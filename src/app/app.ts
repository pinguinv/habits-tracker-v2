import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterModule, MatTabsModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
