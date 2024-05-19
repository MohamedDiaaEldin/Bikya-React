import React from 'react';
import './product.css';

const Product = ({ product }) => {
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
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
