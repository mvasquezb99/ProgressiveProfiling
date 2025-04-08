import { Inject, Injectable } from '@nestjs/common';
import {
  RequestOccupationArrayDto,
  RequestOccupationDto,
} from 'src/occupation/dto/request-occupation.dto';
import { ResponseOccupationDto } from 'src/occupation/dto/response-occupation.dto';
import { OccupationClass } from 'src/occupation/occupation.model';

@Injectable()
export class AdminOccupationService {
  public constructor(
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
  ) {}

  public async getAllOccupations(): Promise<ResponseOccupationDto[]> {
    const occupations = await this.occupationClass.occupationModel.findMany();
    const occupationsArr = new Array<ResponseOccupationDto>();
    occupations.forEach((occupation) => {
      occupationsArr.push(new ResponseOccupationDto(occupation.name));
    });
    return occupationsArr;
  }

  public async getOccupationByName(
    name: string,
  ): Promise<ResponseOccupationDto> {
    const occupation = await this.occupationClass.occupationModel.findOne({
      where: {
        name: name,
      },
    });
    if (!occupation) {
      throw new Error('Occupation not found');
    }
    return new ResponseOccupationDto(occupation.name);
  }

  public async saveOccupations(
    body: RequestOccupationArrayDto,
  ): Promise<ResponseOccupationDto[]> {
    const occupationsArr = new Array<ResponseOccupationDto>();
    await Promise.all(
      body.occupations.map(async (occupation) => {
        const savedOccupation =
          await this.occupationClass.occupationModel.createOne(occupation);
        occupationsArr.push(new ResponseOccupationDto(savedOccupation.name));
      }),
    );
    return occupationsArr;
  }

  public async saveOccupation(
    body: RequestOccupationDto,
  ): Promise<ResponseOccupationDto> {
    const newOccupation =
      await this.occupationClass.occupationModel.createOne(body);
    return new ResponseOccupationDto(newOccupation.name);
  }
}
