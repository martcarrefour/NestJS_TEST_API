import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { Model, ObtainDocumentType } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}

	async create(dto: CreateReviewDto): Promise<ObtainDocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}
	async delete(id: string): Promise<ObtainDocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ObtainDocumentType<ReviewModel>[] | null> {
		return this.reviewModel.find({ productId }).exec();
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		return this.reviewModel.deleteMany({ productId }).exec();
	}
}
