import { Test, TestingModule } from '@nestjs/testing';
import { OccupationService } from './occupation.service';
import { OccupationController } from './occupation.controller';
import { ResponseOccupationDto } from './dto/response-occupation.dto';



describe('OccupationController', () => {
    let occupationController: OccupationController;
    let occupationService: OccupationService;

    beforeEach(async () => {
        const mockOccupationService = {
            findAll: jest.fn().mockResolvedValue([] as ResponseOccupationDto[]),
            findByName: jest.fn().mockResolvedValue({ name: 'Escritura académica' }),
        };

        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [OccupationController],
            providers: [
                {
                    provide: OccupationService,
                    useValue: mockOccupationService,
                },
            ],
        }).compile();

        occupationController = moduleRef.get<OccupationController>(OccupationController);
        occupationService = moduleRef.get<OccupationService>(OccupationService);
    });

    describe('findAll', () => {
        it('should return an array of occupations', async () => {
            const result: ResponseOccupationDto[] = [];
            jest.spyOn(occupationService, 'findAll').mockResolvedValue(result);

            await expect(occupationController.findAll()).resolves.toEqual(result);
        });
    });


});
