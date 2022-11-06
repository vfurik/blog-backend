import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { UtilsService } from './utils.service';

@Public()
@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}
  @Post('truncate')
  async truncate() {
    this.utilsService.truncate();
  }
}
