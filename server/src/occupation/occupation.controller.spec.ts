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

    describe('findByName', () => {
        it('should return an occupation by name', async () => {
            const result: ResponseOccupationDto = { name: 'Escritura académica' };
            jest.spyOn(occupationService, 'findByName').mockResolvedValue(result);

            await expect(occupationController.findByName('Escritura académica')).resolves.toEqual(result);
        });

        it('should throw an error if occupation is not found', async () => {
            jest.spyOn(occupationService, 'findByName').mockRejectedValue(new Error('Occupation not found'));

            await expect(occupationController.findByName('NonExistentOccupation')).rejects.toThrow('Occupation not found');
        });
    });
});
