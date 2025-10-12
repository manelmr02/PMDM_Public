import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeCandy } from './eye-candy';

describe('EyeCandy', () => {
  let component: EyeCandy;
  let fixture: ComponentFixture<EyeCandy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeCandy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EyeCandy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
