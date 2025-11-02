import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dtos/create-member.dto';

@Controller('users')
export class MemberController {
  constructor(private readonly membersService: MemberService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    createDto: CreateMemberDto,
  ) {
    return this.membersService.create(createDto);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.membersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    updateDto: CreateMemberDto,
  ) {
    return this.membersService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.membersService.remove(id);
  }
}
