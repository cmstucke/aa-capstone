// constants
const GET_PRODUCTS = 'products/GET_PRODUCTS';
const ADD_PRODUCT = 'products/ADD_PRODUCT';
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT';


// Product Actions
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
});

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
});

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
});


// Product Thunks

// Get all Products
export const getProductsThunk = () => async dispatch => {
  const res = await fetch('/products/');
  const data = await res.json();
  dispatch(getProducts(data));
  return data;
};

// Get all Products created by current user
export const getUserProductsThunk = () => async dispatch => {
  const res = await fetch('/api/users/products');
  const data = await res.json();
  dispatch(getProducts(data));
  return data;
};

// Create a Product
export const createProductThunk = product => async dispatch => {
  const res = await fetch('/products/', {
    method: "POST",
    body: product
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addProduct(data));
    return data;
  } else {
    const errors = await res.json();
    throw errors;
  };
};

// Update a Product
export const updateProductThunk = (productId, product) => async dispatch => {
  const res = await fetch(`/products/${productId}`, {
    method: "PUT",
    body: product
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addProduct(data));
    return data;
  } else {
    const errors = await res.json();
    throw errors;
  };
};

// Delete a product by its id
export const deleteProductThunk = productId => async dispatch => {
  const res = await fetch(`/products/${productId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeProduct(productId));
    return data;
  } else {
    const data = await res.json();
    throw data;
  };
};


// Get all non-preview images of a Product by its id
export const getProductImagesThunk = productId => async () => {
  const res = await fetch(`/products/${productId}/images`);
  const data = await res.json();
  const images = data.filter(image => !image.preview_image);
  return images;
};


// Initial State
const initialState = {};

// Product Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      const getAllState = {};
      for (const product of action.products) {
        if (product.seller_id !== 0) {
          getAllState[product.id] = { ...product };
        };
      };
      return getAllState;
    case ADD_PRODUCT:
      const addProductState = {
        ...state,
        [action.product.id]: { ...action.product }
      };
      return addProductState;
    case REMOVE_PRODUCT:
      const removeProductState = {};
      const productsArr = Object.values(state);
      productsArr.map(product => (
        removeProductState[product.id] = {
          ...product
        }));
      delete removeProductState[action.productId];
      return removeProductState;
    default:
      return state;
  };
};
