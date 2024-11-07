import { CartItemType } from '@/types/CartItemType';

interface CartItemProps {
	item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => (
	<div className="card mb-3 shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden' }}>
		<div className="card-body d-flex justify-content-between align-items-center" style={{ padding: '16px 24px' }}>
			<div>
				<h5 className="card-title" style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
					{item.name}
				</h5>
				<small className="text-muted">Quantity: {item.quantity}</small>
			</div>
			<div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#007bff' }}>
				${(item.price * item.quantity).toFixed(2)}
			</div>
		</div>
	</div>
);

export default CartItem;
