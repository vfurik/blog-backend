import { Controller, Post } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}
  @Post('truncate')
  async truncate() {
    this.utilsService.truncate();
  }
}
