import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPlaylistsComponent } from './latest-playlists.component';

describe('LatestPlaylistsComponent', () => {
  let component: LatestPlaylistsComponent;
  let fixture: ComponentFixture<LatestPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
