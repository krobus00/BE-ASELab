import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    constructor(private readonly prisma: PrismaService) {}

    async createBlog(userId: string, dto: CreateBlogDto) {
        const { title, description, thumbnail, tags, blog_date, estimated_read_time } = dto;

        const blog = await this.prisma.blog.create({
            data: {
                title,
                description,
                thumbnail,
                tags,
                blog_date,
                estimated_read_time,
                created_by_id: userId,
                updated_by_id: userId,
            },
        });

        return blog;

    }

    async updateBlog(userId: string, id: number, dto: UpdateBlogDto) {
        const blog = await this.prisma.blog.update({
            where: {
                id,
            },
            data: {
                ...dto,
                updated_by_id: userId,
            },
        });

        return blog;

    }

    async deleteBlog(id: number) {
        const blog = await this.prisma.blog.delete({
            where: {
                id,
            },
        });

        return blog;
        
    }

    async getAllBlog(limit: number) {
        const blog = await this.prisma.blog.findMany({
            take: limit,
        })

        return blog;

    }

}