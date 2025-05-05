import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://3.133.150.117:9525/api'; // Asegúrate de que esta sea la URL base correcta

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });
    service = TestBed.inject(InventoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Asegura que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all inventory items', () => {
    const mockInventory = [{ id: 1, productId: 101, quantity: 5 }, { id: 2, productId: 102, quantity: 10 }];
    service.getAll().subscribe(inventory => {
      expect(inventory).toEqual(mockInventory);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/inventory`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInventory);
  });

  it('should retrieve an inventory item by ID', () => {
    const mockItem = { id: 1, productId: 101, quantity: 5 };
    const itemId = 1;
    service.getById(itemId).subscribe(item => {
      expect(item).toEqual(mockItem);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/inventory/${itemId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

  it('should create a new inventory item', () => {
    const newItem = { productId: 201, quantity: 2 };
    const mockResponse = { id: 3, ...newItem };
    service.create(newItem).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/inventory`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newItem);
    req.flush(mockResponse);
  });

  it('should update an existing inventory item', () => {
    const itemId = 1;
    const updatedItem = { id: 1, productId: 202, quantity: 7 };
    service.update(itemId, updatedItem).subscribe(response => {
      expect(response).toEqual(updatedItem);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/inventory/${itemId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedItem);
    req.flush(updatedItem);
  });

  it('should search inventory items with a query', () => {
    const query = 'widget';
    const mockResults = [{ id: 11, name: 'Super Widget' }];
    service.search(query).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/inventory/search?searchTerm=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });

  it('should search inventory items by name', () => {
    const name = 'Gear';
    const mockResults = [{ id: 22, name: 'Metal Gear' }];
    service.searchByName(name).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/searchName?name=${name}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });
});