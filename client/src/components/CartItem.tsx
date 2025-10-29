import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface CartItemType {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <Card className="p-4" data-testid={`cart-item-${item.id}`}>
      <div className="flex gap-4">
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-card">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-foreground" data-testid={`text-item-name-${item.id}`}>{item.name}</h3>
              <p className="text-lg font-semibold text-foreground mt-1" data-testid={`text-item-price-${item.id}`}>
                ${item.price.toFixed(2)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              data-testid={`button-remove-${item.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              data-testid={`button-decrease-${item.id}`}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-12 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              data-testid={`button-increase-${item.id}`}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
