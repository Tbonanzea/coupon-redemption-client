'use client';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('/products.json')
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	return (
		<div>
			<h1>Products</h1>
			<ProductList products={products} />
		</div>
	);
}
