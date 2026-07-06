import { ClientType } from "../enums/general-enums";

export interface Client {
    id: number,
    name: string,
    email: string,
    type: ClientType,
    address?: string
}