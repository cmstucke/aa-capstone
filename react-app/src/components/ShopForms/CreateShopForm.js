import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createShopThunk } from "../../store/shop";
import { categoryStrs } from "../../assets/helpers/block-text";


export default function CreateShopForm() {
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [preview_image, setPreview_image] = useState(null);
  console.log('PREVIEW IMAGE:', preview_image);
  const [banner_image, setBanner_image] = useState(null);
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('category', category);
    data.append('description', description);
    data.append('preview_image', preview_image);
    data.append('banner_image', banner_image);

    let createdShop;
    try {
      createdShop = await dispatch(createShopThunk(data));
      history.push('/me/shops');
      console.log('CREATED SHOP:', createdShop);
    } catch ({ errors }) {
      console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  return (
    <div className="form-page">
      <h1 className="form-heading">Create a shop</h1>
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
              htmlFor='shop-previewImg-input'
            >Please provide a preview image</label>
            :
            <label
              className="form-label"
              htmlFor='shop-previewImg-input'
            >Preview image</label>}
          <input
            id="shop-previewImg-input"
            className="img-input"
            type="file"
            accept="image/*"
            onChange={e => setPreview_image(e.target.files[0])}
          />
        </section>
        <section className="form-section">
          {errors.banner_image
            ?
            <label
              className="error-text"
              htmlFor='shop-previewImg-input'
            >Please provide a banner image</label>
            :
            <label
              className="form-label"
              htmlFor='shop-previewImg-input'
            >Banner image</label>}
          <div className="img-input-container">
            <input
              id="shop-img-1"
              className="img-input"
              type="file"
              accept="image/*"
              onChange={e => setBanner_image(e.target.files[0])}
            />
          </div>
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
            placeholder="What is the title of your shop?"
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
        <section
          className="form-section"
          id="form-description"
        >
          {errors.title
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
            placeholder="Please write at least 30 characters"
            onChange={e => setDescription(e.target.value)}
          />
        </section>
        <section className="form-submit-section">
          <button
            id="create-shop-breadcrumb"
            type="button"
            onClick={() => history.push('/me/shops')}
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
