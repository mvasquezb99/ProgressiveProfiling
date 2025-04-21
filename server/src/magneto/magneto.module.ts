import { Module } from '@nestjs/common';
import { MagnetoService } from './magneto.service';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';
import { HttpModule } from '@nestjs/axios';
import { MagnetoController } from './magneto.controller';

@Module({
  imports: [UserModule, EmailModule, HttpModule],
  providers: [MagnetoService],
  controllers: [MagnetoController],
})
export class MagnetoModule {}
