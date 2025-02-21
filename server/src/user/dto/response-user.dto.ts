import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    example: 'sample',
    description: 'User type (sample | regular)',
  })
  type: string;
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;
  @ApiProperty({ example: 'JohnDoe@example.com', description: 'User email' })
  email: string;
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'User image',
  })
  image: string;
  @ApiProperty({ example: '1990-01-01', description: 'User birthdate' })
  birthdate: string;
  @ApiProperty({
    example: 'Software Engineer, Web Developer',
    description: 'User skills',
  })
  skills: string;
  @ApiProperty({
    example: 'English, Spanish',
    description: 'User languages',
  })
  languages: string;
  //TODO: Add relationships fields
}
