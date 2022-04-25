---
layout: post
permalink: /ga4_crossdomain_setting
title: '새로운 직장에서 GTM, GA4 세팅하기(feat. 교차 도메인 설정까지)'
date: 2022-04-24 23:00:00 +09:00
feature: '/img/posts/013/crossdomain_th.jpeg'
background: '/img/posts/013/crossdomain_bg.jpeg'
categories:
  - knowledge
tags:
  - psps
  - GA4
  - 교차도메인
  - GTM
  - 구글태그매니저
  - crossdomain
description: '새로운 직장에 갔는데 도메인 여러개다?! 당황하지 말고 따라해보자 GA4'
---

안녕하세요 PSPS입니다.

최근에 제가 새로운 직장으로(퍼포먼스 마케터 -> 퍼포먼스 마케터) 이직을 했는데 당황스러운 일이 몇개 있었습니다. 이전 직장에서는 하나의 도메인에서, 그리고 웹만 가지고
데이터 트래킹을 했는데요. 새로운 곳에서는 도메인도 여러개고 웹 뿐만 아니라 앱까지 런칭 준비를 하고 있어 제가 모르는게 한두가지가 아니었습니다. 그래서 제가 어떤 부분에서 헤맸고 어떤 걸 배웠는지 앞으로 차차 공유드릴 예정입니다. 이번 포스팅에서 공유할 내용은 [교차 도메인 설정] 입니다.

# 교차 도메인 설정
- 예를 들어 우리 회사가 가지고 있는 도메인과 서브 도메인이 다음과 같습니다.
메인 도메인: banana.com - 브랜딩 사이트
서브 도메인 1: delicious.banana.com - 이커머스 사이트
서브 도메인 2: train.banana.com - b2b 제휴 사이트
위 같은 상황에서 저는 처음에 "이거 각 도메인 별로 GTM이랑 GA4 속성 따로 만들어줘야하나?"란 생각으로 GTM 컨테이너도 따로 만들고 GA4 속성도 따르 만들었습니다.
하지만 설정하고 나서 떠오른 생각이, "아예 다른 브랜드 사이트도 아니고 banana.com으로 들어온 유저가 언제든지 delicious.banana.com과 train.banana.com으로 이동할 수 있는데?"
만약 각각의 도메인에 대해 GTM 세팅을 따로 설정해버리면 세션이 분리 되버리는 문제가 나옵니다.
User_A가 페이스북 광고를 보고 banana.com로 유입되었을 때:
banana.com에서 User_A의 유입경로 = facebook이다.
그 이후 User_A가 delicious.banana.com으로 이동했을 경우
delicious.banana.com에서 User_A의 유입경로 = banana.com이다.

이렇게 되면 delicious.banana.com 유저들의 유입경로를 제대로 확인할 수가 없게 된다.

그래서 여러 글을 찾아보니 GA4에 교차도메인이라는 세팅이 있다는 걸 알게 되었고 [GA4 설치 후 바로 세팅해야 하는 5가지](https://osoma.kr/blog/ga4-start-settings/)를 참고해 GTM과 GA4 설정을 다음과 같이 변경했다.
1. banana.com, delicious.banana.com, train.banana.c om에 동일한 구글태그매니저 코드 삽입
2. GA4 교차 도메인 설정

1번은 스킵하고 GA4 교차 도메인 설정하는 방법을 보여드리겠습니다.

- 먼저 GA4 속성에 들어가셔서 [데이터 스트림] -> 세팅하려는 도메인 선택
![GA4_datastream](/img/posts/013/datastream.jpg)

- [태그 설정 더보기] 클릭
![GA4_tag_setting](/img/posts/013/crossdomain.jpg)

- [도메인 구성] 클릭
![domain_setting](/img/posts/013/domain_set.jpg)

- 도메인 및 서브 도메인 입력
![crossdomain_setting](/img/posts/013/crossdomain_set.jpg)

이렇게 세팅을 해두시면 각 도메인을 타고 다니는 User_A의 세션이 분리되지 않고 각각의 도메인에서 User_A를 하나의 세션으로 바라보게 됩니다.

by 세상 마케팅 이슈를 뿌시고 다니는 PSPS
