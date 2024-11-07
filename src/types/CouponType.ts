export type CouponType = {
	code: string;
	discount: number;
	isRedeemed: boolean;
	userId?: number;
	createdAt: Date;
	updatedAt: Date;
};
