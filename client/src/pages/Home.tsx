import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CartSidebar from "@/components/CartSidebar";
import type { Product } from "@/components/ProductCard";
import type { CartItemType } from "@/components/CartItem";
import { useToast } from "@/hooks/use-toast";

import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';
import backpackImage from '@assets/generated_images/Leather_backpack_product_photo_8724bc8c.png';
import bottleImage from '@assets/generated_images/Stainless_steel_water_bottle_1104f109.png';
import watchImage from '@assets/generated_images/Luxury_analog_wristwatch_product_57ebaec4.png';
import phoneImage from '@assets/generated_images/Modern_smartphone_product_photo_af04ce61.png';
import cameraImage from '@assets/generated_images/Vintage_polaroid_camera_product_b3f6249b.png';
import yogaMatImage from '@assets/generated_images/Premium_yoga_mat_product_2b981a36.png';
import lampImage from '@assets/generated_images/Modern_desk_lamp_product_b17f255f.png';

const mockProducts: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 89.99, image: headphonesImage, category: "Electronics" },
  { id: 2, name: "Leather Backpack", price: 129.99, image: backpackImage, category: "Accessories" },
  { id: 3, name: "Steel Water Bottle", price: 34.99, image: bottleImage, category: "Lifestyle" },
  { id: 4, name: "Classic Watch", price: 299.99, image: watchImage, category: "Accessories" },
  { id: 5, name: "Smartphone Pro", price: 899.99, image: phoneImage, category: "Electronics" },
  { id: 6, name: "Vintage Camera", price: 179.99, image: cameraImage, category: "Electronics" },
  { id: 7, name: "Premium Yoga Mat", price: 49.99, image: yogaMatImage, category: "Lifestyle" },
  { id: 8, name: "Modern Desk Lamp", price: 64.99, image: lampImage, category: "Home" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);
      
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      const newItem: CartItemType = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      
      return [...prev, newItem];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setLocation("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <ProductGrid products={mockProducts} onAddToCart={handleAddToCart} />
      
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
