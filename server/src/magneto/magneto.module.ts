import { Module } from '@nestjs/common';
import { MagnetoService } from './magneto.service';

@Module({
  providers: [MagnetoService],
})
export class MagnetoModule {}
