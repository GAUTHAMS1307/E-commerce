import EmptyCart from '../EmptyCart';

export default function EmptyCartExample() {
  return <EmptyCart onContinueShopping={() => console.log('Continue shopping')} />;
}
