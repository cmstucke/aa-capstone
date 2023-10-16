import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateShopThunk, getShopsThunk } from "../../store/shop";
import { categoryStrs } from "../../assets/helpers/block-text";
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
  const [previewInput, setPreviewInput] = useState('');
  const [bannerInput, setBannerInput] = useState('');
  const [preview_image, setPreview_image] = useState('');
  const [banner_image, setBanner_image] = useState('');
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getShopsThunk())
      .then(() => setIsLoaded(true));
  }, []);

  if (isLoaded && shop?.owner_id !== sessionUser?.id) {
    history.push('/shops');
  };

  useEffect(() => {
    if (shop) {
      setTitle(shop.title);
      setCategory(shop.category);
      setDescription(shop.description);
      setPreview_image(shop.preview_image);
      setBanner_image(shop.banner_image);
    };
  }, [shop]);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('category', category);
    data.append('description', description);
    data.append('preview_image', previewInput);
    data.append('banner_image', bannerInput);

    try {
      await dispatch(
        updateShopThunk(
          shop_id,
          data
        ));
      history.push('/me/shops');
    } catch ({ errors }) {
      console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  return (
    <div className="form-page">
      <h1 className="form-heading">Update your shop</h1>
      <form
        id="update-shop-form"
        className="form-body"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section>
          <label
            className="form-label"
            htmlFor='shop-previewImg-input'
          >Preview image</label>
          <input
            id="shop-previewImg-input"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setPreviewInput(e.target.files[0])}
          />
          {preview_image &&
            <p className="img_url">{preview_image}</p>}
        </section>
        <section>
          <label
            className="form-label"
            htmlFor='shop-previewImg-input'
          >Banner image</label>
          <input
            id="shop-previewImg-input"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setBannerInput(e.target.files[0])}
          />
          {preview_image &&
            <p className="img_url">{banner_image}</p>}
        </section>
        <section className="form-section">
          {errors.title
            ?
            <label
              className="error-text"
              htmlFor='shop-title-input'
            >Title is required</label>
            :
            <label
              className="form-label"
              htmlFor='shop-title-input'
            >Title</label>}
          <input
            id="shop-title-input"
            className="form-input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </section>
        <section className="form-section">
          {errors.category
            ?
            <label
              className="error-text"
              htmlFor='shop-category-input'
            >Category selection is required</label>
            :
            <label
              className="form-label"
              htmlFor='shop-category-input'
            >Category</label>}
          <select
            id="shop-category-input"
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
        <section className="form-section">
          {errors?.description
            ?
            <label
              className="error-text"
              htmlFor='shop-title-input'
            >Description is required</label>
            :
            <label
              className="form-label"
              htmlFor='shop-title-input'
            >Description</label>}
          <textarea
            className="form-input"
            id="description-input"
            type="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </section>
      </form>
      <section
        className="form-submit-section"
        id="update-submit-section"
      >
        <div className="form-breadcrumbs">
          <OpenModalButton
            type="button"
            buttonText="Delete Shop"
            className='create-shop-breadcrumb'
            modalComponent={<DeleteShopModal shop_id={shop_id} />}
          />
          <button
            className="create-shop-breadcrumb"
            type="button"
            onClick={() => history.push(`/me/shops`)}
          >Cancel</button>
        </div>
        <button
          id="create-shop-submit"
          type="submit"
          form='update-shop-form'
        >Update Shop</button>
      </section>
    </div>
  );
};
