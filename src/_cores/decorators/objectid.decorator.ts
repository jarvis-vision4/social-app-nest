import { SetMetadata } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const Objectid = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return Transform((value) => value.obj._id.toString());
};
