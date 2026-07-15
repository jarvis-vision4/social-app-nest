import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors,
} from '@nestjs/common';
import * as classTransformer from 'class-transformer';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function TransformDTO<T>(dto: classTransformer.ClassConstructor<T>) {
    return UseInterceptors(new TransformDTOInterceptor(dto));
}
@Injectable()
export class TransformDTOInterceptor<T> implements NestInterceptor {
    constructor(private readonly dtoClass: classTransformer.ClassConstructor<T>) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const isAuthenticationUrl = request.path.includes('auth');
        return next.handle().pipe(
            map((data) => {
                console.log(data);
                if (data && Object.prototype.hasOwnProperty.call(data, 'hasNextPage')) {
                    const { items, hasNextPage, cursor } = data;
                    return {
                        message: 'success',
                        data: classTransformer.plainToInstance(this.dtoClass, items, {
                            excludeExtraneousValues: true,
                        }),
                        hasNextPage,
                        cursor,
                    };
                }
                if (isAuthenticationUrl) {
                    const { user, accessToken } = data;
                    return {
                        message: 'success',
                        data: classTransformer.plainToInstance(this.dtoClass, user, {
                            excludeExtraneousValues: true,
                        }),
                        accessToken: accessToken,
                    };
                }


                return {
                    message: 'success',
                    data: classTransformer.plainToInstance(this.dtoClass, data, {
                        excludeExtraneousValues: true,
                    }),
                };
            }),
        );
    }
}