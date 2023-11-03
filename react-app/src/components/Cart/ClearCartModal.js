import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteCartItemsThunk } from "../../store/cartItem";

export default function ClearCartModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(deleteCartItemsThunk());
    closeModal();
  };

  return (
    <div>
      <h1>Clear you shopping cart</h1>
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
          Clear cart
        </button>
      </form>
    </div>
  );
};
