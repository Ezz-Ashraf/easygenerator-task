export class ProductDto {
    id: string;
    name: string;
    price: number;
    availablePieces: number;
  
    constructor(partial: Partial<ProductDto>) {
      Object.assign(this, partial);
    }
  
    static fromEntity(product: any): ProductDto {
      return new ProductDto({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        availablePieces: product.availablePieces,
      });
    }
  }
  