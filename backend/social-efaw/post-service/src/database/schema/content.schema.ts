import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Contents & Document;

@Schema({ timestamps: true ,collection: 'Contents'}) 
export class Contents {
  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  picture_url: string;
  

}

export const ContentSchema = SchemaFactory.createForClass(Contents);
