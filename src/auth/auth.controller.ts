import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from '../members/dtos/create-member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: Pick<CreateMemberDto, 'email' | 'password'>,
  ) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createMemberDto: CreateMemberDto) {
    return this.authService.register(createMemberDto);
  }
}