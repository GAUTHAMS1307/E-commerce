import ProductGrid from '../ProductGrid';
import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';
import backpackImage from '@assets/generated_images/Leather_backpack_product_photo_8724bc8c.png';
import bottleImage from '@assets/generated_images/Stainless_steel_water_bottle_1104f109.png';
import watchImage from '@assets/generated_images/Luxury_analog_wristwatch_product_57ebaec4.png';

export default function ProductGridExample() {
  const mockProducts = [
    { id: 1, name: "Wireless Headphones", price: 89.99, image: headphonesImage, category: "Electronics" },
    { id: 2, name: "Leather Backpack", price: 129.99, image: backpackImage, category: "Accessories" },
    { id: 3, name: "Steel Water Bottle", price: 34.99, image: bottleImage, category: "Lifestyle" },
    { id: 4, name: "Classic Watch", price: 299.99, image: watchImage, category: "Accessories" }
  ];

  return <ProductGrid products={mockProducts} onAddToCart={(product) => console.log('Added:', product)} />;
}
