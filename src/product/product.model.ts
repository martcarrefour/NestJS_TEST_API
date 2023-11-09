import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema()
export class ProductCharacteristics {
	@Prop()
	name: string;
	@Prop()
	value: string;
}
export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristics);

@Schema({ timestamps: true, collection: 'products' })
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop({ type: [String] })
	categories: string[];

	@Prop({ type: [String] })
	tags: string[];

	@Prop({ type: [ProductCharacteristicSchema], _id: false })
	characteristics: ProductCharacteristics[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
