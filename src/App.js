import { useState } from 'react';
import Header from './Header/Header';
import Meals from './meals/Meals';
import CartDetails from './Cart/CartDetails';
import { CartProvider } from './store/cart-context';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <CartProvider>
      <Header onOpen={openModal} />
      {isOpen && <CartDetails onClose={closeModal} />}
      <Meals />
    </CartProvider>
  );
}

export default App;
