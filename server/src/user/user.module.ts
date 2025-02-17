import { Module } from '@nestjs/common';
import { OccupationModule } from 'src/occupation/occupation.module';
import { UserClass } from './user.model';

@Module({
    imports: [OccupationModule],
    providers: [UserClass],
    exports: [UserClass],
})
export class UserModule {}


