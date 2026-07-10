import { Expose } from "class-transformer";

export class ResponseAuthDto {
    @Expose()
    _id!: string;
    @Expose()
    name!: string;
    @Expose()
    email!: string;
}