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
    <div>
      <h1>Delete this shop</h1>
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
          Delete Shop
        </button>
      </form>
    </div>
  );
};
