import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialougComponent } from './dialoug.component';

describe('DialougComponent', () => {
  let component: DialougComponent;
  let fixture: ComponentFixture<DialougComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialougComponent]
    });
    fixture = TestBed.createComponent(DialougComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
