import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import { ShopComponent } from './shop.component';
import { MatIconModule } from '@angular/material/icon';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopComponent, MatCardModule, MatIconModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
