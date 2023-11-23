import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './entities/productos.entity';
import { Model } from 'mongoose';
import { Venta } from './entities/ventas.entity';
import { RegistrarVentaDto } from './dtos/venta.dto';
import { RegistrarProductoDto } from './dtos/producto.dto';

@Injectable()
export class TiendaService {
    
    constructor(
        @InjectModel(Producto.name) private productoModel: Model<Producto>,
        @InjectModel(Venta.name) private ventaModel: Model<Venta>
    ) { }

    async getReporte() {
        return await this.ventaModel.aggregate([
            {
                $match: {
                    fecha: {
                      $gte: new Date("2023-11-01"),
                      $lt: new Date("2023-12-01")
                    }
                  }
            },
            {
               $lookup: {
                    from: "productos",
                    localField: "producto_id",
                    foreignField: "_id",
                    as: "producto"
               }
            },
            {
                $unwind: "$producto"
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$fecha" },
                        category: "$producto.categoria"
                    },
                    ventaTotal: { $sum: { $multiply: ["$cantidad", "$producto.precioUnitario"] } }
                }
            }
        ])
    }
    
    async findProductos() {
        return await this.productoModel.find({});
    }
    
    async registrarVenta(dto: RegistrarVentaDto) {
        this.ventaModel.create({
            productoId: dto.productoId,
            cantidad: dto.cantidad,
            fecha: new Date()
        });
    }

    async registrarProducto(dto: RegistrarProductoDto) {
        this.productoModel.create({
            nombre: dto.nombre,
            categoria: dto.categoria,
            precioUnitario: dto.precioUnitario
        });
    }
    
}
