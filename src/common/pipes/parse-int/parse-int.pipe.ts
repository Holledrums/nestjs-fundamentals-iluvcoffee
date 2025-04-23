import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log('ParseIntPipe triggered:', value);
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${
          isNaN(val) ? 'NaN' : value
        }" is not an integer. type: ${metadata.type} data: ${metadata.data}`,
      );
    }
    return val;
  }
}
