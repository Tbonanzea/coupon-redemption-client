import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { code } = await request.json();
	try {
		const discount = applyCoupon(code);
		return NextResponse.json({ success: true, discount });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: 'Invalid or redeemed coupon', error },
			{ status: 400 }
		);
	}
}

export async function PATCH(request: Request) {
	const { code } = await request.json();
	try {
		const newCoupon = redeemCoupon(code);
		return NextResponse.json({ success: true, newCoupon });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: 'Coupon not found', error },
			{ status: 400 }
		);
	}
}
