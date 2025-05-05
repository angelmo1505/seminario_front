import { Component } from '@angular/core';
import { CustomerService } from '../../services/customers.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  customers: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
    });
  }

  createCustomer(
    id: number,
    documentNumber: string,
    documentType: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    city: string
  ) {
    const newcustomer = { 
      id,
      documentNumber,
      documentType,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city
    };
    this.customerService.create(newcustomer).subscribe(() => this.loadCustomers());
  }

  updateCustomer(
    id: number,
    documentNumber: string,
    documentType: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    city: string
  ) {
    const updateCustomer: any = { 
      id, 
      documentNumber, 
      documentType, 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      address, 
      city 
    };
    this.customerService.update(id, updateCustomer).subscribe({
      next: () => this.loadCustomers(),
      error: (error) => console.log()
    });
  }

  findCustomer(id: any){
    if (!this.isInvalid(id) ) {
      this.customerService.getById(id).subscribe({
        next: (resp) => {
          this.customers = [resp]; 
        },
        error: (error) => console.log()
      })
    }else{
      this.loadCustomers();
    }
  }

  isInvalid(value: number | null | undefined): boolean {
    return isNaN(value as number) || value === null || value === undefined;
  }
}
