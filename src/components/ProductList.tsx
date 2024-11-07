const ProductList = ({ products }) => (
	<div className='row'>
		{products.map((product) => (
			<div key={product.id} className='col-md-4'>
				<div className='card mb-4'>
					<div className='card-body'>
						<h5 className='card-title'>{product.name}</h5>
						<p className='card-text'>${product.price}</p>
						<button className='btn btn-primary'>Add to Cart</button>
					</div>
				</div>
			</div>
		))}
	</div>
);

export default ProductList;
