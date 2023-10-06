import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateShopThunk, getShopsThunk } from "../../store/shop";
import OpenModalButton from '../OpenModalButton';
import DeleteShopModal from "./DeleteShopModal";
import './index.css';


export default function UpdateShopForm() {
  const { shop_id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const shop = useSelector(state => state.shop[shop_id]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getShopsThunk())
      .then(() => setIsLoaded(true));
  }, []);

  if (isLoaded && shop.owner_id !== sessionUser.id) {
    history.push('/shops');
  };

  useEffect(() => {
    if (shop) {
      setTitle(shop.title);
      setCategory(shop.category);
      setDescription(shop.description);
      setimageUrl(shop.preview_image);
    };
  }, [shop]);

  const handleSubmit = async e => {
    e.preventDefault();

    let data;
    let imageBoolean;
    if (imageInput) {
      data = new FormData();
      data.append('title', title);
      data.append('category', category);
      data.append('description', description);
      data.append('preview_image', imageInput);
      imageBoolean = true;
    } else {
      data = {
        title,
        category,
        description
      };
      imageBoolean = false;
    };

    try {
      await dispatch(
        updateShopThunk(
          shop_id,
          data,
          imageBoolean
        ));
      history.push('/shops');
    } catch ({ errors }) {
      // console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  return (
    <div id="create-shop-page">
      <h1>Update your shop</h1>
      <form
        id="update-shop-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
          {imageUrl &&
            <p className="img_url">{imageUrl}</p>}
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
          <input
            id="shop-category-input"
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </section>
        <section>
          {errors.description
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
      </form>
      <div>
        <OpenModalButton
          buttonText="Delete Shop"
          modalComponent={<DeleteShopModal shop_id={shop_id} />}
        />
        <button
          id="create-shop-breadcrumb"
          onClick={() => history.push('/shops')}
        >Cancel</button>
        <button
          id="create-shop-submit"
          type="submit"
          form='update-shop-form'
        >Update Shop</button>
      </div>
    </div>
  );
};
