import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Mode {
  private modeSubject = new BehaviorSubject<string>(
    localStorage.getItem('app-theme') || 'normal'
  );
  mode$ = this.modeSubject.asObservable();

 constructor() {
    const current = this.modeSubject.value;
    document.body.setAttribute('data-theme', current);
  }

  setMode(mode: string) {
    this.modeSubject.next(mode);
    document.body.setAttribute('data-theme', mode);
    localStorage.setItem('app-theme', mode);
  }

  get currentMode() {
    return this.modeSubject.value;
  }
}

