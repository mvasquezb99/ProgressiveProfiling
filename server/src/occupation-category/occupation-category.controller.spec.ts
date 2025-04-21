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


});
