import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customers.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://3.133.150.117:9525/api'; // Asegúrate de que esta sea la URL base correcta

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Asegura que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all customers', () => {
    const mockCustomers = [{ id: 1, firstName: 'John' }, { id: 2, firstName: 'Jane' }];
    service.getAll().subscribe(customers => {
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/customers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should retrieve a customer by ID', () => {
    const mockCustomer = { id: 1, firstName: 'John' };
    const customerId = 1;
    service.getById(customerId).subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/customers/${customerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });

  it('should create a new customer', () => {
    const newCustomer = { firstName: 'Peter', lastName: 'Pan' };
    const mockResponse = { id: 3, ...newCustomer };
    service.create(newCustomer).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/customers/save`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCustomer);
    req.flush(mockResponse);
  });

  it('should update an existing customer', () => {
    const customerId = 1;
    const updatedCustomer = { id: 1, firstName: 'Updated John' };
    service.update(customerId, updatedCustomer).subscribe(response => {
      expect(response).toEqual(updatedCustomer);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/customers/${customerId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCustomer);
    req.flush(updatedCustomer);
  });

  it('should search inventory with a query', () => {
    const query = 'test';
    const mockResults = [{ id: 101, name: 'Test Item' }];
    service.search(query).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/inventory/search?searchTerm=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });

  it('should search customers by name', () => {
    const name = 'John';
    const mockResults = [{ id: 1, firstName: 'John Doe' }];
    service.searchByName(name).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/searchName?name=${name}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });
});