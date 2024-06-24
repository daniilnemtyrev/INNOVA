import { Sponsors } from './sponsors.model';
import { SponsorsController } from './sponsors.controller';
import { Module } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [SponsorsController],
  imports: [SequelizeModule.forFeature([Sponsors])],
  providers: [SponsorsService],
})
export class SponsorsModule {}
