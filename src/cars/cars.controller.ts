import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get('/:id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    const car = this.carsService.findOneById(id);
    if (!car) throw new NotFoundException('Car does not exist');
    return car;
  }

  @Post()
  // @UsePipes( ValidationPipe )
  addCar(@Body() createCarDto: CreateCarDto) {
    this.carsService.createCar(createCarDto)
    return {
      message: 'Car added successfully',
      car: createCarDto
    };
  }

  @Patch('/:id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carsService.updateCar(id, updateCarDto)
  }

  @Delete('/:id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id)
  }


}
