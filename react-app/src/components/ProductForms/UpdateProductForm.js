import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopsThunk, getUserShopsThunk } from "../../store/shop";
import { getProductsThunk, getUserProductsThunk, updateProductThunk } from "../../store/product";
import { categoryStrs, availabilityStrs } from "../../assets/helpers/block-text";


export default function UpdateProductForm() {
  const { product_id } = useParams();
  const product = useSelector(state => state.product[product_id]);
  // console.log('PRODUCT STATE:', product);
  const userShopsObj = useSelector(state => state.shop);
  const shops = Object.values(userShopsObj);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)
  const [imageInput, setImageInput] = useState('');
  const [seller_id, setSellerId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [showInv, setShowInv] = useState(1);
  const [inventory, setInventory] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getUserProductsThunk())
      .then(() => dispatch(getUserShopsThunk()))
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

  useEffect(() => {
    if (product) {
      if (product.preview_image) setPreviewImg(product.preview_image);
      if (product.seller_id) setSellerId(product.seller_id);
      setTitle(product.title);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setAvailability(product.availability);
      if (product.inventory) setInventory(product.inventory);
    };
  }, [product]);

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

    let updatedProduct;
    try {
      updatedProduct = await dispatch(updateProductThunk(product_id, data));
      if (updatedProduct) {
        console.log('UPDATED SHOP:', updatedProduct);
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
      <h1>Update your product</h1>
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
          <option value={null}>{null}</option>
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
          >Update product</button>
        </section>
      </form>
    </div>
  );
};