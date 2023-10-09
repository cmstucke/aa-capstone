import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav id='navbar'>
			<section>
				<NavLink
					id='home'
					exact to="/"
				>Spooky</NavLink>
			</section>
			{isLoaded && (
				<section>
					<ProfileButton user={sessionUser} />
				</section>
			)}
		</nav>
	);
}

export default Navigation;
