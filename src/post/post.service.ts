import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private userService: UserService
  ) {


  }
  async create(createPostDto: CreatePostDto, user: IUserPayload) {
    const newPost = new this.postModel({ ...createPostDto, author: user })
    return await newPost.save()
  }

  async findAll() {
    const posts = await this.postModel.find().populate('author')
    if (posts.length == 0) {
      throw new NotFoundException("Posts not found")
    }
    return posts;
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).populate('author');
    if (!post) {
      throw new NotFoundException("Post not found")
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
