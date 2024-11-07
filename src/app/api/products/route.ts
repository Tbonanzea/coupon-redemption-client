import { NextResponse } from 'next/server';
import { getProducts } from '../../../services/ProductService';

export async function GET() {
	try {
		const products = await getProducts();
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: 'Failed to fetch products', error },
			{ status: 500 }
		);
	}
}
