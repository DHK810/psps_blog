---
layout: post
permalink: /img_hosting
title: '구글 드라이브로 이미지호스팅 하기'
date: 2021-10-24 23:00:00 +09:00
feature: '/img/posts/011/imghosting_th.jpg'
background: '/img/posts/011/imghosting_bg.jpg'
categories:
  - knowledge
tags:
  - psps
  - 이미지
  - 이미지호스팅
  - 구글드라이브
  - 이미지매핑
  - 이미지맵핑
description: '서버 없이 구글 드라이브로 간단하게 웹페이지에 이미지 업로드 하는 방법'
---

안녕하세요 PSPS입니다.

오늘은 서버 필요없이 구글 드라이브로 이미지 호스팅하는 방법에 대해 알아보겠습니다. 먼저 예시로 이미지 1장을 불러오는 것을 보여드리고 난 다음 여러 이미지 파일 업로드가 필요한 경우를 대비해 귀찮은 사전 작업을 자동으로 해주는 방법까지 알아보겠습니다.

# 이미지 1장 구글 드라이브로 호스팅하기
첫 번째로, 본인의 구글 드라이브에 들어가서 이미지 파일 하나를 업로드 해봅니다. 드라이브에 있는 이미지 파일 아무거나 하셔도 됩니다. 제가 얼마 전에 받은 오징어게임 명함으로 해보겠습니다. 이 초대장은 제꺼기 때문에 뺏어가지 마세요. 저 1등할겁니다.


![google_drive_squid_cardimg](/img/posts/011/squidcard_rightclick.jpg)

해당 이미지 파일을 오른쪽 클릭해서 [링크 생성]을 누르세요. 그러면 누구에게나 공유 가능한 이미지 링크를 볼 수 있는데 여기서 구글 드라이브 파일 경로의 **ID값**만 복사할게요
![img_share_link](/img/posts/011/share_img.jpg)


ID 값은 `https://drive.google.com/file/d/` 이후에 나오는 숫자와 알파벳의 조합입니다. `/view?usp=sharing` 전까지 복사해서 메모장에 붙여넣어주세요.

제 명함 카드의 **ID값**은 `[1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p]`입니다.

## 이미지 링크 변형
그 다음 아래 주소를 메모장에 붙여넣기 한 후 [id값]대신 메모장에 붙여넣으신 ID값으로 변경해주면 됩니다.

```html
https://drive.google.com/uc?export=view&id=[id값]
```

오징어게임 명함 링크는 아래와 같습니다. 아래 링크를 클릭해보시면 새로운 웹 브라우저 창이 켜지면서 명함 이미지가 나올 겁니다.
[https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p](https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p)

이 링크를 가지고 지금 이 포스트에 넣으면 이렇게 잘 나옵니다!
<img src= 'https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p'>

# 이미지 여러 장 구글 드라이브로 호스팅하기
이미지가 1개일 경우 위처럼 수작업으로 빠르게 할 수 있겠지만 만약 10개, 20개가 넘어가면? 시간이 너무 많이 소요되겠죠. 이것도 조금 편하게 해봅시다. 먼저 구글 드라이브에 여러 이미지를 하나의 폴더에 넣어서 업로드합니다.

## 스프레드시트 신규 기능 설치
이번엔 구글 스프레드시트를 켜겠습니다. 부가 기능을 설치해주셔야하는데요. 스프레드시트 메뉴탭에서 **[부가기능]** 을 누르고 **[부가기능 설치하기]** 를 눌러 `Photo Gallery by Awesome`을 다운받아줍니다. 이 기능은 다수의 이미지 파일 속 ID값을 자동으로 구분해줍니다.
![부가기능 어디있어요?](/img/posts/011/add_function.jpg)
![Photo Gallery by Awesome 다운받기](/img/posts/011/photogallery.jpg)

다운을 받았다면 다시 스프레드시트로 돌아가서 **[부가기능]** 을 누르면 새로 설치된 [Photo Gallery by Awesome Table]이 보일테니 클릭해서 [Create / Edit a photo gallery]까지 클릭하면 됩니다.
![Photo Gallery by Awesome 앨범 추가하기](/img/posts/011/photo_gallery_depth.jpg)

그러면 스프레드시트 오른쪽에 새로운 메뉴가 보일텐데 [Use existing album]을 눌러 구글 드라이브에 업로드해 둔 이미지 폴더를 선택합니다. 저는 이번 포스팅에 쓰인 이미지를 모아둔 [011] 폴더를 선택했습니다.
![구글 드라이브 앨범 선택](/img/posts/011/photo_select.jpg)

폴더를 클릭하고 [Select] 누르면 스프레드시트에 이미지별 공유링크가 B행 [URL]에 기입됩니다.

이제 마지막 한 가지만 더 하면 됩니다. 위에서 공유링크를 살짝 변형했었는데 그거 그대로 가져와서 비어있는 셀에 엑셀 함수를 넣을 거예요.
```html
="https://drive.google.com/uc?export=view&id="&[ID값이 있는 셀]
```
![idvalue 엑셀 함수](/img/posts/011/idvalue.jpg)

모든 ID값이 들어간 링크 주소를 얻어내는게 목적이기 때문에 함수를 복사해서 아래로 쭉 붙여넣으시면 됩니다.
![엑셀함수 복사붙여넣기](/img/posts/011/idvalue_result.jpg)

이렇게 하면 저 링크만 복사해서 붙여넣으면 서버 없이 이미지 주소로 불러와 웹화면에 보여줄 수 있게 됩니다!

# 다음 시간엔 이미지 맵핑
다음 시간에는 이미지맵핑(Image Mapping)으로 명함 이미지 속 `네모 영역` 을 누르면 오징어게임에 참여할 수 있는 페이지로 이동하도록 만드는 방법을 보여드리겠습니다(아래 `네모 영역을 클릭해보세요!`)
<img src= 'https://drive.google.com/uc?export=view&id=1m0GrUdfm1fEIBVR04LR2-JdfUMC1pb1p' usemap="#squid" >
<map name="squid" id="squid">
<area shape="rect" coords="450, 100, 700, 250" href="https://www.netflix.com/title/81040344" target="_blank">
</map>


by 세상 마케팅 이슈를 뿌시고 다니는 PSPS
