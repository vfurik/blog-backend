import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { genSalt, hash } from 'bcrypt';
import { UserFilter } from './filters/user.filter';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findAll(filter?: UserFilter) {
    const options: any = { where: {} };
    filter.email && (options.where.email = filter.email);
    filter.role && (options.where.role = filter.role);

    return this.userRepository.findAll(options);
  }

  async findByPk(id: number) {
    return this.userRepository.findByPk(id);
  }

  async createUser(dto: UserDto) {
    const salt = await genSalt(7);
    const hashPasswod = await hash(dto.password, salt);

    const user = await this.userRepository.create({ ...dto, password: hashPasswod });
    return user.save();
  }

  async activateUser(user: User) {
    user.active = true;
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async setTwoFaSecret(secret: string, user: User) {
    user.twofaSecret = secret;
    return user.save();
  }

  async activateTwoFa(user: User) {
    user.twofaEnabled = true;
    return user.save();
  }
}
