import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ListPostDto } from './database/dto/list-post.dto';
import { CommentPostDto } from './database/dto/comment-post.dto';
import { RemoveCommentPostDto } from './database/dto/rm-comment-post.dto';
import { ListCommentDto } from './database/dto/list-comment.dto';
import { AddLikePostDto } from './database/dto/add-like-post.dto';
import { RemoveLikePostDto } from './database/dto/delete-like-post.dto';
import { ListLikePostDto } from './database/dto/list-like-post';
import { ListLikePostUserDto } from './database/dto/list-like-post-user';
import { CreatePostDto } from './database/dto/post.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getHello(): string {
    return this.postService.getHello();
  }

  @MessagePattern({cmd:'create-post'})
  handleCreatePost(@Payload() data:CreatePostDto){
  return this.postService.createPost(data)
  }

  @MessagePattern({cmd:'list-post'})
  listPost(@Payload() data:ListPostDto){
    console.log(data)
    return this.postService.getListPost(data)
  }

  @MessagePattern({cmd:'add-comment-post'})
  addComment(@Payload() data:CommentPostDto){
    return this.postService.addComment(data)
  }

  @MessagePattern({cmd:'rm-comment-post'})
  removeComment(@Payload() data:RemoveCommentPostDto){
    return this.postService.removeComment(data)
  }

  @MessagePattern({cmd:'list-comment-post'})
  listComment(@Payload() data:ListCommentDto):Promise<any>{
    console.log(data)
    return this.postService.getCommentPost(data)
  }

  @MessagePattern({cmd:'add-like-post'})
  addLike(@Payload() data:AddLikePostDto){
    return this.postService.addLike(data)
  }

  @MessagePattern({cmd:'rm-like-post'})
  removeLike(@Payload() data:RemoveLikePostDto){
    return this.postService.removeLike(data)
  }

  @MessagePattern({cmd:'list-like-post'})
  listLike(@Payload() data:ListLikePostDto){
    return this.postService.getLikePost(data)
  }

  @MessagePattern({cmd:'check-like-post'})
  checkLike(@Payload() data:ListLikePostUserDto){
    return this.postService.getCheckLikeUser(data)
  }
}
