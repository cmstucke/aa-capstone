import { Link } from 'react-router-dom';
import './index.css';


export default function AllUserProducts({ productsArr }) {

  return (
    <div id="products-list">
      {productsArr.map(product => (
        <Link
          key={product.id}
          className='product-link'
          exact to={`/products/${product.id}`}
        >
          <img
            alt={`${product.title}`}
            src={product.preview_image}
            className="product-img"
          />
          <h3>{product.title}</h3>
        </Link>
      ))}
    </div>
  );
};
