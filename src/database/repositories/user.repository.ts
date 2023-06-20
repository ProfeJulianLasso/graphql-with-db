import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const data = await this.userRepository.findOne({
      where: { userId: id },
      relations: { role: true },
    });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  async create(user: User): Promise<User> {
    if (user.userId) {
      const data = await this.userRepository.findOne({
        where: { userId: user.userId },
      });
      if (data) {
        throw new BadRequestException('User already exists');
      }
    }
    const role = await this.roleRepository.findOne({
      where: { roleId: user.roleId },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    return this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<User> {
    const data = await this.userRepository.findOne({ where: { userId: id } });
    if (data) {
      if (user.roleId) {
        const role = await this.roleRepository.findOne({
          where: { roleId: user.roleId },
        });
        if (!role) {
          throw new BadRequestException('Role not found');
        }
      }
      return this.userRepository.save({ ...data, ...user, id });
    }
    throw new NotFoundException('User not found');
  }

  async delete(id: string): Promise<User> {
    const data = await this.userRepository.findOne({ where: { userId: id } });
    if (data) {
      return this.userRepository.remove(data);
    }
    throw new NotFoundException('User not found');
  }
}
