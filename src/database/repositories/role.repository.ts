import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async findOne(id: string): Promise<Role> {
    const data = await this.roleRepository.findOne({ where: { roleId: id } });
    if (!data) {
      throw new NotFoundException('Role not found');
    }
    return data;
  }

  async create(role: Role): Promise<Role> {
    if (role.roleId) {
      const data = await this.roleRepository.findOne({
        where: { roleId: role.roleId },
      });
      if (data) {
        throw new BadRequestException('Role already exists');
      }
    }
    return this.roleRepository.save(role);
  }

  async update(id: string, role: Role): Promise<Role> {
    const data = await this.roleRepository.findOne({ where: { roleId: id } });
    if (data) {
      return this.roleRepository.save({ ...data, ...role, id });
    }
    throw new Error('Role not found');
  }

  async delete(id: string): Promise<Role> {
    const data = await this.roleRepository.findOne({ where: { roleId: id } });
    if (data) {
      return this.roleRepository.remove(data);
    }
    throw new NotFoundException('Role not found');
  }
}
