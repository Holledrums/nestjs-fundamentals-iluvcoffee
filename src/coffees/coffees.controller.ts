import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

import { Coffee } from './entities/coffee.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public/public.decorator';
import { CustomParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  @UsePipes(ValidationPipe)
  @Get()
  @Public()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Headers('authorization') _authHeader: string,
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeesService.findAll(paginationQuery);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    console.log('coffeeID: ', id);
    return { message: `Du hast die ID ${id} eingegeben.` };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee = this.coffeesService.create(createCoffeeDto);
    return newCoffee;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
