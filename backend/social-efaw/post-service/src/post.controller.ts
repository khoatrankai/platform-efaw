import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getHello(): string {
    return this.postService.getHello();
  }

  @MessagePattern({cmd:'get-list-post'})
  async handleGetListPost(@Payload() data:any){
    console.log(data)
    const datanew = await this.postService.getListPost()
    console.log(datanew)
    return 'qua roi'
  }
}
