import { Test, TestingModule } from '@nestjs/testing';
import { OccupationCategoryService } from './occupation-category.service';
import { OccupationCategoryController } from './occupation-category.controller';
import { ResponseOccupationCategoryDto } from './dto/response-occupation-category.dto';



describe('OccupationController', () => {
    let occupationCategoryController: OccupationCategoryController;
    let occupationCategoryService: OccupationCategoryService;

    beforeEach(async () => {
        const mockOccupationCategoryService = {
            findAll: jest.fn().mockResolvedValue([] as ResponseOccupationCategoryDto[]),
            findByName: jest.fn().mockResolvedValue({ name: 'Tecnología de la Información' }),
        };

        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [OccupationCategoryController],
            providers: [
                {
                    provide: OccupationCategoryService,
                    useValue: mockOccupationCategoryService,
                },
            ],
        }).compile();

        occupationCategoryController = moduleRef.get<OccupationCategoryController>(OccupationCategoryController);
        occupationCategoryService = moduleRef.get<OccupationCategoryService>(OccupationCategoryService);
    });

    describe('findAll', () => {
        it('should return an array of categories', async () => {
            const result: ResponseOccupationCategoryDto[] = [];
            jest.spyOn(occupationCategoryService, 'findAll').mockResolvedValue(result);

            await expect(occupationCategoryController.findAll()).resolves.toEqual(result);
        });
    });

    describe('findByName', () => {
        it('should return a category by name', async () => {
            const result: ResponseOccupationCategoryDto = { name: 'Tecnología de la Información' };
            jest.spyOn(occupationCategoryService, 'findByName').mockResolvedValue(result);

            await expect(occupationCategoryController.findByName('Tecnología de la Información')).resolves.toEqual(result);
        });

        it('should throw an error if category is not found', async () => {
            jest.spyOn(occupationCategoryService, 'findByName').mockRejectedValue(new Error('Occupation category not found'));

            await expect(occupationCategoryController.findByName('NonExistentCategory')).rejects.toThrow('Occupation category not found');
        });
    });
});
