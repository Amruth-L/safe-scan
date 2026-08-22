import { products } from "../data/products";
export function findProductByBarcode(barcode) {
    return products.find(
        (products) => products.barcode == barcode
    );
}