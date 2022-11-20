import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { UtilsService } from './utils.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
