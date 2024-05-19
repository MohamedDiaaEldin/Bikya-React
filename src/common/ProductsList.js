import './productsList.css'
import Product from './Product';

const products = [
    { id: 1, name: 'Product 1', points: '10', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', points: '20', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', points: '30', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', points: '40', image: 'https://via.placeholder.com/150' },
  ];

const ProductsList = ()=>{
return(
    <div className="product-list">
        {products.map(product => (        
            <Product product={product}/>            
        ))}
    </div>
)
}


export default ProductsList