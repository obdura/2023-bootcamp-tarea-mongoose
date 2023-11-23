import { Module } from '@nestjs/common';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './entities/productos.entity';
import { Venta, VentaSchema } from './entities/ventas.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:clave123@localhost:27017', {
      dbName: "tienda"
    }),
    MongooseModule.forFeature([{
      name: Producto.name, schema: ProductoSchema
    }, {
      name: Venta.name, schema: VentaSchema
    }])
  ],
  controllers: [TiendaController],
  providers: [TiendaService]
})
export class TiendaModule {}
