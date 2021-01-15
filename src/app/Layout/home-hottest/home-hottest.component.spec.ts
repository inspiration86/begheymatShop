import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHottestComponent } from './home-hottest.component';

describe('HomeHottestComponent', () => {
  let component: HomeHottestComponent;
  let fixture: ComponentFixture<HomeHottestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHottestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHottestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
