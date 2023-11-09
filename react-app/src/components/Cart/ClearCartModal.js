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
    <div className="modal-body-1">
      <h1
        className="modal-heading-1"
      >Clear your cart</h1>
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
          >Clear cart</button>
        </section>
      </form>
    </div>
  );
};
