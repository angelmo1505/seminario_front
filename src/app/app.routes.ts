import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductComponent } from './components/product/product.component';
import { SalesComponent } from './components/sales/sales.component';
import { CustomersComponent } from './components/customers/customers.component';

export const routes: Routes = [
    { path: '', component: InventoryComponent},
    { path: 'inventory', component: InventoryComponent},
    { path: 'product', component: ProductComponent},
    { path: 'sales', component: SalesComponent},
    { path: 'customers', component: CustomersComponent},
];
