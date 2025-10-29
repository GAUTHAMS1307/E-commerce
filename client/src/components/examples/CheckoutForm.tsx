import CheckoutForm from '../CheckoutForm';
import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';
import backpackImage from '@assets/generated_images/Leather_backpack_product_photo_8724bc8c.png';

export default function CheckoutFormExample() {
  const mockItems = [
    { id: 1, productId: 1, name: "Wireless Headphones", price: 89.99, image: headphonesImage, quantity: 2 },
    { id: 2, productId: 2, name: "Leather Backpack", price: 129.99, image: backpackImage, quantity: 1 }
  ];

  return (
    <CheckoutForm
      items={mockItems}
      onSubmit={(data) => console.log('Checkout submitted:', data)}
    />
  );
}
