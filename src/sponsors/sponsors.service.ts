import { Sponsors } from './sponsors.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SponsorsDto } from './dto/sponsors.dto';
import { of } from 'rxjs';
import { join } from 'path';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectModel(Sponsors) private sponsorsRepository: typeof Sponsors,
  ) {}

  async create(file: Express.Multer.File, createSponsorDto: SponsorsDto) {
    const sponsor = await this.sponsorsRepository.create({
      ...createSponsorDto,
      logo: file.path,
    });
    return of(sponsor);
  }

  async findAll() {
    const sponsors = await this.sponsorsRepository.findAll();
    return { data: [...sponsors], total: sponsors.length };
  }

  async findOne(id: number) {
    const sponsor = await this.sponsorsRepository.findByPk(id);
    return sponsor;
  }

  async findImage(id: number, res) {
    const sponsor = await this.sponsorsRepository.findByPk(id);
    return of(res.sendFile(join(process.cwd(), sponsor.logo)));
  }

  async update(
    id: number,
    updateSponsorDto: SponsorsDto,
    file: Express.Multer.File,
  ) {
    const sponsor = await this.sponsorsRepository.findByPk(id);

    await sponsor.update({
      ...updateSponsorDto,
      logo: file?.path,
    });
    return sponsor;
  }

  async remove(id: number) {
    await this.sponsorsRepository.destroy({ where: { id } });
  }
}
