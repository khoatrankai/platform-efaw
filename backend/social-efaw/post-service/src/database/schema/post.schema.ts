import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MG } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema({ timestamps: true ,collection: 'Posts'}) 
export class Posts {
  @Prop({ type: String })
  user_id: string;

  @Prop({enum:['private','public','delete','friend','private-group'] })
  status:string


  @Prop({ type: [{ type: MG.Types.ObjectId,ref:'Contents' }] })
  contents: MG.Types.ObjectId[];

  @Prop({type:String})
  description:string

  @Prop({type:MG.Types.ObjectId,ref:'page'})
  page:MG.Types.ObjectId

  @Prop({type:MG.Types.ObjectId,ref:'group'})
  group:MG.Types.ObjectId

  @Prop({enum:['page','group','user']})
  type_post:string

  @Prop({type: MG.Types.ObjectId,ref: 'Posts'})
  post_share: MG.Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Posts);
