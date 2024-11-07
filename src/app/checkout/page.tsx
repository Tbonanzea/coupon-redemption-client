'use client';
import { useState } from 'react';
import CouponForm from '../../components/CouponForm';
import { CouponType } from '@/types/CouponType';

export default function CheckoutPage() {
	const [total, setTotal] = useState(300);
	const [discount, setDiscount] = useState(0);
	const [couponCode, setCouponCode] = useState<string | undefined>();
	const [newCoupon, setNewCoupon] = useState<CouponType | undefined>();
	const [message, setMessage] = useState<string | null>(null);

	const handleApplyCoupon = async () => {
		try {
			const response = await fetch('/api/apply', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code: couponCode }),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				const discountAmount = data.discount;
				setDiscount(discountAmount);
				setTotal(total - discountAmount);
				setMessage(`Coupon applied! Discount: $${discountAmount}`);
			} else {
				setMessage(data.message || 'Failed to apply coupon');
			}
		} catch (error) {
			setMessage(`An error occurred while applying coupon: ${error}`);
		}
	};

	const handleCheckout = async () => {
		try {
			const response = await fetch('/api/redeem', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code: couponCode }),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				setNewCoupon(data.newCoupon);
				alert(
					`Checkout complete! New coupon assigned: ${data.newCoupon.code}`
				);
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
					New Coupon Assigned: {newCoupon.code} (Discount:{' '}
					{newCoupon.discount}%)
				</div>
			)}
		</div>
	);
}
