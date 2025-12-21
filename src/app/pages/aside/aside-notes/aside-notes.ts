import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsideCard } from '../../../data/interfaces/aside.interface';
import { LocalStorage } from '../../../data/services/local-storage';

@Component({
  selector: 'app-aside-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    const newNotes: AsideCard = {
      id: Date.now(),
      text: this.inputText,
      date: new Date(),
    };
    if (!this.inputText.trim()) return;
    this.notes.push(newNotes);
    this.saveNotes();
    this.inputText = '';
  }
  trackById(index: number, note: AsideCard) {
    return note.id;
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
