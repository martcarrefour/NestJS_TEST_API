import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductModel } from 'src/product/product.model';

@Schema({ timestamps: true, collection: 'reviews' })
export class ReviewModel {
	@Prop()
	name: string;
	@Prop()
	title: string;
	@Prop()
	description: string;

	@Prop()
	rating: number;
	@Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: ProductModel.name })
	productId: string;
}
export type ReviewDocument = HydratedDocument<ReviewModel>;
export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
