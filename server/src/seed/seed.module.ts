import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { seedDataClass } from './seed.service';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { Neogma } from 'neogma';

@Module({
    providers: [seedDataClass],
})
export class SeedModule implements OnModuleInit{
    constructor(private readonly seedDataClass: seedDataClass, @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma) {}
    async onModuleInit() {
        await this.seedDataClass.seedData(this.neogma);
    }
}
