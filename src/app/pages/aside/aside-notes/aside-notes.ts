import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalStorage } from '../../../data/services/local-storage';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsideCard } from '../../../data/interfaces/interface';

@Component({
  selector: 'app-aside-notes',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './aside-notes.html',
  styleUrl: './aside-notes.scss',
})
export class AsideNotes implements OnInit {
  private localStorage = inject(LocalStorage);
  notes: AsideCard[] = [];
  inputText: string = '';

  ngOnInit(): void {
    this.loadNotes();
  }

  addNote() {
    const Card: AsideCard = {
      id: Date.now(),
      text: this.inputText,
      date: new Date(),
    };
    if (!this.inputText.trim()) return;
    this.notes.push(Card);
    this.saveNotes();
    this.inputText = '';
  }

  removeNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
  }
  saveNotes(): void {
    this.localStorage.set('notes', this.notes);
  }
  loadNotes(): void {
    const savedNotes = this.localStorage.get('notes');
    if (savedNotes) {
      this.notes = savedNotes;
    }
  }
}
