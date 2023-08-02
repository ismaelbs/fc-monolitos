import { Id } from "@app/module/@shared/value-objects/Id"
import { Product } from "@app/module/store-catalog/entity/product"

export type FindProductInputDto = {
    id: Id
}

export type FindProductOutputDto = {
    product: Product
}