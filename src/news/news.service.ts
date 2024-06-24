import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { of } from 'rxjs';
import { NewsDto, UpdateNewsDto } from './dto/news.dto';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsRepository: typeof News) {}

  async create(file: Express.Multer.File, createNewsDto: NewsDto) {
    const news = await this.newsRepository.create({
      ...createNewsDto,
      imagePath: file.path,
    });
    return of(news);
  }

  async findAll() {
    const news = await this.newsRepository.findAll();
    return { data: [...news], total: news.length };
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findByPk(id);
    return news;
  }

  async findImage(id: number, res) {
    const news = await this.newsRepository.findByPk(id);
    return of(res.sendFile(join(process.cwd(), news.imagePath)));
  }

  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    file: Express.Multer.File,
  ) {
    const news = await this.newsRepository.findByPk(id);

    await news.update({
      ...updateNewsDto,
      imagePath: file?.path,
    });
    return news;
  }

  async remove(id: number) {
    await this.newsRepository.destroy({ where: { id } });
  }
}
