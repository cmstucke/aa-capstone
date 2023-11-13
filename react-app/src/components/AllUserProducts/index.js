import { Link, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteProductModal from '../ProductForms/DeleteProductModal';
import './index.css';


export default function AllUserProducts({ productsArr }) {
  const history = useHistory();

  return (
    <div className='manager-content'>
      <button
        className="manager-create"
        onClick={() => {
          history.push(`/products/create`);
        }}
      >
        Create a product
      </button>

      <div id="products-list">
        {productsArr.map(product => (
          <div className='shop-list-item'>
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
            </Link>
            <div
              className='shops-list-details'
            >
              <Link
                className='shops-list-text'
                exact to={`/products/${product.id}`}
              >
                <h3 className='shops-list-title'>${product.price.toFixed(2)}</h3>
                <p className='shops-list-category'>{product.title.length > 25 ?
                  product.title.slice(0, 22) + '...' :
                  product.title}</p>
              </Link>
              <div className='products-list-buttons'>
                <OpenModalButton
                  buttonText="Delete"
                  className={'products-list-delete'}
                  modalComponent={
                    <DeleteProductModal
                      product_id={product.id}
                      manager={true}
                    />}
                />
                <Link
                  className='shops-list-update'
                  to={`/products/${product.id}/update`}
                >Update</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
