---
layout: post
permalink: /img_mapping
title: '이미지 안에 URL 숨기기'
date: 2022-05-01 16:00:00 +09:00
feature: '/img/posts/014/img_mapping_th.jpeg'
background: '/img/posts/014/img_mapping_bg.jpeg'
categories:
  - knowledge
tags:
  - psps
  - 이미지
  - 맵핑
  - 사람인
  - 잡플래닛
  - 채용공고
description: '이미지맵핑으로 사용자 경험 개선하기'
---

안녕하세요 PSPS입니다.

지난 [구글 드라이브로 이미지호스팅 하기](/img_hosting)에서 언급한 이미지 맵핑을 이번 포스트에서 다뤄보겠습니다.
# 이미지 맵핑 왜 쓰나요?
이미지 안에 링크를 숨겨(?)두어 자연스러운 사용자 경험을 제공할 수 있는 방법 중에 하나입니다. 이미지 맵핑은 콘텐츠를 만들 때 사용할 일이 많겠지만 저는 직장에서 채용공고를 올릴 때(html 수정이 가능한 사람인, 잡플래닛 등) 이 기능을 유용하게 사용했습니다. 예시로 [우아한 형제들의 사람인 채용공고](https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx=38563977&recommend_ids=eJxNj8ERAyEMA6vJHxlLst8pJP13EebIQH7eWUuGRNuT8anol98ZFjjyU8BGghjHlpQRx3aAXhbbag1ZC8e2aCSPrdmWT1ZOsE%2BzNBB%2Fd9vxNP%2BWq1u3OWn1PFg0dbNKZfEgBcN3uUzyoLo4dbPher6wsTKm1iOhL2Z1QFw%3D&view_type=list&gz=1&t_ref_content=ing_recruit&t_ref=company_info_view#seq=0)를 보시면
![wooah_recruit_saramin](/img/posts/014/wooah_recruit_saramin.jpg) 빨간 영역을 눌렀을 때 [자사 웹페이지의 채용공고](https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx=38563977&recommend_ids=eJxNj8ERAyEMA6vJHxlLst8pJP13EebIQH7eWUuGRNuT8anol98ZFjjyU8BGghjHlpQRx3aAXhbbag1ZC8e2aCSPrdmWT1ZOsE%2BzNBB%2Fd9vxNP%2BWq1u3OWn1PFg0dbNKZfEgBcN3uUzyoLo4dbPher6wsTKm1iOhL2Z1QFw%3D&view_type=list&gz=1&t_ref_content=ing_recruit&t_ref=company_info_view#seq=0)로 이동시키고 있습니다. 채용공고 본문에 직무별 채용공고 링크를 삽입할 필요 없이 이미지 안에 클릭을 자연스럽게 유도하는 "버튼" 모형과 링크를 이미지맵핑으로 연결해 가독성과 긍정적인 사용자 경험을 살릴 수 있죠.

# 이미지 맵핑 사용 방법
html 수정이 가능한 플랫폼이라면 어디서든지 사용 가능하니 실제로 적용해보며 연습해보세요!
## img 태그 삽입 + usemap 추가
일반적인 이미지 소스와 이미지 맵핑이 적용된 소스를 함께 보여드리겠습니다.
```html
<img src= 'https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p' >
```
<img src= 'https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p'>
얘는 네모영역 클릭이 안되고
```html
<img src= 'https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p'
usemap="#squid" >
<map name="squid" id="squid">
<area shape="rect" coords="450, 100, 700, 250"
href="https://www.netflix.com/title/81040344" target="_blank">
</map>
```
<img src= 'https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p'
usemap="#squid">
<map name="squid" id="squid">
<area shape="rect" coords="450, 100, 700, 250"
href="https://www.netflix.com/title/81040344" target="_blank">
</map>
얘는 네모 클릭하시면 넷플릭스로 넘어갑니다.

### 주의사항(필수)
1. usemap의 이름 앞에는 **#가** 붙어야 합니다.
  - 이름은 영어로 본인이 알아볼 수 있게 기입하시면 됩니다.
2. usemap과 name & id 는 **같아야** 합니다.
  - name과 id에는 #가 없습니다.
3. coords(**이미지 영역 좌표**)를 알아야 합니다.
  - 좌표 확인 방법은 아래 본문에서 자세히 다루겠습니다.

### 주의사항(옵션)
1. shape(모양)을 설정해주세요.
2. target을 _blank로 설정해주세요.
  - 새로운 창에서 url을 열도록 해줍니다.

##  영역 좌표 확인하는 방법
맥에서는 이미지 미리보기에서 [인스턴트 알파]를 누르고 왼쪽 상단에서부터 원하는 영역까지 드래그를 하면 마우스 위치에 x, y 좌표가 보입니다.
![이미지 영역 확인](/img/posts/014/img_coord.jpg)
이 방법으로 총 2개의 좌표를 확인합니다: 영역의 좌측 상단(x1, y1)과 영역의 우측 하단(x2, y2)
이렇게 확인한 2개의 좌표를
```html
<area shape="rect" coords="x1, y1, x2, y2">
```
coords 안에 넣어주시면 됩니다.

## 위 방법의 한계
위 방법의 단점이 있는데요. 바로 반응형 웹페이지에서는 사용이 힘들다는 겁니다... 위 방법은 PC화면 기준으로 고정된 좌표를 설정해두었기 때문에 모바일 화면에서는 정상적으로 적용되지 않습니다. [sklove96](https://velog.io/@sklove96/%EB%B0%98%EC%9D%91%ED%98%95-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A7%B5-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EB%B2%95)님이 올려주신 포스팅에 아주 심플한 해결방법이 있지만 제가 시도해보았을 땐 작동이 안되서 아직 미해결 상태입니다...
해결하신 분은 아래 댓글에 남겨주시면 감사합니다! :D

by 세상 마케팅 이슈를 뿌시고 다니는 PSPS
