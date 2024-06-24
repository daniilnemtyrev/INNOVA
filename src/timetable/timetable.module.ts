import { Timetable } from './timetable.model';
import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TimetableController],
  imports: [
    SequelizeModule.forFeature([Timetable]),
  ],
  providers: [TimetableService]
})
export class TimetableModule {}
