import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "productos" })
export class Producto {

    @Prop({ name: "_id", type: Number })
    id: number;

    @Prop({ name: "nombre" })
    nombre: string;

    @Prop({ name: "categoria" })
    categoria: string;

    @Prop({ name: "precioUnitario" })
    precioUnitario: number;

}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
