import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    description: string;
    shelfLife: string;
    category: Category;
    usageSuggestions: Array<string>;
    nutritionalBenefits: Array<string>;
    ingredients: Array<string>;
}
export enum Category {
    laddu = "laddu",
    chutneyPowder = "chutneyPowder",
    savoury = "savoury"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    initSampleProducts(): Promise<void>;
}
