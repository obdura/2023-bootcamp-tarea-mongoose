import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Producto } from "./productos.entity";
import { ObjectId } from "mongodb";

@Schema({ collection: "ventas" })
export class Venta {

    @Prop({ name: "_id" })
    id: number;

    @Prop({ name: "producto_id"})
    productoId: number;

    @Prop({ name: "cantidad" })
    cantidad: number;

    @Prop({ name: "fecha" })
    fecha: Date;

    @Prop({ type: Number, ref: "Producto" })
    producto: Producto;
}

export const VentaSchema = SchemaFactory.createForClass(Venta);