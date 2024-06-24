import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TrackDto } from './dto/tracks.dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get('')
  getAll() {
    return this.trackService.getAllTracks();
  }

  @Post('')
  create(@Body() trackDto: TrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @Patch(':id')
  editTask(@Param('id') id: number, @Body() trackDto: TrackDto) {
    return this.trackService.editTask(trackDto, id);
  }

  @Get(':id')
  getTrackById(@Param('id') id: number) {
    return this.trackService.getTrackById(id);
  }

  @Delete(':id')
  deleteTrackById(@Param('id') id: number) {
    this.trackService.deleteTrackById(id);
  }
}
