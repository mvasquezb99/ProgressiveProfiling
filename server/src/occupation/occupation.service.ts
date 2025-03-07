import { Injectable } from '@nestjs/common';
import { OccupationClass } from './occupation.model';
import { ResponseOccupationDto } from './dto/response-occupation.dto';

@Injectable()
export class OccupationService {
  constructor(private readonly occupationClass: OccupationClass) {}

  public async findAll(): Promise<ResponseOccupationDto[]> {
    const occupations = await this.occupationClass.occupationModel.findMany();
    return occupations.map((occupation) => ({
      name: occupation.name,
    }));
  }

  public async findByName(name: string): Promise<ResponseOccupationDto> {
    const occupation = await this.occupationClass.occupationModel.findOne({
      where: { name: name },
    });
    if (!occupation) {
      throw new Error('Occupation not found');
    }
    return {
      name: occupation.name,
    };
  }
}
