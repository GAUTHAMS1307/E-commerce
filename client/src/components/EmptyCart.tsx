import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export default function EmptyCart({ onContinueShopping }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <ShoppingCart className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
      <p className="text-muted-foreground mb-6">Add some products to get started</p>
      <Button onClick={onContinueShopping} data-testid="button-continue-shopping">
        Continue Shopping
      </Button>
    </div>
  );
}
