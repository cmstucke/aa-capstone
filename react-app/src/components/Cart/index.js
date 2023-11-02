import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsThunk } from "../../store/cartItem";
import { getProductsThunk } from "../../store/product";
import { Link } from 'react-router-dom';
import './index.css';


export default function Cart() {
  return (
    <>
      <h1>Shopping Cart</h1>
    </>
  );
};
