import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CasesService } from 'src/cases/cases.service';
import { TrackDto } from './dto/tracks.dto';
import { Track } from './tracks.model';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    private caseService: CasesService,
  ) {}

  async createTrack(dto: TrackDto) {
    const track = await this.trackRepository.create(dto);
    return track;
  }

  async editTask(dto: TrackDto, id) {
    const task = await this.trackRepository.findByPk(id);

    await task.update({
      name: dto.name,
      description: dto.description,
    });
    return task;
  }

  async getAllTracks() {
    const tracks = await this.trackRepository.findAll();
    return { data: [...tracks], total: tracks.length };
  }

  async getTrackById(id: number) {
    const track = await this.trackRepository.findByPk(id);
    return track;
  }

  async deleteTrackById(id: number) {
    await this.caseService.deleteCasesByTrackId(id);
    await this.trackRepository.destroy({ where: { id } });
  }
}
