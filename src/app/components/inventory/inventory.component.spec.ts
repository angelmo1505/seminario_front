import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InventoryService } from '../../services/inventory.service';
import { of } from 'rxjs';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryServiceStub: any;
  let inventoryServiceSpy: jasmine.SpyObj<InventoryService>;
  
  beforeEach(async () => {

    inventoryServiceSpy = jasmine.createSpyObj('CustomerService', ['create', 'update', 'getById']);

    inventoryServiceStub = {
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
      search(value: string) {
        return of([{ id: 1, name: 'Producto de prueba' }]);
      }
    }
    await TestBed.configureTestingModule({
      imports: [
        InventoryComponent,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule 
      ],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: InventoryService, useValue: inventoryServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a inventoy', () => {
    const spy = spyOn(inventoryServiceStub, 'create').and.callThrough();
    component.createInventory(1, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('should update a inventoy', () => {
    const spy = spyOn(inventoryServiceStub, 'update').and.callThrough();
    component.updateInventory(1, 123, 123);
    expect(spy).toHaveBeenCalled();
  });
  
  it('should find a inventory by id when id is valid', () => {
    const spy = spyOn(inventoryServiceStub, 'getById').and.callThrough();
    component.findInventary(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call the search method of the service and update inventories', () => {
    const searchTerm = 'prueba';
    const mockInventories = [{ id: 1, name: 'Producto de prueba' }];
    const searchSpy = spyOn(inventoryServiceStub, 'search').and.returnValue(of(mockInventories)); // Espía y simula el retorno

    component.searchInventory(searchTerm);

    expect(searchSpy).toHaveBeenCalledWith(searchTerm);
    expect(component.inventories).toEqual(mockInventories);
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
