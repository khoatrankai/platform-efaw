import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MG } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true ,collection: 'Comments'}) 
export class Comment {
  @Prop({ type: String })
  description: string;

  @Prop({ type: [{type: String}] })
  picture_url: string[];

  @Prop({type: String,required:true})
  user_id:string

  @Prop({type: MG.Types.ObjectId,ref: 'Posts'})
  post_id: MG.Types.ObjectId

  @Prop({enum:['active','delete'],default:'active'})
  status:string
  
  @Prop({type:Boolean,default:false})
  status_reply:boolean
  
  

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
