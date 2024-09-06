import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ timestamps: true  ,collection: 'Pages'})
export class Page {

  @Prop({ required: true, maxlength: 100 })
  page_name: string;

  @Prop({ type: String, required: true })
  owner_id: string;

  @Prop({type:String})
  description: string;

  @Prop({type:String})
  cover_photo: string;

  @Prop({type:String})
  profile_photo: string;

  @Prop({ enum: ['active', 'inactive', 'deleted'], default: 'active' })
  status: string;

  @Prop({type:String})
  website_url: string;

  @Prop({type:String})
  contact_email: string;

  @Prop({type:String})
  contact_phone: string;

  @Prop({type: [{type: String}],default: []})
  admin: string[] = []
}

export const PageSchema = SchemaFactory.createForClass(Page);
