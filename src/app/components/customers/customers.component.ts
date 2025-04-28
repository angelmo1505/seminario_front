import { Component } from '@angular/core';
import { CustomerService } from '../../services/customers.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
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

  findCustomer(id: any): void {
    if (!this.isInvalid(id)) {
      this.customerService.getById(id).subscribe({
        next: (resp) => {
          this.customers = [resp];
        },
        error: (error) => console.error(error)
      });
    } else {
      this.loadCustomers();
    }
  }

  isInvalid(value: number): boolean {
    return isNaN(value) || value === null || value === undefined;
  }
}
