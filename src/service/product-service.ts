import { Product } from "../model/product";
import { initialProducts } from "../data/product-data";
import { validateProduct } from "../validator/validator";
import { ProductCategory } from "../enums/general-enums";

export class ProductService {

    private products: Product[] = [...initialProducts]; //this ... strange ahh operator means that you copy the VALUES of the array
    //and is not like a mirror of the original array 
    // (sum pointers and weird things(i learnt sum of this at Java jeje))


    private nextId: number = initialProducts.length + 1; // continues at whatever the initial array left the id

    public getAll(): Product[] {
        return this.products;
    };

    public create(baseProduct: Omit<Product, "id">): string[] | Product { //this "Omit" thing is like, creating a new type of data but
                                                                       //ignoring the giving properties so i can use it
                                                                       //for things like this where i dont need the user to send me the
                                                                       //ID but the MAIN type of data needs it

        // we assign the prospective id without using ++ yet to prevent skipping ids if validation fails
        const newProduct: Product = {
            id: this.nextId,
            ...baseProduct
        }

        const errors = validateProduct(newProduct)

        if (errors.length !== 0) {
            return errors; // returns the errors and nextId stays the same
        }

        // If its valid, we push to the array and THEN  increment the sequence
        this.products.push(newProduct)
        this.nextId++;

        return newProduct;
    };

    public delete(id: number): number {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== id);

        if (this.products.length < initialLength) {
            return id;
        }
        return 0;
    }

    public update(id: number, updatedData: Omit<Product, "id">): Product | string[] | null {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) return null; // does not exist

    const updatedProduct: Product = {
        id,
        ...updatedData
    };

    const errors = validateProduct(updatedProduct);
    if (errors.length !== 0) return errors;

    this.products = this.products.map(p => p.id === id ? updatedProduct : p); // if the given id and the current products id are the same  
                                                                               //we map it to the updated product
                                                                               
    return updatedProduct;
}
}