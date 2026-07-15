import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/_cores/guards/auth.guard';
import { Currentuser } from 'src/_cores/decorators/currentuser.decorator';
import { TransformDTO } from 'src/_cores/interceptors/transform-dto.interceptor';
import { ResponsePostDto } from './dto/response-post.dto';

@Controller('post')

@TransformDTO(ResponsePostDto)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Currentuser() user) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
