import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'honda',
    //   model: 'civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'volvo',
    //   model: 'cx40',
    // },
  ];
  findAll() {
    return this.cars;
  }
  findOneById(id: string) {
    const car = this.cars.find((c) => c.id === id);
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    this.cars.push({ ...createCarDto, id: uuid() });
    return createCarDto;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        console.log(carDB);

        return carDB;
      }
      return car;
    });

    return carDB;
  }

  deleteCar(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter(c => c.id !== car.id)
    return car;
  }

  fillCarsWithSeedData(cars: Car[]){
    this.cars = cars
  }

}
