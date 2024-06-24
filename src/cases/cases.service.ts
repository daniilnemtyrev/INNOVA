import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TracksService } from 'src/tracks/tracks.service';
import { Case } from './cases.model';
import { CaseDto } from './dto/cases.dto';
import { GetCasesDto } from './dto/getCases.dto';

interface ICase {
  id: number;
  name: string;
  description: string;
  trackId: string;
}

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(Case) private casesRepository: typeof Case,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getAllCases() {
    const cases = await this.casesRepository.findAll();
    return { data: [...cases], total: cases.length };
  }

  async createCase(dto: CaseDto) {
    const caseDto = await this.casesRepository.create(dto);
    const track = await this.tracksService.getTrackById(dto.trackId);
    const thisTrackCases = await this.getCasesByTrackId(track);

    if (caseDto && track && thisTrackCases.length === 0) {
      await track.$set('cases', [caseDto.id]);
      return caseDto;
    }

    if (caseDto && track && thisTrackCases.length > 0) {
      await track.$add('cases', caseDto.id);
      return caseDto;
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async getCaseById(id: number) {
    const caseItem = await this.casesRepository.findByPk(id);
    return caseItem;
  }

  async getCasesByTrackId(dto: GetCasesDto) {
    const cases = await this.casesRepository.findAll({
      where: { trackId: dto.id },
    });

    return cases;
  }

  async deleteCasesByTrackId(id: number) {
    await this.casesRepository.destroy({
      where: { trackId: id },
    });
  }

  async editCase(dto: CaseDto, id) {
    const caseItem = await this.casesRepository.findByPk(id);

    await caseItem.update({
      name: dto.name,
      trackId: dto.trackId,
      description: dto.description,
    });
    return caseItem;
  }

  async deleteCaseById(id: number) {
    await this.casesRepository.destroy({ where: { id } });
  }
}
