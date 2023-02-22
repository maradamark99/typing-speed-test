import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTypingComponent } from './word-typing.component';

describe('WordComponent', () => {
  let component: WordTypingComponent;
  let fixture: ComponentFixture<WordTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordTypingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
