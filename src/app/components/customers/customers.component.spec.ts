import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CustomersComponent } from './customers.component';
import { CustomerService } from '../../services/customers.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customerServiceStub:any;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  
  beforeEach(async () => {

    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['create', 'update', 'getById']);

    customerServiceStub = {
      getAll() {
          return of([])
      },
      create(customer: any) {
          return of({})
      },
      update(id: any, customer: any) {
          return of({})
      },
      getById(id: any) {
          return of({})
      },
    }

    await TestBed.configureTestingModule({
      imports: [
        CustomersComponent,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule 
      ],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: CustomerService, useValue: customerServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a customer', () => {
    const spy = spyOn(customerServiceStub, 'create').and.callThrough();
    component.createCustomer(1, '12345678', 'DNI', 'Juan', 'Pérez', 'juan@mail.com', '987654321', 'Av Siempre Viva', 'Springfield');
    expect(spy).toHaveBeenCalled();
  });

  it('should update a customer', () => {
    const spy = spyOn(customerServiceStub, 'update').and.callThrough();
    component.updateCustomer(1, '12345678', 'DNI', 'Juan', 'Pérez', 'juan@mail.com', '987654321', 'Av Siempre Viva', 'Springfield');
    expect(spy).toHaveBeenCalled();
  });
  
  it('should find a customer by id when id is valid', () => {
    const spy = spyOn(customerServiceStub, 'getById').and.callThrough();
    component.findCustomer(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call loadCustomers when id is invalid', () => {
    const spy = spyOn(component, 'loadCustomers').and.callThrough();
    component.findCustomer(NaN);
    expect(spy).toHaveBeenCalled();
  });

  it('should return true for invalid values in isInvalid', () => {
    expect(component.isInvalid(NaN)).toBeTrue();
    expect(component.isInvalid(null)).toBeTrue();
    expect(component.isInvalid(undefined)).toBeTrue();
  });
  
  it('should return false for valid values in isInvalid', () => {
    expect(component.isInvalid(1)).toBeFalse();
    expect(component.isInvalid(0)).toBeFalse();
  });  
});