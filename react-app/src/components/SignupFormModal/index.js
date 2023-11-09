import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errorObj = {};
		if (!email) {
			errorObj.email = 'Valid email is required';
		};
		if (username.length < 4) {
			errorObj.username = 'Username must be at least 4 characters';
		};
		if (password.length < 8) {
			errorObj.password = 'Password must be at least 8 characters';
		};
		if (confirmPassword.length < 8 || confirmPassword !== password) {
			errorObj.confirmPassword = 'Confirm password must match password';
		};
		const errorObjVals = Object.values(errorObj);
		if (errorObjVals.length) {
			setErrors(errorObj);
			return;
		};

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors({
				password: "Confirm Password field must be the same as the Password field",
			});
		};
	};

	return (
		<div className="session-modal">
			<section className="session-heading-container">
				<h1 className="session-heading">Sign up</h1>
				<OpenModalButton
					buttonText="Log in"
					// onItemClick={closeModal}
					className='register'
					modalComponent={<LoginFormModal />}
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
							htmlFor="signup-email"
							className="session-error"
						>{errors.email}</label>
						:
						<label
							htmlFor="signup-email"
							className="session-field"
						>Email</label>}
					<input
						id="signup-email"
						className="session-input"
						type="email"
						value={email}
						placeholder="Valid email is required"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</section>
				<section className="session-section">
					{errors.username
						?
						<label
							htmlFor="signup-username"
							className="session-error"
						>{errors.username}</label>
						:
						<label
							htmlFor="signup-username"
							className="session-field"
						>Username</label>}
					<input
						id="signup-username"
						className="session-input"
						type="text"
						value={username}
						placeholder="Username must be at least 4 characters"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</section>
				<section className="session-section">
					{errors.password
						?
						<label
							htmlFor="signup-password"
							className="session-error"
							id="password-error"
						>{errors.password}</label>
						:
						<label
							htmlFor="signup-password"
							className="session-field"
						>Password</label>}
					<input
						id="signup-password"
						className="session-input"
						type="password"
						value={password}
						placeholder="Password must be at least 8 characters"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</section>
				<section className="session-section">
					{errors.confirmPassword
						?
						<label
							htmlFor="signup-confirm-password"
							className="session-error"
						>{errors.confirmPassword}</label>
						:
						<label
							htmlFor="signup-confirm-password"
							className="session-field"
						>Confirm password</label>}
					<input
						id="signup-confirm-password"
						className="session-input"
						type="password"
						value={confirmPassword}
						placeholder="Confirm password must match password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</section>
				<button
					className={!email.length ||
						username.length < 4 ||
						password.length < 8 ||
						confirmPassword < 8 ||
						confirmPassword !== password
						?
						'submit-disabled'
						:
						"session-submit"}
					type="submit"
				>Sign up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
