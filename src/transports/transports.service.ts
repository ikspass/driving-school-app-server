import { Injectable } from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { Transport } from './transports.model';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesService } from 'src/categories/categories.service';
import { InstructorsService } from 'src/instructors/instructors.service';
import { Instructor } from 'src/instructors/instructors.model';
import { User } from 'src/users/users.model';

@Injectable()
export class TransportsService {
  constructor(@InjectModel(Transport)
    private transportRepository: typeof Transport,
    private categoryService: CategoriesService,
    private instructorService: InstructorsService
  ) {}

  async createTransport(dto: CreateTransportDto) {
    const transport = await this.transportRepository.create(dto)
    const category = await this.categoryService.getCategoryByValue(dto.categoryValue)
    if(category){
      await transport.$set('category', category.id)
      transport.category = category;
      await transport.save();
    }
    return transport;
  }

  async updateTransportInstructor(transportId: number, instructorId: number) {
    const transport = await this.transportRepository.findByPk(transportId); // Get current transport
    const instructor = await this.instructorService.getInstructorById(instructorId);
  
    if (transport && instructor) {
      const newCategoryId = transport.categoryId;
      console.log('newCategoryId: ', newCategoryId);
  
      // Find the current transport of the instructor with the same category
      const existingTransport = await this.transportRepository.findOne({
        where: {
          instructorId: instructor.id,
          categoryId: newCategoryId
        }
      });
      console.log('existingTransport: ', existingTransport);
  
      // If there is an existing transport, set its instructor to null
      if (existingTransport) {
        if (existingTransport.id !== transport.id) { // Avoid nulling the current transport
          existingTransport.instructor = null;
          existingTransport.instructorId = null;
          await existingTransport.save();
        }
      }
  
      await transport.$set('instructor', instructor.id);
      transport.instructor = instructor;
      await transport.save();
      console.log(`Assigned instructor ID: ${instructor.id} to transport ID: ${transport.id}`);
    } else {
      console.log('Transport or instructor not found');
    }
  
    return transport;
  }

  async getAllTransports() {
    const transport = await this.transportRepository.findAll({
      order: [['id', 'ASC']],
      include:[
       {all: true},
       {model: Instructor, include: [{model: User}]}
      ]
    });
    return transport;
  }

  async getTransportById(id: number) {
    const transport = await this.transportRepository.findByPk(id, {
      order: [['id', 'ASC']],
      include:[
        {all: true},
        {model: Instructor, include: [{model: User}]}
       ]
    });
    return transport;
  }

  async deleteTransport(id: string) {
    return this.transportRepository.destroy({ where: { id } });
  }
}
