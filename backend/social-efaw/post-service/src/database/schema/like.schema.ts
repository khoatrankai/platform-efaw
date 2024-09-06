import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document ,Schema as MG} from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true ,collection: 'Likes'}) 
export class Like {
  @Prop({ type: MG.Types.ObjectId })
  post_id: MG.Types.ObjectId;

  @Prop({ enum:['like','favorite','smile','dislike','sad'] })
  status: string;

  @Prop({type: String})
  user_id:string

  
}

export const LikeSchema = SchemaFactory.createForClass(Like);
LikeSchema.index({ post_id: 1, user_id: 1 }, { unique: true });