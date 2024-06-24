import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Case } from 'src/cases/cases.model';
import { CasesModule } from 'src/cases/cases.module';

import { TracksController } from './tracks.controller';
import { Track } from './tracks.model';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    SequelizeModule.forFeature([Case, Track]),
    forwardRef(() => CasesModule),
  ],
  exports: [TracksService],
})
export class TracksModule {}
