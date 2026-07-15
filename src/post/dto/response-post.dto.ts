import { Expose, Transform, Type } from "class-transformer";
import { PostDocument } from "../entities/post.entity";
import { Objectid } from "src/_cores/decorators/objectid.decorator";
import { MediaType } from "express";

export class ResponsePostDto {
    @Expose()
    @Objectid()
    _id!: string;
    @Expose()
    backgroundColor!: string;
    @Expose()
    content!: string;
    @Expose()
    privacy!: IPrivacy;
    @Expose()
    //@Type(() => MediaType)
    mediaFiles!: MediaType[];
    @Expose()
    createdAt!: Date;
    @Expose()
    updatedAt!: Date;
    @Expose()
    @Transform(({ obj }: { obj: PostDocument }) => obj.author.id)
    authorId!: string;
    @Expose()
    @Transform(({ obj }: { obj: PostDocument }) => obj.author.name)
    authorName!: string;
    @Expose()
    @Transform(({ obj }: { obj: PostDocument }) => obj.author.email)
    authorEmail!: string;
}