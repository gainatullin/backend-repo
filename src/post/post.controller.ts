import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto, SearchPostsDto } from './dto';
import { Post as PostEntity } from './post.entity';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() dto: CreatePostDto, @Req() req) {
    return this.postService.create({ ...dto, userId: req.user.id });
  }

  @ApiResponse({ type: PostEntity })
  @Post('/search')
  search(@Body() dto: SearchPostsDto) {
    return this.postService.search(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('/remove')
  remove(@Body() dto) {
    // return this.postService.remove(dto);
  }
}
