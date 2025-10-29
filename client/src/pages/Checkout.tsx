import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";
import ReceiptModal, { type Receipt } from "@/components/ReceiptModal";
import type { CartItemType } from "@/components/CartItem";

import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';
import backpackImage from '@assets/generated_images/Leather_backpack_product_photo_8724bc8c.png';

const mockCartItems: CartItemType[] = [
  { id: 1, productId: 1, name: "Wireless Headphones", price: 89.99, image: headphonesImage, quantity: 2 },
  { id: 2, productId: 2, name: "Leather Backpack", price: 129.99, image: backpackImage, quantity: 1 }
];

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleSubmit = async (data: { name: string; email: string }) => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const total = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newReceipt: Receipt = {
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      total,
      items: mockCartItems,
      customerName: data.name,
      customerEmail: data.email,
    };
    
    setReceipt(newReceipt);
    setIsReceiptOpen(true);
    setIsSubmitting(false);
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={mockCartItems.length} onCartClick={() => {}} />
      <CheckoutForm
        items={mockCartItems}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={handleCloseReceipt}
        receipt={receipt}
      />
    </div>
  );
}
