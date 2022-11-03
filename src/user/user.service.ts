import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async createUser(dto: UserDto) {
    const salt = await genSalt(7);
    const hashPasswod = await hash(dto.password, salt);

    const user = await this.userRepository.create({ ...dto, password: hashPasswod });
    user.active = true;
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userRepository.findAll({ where: { email } });
  }
}
