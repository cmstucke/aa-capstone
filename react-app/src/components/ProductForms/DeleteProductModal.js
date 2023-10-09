import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteProductThunk } from "../../store/product";

export default function DeleteProductModal({ product_id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    history.push('/products');
    dispatch(deleteProductThunk(product_id));
    closeModal();
  };

  return (
    <div>
      <h1>Delete this product</h1>
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
          Delete product
        </button>
      </form>
    </div>
  );
};
