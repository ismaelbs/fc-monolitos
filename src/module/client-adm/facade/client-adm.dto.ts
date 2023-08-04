export type AddClientInputFacadeDto = {
    name: string;
    email: string;
    address: string;
}

export type AddClientOutputFacadeDto = {
    id: string;
    name: string;
    email: string;
    address: string;
}


export type FindClientInputFacadeDto = {
    id: string;
}

export type FindClientOutputFacadeDto = {
    id: string;
    name: string;
    email: string;
    address: string;
}