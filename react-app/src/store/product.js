// constants
const GET_PRODUCTS = 'products/GET_PRODUCTS';
// const ADD_PRODUCT = 'products/ADD_PRODUCT';
// const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT';


// Product Actions
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
});

// const addProduct = product => ({
//   type: ADD_PRODUCT,
//   product
// });

// const removeProduct = productId => ({
//   type: REMOVE_PRODUCT,
//   productId
// });


// Product Thunks

// Get all Products
export const getProductsThunk = () => async dispatch => {
  const res = await fetch('/products/');
  const data = await res.json();
  dispatch(getProducts(data));
  return data;
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
    default:
      return state;
  };
};
