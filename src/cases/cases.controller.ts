import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { CaseDto } from './dto/cases.dto';
import { GetCasesDto } from './dto/getCases.dto';

@Controller('cases')
export class CasesController {
  constructor(private caseService: CasesService) {}

  @Post('/getCasesByTrackId')
  getCasesByTrackId(@Body() data: GetCasesDto) {
    return this.caseService.getCasesByTrackId(data);
  }

  @Post('')
  create(@Body() caseDto: CaseDto) {
    return this.caseService.createCase(caseDto);
  }

  @Get()
  getAll() {
    return this.caseService.getAllCases();
  }

  @Get(':id')
  getCaseById(@Param('id') id: number) {
    return this.caseService.getCaseById(id);
  }

  @Patch(':id')
  editCase(@Param('id') id: number, @Body() caseDto: CaseDto) {
    return this.caseService.editCase(caseDto, id);
  }

  @Delete(':id')
  deleteCaseById(@Param('id') id: number) {
    this.caseService.deleteCaseById(id);
  }
}
