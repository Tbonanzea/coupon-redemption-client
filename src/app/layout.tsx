import '../styles/globals.css';

export const metadata = {
	title: 'Shopping Cart',
	description: 'Shopping cart with coupon functionality',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<main className='container my-4'>{children}</main>
			</body>
		</html>
	);
}
