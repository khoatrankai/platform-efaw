import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true  ,collection: 'Groups'})
export class Group {

  @Prop({ required: true, maxlength: 100 })
  group_name: string;

  @Prop({ type: String, required: true })
  owner_id: string;

  @Prop({type:String})
  description: string;

  @Prop({type:String})
  cover_photo: string;

  @Prop({type:String})
  profile_photo: string;

  @Prop({ enum: ['public', 'private', 'deleted'], default: 'public' })
  status: string;

  @Prop({type: [{type: String}],default: []})
  admin: string[] = []
}

export const GroupSchema = SchemaFactory.createForClass(Group);
