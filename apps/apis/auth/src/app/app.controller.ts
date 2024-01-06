import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { USERS_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@sohnandsol/shared-modules';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class AppController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: ClientProxy,
    private readonly createUserDto: CreateUserDto
  ) {}

  // To Do: Consider removing async await syntax as it is present in the service.
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.send('register_user', createUserDto);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUser() {
    return 'this function is authorized';
  }
}
