import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedAlbumsComponent } from './added-albums.component';

describe('AddedAlbumsComponent', () => {
  let component: AddedAlbumsComponent;
  let fixture: ComponentFixture<AddedAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedAlbumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
