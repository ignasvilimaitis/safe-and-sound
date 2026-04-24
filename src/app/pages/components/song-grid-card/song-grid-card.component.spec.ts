import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongGridCardComponent } from './song-grid-card.component';

describe('SongGridCardComponent', () => {
  let component: SongGridCardComponent;
  let fixture: ComponentFixture<SongGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongGridCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
