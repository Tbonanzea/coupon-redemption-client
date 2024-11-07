interface CouponFormProps {
	couponCode: string;
	setCouponCode: React.Dispatch<React.SetStateAction<string | undefined>>;
	onApply: () => void;
}

const CouponForm = ({
	couponCode,
	setCouponCode,
	onApply,
}: CouponFormProps) => (
	<div>
		<input
			type='text'
			value={couponCode}
			onChange={(e) => setCouponCode(e.target.value)}
			className='form-control'
			placeholder='Enter coupon code'
		/>
		<button onClick={onApply} className='btn btn-info mt-2'>
			Apply Coupon
		</button>
	</div>
);

export default CouponForm;
