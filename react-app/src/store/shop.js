// constants
const GET_SHOPS = 'shops/GET_SHOPS';
const ADD_SHOP = 'shops/ADD_SHOP';
const REMOVE_SHOP = 'shops/REMOVE_SHOP';


// Shop Actions
const getShops = shops => ({
  type: GET_SHOPS,
  shops
});

const addShop = shop => ({
  type: ADD_SHOP,
  shop
});

const removeShop = shopId => ({
  type: REMOVE_SHOP,
  shopId
});


// Shop Thunks

// Get all Shops
export const getShopsThunk = () => async dispatch => {
  const res = await fetch('/shops/');
  const data = await res.json();
  dispatch(getShops(data));
  return data;
};

// Get all Shops created by current user
export const getUserShopsThunk = () => async dispatch => {
  const res = await fetch('/api/users/shops');
  const data = await res.json();
  console.log('USER SHOPS FETCH RES:', data);
  dispatch(getShops(data));
  return data;
};

// Create a Shop
export const createShopThunk = (shop, previewImg) => async dispatch => {
  let res;
  if (previewImg) {
    res = await fetch('/shops/', {
      method: "POST",
      body: shop
    });
  } else {
    res = await fetch('/shops/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shop)
    });
  };
  if (res.ok) {
    const data = await res.json();
    dispatch(addShop(data));
    return data;
  } else {
    const errors = await res.json();
    throw errors;
  };
};

// Update a Shop
export const updateShopThunk = (
  shopId,
  shop,
  preview_image) => async dispatch => {
    let res;
    if (preview_image) {
      res = await fetch(`/shops/${shopId}`, {
        method: "PUT",
        body: shop
      });
    } else {
      res = await fetch(`/shops/${shopId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shop)
      });
    };
    if (res.ok) {
      const data = await res.json();
      dispatch(addShop(data));
      return data;
    } else {
      const errors = await res.json();
      throw errors;
    };
  };

// Delete a shop by its id
export const deleteShopThunk = shopId => async dispatch => {
  const res = await fetch(`/shops/${shopId}`, {
    method: "DELETE"
  });
  const data = await res.json();
  dispatch(removeShop(shopId));
  return data;
};


// Initial State
const initialState = {};

// Shop Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHOPS:
      const getAllState = {};
      action.shops.map(shop => (
        getAllState[shop.id] = {
          ...shop
        }));
      return getAllState;
    case ADD_SHOP:
      const addShopState = {
        ...state,
        [action.shop.id]: { ...action.shop }
      };
      return addShopState;
    case REMOVE_SHOP:
      const removeShopState = {};
      const shopsArr = Object.values(state);
      shopsArr.map(shop => (
        removeShopState[shop.id] = {
          ...shop
        }));
      delete removeShopState[action.shopId];
      return removeShopState;
    default:
      return state;
  };
};
