import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Schema as MG} from 'mongoose';
import { CreateMemberDto } from './database/dto/group-member.dto';
import { CreateAdminDto } from './database/dto/group-admin.dto';
import { Group, GroupDocument } from './database/schema/group.schema';
import { GroupMember, GroupMemberDocument } from './database/schema/group-member.schema';
import { CreateGroupDto } from './database/dto/create-group.dto';
import { UpdateGroupDto } from './database/dto/update-group.dto';
@Injectable()
export class AppService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>,@InjectModel(GroupMember.name) private groupMemberModel: Model<GroupMemberDocument>){}
  getHello(): string {
    return 'Hello World!';
  }

  async createGroup(data:CreateGroupDto){
    try{
      const dataNew = await this.groupModel.create(data)
      await dataNew.save()
      return {
        statusCode:HttpStatus.CREATED,
        data: dataNew._id
      }
    }catch(err){
      throw new BadRequestException
    }
  }

  async infoGroup(group_id:string){
    return await this.groupModel.findById(group_id)
  }
  async updateGroup(group_id:string,user_id:string,data:UpdateGroupDto){
    try{
      const groupOwner = await this.groupModel.findOneAndUpdate({_id:group_id,$or:[
        {owner_id: user_id},
        {admin:user_id}
      ]},data,{new:true})
      return {
        statusCode:HttpStatus.OK,
        data: groupOwner
      }
    }catch(err){
      throw new BadRequestException
    }
  }

  async updateOwner(group_id:string,user_id:string,owner_new:string){
    try{
      await this.groupModel.findOneAndUpdate({_id:group_id,owner_id:user_id},{owner_id:owner_new})
      return {
        statusCode:HttpStatus.OK,
        message: 'Update owner success' 
      }
    }catch(err){
      throw new BadRequestException
    }
  }

  async getGroupsByUser(user_id:string){
    const listData = (await this.groupMemberModel.find({user_id,status:'member'},{projection:{group_id:1}})).map((dt)=>{
      return dt.group_id
    }) || []
    const listAdmin = (await this.groupModel.find({$or:[{owner_id:user_id},{admin:{$in:user_id}}]})).map((dt)=>{
      return dt._id
    })
    return [...listData,...listAdmin]
  }

  async findAll(group_ids:MG.Types.ObjectId[]){
    const listData = await this.groupModel.find({_id: {$in:group_ids}})
    return listData
  }

  async getPagesBlockByUser(user_id:string){
    const listData = (await this.groupMemberModel.find({user_id,status:'block'},{projection:{group_id:1}})).map((dt)=>{
      return dt.group_id
    }) || []
    return listData
  }
  async addMember(data:CreateMemberDto){
    try{
        await this.groupMemberModel.create(data)
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
      const checkAdmin = await this.groupModel.findOneAndUpdate({_id:data.group_id,owner_id:data.owner_id,admin:{$nin:[data.user_id,data.owner_id]}},{$push: {admin: data.user_id}},{new: true})
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
