import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import { createProductThunk } from "../../store/product";
import { categoryStrs, availabilityStrs } from "../../assets/helpers/block-text";


export default function CreateProductForm() {
  // const sessionUser = useSelector(state => state.session.user);
  const userShopsObj = useSelector(state => state.shop);
  const shops = Object.values(userShopsObj);
  // console.log('SHOPS:', shops);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)
  const [imageInput, setImageInput] = useState('');
  // console.log('IMAGE INPUT:', imageInput);
  const [seller_id, setSellerId] = useState('');
  // console.log('SELLER ID:', !seller_id);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  // console.log('CATEGORY:', category);
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  // console.log('AVAILABILITY:', availability);
  const [showInv, setShowInv] = useState(1);
  // console.log('SHOW INV:', showInv);
  const [inventory, setInventory] = useState(null);
  // console.log('INVENTORY:', inventory);
  const [errors, setErrors] = useState({})
  // const [imageLoading, setImageLoading] = useState(false);
  // console.log('ERRORS:', errors);

  useEffect(() => {
    dispatch(getUserShopsThunk())
      .then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (availability === 'In stock') {
      setShowInv(true);
      setInventory(1);
    } else {
      setShowInv(false);
      setInventory(null);
    };
  }, [availability]);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    if (imageInput) data.append('preview_image', imageInput);
    if (seller_id) data.append('seller_id', seller_id);
    data.append('title', title);
    data.append('price', price);
    data.append('category', category);
    data.append('description', description);
    data.append('availability', availability);
    if (inventory) data.append('inventory', inventory);

    let createdProduct;
    try {
      createdProduct = await dispatch(createProductThunk(data));
      if (createdProduct) {
        console.log('CREATED PRODUCT:', createdProduct);
        if (seller_id) {
          history.push(`/shops/${seller_id}`);
        } else {
          history.push('/me/products');
        };
      };
    } catch ({ errors }) {
      console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  return (
    <div id="create-product-page">
      <h1>Create a product</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section>
          <label
            htmlFor='product-previewImg-input'
          >Preview image</label>
          <input
            id="product-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setImageInput(e.target.files[0])}
          />
        </section>
        <label
          htmlFor="product-shop-input"
        >Shop listing</label>
        <select
          id="product-shop-input"
          defaultValue={null}
          value={seller_id}
          onChange={e => setSellerId(e.target.value)}
        >
          <option>{'(select one)'}</option>
          {shops.map(shop => (
            <option value={shop.id}>{shop.title}</option>
          ))}
        </select>
        <section>
          {errors.title
            ?
            <label
              className="error-text"
              htmlFor='product-title-input'
            >Title is required</label>
            :
            <label
              htmlFor='product-title-input'
            >Title</label>}
          <input
            id="product-title-input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </section>
        <section>
          <label
            htmlFor="product-price-input"
          >Price</label>
          <label
            htmlFor="product-price-input"
          >$</label>
          <input
            id="product-price-input"
            type="number"
            min={0}
            max={9999.99}
            step={.01}
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </section>
        <section>
          <label
            htmlFor='product-category-input'
          >Category</label>
          <select
            id="product-category-input"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value={null}>{'(select one)'}</option>
            {categoryStrs.map(str => (
              <option value={str}>{str}</option>
            ))}
          </select>
        </section>
        <section>
          {errors.title
            ?
            <label
              className="error-text"
              htmlFor='product-title-input'
            >Description is required</label>
            :
            <label
              htmlFor='product-title-input'
            >Description</label>}
          <input
            id="product-description-input"
            type="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </section>
        <section>
          <label
            htmlFor="product-availability-input"
          >Availability</label>
          <select
            id="product-availability-input"
            value={availability}
            onChange={e => setAvailability(e.target.value)}
          >
            <option value={null}>{'(select one)'}</option>
            {availabilityStrs.map(str => (
              <option value={str}>{str}</option>
            ))}
          </select>
        </section>
        {showInv &&
          <section>
            <label
              htmlFor="product-inventory-input"
            >Inventory</label>
            <input
              type="number"
              min={1}
              max={1000}
              step={1}
              value={inventory}
              onChange={e => setInventory(e.target.value)}
            />
          </section>}
        <section>
          <button
            id="create-product-breadcrumb"
            onClick={() => history.push('api/users/products')}
          >Cancel</button>
          <button
            id="create-product-submit"
            type="submit"
          >Create product</button>
        </section>
      </form>
    </div>
  );
};
