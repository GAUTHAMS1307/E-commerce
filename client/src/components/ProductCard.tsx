import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-shadow duration-200" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
          <h3 className="text-lg font-medium text-foreground mt-1">{product.name}</h3>
          <p className="text-2xl font-semibold text-foreground mt-2">${product.price.toFixed(2)}</p>
        </div>
        <Button
          className="w-full gap-2"
          onClick={() => onAddToCart(product)}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
