import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopsThunk } from "../../store/shop";
import { createProductThunk } from "../../store/product";


export default function CreateProductForm() {
  // const sessionUser = useSelector(state => state.session.user);
  const userShopsObj = useSelector(state => state.shop);
  const shops = Object.values(userShopsObj);
  // console.log('SHOPS:', shops);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)
  const [seller_id, setSellerId] = useState('');
  console.log('SELLER ID:', seller_id);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  // console.log('CATEGORY:', category);
  const [description, setDescription] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState({})
  // const [imageLoading, setImageLoading] = useState(false);
  // console.log('ERRORS:', errors);

  useEffect(() => {
    dispatch(getUserShopsThunk())
      .then(() => setIsLoaded(true));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    let data;
    let imageInputBool;
    if (imageInput) {
      data = new FormData();
      data.append('seller_id', seller_id);
      data.append('title', title);
      data.append('category', category);
      data.append('description', description);
      data.append('preview_image', imageInput);
      imageInputBool = true;
    } else {
      data = {
        title: title,
        category: category,
        description: description
      };
      imageInputBool = false;
    };

    let createdShop;
    try {
      createdShop = await dispatch(createProductThunk(data, imageInputBool));
      history.push('/me/shops');
      console.log('CREATED SHOP:', createdShop);
    } catch ({ errors }) {
      console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  return (
    <div id="create-shop-page">
      <h1>Create a product</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label
          htmlFor='shop-seller-input'
        >Seller</label>
        <select
          onChange={e => setSellerId(e.target.value)}
          value={seller_id}
        >
          <option value={0}>{'(select one)'}</option>
          {shops.map(shop => (
            <option value={shop.id}>{shop.title}</option>
          ))}
        </select>
        <section>
          <label
            htmlFor='shop-previewImg-input'
          >Preview image</label>
          <input
            id="shop-previewImg-input"
            type="file"
            accept="image/*"
            onChange={e => setImageInput(e.target.files[0])}
          />
        </section>
        <section>
          {errors.title
            ?
            <label
              className="error-text"
              htmlFor='shop-title-input'
            >Title is required</label>
            :
            <label
              htmlFor='shop-title-input'
            >Title</label>}
          <input
            id="shop-title-input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </section>
        <section>
          <label
            htmlFor='shop-category-input'
          >Category</label>
          <select
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value={null}>{null}</option>
            <option value='Home & Living'>Home & Living</option>
            <option value='Craft Supplies'>Craft Supplies</option>
          </select>
        </section>
        <section>
          {errors.title
            ?
            <label
              className="error-text"
              htmlFor='shop-title-input'
            >Description is required</label>
            :
            <label
              htmlFor='shop-title-input'
            >Description</label>}
          <input
            id="shop-description-input"
            type="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </section>
        <section>
          <button
            id="create-shop-breadcrumb"
            onClick={() => history.push('/shops')}
          >Cancel</button>
          <button
            id="create-shop-submit"
            type="submit"
          >Create Shop</button>
        </section>
      </form>
    </div>
  );
};
