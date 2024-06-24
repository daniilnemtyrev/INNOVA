import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { Observable } from 'rxjs';
import { SponsorsDto } from './dto/sponsors.dto';
import { Sponsors } from './sponsors.model';
import { SponsorsService } from './sponsors.service';

@Controller('sponsors')
export class SponsorsController {
  constructor(private sponsorService: SponsorsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/sponsors',
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
    @Body() createSponsorDto: SponsorsDto,
  ): Promise<Observable<Sponsors>> {
    return this.sponsorService.create(file, createSponsorDto);
  }

  @Get()
  findAll() {
    return this.sponsorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorService.findOne(+id);
  }

  @Get(':id/image')
  findImage(@Param('id') id: string, @Res() res) {
    return this.sponsorService.findImage(+id, res);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/sponsors',
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
    @Body() updateSponsorsDto: SponsorsDto,
  ) {
    return this.sponsorService.update(+id, updateSponsorsDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsorService.remove(+id);
  }
}
