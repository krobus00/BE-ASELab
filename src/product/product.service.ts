import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(userId: string, dto: CreateProductDto) {
    const { name, description, thumbnail, tags } = dto;

    const product = await this.prisma.product.create({
        data: {
            name,
            description,
            thumbnail,
            tags,
            published_by_id: userId,
            created_by_id: userId,
            updated_by_id: userId,
        },
    });

    return product;

    }

    async updateProduct(userId: string, id: number, dto: UpdateProductDto) {
        const product = await this.prisma.product.update({
            where: {
                id,
            },
            data: {
                ...dto,
                updated_by_id: userId,
            },
        });

        return product;
    }

    async deleteProduct(id: number) {
        const product = await this.prisma.product.delete({
            where: {
                id,
            },
        });

        return product;

    }

    async getAllProducts(limit: number) {
        const products = await this.prisma.product.findMany({
            take: limit,
        });

        return products;
        
    }

}