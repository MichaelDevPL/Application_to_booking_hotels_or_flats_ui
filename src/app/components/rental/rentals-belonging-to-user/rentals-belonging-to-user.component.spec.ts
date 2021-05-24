import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsBelongingToUserComponent } from './rentals-belonging-to-user.component';

describe('RentalsBelongingToUserComponent', () => {
  let component: RentalsBelongingToUserComponent;
  let fixture: ComponentFixture<RentalsBelongingToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalsBelongingToUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsBelongingToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
