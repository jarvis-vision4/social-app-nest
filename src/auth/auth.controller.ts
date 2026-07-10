import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { TransformDTO } from 'src/_cores/interceptors/transform-dto.interceptor';
import { ResponseAuthDto } from './dto/response-auth.dto';


@Controller('auth')
@TransformDTO(ResponseAuthDto)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/sign-up')
  create(@Body() signupDto: SignUpDto) {
    return this.authService.create(signupDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
