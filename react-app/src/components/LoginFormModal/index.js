import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // console.log('LOGIN ERRORS:', data);
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoUser = async () => {
    const email = 'demo@aa.io';
    const password = 'password';
    dispatch(login(email, password));
    closeModal();
  };

  return (
    <div className="session-modal">
      <section className="session-heading-container">
        <h1 className="session-heading">Log in</h1>
        <OpenModalButton
          buttonText="Register"
          // onItemClick={closeModal}
          className='register'
          modalComponent={<SignupFormModal />}
        />
      </section>
      <form
        className="session-form"
        onSubmit={handleSubmit}
      >
        <section className="session-section">
          {errors.email
            ?
            <label
              htmlFor="login-email"
              className="session-error"
            >{errors.email}</label>
            :
            <label
              htmlFor="login-email"
              className="session-field"
            >Email</label>}
          <input
            id="login-email"
            className="session-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>
        <section className="session-section">
          {errors.password
            ?
            <label
              htmlFor="login-password"
              className="session-error"
            >{errors.password}</label>
            :
            <label
              htmlFor="login-password"
              className="session-field"
            >Password</label>}
          <input
            id="login-password"
            className="session-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <button
          className="session-submit"
          type="button"
          onClick={demoUser}
        >Demo User</button>
        <button
          className={email.length < 6 ||
            password.length < 6
            ?
            'submit-disabled'
            :
            "session-submit"}
          disabled={email.length < 4 ||
            password.length < 6}
          type="submit"
        >Log In</button>
      </form>
    </div>
  );
};

export default LoginFormModal;
