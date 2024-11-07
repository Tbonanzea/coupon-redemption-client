'use client';
import { useEffect, useState } from 'react';
import CouponForm from '../../components/CouponForm';
import { ProductType } from '@/types/ProductType';

export default function CheckoutPage() {
	const user = 'test@test.com';
	const userId = '1234';
	const [total, setTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [couponCode, setCouponCode] = useState<string | undefined>();
	const [newCoupon, setNewCoupon] = useState<string | undefined>();
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		fetch('/api/products')
			.then((res) => res.json())
			.then((data) =>
				setTotal(
					data.reduce(
						(acc: number, p: ProductType) =>
							acc + p.price * p.quantity,
						0
					)
				)
			)
			.catch((error) =>
				console.error('Failed to fetch products:', error)
			);
	}, []);

	const handleApplyCoupon = async () => {
		try {
			const response = await fetch('/api/coupons/apply', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId, code: couponCode }),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				const discountPercentage = data.discount;
				setDiscount(total * (discountPercentage / 100));
				setTotal(total * (1 - discountPercentage / 100));
				setMessage(
					`Coupon applied! Discount: $${
						total * (discountPercentage / 100)
					}`
				);
			} else {
				setMessage(data.message || 'Failed to apply coupon');
			}
		} catch (error) {
			setMessage(`An error occurred while applying coupon: ${error}`);
		}
	};

	const handleCheckout = async () => {
		try {
			await fetch('/api/coupons/redeem', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId, code: couponCode }),
			});

			const response = await fetch('/api/coupons/assign', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId }),
			});

			const data = await response.json();

			if (response.ok && data.couponCode) {
				setNewCoupon(data.couponCode);
			} else {
				setMessage(data.message || 'Failed to complete checkout');
			}
		} catch (error) {
			setMessage(`An error occurred while completing checkout: ${error}`);
		}
	};

	return (
		<div>
			<h1>Checkout</h1>
			<h3>User: {user}</h3>
			<p>
				Total: ${total} {discount > 0 && `(Discount: $${discount})`}
			</p>
			<CouponForm
				couponCode={couponCode || ''}
				setCouponCode={setCouponCode}
				onApply={handleApplyCoupon}
			/>
			<button onClick={handleCheckout} className='btn btn-success mt-3'>
				Complete Checkout
			</button>
			{message && <p>{message}</p>}
			{newCoupon && (
				<div className='alert alert-success mt-3'>
					New Coupon Assigned: {newCoupon}
				</div>
			)}
		</div>
	);
}
