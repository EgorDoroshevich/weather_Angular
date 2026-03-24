import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {}
