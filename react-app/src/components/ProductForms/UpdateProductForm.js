import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import { getUserProductsThunk, updateProductThunk } from "../../store/product";
import { categoryStrs, availabilityStrs } from "../../assets/helpers/block-text";
import OpenModalButton from '../OpenModalButton';
import DeleteProductModal from "./DeleteProductModal";


export default function UpdateProductForm() {
  const { product_id } = useParams();
  const product = useSelector(state => state.product[product_id]);
  const userShopsObj = useSelector(state => state.shop);
  const shops = Object.values(userShopsObj);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)
  const [previewImg, setPreviewImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [seller_id, setSellerId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [showInv, setShowInv] = useState(1);
  const [inventory, setInventory] = useState(null);
  const [preview_image, setPreview_image] = useState(null);
  const [errors, setErrors] = useState({});

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
      setPreview_image(product.preview_image);
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
    if (previewImg) data.append('preview_image', previewImg);
    if (img1) data.append('image_1', img1);
    if (img2) data.append('image_2', img2);
    if (img3) data.append('image_3', img3);
    if (img4) data.append('image_4', img4);
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
        history.push('/me/products');
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
        id="update-product-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section>
          <label
            htmlFor='product-previewImg-input'
          >Image 1 (preview)</label>
          <input
            id="product-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setPreviewImg(e.target.files[0])}
          />
        </section>
        <section>
          <label
            htmlFor='product-previewImg-input'
          >Image 2</label>
          <input
            id="product-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setImg1(e.target.files[0])}
          />
        </section>
        <section>
          <label
            htmlFor='product-previewImg-input'
          >Image 3</label>
          <input
            id="product-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setImg2(e.target.files[0])}
          />
        </section>
        <section>
          <label
            htmlFor='product-previewImg-input'
          >Image 4</label>
          <input
            id="product-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setImg3(e.target.files[0])}
          />
        </section>
        <section>
          <label
            htmlFor='product-previewImg-input'
          >Image 5</label>
          <input
            id="product-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setImg4(e.target.files[0])}
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
            <option value={shop?.id}>{shop?.title}</option>
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
      </form>
      <div>
        <OpenModalButton
          buttonText="Delete Product"
          modalComponent={<DeleteProductModal product_id={product_id} />}
        />
        <button
          id="create-shop-breadcrumb"
          onClick={() => history.push(`/me/products`)}
        >Cancel</button>
        <button
          id="create-product-submit"
          type="submit"
          form="update-product-form"
        >Update product</button>
      </div>
    </div>
  );
};
