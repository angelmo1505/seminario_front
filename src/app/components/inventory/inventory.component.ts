import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  inventories: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getAll().subscribe(data => {
      this.inventories = data;
    });
  }

  createInventory(quantity: number, productId: number): void {
    const newItem = { quantity, productId };
    this.inventoryService.create(newItem).subscribe(() => this.loadInventories());
  }

  updateInventory(id: number, quantity: number, productId: number): void {
    const updatedItem: any = { productId, quantity };
    this.inventoryService.update(id, updatedItem).subscribe({
      next: () => this.loadInventories(),
      error: (error) => console.log()
    });
  }

  searchInventory(value: string): void {
    this.inventoryService.search(value).subscribe(data => {
      this.inventories = data;
    });
  }

  findInventary(id: any){
    if (!this.isInvalid(id) ) {
      this.inventoryService.getById(id).subscribe({
        next: (resp) => {
          this.inventories = [resp]; 
        },
        error: (error) => console.log()
      })
    }else{
      this.loadInventories();
    }
  }

  isInvalid(value: number | null | undefined): boolean {
    return isNaN(value as number) || value === null || value === undefined;
  }
}
