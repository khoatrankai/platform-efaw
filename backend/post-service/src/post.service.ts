import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    private readonly entityManager: EntityManager
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  getListPost(user_id:string){
    const query = `
      select pn.*,group_concat(pc.post_content_id SEPARATOR '$|$') as post_content_ids,group_concat(pc.content SEPARATOR '$|$') as contents,group_concat(pc.picture_url SEPARATOR '$|$') as pictures_url,pg.page_name,u.first_name,u.last_name,u.profile_picture_url as picture_url,spg.page_name as page_name_src,su.first_name as first_name_src,su.last_name as last_name_src,su.profile_picture_url as picture_url_src
  from (select pn.created_at,pn.share_id,pn.post_id,pn.content_main,pn.type_post,pn.page_id,pn.group_id,pn.user_id,pn.group_name,pn.page_id_src,pn.group_id_src,pn.user_id_src,pn.group_name_src,group_concat(pn.status SEPARATOR '$|$') as status,group_concat(pn.count_like SEPARATOR '$|$') as count_status
  from (select pn.created_at,pn.share_id,pn.post_id,pn.content_main,pn.type_post,pn.page_id,pn.group_id,pn.user_id,pn.group_name,pn.page_id_src,pn.group_id_src,pn.user_id_src,pn.group_name_src,lcm.status,count(*) as count_like
  from 
  (select p.created_at,p.share_id,p.post_id,p.content_main,p.typePost as type_post,p.page_id ,p.group_id ,p.user_id ,gu.group_name ,sp.page_id as page_id_src,sp.group_id as group_id_src ,sp.user_id as user_id_src,sgu.group_name as group_name_src
  from posts as p
  left join groups_user as gu on p.group_id = gu.group_id
  left join group_members as gm on p.group_id = gm.group_id
  left join posts as sp on p.share_id = sp.post_id
  left join groups_user as sgu on sp.group_id = sgu.group_id
  left join group_members as sgm on sp.group_id = sgm.group_id
  where (p.share_id is not null and ((p.status = 'public' and sgu.status = 'public') 
  or (p.status = 'public' and sgu.status = 'private' and sgm.user_id = '${user_id}' and sgm.status != 'delete') 
  or (p.status = 'friend' and exists(select 1 from friendships where ((user_id_1 = p.user_id and user_id_2 = '${user_id}') or (user_id_1 ='${user_id}'  and user_id_2 = p.user_id)) and status != 'delete') and sgu.status = 'public'  ) 
  or (p.status = 'friend' and sgu.status = 'private' and sgm.user_id = '${user_id}' and sgm.status != 'delete' and exists(select 1 from friendships where (user_id_1 = p.user_id and user_id_2 = '${user_id}') 
  or (user_id_1 ='${user_id}'  and user_id_2 = p.user_id))) 
  or (p.status = 'private' and sgu.status = 'public' and p.user_id = '${user_id}') 
  or (p.status = 'private' and sgu.status = 'private' and p.user_id = '${user_id}' and sgm.user_id = '${user_id}')))
  or (p.share_id is null and ((p.status = 'public') 
  or (p.status = 'friend' and exists(select 1 from friendships where ((user_id_1 = p.user_id and user_id_2 = '${user_id}') or (user_id_1 ='${user_id}'  and user_id_2 = p.user_id)) and status != 'delete') )  
  or (p.status = 'private' and p.user_id = '${user_id}')
  or (p.status = 'privateGroup' and gu.status = 'private' and gm.user_id = '${user_id}' and gm.status != 'delete')
  ))
  group by p.post_id
  ) as pn
  left join likes_content_main as lcm on lcm.post_id = pn.post_id
  group by lcm.status,pn.post_id
  order by pn.post_id and count_like desc) as pn
  group by pn.post_id) as pn
  left join pages as pg on pg.page_id = pn.page_id
  left join pages as spg on spg.page_id = pn.page_id_src
  left join users as u on u.user_id = pn.user_id
  left join users as su on su.user_id = pn.user_id_src
  left join posts_content as pc on pn.post_id = pc.post_id
  group by pn.post_id
  order by field(exists(select 1 from friendships where ((user_id_1 = pn.user_id and user_id_2 = '${user_id}') or (user_id_1 ='${user_id}'  and user_id_2 = pn.user_id)) and status != 'delete'),True,False),pn.created_at desc,field(pn.share_id is null,True,False),FIELD(pn.type_post,'user','group','page')
  `;

    return this.entityManager.query(query);
  }
}
