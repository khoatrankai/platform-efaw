import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MG } from 'mongoose';

export type GroupMemberDocument = GroupMember & Document;

@Schema({ timestamps: true  ,collection: 'Groupmembers'}) 
export class GroupMember {
  @Prop({ type: MG.Types.ObjectId ,ref:"Groups",required:true})
  group_id: MG.Types.ObjectId;

  @Prop({enum:['member','waiting','block'],default:'waiting'})
  status: string;
  
  @Prop({type:String,required:true})
  user_id: string;

}

export const GroupMemberSchema = SchemaFactory.createForClass(GroupMember);