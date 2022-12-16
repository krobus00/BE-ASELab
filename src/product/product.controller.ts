import { ProductService } from "./product.service";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    ParseIntPipe,
    Query,
} from "@nestjs/common";
import { GetUserId, Roles } from "src/auth/decorators";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { JwtGuard, RolesGuard } from "src/auth/guards";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller("Product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('Admin', 'SuperAdmin')
    @ApiBearerAuth()
    async createProduct(
        @Body() dto: CreateProductDto,
        @GetUserId() userId: string
    ) {
        return this.productService.createProduct(userId, dto);
    }

    @Get()
    async getAllProducts(@Query('limit', ParseIntPipe) limit: number)
    {
        return this.productService.getAllProducts(limit);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('Admin', 'SuperAdmin')
    @ApiBearerAuth()
    async deleteProduct(@Param('id', ParseIntPipe) id: number)
    {
        return this.productService.deleteProduct(id);
    }

    @Put('/:id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('Admin', 'SuperAdmin')
    @ApiBearerAuth()
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProductDto,
        @GetUserId() userId: string
    )
    {
        return this.productService.updateProduct(userId, id, dto);
    }
}
