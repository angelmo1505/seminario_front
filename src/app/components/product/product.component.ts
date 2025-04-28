import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }
  
  findProduct(id: number) {
    if (!id) return;
    this.productService.getById(id).subscribe(product => {
      this.products = product ? [product] : [];
    });
  }
  
  findByCategory(category: string) {
    if (!category) return;
    this.productService.getProductsByCategory(category).subscribe(data => {
      this.products = data;
    });
  }
}
