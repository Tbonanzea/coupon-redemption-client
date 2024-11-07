import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/redeem`;

	const response = await fetch(backendUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(await request.json()),
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}
