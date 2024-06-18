import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from '../entities/point.entity';
import { PointService } from '../services/point.service';
import { PointController } from '../controllers/point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointService],
  controllers: [PointController],
})
export class PointModule {}
