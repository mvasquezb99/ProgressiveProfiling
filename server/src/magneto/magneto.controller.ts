import { Body, Controller, Post } from '@nestjs/common';

@Controller('magneto')
export class MagnetoController {
  @Post('profilers')
  public acceptProfilerRegularUsers(@Body() body: { users: any[] }) {
    const { users } = body;
    console.log('Users ammount:', users.length);
    return { message: 'Users accepted correctly', count: users.length };
  }
}
