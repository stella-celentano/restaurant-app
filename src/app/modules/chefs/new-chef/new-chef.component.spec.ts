import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChefComponent } from './new-chef.component';

describe('NewChefComponent', () => {
  let component: NewChefComponent;
  let fixture: ComponentFixture<NewChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
