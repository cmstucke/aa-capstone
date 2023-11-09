import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteShopThunk } from "../../store/shop";

export default function DeleteShopModal({ shop_id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    history.push('/me/shops');
    dispatch(deleteShopThunk(shop_id));
    closeModal();
  };

  return (
    <div className="modal-body-1">
      <h1
        className="modal-heading-1"
      >Delete this shop</h1>
      <form
        className="modal-form-1"
        onSubmit={handleSubmit}
      >
        <section className="modal-buttons-1">
          <button
            className="register"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="register"
            type="submit"
          >
            Delete shop
          </button>
        </section>
      </form>
    </div>
  );
};
