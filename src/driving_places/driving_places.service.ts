import { Injectable } from '@nestjs/common';
import { CreateDrivingPlaceDto } from './dto/create-driving_place.dto';
import { UpdateDrivingPlaceDto } from './dto/update-driving_place.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DrivingPlace } from './driving_places.model';

@Injectable()
export class DrivingPlacesService {
  constructor(@InjectModel(DrivingPlace) private drivingPlaceRepository: typeof DrivingPlace) {}

  async createDrivingPlace(dto: CreateDrivingPlaceDto) {
    const drivingPlace = await this.drivingPlaceRepository.create(dto)
    return drivingPlace;
  }

  async getAllDrivingPlaces() {
    const drivingPlaces = await this.drivingPlaceRepository.findAll({include:{all: true}});
    return drivingPlaces;
  }
}
