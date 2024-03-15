import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Types } from 'src/enums';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'This property identifies the users name',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name has to be of type string',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'This property identifies the users type',
  })
  @IsIn([Types.Business, Types.Staff], {
    message: 'Type has to be either "business" or "staff"',
  })
  @IsNotEmpty({
    message: 'Type is required',
  })
  @IsString({
    message: 'Type has to be of type string',
  })
  type: string;

  @ApiProperty({
    required: false,
    description:
      'This property identifies the users role in their organization',
  })
  @IsOptional()
  role?: string;

  @ApiProperty({
    required: true,
    description: 'This property identifies the users email',
  })
  @IsEmail(undefined, {
    message: 'Invalid email provided. Kindly provide valid email',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString({
    message: 'Email has to be of type string',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'This property identifies the users password',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Password has to be of type string',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must follow this convention - 1 uppercase letter, 1 symbol, 1 number and at least 8 characters in total in order to proceed',
    },
  )
  password: string;

  @ApiProperty({
    required: false,
    description:
      'This property identifies the organization reference code when registering as a staff',
  })
  @IsOptional()
  organizationReference?: string;

  @ApiProperty({
    required: false,
    description:
      'This property identifies the organization reference code when registering as a business. Defaults to users name if not passed in',
  })
  @IsOptional()
  organizationName?: string;
}
