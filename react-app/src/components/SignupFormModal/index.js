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
	console.log('SIGNUP ERRORS:', errors);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
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
		}
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
						onChange={(e) => setEmail(e.target.value)}
						required
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
						onChange={(e) => setUsername(e.target.value)}
						required
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
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</section>
				<section className="session-section">
					<label
						htmlFor="signup-confirm-password"
						className="session-field"
					>Confirm password</label>
					<input
						id="signup-confirm-password"
						className="session-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</section>
				<button
					className={email.length < 6 ||
						username.length < 4 ||
						password.length < 6 ||
						confirmPassword < 6
						?
						'submit-disabled'
						:
						"session-submit"}
					disabled={email.length < 4 ||
						password.length < 6}
					type="submit"
				>Sign up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
