import { Body, Controller, Get, Post } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { RegistrarProductoDto } from './dtos/producto.dto';
import { RegistrarVentaDto } from './dtos/venta.dto';

@Controller('tienda')
export class TiendaController {

    constructor(
        private readonly service: TiendaService
    ) {}

    @Get("/reporteCategorias")
    async getReporte() {
        return await this.service.getReporte();
    }

    @Post("/registrarProducto")
    async registrarProducto(@Body() dto: RegistrarProductoDto) {
        return await this.service.registrarProducto(dto);
    }

    @Post("/registrarVenta")
    async registrarVenta(@Body() dto: RegistrarVentaDto) {
        return await this.service.registrarVenta(dto);
    }

    @Get("/listaProductos")
    async listaProductos() {
        return await this.service.findProductos();
    }

    @Get("/listaVentas")
    async listaVentas() {
        return await this.service.findVentas();
    }
}
