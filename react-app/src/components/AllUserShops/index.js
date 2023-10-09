import { Link } from 'react-router-dom';
import './index.css';


export default function AllUserShops({ shopsArr }) {

  return (
    <div id="shops-list">
      {shopsArr.map(shop => (
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
          <h3>{shop.title}</h3>
        </Link>
      ))}
    </div>
  );
};
