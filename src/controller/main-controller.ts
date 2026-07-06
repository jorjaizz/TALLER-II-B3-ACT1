import PromptSync from "prompt-sync";
import { ProductController } from "./product-controller";
import { ClientController } from "./client-controller";

const prompt = PromptSync();

export class MainController {
    private productController = new ProductController();
    private clientController = new ClientController();

    public init(): void {
        let running = true;

        while (running) {
            console.clear(); 
            console.log("=== MAIN MENU ===");
            console.log("1. Products");
            console.log("2. Clients");
            console.log("3. Exit");
            console.log("======================");

            const option = prompt("Choose an option: ");

            switch (option.trim()) {
                case "1":
                    this.productController.run();
                    break;
                    
                case "2":
                    this.clientController.run();
                    break;
                    
                case "3":
                    console.log("\nExiting system...");
                    running = false; 
                    break;
                    
                default:
                    console.log("\nInvalid option.");
                    break;
            }
        }
    }
}