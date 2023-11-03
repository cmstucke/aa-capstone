import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteCartItemThunk } from "../../store/cartItem";

export default function ClearCartItemModal({ cart_item_id }) {
  console.log('CART ITEM ID:', cart_item_id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(deleteCartItemThunk(cart_item_id));
    closeModal();
  };

  return (
    <div>
      <h1>Delete this item from your cart</h1>
      <form
        onSubmit={handleSubmit}
      >
        <button
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
        >
          Clear item
        </button>
      </form>
    </div>
  );
};
