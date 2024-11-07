'use client';
import { useState } from 'react';
import CouponForm from '../../components/CouponForm';
import { applyCoupon, redeemCoupon } from '../../services/CouponService';
import { CouponType } from '@/types/CouponType';

export default function CheckoutPage() {
	const [total, setTotal] = useState(300);
	const [discount, setDiscount] = useState(0);
	const [couponCode, setCouponCode] = useState('');
	const [newCoupon, setNewCoupon] = useState<CouponType | undefined>();

	const handleApplyCoupon = () => {
		try {
			const discountAmount = applyCoupon(couponCode);
			setDiscount(discountAmount);
			setTotal(total - discountAmount);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unknown error occurred');
			}
		}
	};

	const handleCheckout = () => {
		try {
			const newAssignedCoupon = redeemCoupon(couponCode);
			setNewCoupon(newAssignedCoupon);
			alert(
				'Checkout complete! New coupon assigned: ' +
					newAssignedCoupon.code
			);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unknown error occurred');
			}
		}
	};

	return (
		<div>
			<h1>Checkout</h1>
			<p>
				Total: ${total} {discount}
			</p>
			<CouponForm
				couponCode={couponCode}
				setCouponCode={setCouponCode}
				onApply={handleApplyCoupon}
			/>
			<button onClick={handleCheckout} className='btn btn-success mt-3'>
				Complete Checkout
			</button>
			{newCoupon && (
				<div className='alert alert-success mt-3'>
					New Coupon Assigned: {newCoupon.code} (Discount:{' '}
					{newCoupon.discount}%)
				</div>
			)}
		</div>
	);
}
