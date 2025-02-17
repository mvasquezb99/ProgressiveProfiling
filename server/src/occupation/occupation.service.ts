import { Injectable } from '@nestjs/common';
import { OccupationClass } from './occupation.model';
import { OccupationResponseDto } from './dto/response-occupation.dto';

@Injectable()
export class OccupationService {
  constructor(private readonly occupationClass: OccupationClass) {}

  async findAll(): Promise<OccupationResponseDto[]> {
    const occupations = await this.occupationClass.occupationModel.findMany();
    return occupations.map((occupation) => ({
      name: occupation.name,
    }));
  }
}
