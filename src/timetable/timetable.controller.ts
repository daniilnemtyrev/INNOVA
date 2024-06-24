import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableDto } from './dto/timetable.dto';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  create(@Body() createTimetableDto: TimetableDto) {
    return this.timetableService.create(createTimetableDto);
  }

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timetableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimetableDto: TimetableDto) {
    return this.timetableService.update(+id, updateTimetableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timetableService.remove(+id);
  }
}
