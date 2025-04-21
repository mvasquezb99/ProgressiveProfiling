import { Module } from '@nestjs/common';
import { MagnetoService } from './magneto.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [MagnetoService],
})
export class MagnetoModule {}
