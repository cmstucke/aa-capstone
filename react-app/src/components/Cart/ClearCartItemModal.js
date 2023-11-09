import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteCartItemThunk } from "../../store/cartItem";

export default function ClearCartItemModal({ cart_item_id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(deleteCartItemThunk(cart_item_id));
    closeModal();
  };

  return (
    <div className="modal-body-1">
      <h1
        className="modal-heading-1"
      >Clear this item</h1>
      <form
        className="modal-form-1"
        onSubmit={handleSubmit}
      >
        <section className="modal-buttons-1">
          <button
            className="register"
            onClick={closeModal}
          >Cancel</button>
          <button
            className="register"
            type="submit"
          >Clear item</button>
        </section>
      </form>
    </div>
  );
};
