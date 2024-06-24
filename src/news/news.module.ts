import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './news.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [NewsController],
  imports: [SequelizeModule.forFeature([News])],
  providers: [NewsService],
})
export class NewsModule {}
