import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
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
			<section id='personal-links-container'>
				<p id='personal-links-name'>Christopher Stucke</p>
				<a
					href='https://github.com/cmstucke'
					target='_blank'
					className='personal-link-wrap'
				>
					<FontAwesomeIcon className='personal-link' icon={faGithub} />
				</a>
				<a
					href='https://www.linkedin.com/in/chris-stucke-1884b515b/'
					target='_blank'
					className='personal-link-wrap'
				>
					<FontAwesomeIcon className='personal-link' icon={faLinkedinIn} />
				</a>
			</section>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</nav>
	);
}

export default Navigation;
