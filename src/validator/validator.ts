import { Client } from "../model/client";
import { Product } from "../model/product";
import { ClientType, ProductCategory } from "../enums/general-enums";

export const validateClient = (client: Client): string[] => {
    const errors: string[] = [];

    if (!client.type || (client.type as string).trim() === "") {
        errors.push("Client Type is required.");
    } else if (!Object.values(ClientType).includes(client.type)) {
        errors.push(`Client type must be one of: ${Object.values(ClientType).join(", ")}.`);
    }

    if (!client.email || client.email.trim() === "") {
        errors.push("Email is required.");
    } else {
        if (!client.email.includes("@")) {
            errors.push("Email must contain an '@'");
        }

        if (client.email.includes(" ")) {
            errors.push("Email cannot include whitespaces.");
        }

        if (client.email.trim().length < 3) {
            errors.push("Email must be at least 3 characters long.");
        }
    }

    if (!client.name || client.name.trim() === "") {
        errors.push("Name is required.");
    } else {
        if (client.name.trim().length < 3) {
            errors.push("Name must be at least 3 characters long.");
        }
    }

    if (client.id <= 0) {
        errors.push("ID must be greater than 0.");
    }

    return errors;
};

export const validateProduct = (product: Product): string[] => {
    const errors: string[] = [];

    if (!product.category || (product.category as string).trim() === "") {
        errors.push("Product Category is required.");
    } else if (!Object.values(ProductCategory).includes(product.category)) {
        errors.push(`Product category must be one of: ${Object.values(ProductCategory).join(", ")}.`);
    }

    if (!product.name || product.name.trim() === "") {
        errors.push("Product name is required.");
    } else {
        if (product.name.trim().length < 3) {
            errors.push("Product name must be at least 3 characters long.");
        }
    }

    if (product.price === undefined || product.price === null) {
        errors.push("Product price is required.");
    } else if (product.price <= 0) {
        errors.push("Product price must be greater than 0.");
    } else if (!Number.isInteger(product.price * 100)) {
        errors.push("Product price cannot have more than 2 decimal places.");
    }

    if (product.stock < 0 || !Number.isInteger(product.stock)) {
        errors.push("Product stock  must be an integer greater or equal to 0.");
    }

    if (product.id <= 0) {
        errors.push("ID must be greater than 0.");
    }

    return errors;
};
