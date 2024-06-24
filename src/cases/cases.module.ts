import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Track } from 'src/tracks/tracks.model';
import { TracksModule } from 'src/tracks/tracks.module';
import { CasesController } from './cases.controller';
import { Case } from './cases.model';
import { CasesService } from './cases.service';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [
    SequelizeModule.forFeature([Case, Track]),
    forwardRef(() => TracksModule),
  ],
  exports: [CasesService],
})
export class CasesModule {}
