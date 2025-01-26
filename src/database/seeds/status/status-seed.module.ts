import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatus } from 'src/userStatus/entities/userStatus.entity';
import { StatusSeedService } from './status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatus])],
  providers: [StatusSeedService],
  exports: [StatusSeedService],
})
export class StatusSeedModule {}
