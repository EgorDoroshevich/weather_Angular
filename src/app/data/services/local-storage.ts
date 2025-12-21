import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  public set(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  public remove(key: string) {
    localStorage.removeItem(key);
  }
  public has(key: string) {
    return localStorage.getItem(key) !== null;
  }
  public clear() {
    localStorage.clear();
  }
}
