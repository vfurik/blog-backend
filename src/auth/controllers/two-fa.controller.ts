import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { TwoFaDto } from '../dto/two-fa.dto';
import { TwoFaService } from '../services/two-fa.service';
import { INVALID_AUTHENTIFICATION_CODE } from '../constants/auth.constant';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';

@ApiTags('two-fa')
@ApiBearerAuth()
@Controller('two-fa')
@UseGuards(JwtAuthGuard)
export class TwoFaController {
  constructor(private readonly twoFaService: TwoFaService, private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Generate qr-code' })
  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiProduces('image/png')
  @Post('qr-code')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'image/png')
  public async generateQrCode(@Res() response: Response, @GetUser() user: User) {
    const { otpauthUrl } = await this.twoFaService.generateTwoFaSecret(user);

    return this.twoFaService.generateQrCode(response, otpauthUrl);
  }

  @Post('activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async activateTwoFa(@GetUser() user: User, @Body() twoFaDto: TwoFaDto) {
    const isCodeValid = await this.twoFaService.isTwoFaCodeValid(twoFaDto, user.id);
    if (!isCodeValid) {
      throw new UnauthorizedException(INVALID_AUTHENTIFICATION_CODE);
    }

    await this.userService.activateTwoFa(user);
  }

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  public async authenticate(@GetUser() user: User, @Body() twoFaDto: TwoFaDto) {
    const isCodeValid = await this.twoFaService.isTwoFaCodeValid(twoFaDto, user.id);
    if (!isCodeValid) {
      throw new UnauthorizedException(INVALID_AUTHENTIFICATION_CODE);
    }

    return await this.twoFaService.signIn(user, true);
  }
}
