import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MG } from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema({ timestamps: true ,collection: 'Replies'}) 
export class Reply {
  @Prop({ type: String })
  description: string;

  @Prop({ type: [{type: String}] })
  picture_url: string[];

  @Prop({type: String})
  user_id:string
  
  @Prop({type: String})
  reply_id:string

  @Prop({type: MG.Types.ObjectId,ref:'Comments'})
  comment_id:MG.Types.ObjectId
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
