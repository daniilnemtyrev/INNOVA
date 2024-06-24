import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto, UpdateNewsDto } from './dto/news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { parse } from 'path';
import { News } from './news.model';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/news',
        filename: (req, file, cb) => {
          const fileName: string = parse(file.originalname).name.replace(
            /\s/g,
            '',
          );
          const extension: string = parse(file.originalname).ext;

          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: NewsDto,
  ): Promise<Observable<News>> {
    return this.newsService.create(file, createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Get(':id/image')
  findImage(@Param('id') id: string, @Res() res) {
    return this.newsService.findImage(+id, res);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/news',
        filename: (req, file, cb) => {
          const fileName: string = parse(file.originalname).name.replace(
            /\s/g,
            '',
          );
          const extension: string = parse(file.originalname).ext;

          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(+id, updateNewsDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
