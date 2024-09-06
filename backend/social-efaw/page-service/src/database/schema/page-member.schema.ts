import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MG } from 'mongoose';

export type PageMemberDocument = PageMember & Document;

@Schema({ timestamps: true  ,collection: 'Pagemembers'}) 
export class PageMember {
  @Prop({ type: MG.Types.ObjectId ,ref:"Pages",required:true})
  page_id: MG.Types.ObjectId;

  @Prop({enum:['member','block'],default:'member'})
  status: string;
  
  @Prop({type:String,required:true})
  user_id: string;

}

export const PageMemberSchema = SchemaFactory.createForClass(PageMember);