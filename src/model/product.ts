import { ProductCategory } from "../enums/general-enums";

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: ProductCategory;
    provider?: string;
}


