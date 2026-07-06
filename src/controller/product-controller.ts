import PromptSync from "prompt-sync";
import { ProductService } from "../service/product-service";
import { Product } from "../model/product";

const prompt = PromptSync();

export class ProductController {

    private productService = new ProductService();

    public run(): void {
        let running = true;

        while (running) {
            console.clear();
            console.log("=== PRODUCTS MENU ===");
            this.displayProducts(this.productService.getAll());
            console.log("1. Add");
            console.log("2. Update");
            console.log("3. Delete");
            console.log("4. Exit");
            console.log("======================");

            const option = prompt("Choose an option: ");

            switch (option.trim()) {
                case "1":
                    this.addProductOption();
                    break;

                case "2":
                    this.updateProductOption();
                    break;

                case "3":
                    this.deleteProductOption();
                    break;

                case "4":
                    console.log("\nReturning to Main Menu...");
                    running = false;
                    break;

                default:
                    console.log("\nInvalid option.");
                    prompt("Press Enter to try again...");
                    break;
            }
        }
    }

    private displayProducts(products: Product[]): void {
        if (products.length === 0) {
            console.log("\nNo products found.");
            console.log("--------------------\n");
            return;
        }

        console.log("\n--- Products List ---");
        products.forEach(product => {
            let info = `[ID: ${product.id}] Name: ${product.name} | Price: $${product.price.toFixed(2)} | Stock: ${product.stock} | Category: ${product.category}`;

            if (product.provider) {
                info += ` | Provider: ${product.provider}`;
            }

            console.log(info);
        });
        console.log("--------------------\n");
    }

    private addProductOption(): void {
        console.log("\n--- Add New Product ---");

        const name = prompt("Enter product name: ").trim();

        const priceInput = prompt("Enter product price: ").trim();
        const price = parseFloat(priceInput);

        const stockInput = prompt("Enter product stock: ").trim();
        const stock = parseInt(stockInput);

        console.log("Product Categories available: Technology, Clothing, Health, Appliances");
        const categoryInput = prompt("Enter product category: ").trim();

        const providerInput = prompt("Enter product provider (Press Enter to skip): ").trim();

        const baseProduct: any = {
            name,
            price,
            stock,
            category: categoryInput as any
        };

        if (providerInput.length > 0) {
            baseProduct.provider = providerInput;
        }

        const result = this.productService.create(baseProduct);

        if (Array.isArray(result)) {
            console.log("\nValidation Errors:");
            result.forEach(err => console.log(`- ${err}`));
        } else {
            console.log(`\nProduct created successfully with id: ${result.id}`);
        }

        prompt("\nPress Enter to continue...");
    }

    private updateProductOption(): void {
        console.log("\n--- Update Product ---");

        const idInput = prompt("Enter the ID of the product to update: ").trim();
        const id = parseInt(idInput);

        if (isNaN(id)) {
            console.log("\nInvalid ID format. It must be a number.")
            prompt("\nPress Enter to continue...");
            return;
        }

        const name = prompt("Enter new product name: ").trim();

        const priceInput = prompt("Enter new product price: ").trim()
        const price = parseFloat(priceInput);

        const stockInput = prompt("Enter new product stock: ").trim();
        const stock = parseInt(stockInput);

        console.log("Product Categories available: Technology, Clothing, Health, Appliances");
        const categoryInput = prompt("Enter new product category: ").trim();

        const providerInput = prompt("Enter new product provider (Press Enter to skip): ").trim();

        const updatedData: any = {
            name,
            price,
            stock,
            category: categoryInput as any
        };

        if (providerInput.length > 0) {
            updatedData.provider = providerInput;
        }

        const result = this.productService.update(id, updatedData);

        if (result === null) {
            console.log(`\nError: Product with id ${id} was not found.`);
        } else if (Array.isArray(result)) {
            console.log("\nValidation Errors:")
            result.forEach(err => console.log(`- ${err}`));
        } else {
            console.log(`\nProduct with id ${id} updated successfully.`);
        }

        prompt("\nPress Enter to continue...");
    }

    private deleteProductOption(): void {
        console.log("\n--- Delete Product ---")

        const idInput = prompt("Enter the ID of the product to delete: ").trim();
        const id = parseInt(idInput);

        if (isNaN(id)) {
            console.log("\nInvalid ID format. Must be a number.");
            prompt("\nPress Enter to continue...");
            return;
        }

        const deletedId = this.productService.delete(id);

        if (deletedId === 0) {
            console.log(`\nError: Product with id ${id} was not found.`);
        } else {
            console.log(`\nProduct with id ${deletedId} has been successfully deleted.`);
        }

        prompt("\nPress Enter to continue...");
    }
}