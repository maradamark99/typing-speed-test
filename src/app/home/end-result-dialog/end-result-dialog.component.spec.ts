import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndResultDialogComponent } from './end-result-dialog.component';

describe('EndResultDialogComponent', () => {
  let component: EndResultDialogComponent;
  let fixture: ComponentFixture<EndResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndResultDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
