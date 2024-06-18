import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { calculateDistanceKm } from '@repo/utils';
import { Point } from '../entities/point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
  ) {}

  async findAll(lng: number, lat: number): Promise<Point[]> {
    return (await this.pointRepository.find()).filter((item) => {
      const distance = calculateDistanceKm(
        lat,
        lng,
        Number.parseFloat(item.latitude),
        Number.parseFloat(item.longitude),
      );
      if (Number.parseFloat(distance) < 30) {
        return item;
      }
    });
  }

  /*
  JUST FOR INTERNAL USE TO POPULATE THE DATABASE WITH SOME ENTRIES
  */
  popoulateDb() {
    const data = [
      {
        name: 'Supermercado Hipecore',
        longitude: '-13.868281',
        latitude: '28.399317',
        address: 'Calle El Greco, Caleta de Fuste, Antigua, España',
        schedule: 'Open every day: 09:00 - 18:00',
      },
      {
        name: 'Bungalow Giuseppe',
        longitude: '-13.870453',
        latitude: '28.39867',
        address:
          'Calle Virgen de la Caridad del Cobre, Caleta de Fuste, Antigua, España',
        schedule: 'Open from Monday to Friday: 09:00 - 18:00',
      },
      {
        name: 'Supermercado Miguel',
        longitude: '-13.867053',
        latitude: '28.398575',
        address: 'Calle San Buenaventura, Caleta de Fuste, Antigua, España',
        schedule: 'Open every day: 09:00 - 13:00 & 17:00 - 21:00',
      },
      {
        name: 'Marinagolf',
        longitude: '-13.869949',
        latitude: '28.400539',
        address: 'Calle Virgen de Antigua, Caleta de Fuste, Antigua, España',
        schedule: 'Open Monday to Thursday: 08:00 - 16:00',
      },
    ];
    data.forEach(async (item) => {
      await this.pointRepository.save(item);
    });
  }
}
