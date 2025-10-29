import { useState } from 'react';
import CartSidebar from '../CartSidebar';
import { Button } from '@/components/ui/button';
import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';
import backpackImage from '@assets/generated_images/Leather_backpack_product_photo_8724bc8c.png';

export default function CartSidebarExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState([
    { id: 1, productId: 1, name: "Wireless Headphones", price: 89.99, image: headphonesImage, quantity: 2 },
    { id: 2, productId: 2, name: "Leather Backpack", price: 129.99, image: backpackImage, quantity: 1 }
  ]);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Cart</Button>
      <CartSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={(id, qty) => {
          setItems(items.map(item => item.id === id ? { ...item, quantity: qty } : item));
        }}
        onRemove={(id) => {
          setItems(items.filter(item => item.id !== id));
        }}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  );
}
