import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { Posts,PostDocument } from './database/schema/post.schema';
import { ContentDocument, Contents } from './database/schema/content.schema';
import { ListPostDto } from './database/dto/list-post.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CommentPostDto } from './database/dto/comment-post.dto';
import { Comment, CommentDocument } from './database/schema/comment.schema';
import { RemoveCommentPostDto } from './database/dto/rm-comment-post.dto';
import { ListCommentDto } from './database/dto/list-comment.dto';
import { Like, LikeDocument } from './database/schema/like.schema';
import { AddLikePostDto } from './database/dto/add-like-post.dto';
import { RemoveLikePostDto } from './database/dto/delete-like-post.dto';
import { ListLikePostDto } from './database/dto/list-like-post';
import { ListLikePostUserDto } from './database/dto/list-like-post-user';
import { CreatePostDto } from './database/dto/post.dto';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,@InjectModel(Contents.name) private contentModel: Model<ContentDocument>,
    @Inject('FRIEND') private readonly friendClient:ClientProxy,@Inject('GROUP') private readonly groupClient:ClientProxy,@Inject('PAGE') private readonly pageClient:ClientProxy,@Inject('USER') private readonly userClient:ClientProxy,@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async createPost(data:CreatePostDto) {
    if(data.group){
      const dtContent = await this.contentModel.insertMany(data.contents)
      const ids = dtContent.map((dt:any)=>{
        return dt._id
      })
      const dtPost = await this.postModel.create({...data,contents: ids})
      return dtPost
    }
    if(data.page){
      const dtContent = await this.contentModel.insertMany(data.contents)
      const ids = dtContent.map((dt:any)=>{
        return dt._id
      })
      const dtPost = await this.postModel.create({...data,contents: ids})
      return dtPost
    }
    const dtContent = await this.contentModel.insertMany(data.contents)
      const ids = dtContent.map((dt:any)=>{
        return dt._id
      })
      const dtPost = await this.postModel.create({...data,contents: ids})
      return dtPost
    
  }

  async getListPost(listPost:ListPostDto){
    const data = await firstValueFrom(this.friendClient.send({cmd:'list-friend-block'},{user_id:listPost.user_id}))
    const dataFriend = await firstValueFrom(this.friendClient.send({cmd:'list-friend'},{user_id:listPost.user_id}))
    const listGroup = await firstValueFrom(this.groupClient.send({cmd:'list-group-user'},listPost.user_id))
    const listPage = await firstValueFrom(this.pageClient.send({cmd:'list-page-block-user'},listPost.user_id))
    const listPostNew = await this.postModel.find({
      
      $or:[
        {group: null,
          status:{$in:['public']},page:null,user_id:{$nin: data}},
        {status:{$in:['private-group']},group:{$in:listGroup}}
        ,{
          $and:[{page:{$ne:null}},{page:{$nin:listPage}}],status:'public'
        },
        {group: null,
          status:{$in:['friend']},page:null,user_id:{$in: dataFriend}}
      ]
    }).sort({ created_at: -1 }).skip(Number(listPost.page)*10).limit(10).populate('contents')
    // .populate('group_id page_id').exec()
    const userIds = [...new Set(listPostNew.map(post => post.user_id).filter(dt=> !!dt))];
    const groupIds = [...new Set(listPostNew.map(post => post.group).filter(dt=> !!dt))];
    const pageIds = [...new Set(listPostNew.map(post => post.page).filter(dt=> !!dt))];
    const mapUsers:any = Object.keys(userIds).length >0 ? new Map((await firstValueFrom(this.userClient.send({cmd:'find-profiles'},userIds))).map((dt:any)=> [dt.user_id,dt])):[]
    const mapGroups:any =  Object.keys(groupIds).length >0 ? new Map((await firstValueFrom(this.groupClient.send({cmd:'find-all-group'},groupIds))).map((dt:any)=> [dt._id,dt])):[]
    const mapPages:any =  Object.keys(pageIds).length >0 ? new Map((await firstValueFrom(this.pageClient.send({cmd:'find-all-page'},pageIds))).map((dt:any)=> [dt._id,dt])):[]
    const dataReturn:any = await Promise.all(listPostNew.map(async (dt:any)=>{
      if(dt.type_post === "group"){
        return {...dt._doc,group:mapGroups.get(dt.group),userInfo:mapUsers.get(dt.user_id)}
      }
      if(dt.type_post === "page"){
        return {...dt._doc,page:mapPages.get(dt.page)}
      }
      return {...dt._doc,userInfo:mapUsers.get(dt.user_id)}
    })) 
    return {
      statusCode:HttpStatus.OK,
      posts:dataReturn
    }

  }
  
  async addComment(infoComment:CommentPostDto){
    try{
      console.log(infoComment)
      await this.commentModel.create(infoComment)
      return {
        statusCode:HttpStatus.CREATED,
        message:'Comment success'
      }
    }catch(err){
      throw new BadRequestException
    }
   
  }

  async addLike(infoLike:AddLikePostDto){
    try{
      console.log(infoLike)
      await this.likeModel.create(infoLike)
      return {
        statusCode:HttpStatus.CREATED,
        message:'Like success'
      }
    }catch(err){
      throw new BadRequestException
    }
   
  }

  async removeComment(rmComment:RemoveCommentPostDto){
    try{
      const userPost = await this.postModel.findOne({_id:rmComment.post_id})
      const userComment = await this.commentModel.findOne({_id:rmComment.comment_id})
      if(userPost.user_id === rmComment.user_id || userComment.user_id === rmComment.user_id){
        
        await this.commentModel.updateOne({_id:new Types.ObjectId(rmComment.comment_id)},{
          status: 'delete'
        })
        return {
          statusCode:HttpStatus.OK,
          message:'Remove comment success'
        }
      }else{
        
        return {
          statusCode:HttpStatus.BAD_REQUEST,
          message:'Account no permission'
        }
      }
     
    }catch(err){
      throw new BadRequestException
    }
   
  }

  async removeLike(data:RemoveLikePostDto){
    try{
      await this.likeModel.deleteOne(data)
      return {
        statusCode:HttpStatus.OK,
        message:'Remove like success'
      }
    }catch(err){
      throw new BadRequestException
    }
   
  }

  async getCommentPost(comment:ListCommentDto):Promise<any>{
    const listData = await this.commentModel.find({post_id:comment.post_id,status:{$eq:'active'}}).sort({createdAt:-1}).skip(comment.page*5).limit(5)
    const listComment = await Promise.all( listData.map( async (dt:any)=>{
      return {...dt._doc,user_info:await firstValueFrom(this.userClient.send({cmd:'find-profile'},dt.user_id))}
      // return {...dt,user_info:await firstValueFrom(this.userClient.send({cmd:'find-profile'},dt.user_id))}
    }))
    return listComment
  }

  async getLikePost(data:ListLikePostDto){
    const listData = await this.likeModel.find({post_id:data.post_id})
    return listData
  }

  async getCheckLikeUser(data:ListLikePostUserDto){
    const listData = await this.likeModel.findOne({...data})
    if(listData){
      return listData.status
    }
    return ''
  }
}
