import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPanelComponent } from './signup-panel.component';

describe('SignupPanelComponent', () => {
  let component: SignupPanelComponent;
  let fixture: ComponentFixture<SignupPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
