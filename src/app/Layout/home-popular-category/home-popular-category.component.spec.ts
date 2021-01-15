import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePopularCategoryComponent } from './home-popular-category.component';

describe('HomePopularCategoryComponent', () => {
  let component: HomePopularCategoryComponent;
  let fixture: ComponentFixture<HomePopularCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePopularCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePopularCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
