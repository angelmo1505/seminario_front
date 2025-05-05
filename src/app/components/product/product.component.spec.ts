import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productServiceStub: any;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll', 'getById', 'getProductsByCategory']);

    await TestBed.configureTestingModule({
      imports: [
        ProductComponent,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllProducts on ngOnInit', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    productServiceSpy.getAll.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productServiceSpy.getAll).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  it('getAllProducts should populate the products array', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    productServiceSpy.getAll.and.returnValue(of(mockProducts));

    component.getAllProducts();

    expect(component.products).toEqual(mockProducts);
  });

  it('findProduct should call getById and populate products if product exists', () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    productServiceSpy.getById.and.returnValue(of(mockProduct));

    component.findProduct(1);

    expect(productServiceSpy.getById).toHaveBeenCalledWith(1);
    expect(component.products).toEqual([mockProduct]);
  });

  it('findProduct should call getById and clear products if product does not exist', () => {
    productServiceSpy.getById.and.returnValue(of(null));

    component.findProduct(1);

    expect(productServiceSpy.getById).toHaveBeenCalledWith(1);
    expect(component.products).toEqual([]);
  });

  it('findByCategory should call getProductsByCategory and populate products', () => {
    const mockProducts = [{ id: 1, name: 'Product 1', category: 'Electronics' }];
    productServiceSpy.getProductsByCategory.and.returnValue(of(mockProducts));

    component.findByCategory('Electronics');

    expect(productServiceSpy.getProductsByCategory).toHaveBeenCalledWith('Electronics');
    expect(component.products).toEqual(mockProducts);
  });

  it('findByCategory should not call getProductsByCategory if category is empty', () => {
    component.findByCategory('');
    expect(productServiceSpy.getProductsByCategory).not.toHaveBeenCalled();
    expect(component.products).toEqual([]);
  });

  it('findProduct should not call getById if id is not provided', () => {
    component.findProduct(null!);
    expect(productServiceSpy.getById).not.toHaveBeenCalled();
    expect(component.products).toEqual([]);
  });
});