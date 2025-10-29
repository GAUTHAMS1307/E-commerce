import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";
import ReceiptModal, { type Receipt } from "@/components/ReceiptModal";
import type { CartItemType } from "@/components/CartItem";
import { apiRequest, queryClient } from "@/lib/queryClient";

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

interface CheckoutResponse {
  orderId: string;
  timestamp: string;
  total: number;
  items: CartItemResponse[];
  customerName: string;
  customerEmail: string;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const { data: cartResponse = [] } = useQuery<CartItemResponse[]>({
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

  const checkoutMutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      return apiRequest<CheckoutResponse>("/api/checkout", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data: CheckoutResponse) => {
      const newReceipt: Receipt = {
        orderId: data.orderId,
        timestamp: data.timestamp,
        total: data.total,
        items: data.items.map((item: CartItemResponse) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.image,
          quantity: item.quantity,
        })),
        customerName: data.customerName,
        customerEmail: data.customerEmail,
      };
      
      setReceipt(newReceipt);
      setIsReceiptOpen(true);
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const handleSubmit = async (data: { name: string; email: string }) => {
    checkoutMutation.mutate(data);
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setLocation("/");
  };

  if (cartItems.length === 0 && !receipt) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} onCartClick={() => setLocation("/")} />
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products before checking out</p>
          <button
            onClick={() => setLocation("/")}
            className="text-primary hover:underline"
            data-testid="link-back-to-products"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} onCartClick={() => setLocation("/")} />
      <CheckoutForm
        items={cartItems}
        onSubmit={handleSubmit}
        isSubmitting={checkoutMutation.isPending}
      />
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={handleCloseReceipt}
        receipt={receipt}
      />
    </div>
  );
}
