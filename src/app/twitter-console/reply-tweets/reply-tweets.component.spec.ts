import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyTweetsComponent } from './reply-tweets.component';

describe('ReplyTweetsComponent', () => {
  let component: ReplyTweetsComponent;
  let fixture: ComponentFixture<ReplyTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
