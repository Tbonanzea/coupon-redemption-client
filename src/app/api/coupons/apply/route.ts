import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/coupons/apply`;
	const body = await request.json();

	const response = await fetch(backendUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}
