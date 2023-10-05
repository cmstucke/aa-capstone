import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createShopThunk } from "../../store/shop";


export default function CreateShopForm() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState({})
  // const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    let data;
    let imageInputBool;
    if (imageInput) {
      data = new FormData();
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
      createdShop = await dispatch(createShopThunk(data, imageInputBool));
      history.push('/shops');
    } catch (errRes) {
      console.log('CAUGHT ERRORS:', errRes);
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
            onChange={e => setImageInput(e.target.files[0])}
          />
        </section>
        <section>
          <label
            htmlFor='shop-title-input'
          >Title</label>
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
          <label
            htmlFor='shop-description-input'
          >Description</label>
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
  )
};