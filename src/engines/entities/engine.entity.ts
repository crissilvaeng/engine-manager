import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EngineDocument = Engine & Document;

@Schema()
export class Engine {
  @Prop({
    type: String,
    required: true,
  })
  image: string;
}

export const EngineSchema = SchemaFactory.createForClass(Engine);
