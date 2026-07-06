import { Client } from "../model/client";
import { ClientType } from "../enums/general-enums";

export const initialClients: Client[] = [
    {
        id: 1,
        name: "Jorge Alvarez",
        email: "jorjaizzz@mail.com",
        type: ClientType.REGULAR,
        address: "Amatiyorkkk"
    },
    {
        id: 2,
        name: "Luis Estuardo",
        email: "capimid@cuckmail.com",
        type: ClientType.CORPORATE
    },
    {
        id: 3,
        name: "Jefferson Giovanna",
        email: "godtsy@mail.com",
        type: ClientType.REGULAR
    }
];