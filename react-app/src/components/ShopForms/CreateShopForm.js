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
  const [image1Input, setImage1Input] = useState(null);
  // const [image2Input, setImage2Input] = useState('');
  const [errors, setErrors] = useState({})
  // const [imageLoading, setImageLoading] = useState(false);
  // console.log('ERRORS:', errors);

  const handleSubmit = async e => {
    e.preventDefault();

    let data;
    let imageInputBool;
    if (image1Input) {
      data = new FormData();
      data.append('title', title);
      data.append('category', category);
      data.append('description', description);
      data.append('preview_image', image1Input);
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
      createdShop = await dispatch(createShopThunk(data, imageInputBool));
      history.push('/me/shops');
      console.log('CREATED SHOP:', createdShop);
    } catch ({ errors }) {
      console.log('CAUGHT ERRORS:', errors);
      setErrors(errors);
    };
  };

  return (
    <div id="create-shop-page">
      <h1>Create a shop</h1>
      <form
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
            onChange={e => setImage1Input(e.target.files[0])}
          />
        </section>
        {/* <section>
          <label
            htmlFor='shop-previewImg-input'
          >Preview image</label>
          <input
            id="shop-img-input-2"
            type="file"
            accept="image/*"
            onChange={e => setImage1Input(e.target.files[1])}
          />
        </section> */}
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
          {errors.category
            ?
            <label
              className="error-text"
              htmlFor='shop-category-input'
            >Category selection is required</label>
            :
            <label
              htmlFor='shop-category-input'
            >Category</label>}
          <select
            id="shop-category-input"
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
