import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPillComponent } from './navbar-pill.component';

describe('NavbarPillComponent', () => {
  let component: NavbarPillComponent;
  let fixture: ComponentFixture<NavbarPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
