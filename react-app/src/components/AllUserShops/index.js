import { Link, useHistory } from 'react-router-dom';
import './index.css';


export default function AllUserShops({ shopsArr }) {
  const history = useHistory();

  return (
    <div className='manager-content'>
      <button
        className="manager-create"
        onClick={() => {
          history.push(`/shops/create`);
        }}
      >
        Create a shop
      </button>
      <div id="shops-list">
        {shopsArr.map(shop => (
          <div className='shop-list-item'>
            <Link
              key={shop.id}
              className='shop-link'
              exact to={`/shops/${shop.id}`}
            >
              <img
                alt={`${shop.title}`}
                src={shop.preview_image}
                className="shop-img"
              />
            </Link>
            <section className='shops-list-details'>
              <Link
                className='shops-list-text'
                exact to={`/shops/${shop.id}`}
              >
                <p className='shops-list-title'>{shop.title}</p>
                <p className='shops-list-category'>{shop.category}</p>
              </Link>
              <Link
                className='shops-list-update'
                to={`/shops/${shop.id}/update`}
              >Update</Link>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};
