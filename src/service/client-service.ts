import { Client } from "../model/client";
import { initialClients } from "../data/client-data";
import { validateClient } from "../validator/validator";

export class ClientService {

    private clients: Client[] = [...initialClients];
    private nextId: number = initialClients.length + 1;

    public getAll(): Client[] {
        return this.clients
    }

    public create(baseClient: Omit<Client, "id">): string[] | Client {
        // create the object with the current nextId, without incrementing it yet
        const newClient: Client = {
            id: this.nextId,
            ...baseClient
        };

        // validate it
        const errors = validateClient(newClient);
        if (errors.length !== 0) {
            return errors; // return errors, while nextId stays the same
        }

        // if valid, push to database array and then increment the id
        this.clients.push(newClient);
        this.nextId++;

        return newClient;
    }

    public delete(id: number): number {
        const initialLength = this.clients.length;
        this.clients = this.clients.filter(client => client.id !== id);

        return this.clients.length < initialLength ? id : 0;
    }

    public update(id: number, updatedData: Omit<Client, "id">): Client | string[] | null {
        const clientIndex = this.clients.findIndex(c => c.id === id);
        if (clientIndex === -1) return null;

        const updatedClient: Client = {
            id,
            ...updatedData
        };

        const errors = validateClient(updatedClient);
        if (errors.length !== 0) return errors;

        this.clients = this.clients.map(c => c.id === id ? updatedClient : c);
        return updatedClient;
    }
}