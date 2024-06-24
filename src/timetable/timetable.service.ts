import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimetableDto } from './dto/timetable.dto';
import { Timetable } from './timetable.model';

@Injectable()
export class TimetableService {
  constructor(@InjectModel(Timetable) private timeTableRepository: typeof Timetable,
) {}
  async create(createTimetableDto: TimetableDto) {
    const event = await this.timeTableRepository.create(createTimetableDto);
    return event;
  }

  async findAll() {
    const events = await this.timeTableRepository.findAll();
    return { data: [...events], total: events.length };
  }

  async findOne(id: number) {
    const event = await this.timeTableRepository.findByPk(id);
    return event;
  }

  async update(id: number, updateTimetableDto: TimetableDto) {
    const event = await this.timeTableRepository.findByPk(id);

    await event.update({
      ...updateTimetableDto
    });
    return event;
  }

  async remove(id: number) {
    await this.timeTableRepository.destroy({ where: { id } });
  }
}
