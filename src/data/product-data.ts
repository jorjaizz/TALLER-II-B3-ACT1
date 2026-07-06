import { Product } from "../model/product";
import { ProductCategory } from "../enums/general-enums";

export const initialProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 67.99,
        stock: 25,
        category: ProductCategory.TECHNOLOGY,
        provider: "Sony Logistics"
    },
    {
        id: 2,
        name: "Oversized Hoodie",
        price: 45.67,
        stock: 2,
        category: ProductCategory.CLOTHING,
        provider: "Textiles del Norte de Spazio jeje"
    },
    {
        id: 3,
        name: "Multivitamin Pack",
        price: 19.50,
        stock: 100,
        category: ProductCategory.HEALTH
    },
    {
        id: 4,
        name: "Digital Blender",
        price: 120.00,
        stock: 12,
        category: ProductCategory.APPLIANCES,
        provider: "Tuffini Kitchen"
    }
];