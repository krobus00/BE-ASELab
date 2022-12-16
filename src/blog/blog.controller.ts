import {BlogService} from './blog.service';
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
} from '@nestjs/common';
import { GetUserId, Roles } from 'src/auth/decorators';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('Admin', 'SuperAdmin')
    @ApiBearerAuth()
    async createBlog(
        @Body() dto: CreateBlogDto,
        @GetUserId() userId: string
    ) {
        return this.blogService.createBlog(userId, dto);
    }

    @Get()
    async getAllBlog(@Query('limit', ParseIntPipe) limit: number) 
    {
        return this.blogService.getAllBlog(limit);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('Admin', 'SuperAdmin')
    @ApiBearerAuth()
    async deleteBlog(@Param('id', ParseIntPipe) id: number) 
    {
        return this.blogService.deleteBlog(id);
    }

    @Put('/:id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('Admin', 'SuperAdmin')
    @ApiBearerAuth()
    async updateBlog(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateBlogDto,
        @GetUserId() userId: string
    )
    {
        return this.blogService.updateBlog(userId, id, dto);
    }
}