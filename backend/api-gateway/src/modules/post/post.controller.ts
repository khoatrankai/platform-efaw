import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CommentPostDto } from './dto/comment-post.dto';
import { RemoveCommentPostDto } from './dto/rm-comment-post.dto';
import { ListCommentDto } from './dto/list-comment.dto';
import { AddLikePostDto } from './dto/add-like-post.dto';
import { RemoveLikePostDto } from './dto/delete-like-post.dto';
import { ListLikePostDto } from './dto/list-like-post';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() data:CreatePostDto,@Req() req:Request) {
    console.log(req['user'])
    return this.postService.createPost(data,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list/:page_id')
  listPost(@Param('page_id') page_id:string,@Req() req:Request) {
    return this.postService.listPost(page_id,req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-comment')
  addComment(@Body() infoComment:CommentPostDto,@Req() req:Request) {
    return this.postService.addComment(infoComment,req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove-comment')
  removeComment(@Body() rmComment:RemoveCommentPostDto,@Req() req:Request) {
    return this.postService.removeComment(rmComment,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list-comment')
  getListComment(@Query() commentDto:ListCommentDto) {
    return this.postService.listComment(commentDto);
    // return ''
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-like')
  addLike(@Body() infoLike:AddLikePostDto,@Req() req:Request) {
    return this.postService.addLike(infoLike,req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove-like')
  removeLike(@Body() rmLike:RemoveLikePostDto,@Req() req:Request) {
    return this.postService.removeLike(rmLike,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list-like')
  getListLike(@Query() likeDto:ListLikePostDto) {
    return this.postService.listLike(likeDto);
    // return ''
  }
 
 
}
