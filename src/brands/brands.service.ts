import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';


@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }
  ]

  create(createBrandDto: CreateBrandDto) {
    const {name} = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.brands.push(brand)

    return 'This action adds a new brand';
  }

  findAll() {
    return this.brands
  }

  findOne(id: string) {
    const brand = this.brands.find(b => b.id === id)
    if(!brand)
      throw new NotFoundException(`Brand with id ${id} not found`)
    return brand
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDB: Brand = this.findOne(id)
    this.brands = this.brands.map(b => {
      if (brandDB.id === id) {
        brandDB.updatedAt = new Date()
        brandDB = {...brandDB, ...updateBrandDto, id}
        return brandDB
      }
      return b
    })

    return `This action updates a #${id} brand`;
  }

  remove(id: string) {
    this.brands = this.brands.filter(b => b.id !== id)
    return `This action removes a #${id} brand`;
  }


  fillBrandsWithSeedData(brands: Brand[]){
    this.brands = brands
  }
}
