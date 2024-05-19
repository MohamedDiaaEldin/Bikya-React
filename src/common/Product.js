import './product.css';
import { useState } from 'react';
import AddToCartModal from './AddToCartModal';

const Product = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    // Implement your add to cart functionality here
    console.log(`Product ${product.name} added to cart.`);
  };

  return (
    <div className="product-card" key={product.id}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-points">{product.points} Points / Kilo</p>
        <button className="add-to-cart-button" onClick={()=> setShowModal(true)}>
          Add to Cart
        </button>
      </div>
      {showModal && (
        <AddToCartModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}
      
    </div>
  );
};

export default Product;
