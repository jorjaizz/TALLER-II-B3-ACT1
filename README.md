# Sales System CRUDS Documentation

## How the Application Works
The system is a console-based sales management application built with TypeScript. Upon running, the user is presented with a **Main Menu** where they can navigate to either the **Products** or **Clients** section.

Each section displays the current list of records and offers three operations:
- **Add**: prompts the user for the required fields and creates a new record if all validations pass
- **Update**: asks for the ID of an existing record, then prompts for new values to replace it
- **Delete**: asks for the ID of an existing record and removes it

If any validation fails during Add or Update, the errors are displayed and no changes are made. The application loops continuously until the user chooses to exit.

## Client Model
The `Client` interface defines the following attributes:
- `id`: numeric identifier
- `name`: name of the client
- `email`: contact email
- `type`: client type, defined by the `ClientType` enum
- `address`: optional physical address

## Product Model
The `Product` interface defines the following attributes:
- `id`: unique numeric identifier
- `name`: product name
- `price`: unit price (positive, max 2 decimal places)
- `stock`: available units (non-negative integer)
- `category`: product category, defined by the `ProductCategory` enum
- `provider`: optional supplier name

## Enumerations
Two enumerations were defined to represent fixed domain values:

- **ClientType**: `Regular`, `Corporate`
- **ProductCategory**: `Technology`, `Clothing`, `Health`, `Appliances`

These are integrated directly into the interfaces, ensuring only valid values are accepted at the type level.

## Validation Rules

### Client
- `type` must be a valid `ClientType` value
- `email` is required, must contain `@`, no spaces, min 3 characters
- `name` is required, min 3 characters
- `id` must be greater than 0

### Product
- `category` must be a valid `ProductCategory` value
- `name` is required, min 3 characters
- `price` is required, must be greater than 0, max 2 decimal places
- `stock` must be a non-negative integer
- `id` must be greater than 0

## Simulated Data
Three clients and four products were defined as initial data, covering different combinations: clients with and without address, products with and without provider, and products across all four categories.