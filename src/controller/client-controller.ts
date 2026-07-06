import PromptSync from "prompt-sync";
import { ClientService } from "../service/client-service";
import { Client } from "../model/client";

const prompt = PromptSync();

export class ClientController {

    private clientService = new ClientService();

    public run(): void {
        let running = true;

        while (running) {
            console.clear();
            console.log("=== CLIENTS MENU ===");
            this.displayClients(this.clientService.getAll());
            console.log("1. Add");
            console.log("2. Update");
            console.log("3. Delete");
            console.log("4. Exit");
            console.log("======================");

            const option = prompt("Choose an option: ");

            switch (option.trim()) {
                case "1":
                    this.addClientOption();
                    break;

                case "2":
                    this.updateClientOption();
                    break;

                case "3":
                    this.deleteClientOption();
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

    private displayClients(clients: Client[]): void {
        if (clients.length === 0) {
            console.log("\nNo clients found.");
            console.log("--------------------\n");
            return;
        }

        console.log("\n--- Clients List ---");
        clients.forEach(client => {
            let info = `[ID: ${client.id}] Name: ${client.name} | Email: ${client.email} | Type: ${client.type}`;

            if (client.address) {
                info += ` | Address: ${client.address}`;
            }

            console.log(info);
        });
        console.log("--------------------\n");
    }

    private addClientOption(): void {
        console.log("\n--- Add New Client ---");

        const name = prompt("Enter client name: ").trim();
        const email = prompt("Enter client email: ").trim();

        console.log("Client Types available: Regular, Corporate");
        const typeInput = prompt("Enter client type: ").trim(); 

        const addressInput = prompt("Enter client address (Press Enter to skip): ").trim();

        const baseClient: any = {
            name,
            email,
            type: typeInput as any 
        };

        if (addressInput.length > 0) {
            baseClient.address = addressInput;
        }

        const result = this.clientService.create(baseClient);

        if (Array.isArray(result)) {
            console.log("\nValidation Errors:");
            result.forEach(err => console.log(`- ${err}`));
        } else {
            console.log(`\nClient created successfully with id: ${result.id}`);
        }

        prompt("\nPress Enter to continue..."); // if we do not put this, then it will clear the console and 
                                                // the user wont see what the actual hell happened (same apllies for all of the rest press enter to continue)
    }

    private updateClientOption(): void {
        console.log("\n--- Update Client ---");
        
        const idInput = prompt("Enter the ID of the client to update: ").trim();
        const id = parseInt(idInput);

        if (isNaN(id)) {
            console.log("\nInvalid ID format. It must be a number.");
            prompt("\nPress Enter to continue...");
            return;
        }

        const name = prompt("Enter new client name: ").trim();
        const email = prompt("Enter new client email: ").trim();
        
        console.log("Client Types available: Regular, Corporate");
        const typeInput = prompt("Enter new client type: ").trim();
        
        const adressInput = prompt("Enter new client address (Press Enter to skip): ").trim();

        const updatedData: any = {
            name,
            email,
            type: typeInput as any
        };

        if (adressInput.length > 0) {
            updatedData.address = adressInput;
        }

        const result = this.clientService.update(id, updatedData);

        if (result === null) {
            console.log(`\nError: Client with id ${id} was not found.`);
        } else if (Array.isArray(result)) {
            console.log("\nValidation Errors:")
            result.forEach(err => console.log(`- ${err}`));
        } else {
            console.log(`\nClient with id ${id} updated successfully.`);
        }

        prompt("\nPress Enter to continue...");
    }

    private deleteClientOption(): void {
        console.log("\n--- Delete Client ---")
        
        const idInput = prompt("Enter the ID of the client to delete: ").trim();
        const id = parseInt(idInput);

        if (isNaN(id)) {
            console.log("\nInvalid ID format. Must be a number.");
            prompt("\nPress Enter to continue...");
            return;
        }

        const deletedId = this.clientService.delete(id);

        if (deletedId === 0) {
            console.log(`\nError: Client with id ${id} was not found.`);
        } else {
            console.log(`\nClient with id ${deletedId} has been successfully deleted.`);
        }

        prompt("\nPress Enter to continue...");
    }
}