'use client';
import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { CartItemType } from '../types/CartItemType';

export default function CartPage() {
	const [cart, setCart] = useState<CartItemType[]>([]);

	useEffect(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) => setCart(data))
			.catch((error) =>
				console.error('Failed to fetch products:', error)
			);
	}, []);

	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart.map((item) => (
				<CartItem key={item.id} item={item} />
			))}
			<a href='/checkout' className='btn btn-primary'>
				Proceed to Checkout
			</a>
		</div>
	);
}
