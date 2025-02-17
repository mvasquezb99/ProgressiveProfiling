import { Module } from '@nestjs/common';
import { OccupationModule } from 'src/occupation/occupation.module';
import { UserClass } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [OccupationModule],
    providers: [UserClass, UserService],
    exports: [UserClass],
    controllers: [UserController],
})
export class UserModule {}


