import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
	Coureses,
	Services,
	Books,
	Products,
}

@Schema()
export class HhData {
	@Prop()
	count: number;
	@Prop()
	juniorSalary: number;
	@Prop()
	middleSalary: number;
	@Prop()
	seniorSalary: number;
}

export const HhDataSchema = SchemaFactory.createForClass(HhData);

@Schema()
export class TopPageAdvantage {
	@Prop()
	title: string;
	@Prop()
	description: string;
}

export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);

@Schema({ timestamps: true, _id: true, collection: 'topPages' })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;
	@Prop()
	secondCategory: string;
	@Prop({ unique: true })
	alias: string;
	@Prop()
	title: string;
	@Prop()
	category: string;
	@Prop({ type: HhDataSchema })
	hh?: HhData;
	@Prop({ type: [TopPageAdvantageSchema] })
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;
	@Prop()
	tagsTitle: string;
	@Prop({ type: [String] })
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
TopPageSchema.index({ title: 'text', seoText: 'text' });
// TopPageSchema.index({ '$**': 'text' });
