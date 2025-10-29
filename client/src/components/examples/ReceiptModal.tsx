import { useState } from 'react';
import ReceiptModal from '../ReceiptModal';
import { Button } from '@/components/ui/button';
import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';
import backpackImage from '@assets/generated_images/Leather_backpack_product_photo_8724bc8c.png';

export default function ReceiptModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  const mockReceipt = {
    orderId: "ORD-2024-001234",
    timestamp: new Date().toISOString(),
    total: 309.97,
    items: [
      { id: 1, productId: 1, name: "Wireless Headphones", price: 89.99, image: headphonesImage, quantity: 2 },
      { id: 2, productId: 2, name: "Leather Backpack", price: 129.99, image: backpackImage, quantity: 1 }
    ],
    customerName: "John Doe",
    customerEmail: "john@example.com"
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show Receipt</Button>
      <ReceiptModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        receipt={mockReceipt}
      />
    </div>
  );
}
