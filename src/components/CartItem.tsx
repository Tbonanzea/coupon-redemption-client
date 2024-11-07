const CartItem = ({ item }) => (
	<div className='card mb-3'>
		<div className='card-body d-flex justify-content-between'>
			<span>
				{item.name} (x{item.quantity})
			</span>
			<span>${item.price * item.quantity}</span>
		</div>
	</div>
);

export default CartItem;
