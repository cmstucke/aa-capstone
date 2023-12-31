import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <section id="profile-section">
      {user &&
        <NavLink
          id='shop-manager-link'
          className='tooltip'
          to='/me/shops'
        >
          <i className="fas fa-store" />
          <span class="tooltiptext">Manage your shops and products</span>
        </NavLink>}
      {user &&
        <NavLink
          id='cart-link'
          className='tooltip'
          to='/me/cart'
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {/* <i class="fa-solid fa-tags" /> */}
          <span class="tooltiptext">Manage your items for purchase</span>
        </NavLink>}
      <button
        id="profile-button"
        onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p
              id="drop-down-username"
              className="drop-down-text"
            >{user.username}</p>
            <p className="drop-down-text">{user.email}</p>
            <Link
              id='sign-out-link'
              onClick={handleLogout}
            >
              <section id="log-out-section">
                <p
                  id="log-out"
                  className="drop-down-text"
                >Sign out</p>
              </section>
            </Link>
          </>
        ) : (
          <div id="unauthenticated-dropdown">
            <OpenModalButton
              buttonText="Log In"
              className='register'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              className='register'
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfileButton;
