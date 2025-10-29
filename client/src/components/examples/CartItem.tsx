import CartItem from '../CartItem';
import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';

export default function CartItemExample() {
  const mockItem = {
    id: 1,
    productId: 1,
    name: "Wireless Headphones",
    price: 89.99,
    image: headphonesImage,
    quantity: 2
  };

  return (
    <div className="max-w-md">
      <CartItem
        item={mockItem}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
    </div>
  );
}
