import {
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Point } from '../entities/point.entity';
import { PointService } from '../services/point.service';
import { checkUserAuth } from '../utils/auth';

@Controller()
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @HttpCode(200)
  @Get('/points/:lng/:lat')
  async getAllPoints(
    @Param() params: any,
    @Headers('Authorization') auth: string,
  ): Promise<Point[]> {
    checkUserAuth(auth);
    const lng = params.lng;
    const lat = params.lat;
    return this.pointService.findAll(lng, lat);
  }

  /*
  JUST FOR INTERNAL USE TO POPULATE THE DATABASE WITH SOME ENTRIES
  */
  @Post('/populate-db')
  populateDB(): Promise<any> {
    this.pointService.popoulateDb();
    return;
  }
}
