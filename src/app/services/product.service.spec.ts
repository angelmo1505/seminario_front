import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://3.133.150.117:9525/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should perform a GET request to /products and return an array of products', () => {
    const mockProducts = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }];

    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('getById should perform a GET request to /products/:id and return a single product', () => {
    const mockProduct = { id: 1, name: 'Product A' };
    const productId = 1;

    service.getById(productId).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/products/${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });

  it('getProductsByCategory should perform a GET request to /products/category/:category and return an array of products', () => {
    const mockProducts = [{ id: 1, name: 'Product A', category: 'Electronics' }];
    const category = 'Electronics';

    service.getProductsByCategory(category).subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/products/category/${category}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});