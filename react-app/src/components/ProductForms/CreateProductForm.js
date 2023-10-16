import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import { createProductThunk } from "../../store/product";
import { categoryStrs, availabilityStrs } from "../../assets/helpers/block-text";
import './index.css';


export default function CreateProductForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const userShopsObj = useSelector(state => state.shop);
  const shops = Object.values(userShopsObj);

  const [isLoaded, setIsLoaded] = useState(false)
  const [previewImg, setPreviewImg] = useState(null);
  const [seller_id, setSellerId] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [showInv, setShowInv] = useState(1);
  const [inventory, setInventory] = useState(null);
  const [image_1, setImage_1] = useState(null);
  const [image_2, setImage_2] = useState(null);
  const [image_3, setImage_3] = useState(null);
  const [image_4, setImage_4] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!sessionUser) history.push('/');
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
    data.append('preview_image', previewImg);
    if (seller_id) data.append('seller_id', seller_id);
    data.append('title', title);
    data.append('price', price);
    data.append('category', category);
    data.append('description', description);
    data.append('availability', availability);
    if (inventory) data.append('inventory', inventory);
    if (image_1) data.append('image_1', image_1);
    if (image_2) data.append('image_2', image_2);
    if (image_3) data.append('image_3', image_3);
    if (image_4) data.append('image_4', image_4);

    let createdProduct;
    try {
      // if (!imageInput) throw { "errors": { "preview_image": "Product image is required" } }
      createdProduct = await dispatch(createProductThunk(data));
      if (createdProduct) {
        // console.log('CREATED PRODUCT:', createdProduct);
        history.push('/me/products');
      };
    } catch ({ errors }) {
      console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  if (!isLoaded) return null;

  return (
    <div className="form-page">
      <h1 className="form-heading">Create a product</h1>
      <form
        className="form-body"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section className="form-section">
          {errors.preview_image
            ?
            <label
              className="error-text"
              htmlFor='product-previewImg-input'
            >Product image is required</label>
            :
            <label
              className="form-label"
              htmlFor='product-previewImg-input'
            >Image 1 (preview)</label>}
          <input
            id="product-previewImg-input"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setPreviewImg(e.target.files[0])}
          />
        </section>
        <section className="form-section">
          <label
            className="form-label"
            htmlFor='product-img-1'
          >Image 2</label>
          <input
            id="product-img-1"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setImage_1(e.target.files[0])}
          />
        </section>
        <section className="form-section">
          <label
            className="form-label"
            htmlFor='product-img-2'
          >Image 3</label>
          <input
            id="product-img-2"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setImage_2(e.target.files[0])}
          />
        </section>
        <section className="form-section">
          <label
            className="form-label"
            htmlFor='product-img-3'
          >Image 4</label>
          <input
            id="product-img-3"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setImage_3(e.target.files[0])}
          />
        </section>
        <section className="form-section">
          <label
            className="form-label"
            htmlFor='product-img-4'
          >Image 5</label>
          <input
            id="product-img-4"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setImage_4(e.target.files[0])}
          />
        </section>
        <section className="form-section">
          <label
            className="form-label"
            htmlFor="product-shop-input"
          >Shop listing</label>
          <select
            id="product-shop-input"
            className="form-input"
            defaultValue={null}
            value={seller_id}
            onChange={e => {
              e.target.value === '(select one)'
                ?
                setSellerId(null)
                :
                setSellerId(e.target.value)
            }}
          >
            <option>{'(select one)'}</option>
            {shops.map(shop => (
              <option value={shop.id}>{shop.title}</option>
            ))}
          </select>
        </section>
        <section className="form-section">
          {errors.title
            ?
            <label
              className="error-text"
              htmlFor='product-title-input'
            >Title is required</label>
            :
            <label
              className="form-label"
              htmlFor='product-title-input'
            >Title</label>}
          <input
            id="product-title-input"
            className="form-input"
            type="text"
            value={title}
            placeholder="Please provide a title for your product"
            onChange={e => setTitle(e.target.value)}
          />
        </section>
        <section className="form-section">
          <div
            className="form-label"
            id="price-label"
          >
            {errors.price
              ?
              <label
                className="error-text"
                htmlFor="product-price-input"
              >Price is required</label>
              :
              <label
                className="form-label"
                htmlFor="product-price-input"
              >Price</label>}
            <label
              className="dollar-sign"
              htmlFor="product-price-input"
            >$</label>
          </div>
          <input
            id="product-price-input"
            className="form-input"
            type="number"
            min={0}
            max={9999.99}
            step={.01}
            value={price}
            placeholder="0.00"
            onChange={e => setPrice(e.target.value)}
          />
        </section>
        <section className="form-section">
          {errors.category
            ?
            <label
              className="error-text"
              htmlFor="product-category-input"
            >Category is required</label>
            :
            <label
              className="form-label"
              htmlFor="product-category-input"
            >Category</label>}
          <select
            id="product-category-input"
            className="form-input"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value={null}>{'(select one)'}</option>
            {categoryStrs.map(str => (
              <option value={str}>{str}</option>
            ))}
          </select>
        </section>
        <section
          className="form-section"
          id="form-description"
        >
          {errors.description
            ?
            <label
              className="error-text"
              htmlFor='product-title-input'
            >Description is required</label>
            :
            <label
              className="form-label"
              htmlFor='product-title-input'
            >Description</label>}
          <textarea
            className="form-input"
            id="description-input"
            type="textarea"
            value={description}
            placeholder="Please write at least 30 characters"
            onChange={e => setDescription(e.target.value)}
          />
        </section>
        <section className="form-section">
          {errors.availability
            ?
            <label
              className="error-text"
              htmlFor="product-availability-input"
            >Availability is required</label>
            :
            <label
              className="form-label"
              htmlFor="product-availability-input"
            >Availability</label>}
          <select
            id="product-availability-input"
            className="form-input"
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
          <section className="form-section">
            <label
              className="form-label"
              htmlFor="product-inventory-input"
            >Inventory</label>
            <input
              type="number"
              className="form-input"
              id="inventory-input"
              min={1}
              max={1000}
              step={1}
              value={inventory}
              onChange={e => setInventory(e.target.value)}
            />
          </section>}
        <section className="form-submit-section">
          <button
            className="create-shop-breadcrumb"
            type="button"
            onClick={() => history.push('/me/products')}
          >Cancel</button>
          <button
            className="create-shop-submit"
            type="submit"
          >Create product</button>
        </section>
      </form>
    </div>
  );
};
