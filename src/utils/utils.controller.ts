import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('utils')
@Public()
@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @ApiOperation({ summary: 'Truncate database' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Post('truncate')
  async truncate() {
    this.utilsService.truncate();
  }
}
