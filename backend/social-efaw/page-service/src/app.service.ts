import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page, PageDocument } from './database/schema/page.schema';
import { Model,Schema as MG} from 'mongoose';
import { PageMember, PageMemberDocument } from './database/schema/page-member.schema';
import { CreatePageDto } from './database/dto/create-page.dto';
import { UpdatePageDto } from './database/dto/update-page.dto';
import { CreateMemberDto } from './database/dto/page-member.dto';
import { CreateAdminDto } from './database/dto/page-admin.dto';
@Injectable()
export class AppService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>,@InjectModel(PageMember.name) private pageMemberModel: Model<PageMemberDocument>){}
  getHello(): string {
    return 'Hello World!';
  }

  async createPage(data:CreatePageDto){
    try{
      const dataNew = await this.pageModel.create(data)
      await dataNew.save()
      return {
        statusCode:HttpStatus.CREATED,
        data: dataNew._id
      }
    }catch(err){
      throw new BadRequestException
    }
  }
  async updatePage(page_id:string,user_id:string,data:UpdatePageDto){
    try{
      const pageOwner = await this.pageModel.findOneAndUpdate({_id:page_id,$or:[
        {owner_id: user_id},
        {admin:user_id}
      ]},data,{new:true})
      return {
        statusCode:HttpStatus.OK,
        data: pageOwner
      }
    }catch(err){
      throw new BadRequestException
    }
  }

  async getPagesByUser(user_id:string){
    const listData = (await this.pageMemberModel.find({user_id,status:'member'},{projection:{page_id:1}})).map((dt)=>{
      return dt.page_id
    }) || []
    return listData
  }

  async getPagesBlockByUser(user_id:string){
    const listData = (await this.pageMemberModel.find({user_id,status:'block'},{projection:{page_id:1}})).map((dt)=>{
      return dt.page_id
    }) || []
    return listData
  }

  async findAll(page_ids:MG.Types.ObjectId[]){
    const listData = await this.pageModel.find({_id: {$in:page_ids}})
    return listData
  }

  async updateOwner(page_id:string,user_id:string,owner_new:string){
    try{
      await this.pageModel.findOneAndUpdate({_id:page_id,owner_id:user_id},{owner_id:owner_new})
      return {
        statusCode:HttpStatus.OK,
        message: 'Update owner success' 
      }
    }catch(err){
      throw new BadRequestException
    }
  }

  async addMember(data:CreateMemberDto){
    try{
        await this.pageMemberModel.create(data)
        return {
          statusCode:HttpStatus.CREATED,
          message: 'Add member success' 
        }
      
    }catch(err){
      throw new BadRequestException
    }
  }

  async addAdmin(data:CreateAdminDto){
    try{
      const checkAdmin = await this.pageModel.findOneAndUpdate({_id:data.page_id,owner_id:data.owner_id,admin:{$nin:[data.user_id,data.owner_id]}},{$push: {admin: data.user_id}},{new: true})
      if(checkAdmin){
        return{
          statusCode:HttpStatus.CREATED,
          message: 'Add admin success' 
        }
        
      }
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message: 'Add admin fail' 
      }
    }catch(err){
      throw new BadRequestException
    }
  }
}
