import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
//Contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		products.map((product) => {
			//Check that the product is not already included in the cart.
			if (product.id === item.id && !cart.includes(item)) {
				return setCart([...cart, item]);
			}
			return product;
		})
	};

	const removeItem = itemId => {
		return setCart([...cart.filter((item) => item.id !== itemId)])
	}

	useEffect(() => {
		const cartItems = localStorage.getItem('cart-items');
		if (cartItems) {
			setCart(JSON.parse(cartItems));
		}
	}, [])

	// The above useEffect runs on initial render and thus it must be placed before the below useEffect
	useEffect(() => {
		localStorage.setItem('cart-items', JSON.stringify(cart));
	});

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
