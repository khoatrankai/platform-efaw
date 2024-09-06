import {  HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { CommentPostDto } from './dto/comment-post.dto';
import { RemoveCommentPostDto } from './dto/rm-comment-post.dto';
import { ListCommentDto } from './dto/list-comment.dto';
@Injectable()
export class PostService {

  constructor(@Inject('POST') private readonly postsClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  
 async createPost(data:CreatePostDto,req:Request){
  const user = req['user']
  return await firstValueFrom(this.postsClient.send({cmd:'create-post'},{...data,user_id:user.sub}))
 }

 async listPost(page_id:string,req:Request){
  const user = req['user']
  return await firstValueFrom(this.postsClient.send({cmd:'list-post'},{page:page_id,user_id:user.sub}))
 }

 async addComment(commentPost:CommentPostDto,req:Request){
  const user = req['user']
  return await firstValueFrom(this.postsClient.send({cmd:'add-comment-post'},{...commentPost,user_id:user.sub}))
 }

 async addLike(data:any,req:Request){
  const user = req['user']
  return await firstValueFrom(this.postsClient.send({cmd:'add-like-post'},{...data,user_id:user.sub}))
 }
  

 async removeComment(removeComment:RemoveCommentPostDto,req:Request){
  const user = req['user']
  return await firstValueFrom(this.postsClient.send({cmd:'rm-comment-post'},{...removeComment,user_id:user.sub}))
 }

 async removeLike(data:any,req:Request){
  const user = req['user']
  return await firstValueFrom(this.postsClient.send({cmd:'rm-like-post'},{...data,user_id:user.sub}))
 }

 async listComment(commentdto:ListCommentDto){

  return {
    statusCode:HttpStatus.OK,
    data: await firstValueFrom(this.postsClient.send({cmd:'list-comment-post'},{...commentdto,page:Number(commentdto.page)}))
  }
  }

  async listLike(data:any){

    return {
      statusCode:HttpStatus.OK,
      data: await firstValueFrom(this.postsClient.send({cmd:'list-like-post'},{...data}))
    }
    }

  
}
