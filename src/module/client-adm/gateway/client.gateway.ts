import { Client } from "@app/module/client-adm/entity/client.entity";

export interface ClientGatewayInterface {
    add(client: Client): Promise<void>;
}