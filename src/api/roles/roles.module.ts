import { Module } from '@nestjs/common';
import { RolesResolvers } from './roles.resolvers';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService, RolesResolvers],
  exports: [RolesService],
})
export class RolesModule {}
