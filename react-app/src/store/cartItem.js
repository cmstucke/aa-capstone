// constants
const GET_CART_ITEMS = 'cart_items/GET_CART_ITEMS';
const ADD_CART_ITEM = 'cart_items/ADD_CART_ITEM';
const REMOVE_CART_ITEMS = 'cart_items/REMOVE_CART_ITEMS';
const REMOVE_CART_ITEM = 'cart_items/REMOVE_CART_ITEM';


// Shop Actions
const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
});

const addCartItem = cartItem => ({
  type: ADD_CART_ITEM,
  cartItem
});

const removeCartItems = () => ({
  type: REMOVE_CART_ITEMS
});

const removeCartItem = cartItemId => ({
  type: REMOVE_CART_ITEM,
  cartItemId
});


// CartItem Thunks

// Get all CartItems
export const getCartItemsThunk = () => async dispatch => {
  const res = await fetch('/cart/');
  const data = await res.json();
  dispatch(getCartItems(data));
  return data;
};

// Create a CartItem
export const createCartItemThunk = cartItem => async dispatch => {
  const res = await fetch('/cart/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartItem)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addCartItem(data));
    return data;
  } else {
    const data = await res.json();
    throw data;
  };
};

// Clear all CartItems for a User
export const deleteCartItemsThunk = () => async dispatch => {
  const res = await fetch('/cart/', {
    method: "DELETE"
  });
  const data = await res.json();
  dispatch(removeCartItems());
  return data;
};

// Clear a CartItem by its id
export const deleteCartItemThunk = cartItemId => async dispatch => {
  const res = await fetch(`/cart/${cartItemId}`, {
    method: "DELETE"
  });
  const data = await res.json();
  dispatch(removeCartItem(cartItemId));
  return data;
};


// Initial State
const initialState = {};

// CartItem Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      const getAllState = {};
      action.cartItems.map(cartItem => (
        getAllState[cartItem.id] = {
          ...cartItem
        }));
      return getAllState;
    case ADD_CART_ITEM:
      const addCartItemState = {
        ...state,
        [action.cartItem.id]: { ...action.cartItem }
      };
      return addCartItemState;
    case REMOVE_CART_ITEMS:
      return {};
    case REMOVE_CART_ITEM:
      const removeCartItemState = {};
      const cartItemsArr = Object.values(state);
      cartItemsArr.map(cartItem => (
        removeCartItemState[cartItem.id] = {
          ...cartItem
        }));
      delete removeCartItemState[action.cartItemId];
      return removeCartItemState;
    default:
      return state;
  };
};
