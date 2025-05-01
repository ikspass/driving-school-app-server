import { Injectable } from '@nestjs/common';
import { CreateDrivingPlaceDto } from './dto/create-driving_place.dto';
import { UpdateDrivingPlaceDto } from './dto/update-driving_place.dto';

@Injectable()
export class DrivingPlacesService {
  create(createDrivingPlaceDto: CreateDrivingPlaceDto) {
    return 'This action adds a new drivingPlace';
  }

  findAll() {
    return `This action returns all drivingPlaces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drivingPlace`;
  }

  update(id: number, updateDrivingPlaceDto: UpdateDrivingPlaceDto) {
    return `This action updates a #${id} drivingPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} drivingPlace`;
  }
}
