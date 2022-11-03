import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UtilsService {
  constructor(private sequelize: Sequelize) {}

  async truncate() {
    this.sequelize.truncate({ restartIdentity: true });
  }
}
