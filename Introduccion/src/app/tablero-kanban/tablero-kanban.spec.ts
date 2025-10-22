import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroKanban } from './tablero-kanban';

describe('TableroKanban', () => {
  let component: TableroKanban;
  let fixture: ComponentFixture<TableroKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroKanban]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroKanban);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
