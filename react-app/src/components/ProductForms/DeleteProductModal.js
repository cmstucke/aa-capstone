import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteProductThunk } from "../../store/product";

export default function DeleteProductModal({ product_id, manager }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(deleteProductThunk(product_id))
    if (manager) {
      closeModal();
    } else {
      history.push('/me/products');
      closeModal();
    };
  };

  return (
    <div className="modal-body-1">
      <h1
        className="modal-heading-1"
      >Delete this product</h1>
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
            Delete product
          </button>
        </section>
      </form>
    </div>
  );
};
