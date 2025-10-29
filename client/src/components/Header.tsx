import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Vibe Commerce</h1>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onCartClick}
          className="relative"
          data-testid="button-cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs rounded-full"
              data-testid="badge-cart-count"
            >
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
