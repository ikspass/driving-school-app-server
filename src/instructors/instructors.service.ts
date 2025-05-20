import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Instructor } from './instructors.model';
import { Category } from 'src/categories/categories.model';

@Injectable()
export class InstructorsService {

  constructor(
    @InjectModel(Instructor)
    private instructorRepository: typeof Instructor,
  ){}

  async createInstructor(dto: CreateInstructorDto) {
    const instructor = await this.instructorRepository.create(dto);
    return instructor;
  }

  async getAllInstructors() {
    const instructors = await this.instructorRepository.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Category,
          through: {
            attributes: ['categoryId']
          }
        }
      ]
    });
    return instructors;
  }

  async updateInstructorStatus(instructorId: number, status: string){
    const instructor = await this.instructorRepository.findByPk(instructorId);
    if(!instructor){
      throw new HttpException('Инструктор не найден', HttpStatus.NOT_FOUND)
    }

    instructor.status = status;
    await instructor.save();

    return instructor;
  }

  async delete(id: string) {
    return this.instructorRepository.destroy({ where: { id } });
  }
}
