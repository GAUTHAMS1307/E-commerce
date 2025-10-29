import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CartSidebar from "@/components/CartSidebar";
import type { Product } from "@/components/ProductCard";
import type { CartItemType } from "@/components/CartItem";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface CartItemResponse {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
  };
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: cartResponse = [], refetch: refetchCart } = useQuery<CartItemResponse[]>({
    queryKey: ["/api/cart"],
  });

  const cartItems: CartItemType[] = cartResponse.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    price: parseFloat(item.product.price),
    image: item.product.image,
    quantity: item.quantity,
  }));

  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      return apiRequest<CartItemResponse>("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity: 1 }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return apiRequest<CartItemResponse>(`/api/cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest<void>(`/api/cart/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const handleAddToCart = (product: Product) => {
    addToCartMutation.mutate(product.id, {
      onSuccess: () => {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return;
    updateQuantityMutation.mutate({ id, quantity });
  };

  const handleRemoveItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setLocation("/checkout");
  };

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} onCartClick={() => {}} />
        <div className="flex items-center justify-center py-16">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
