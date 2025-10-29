import ProductCard from '../ProductCard';
import headphonesImage from '@assets/generated_images/Wireless_bluetooth_headphones_product_847bfee7.png';

export default function ProductCardExample() {
  const mockProduct = {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    image: headphonesImage,
    category: "Electronics"
  };

  return (
    <div className="max-w-sm">
      <ProductCard 
        product={mockProduct} 
        onAddToCart={(product) => console.log('Added to cart:', product)} 
      />
    </div>
  );
}
