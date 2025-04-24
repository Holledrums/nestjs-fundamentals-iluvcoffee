import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log('ParseIntPipe triggered:', value);
    if (typeof value !== 'string') {
      throw new BadRequestException(
        `Validation failed. "${value}" is not a string.`,
      );
    }
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
