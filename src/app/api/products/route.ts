import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
	try {
		// Define the path to the products.json file in the public directory
		const filePath = path.join(process.cwd(), 'public', 'products.json');

		// Read and parse the file
		const fileData = await fs.readFile(filePath, 'utf-8');
		const products = JSON.parse(fileData);

		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch products',
				error,
			},
			{ status: 500 }
		);
	}
}
