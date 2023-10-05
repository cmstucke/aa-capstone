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
  // console.log("YOU'VE MADE IT TO THE GET SHOPS THUNK");
  const res = await fetch('/shops');
  const data = await res.json();
  // console.log("GET SHOPS FETCH RES:", data);
  dispatch(getShops(data));
  return data;
};

// Create a Shop
export const createShopThunk = (shop, previewImg) => async dispatch => {
  console.log("YOU'VE MADE IT TO THE CREATE SHOPS THUNK");
  let res;
  if (previewImg) {
    res = await fetch('/shops', {
      method: "POST",
      body: shop
    });
  } else {
    res = await fetch('/shops', {
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
      // console.log("YOU'VE MADE IT TO THE GET SHOPS REDUCER");
      const getAllState = {};
      // console.log('ACTION SHOPS:', action.shops);
      action.shops.map(shop => (
        getAllState[shop.id] = {
          ...shop
        }));
      return getAllState;
    case ADD_SHOP:
      console.log("YOU'VE MADE IT TO THE CREATE SHOPS THUNK");
      console.log("CREATE SHOP REDUCER STATE:", state);
      const addShopState = {};
      return state;
    default:
      return state;
  };
};
