import { Test } from '@nestjs/testing';
import { PointController } from '../controllers/point.controller';
import { PointService } from '../services/point.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Point } from '../entities/point.entity';

import { config as dotenvConfig } from 'dotenv';

describe('PointController', () => {
  let pointController: PointController;
  let pointService: PointService;

  beforeAll(() => dotenvConfig());

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PointController],
      providers: [
        PointService,
        {
          provide: getRepositoryToken(Point),
          useValue: {},
        },
      ],
    }).compile();

    pointService = moduleRef.get<PointService>(PointService);
    pointController = moduleRef.get<PointController>(PointController);
  });

  it('getAllPoints()', async () => {
    const points = [
      {
        id: 0,
        name: 'a',
        longitude: '1',
        latitude: '1',
        address: 'a',
        schedule: 'a',
      },
      {
        id: 1,
        name: 'b',
        longitude: '1',
        latitude: '1',
        address: 'b',
        schedule: 'b',
      },
    ];
    jest
      .spyOn(pointService, 'findAll')
      .mockImplementation(() => Promise.resolve(points));

    expect(
      await pointController.getAllPoints(
        {},
        `Bearer ${process.env.GENERAL_AUTH_TOKEN}`,
      ),
    ).toBe(points);
  });

  it('populateDB()', async () => {
    jest.spyOn(pointService, 'popoulateDb').mockImplementation(() => undefined);
    expect(await pointController.populateDB()).toBe(undefined);
  });
});
