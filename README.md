# GeulGil re-designed by Gaebal-Saebal

<p align="center">
이미지
</p>

---

## 프로젝트 소개

[js-ha](https://github.com/js-ha), [rosenfence](https://github.com/rosenfence)가 [부트캠프 당시 수행했던 프로젝트](https://github.com/codestates-seb/seb40_main_031)를 새롭게 설계하고 구현한 프로젝트입니다.

당시 인원 구성은 Frontend 4명, Backend 2명으로 구성되어 있었으나, Full-stack Framework인 [Next.js(version 13)](https://nextjs.org/)와 [NoSQL(MongoDB Atlas)](https://www.mongodb.com/)를 사용해 Frontend 2명이서 향상된 기능과 성능 그리고 UI/UX를 갖춘 결과물을 만들었습니다.

기존 대비 직관적이고 사용하기 쉬운 사용자 인터페이스를 구현했습니다. 다양한 Library([swiper.js](https://swiperjs.com/))와 component를 적재적소에 배치했습니다.

이번에는 사용자 경험을 최적화하는 데 집중했습니다. 기존에 제한된 data로 구성되었던 DataBase에서 data를 불러오는 로직에서, API server와의 직접 통신을 하는 것으로 변경했습니다. 이에 따라 사용자들은 양적/질적으로 향상된 데이터를 얻을 수 있게 되었습니다.

프레임워크를 통한 개발으로 기능 추가나 변경이 더욱 쉬워졌고, 미래에 발생할 수 있는 요구 사항에 대해서도 대응할 수 있게 되었습니다. 또한 Database의 크기를 많이 줄일 수 있어서 서버 비용을 획기적으로 절감할 수 있었습니다.
<br>

## 사용 기술 스택

| sort             | stack                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Language         | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">   |
| Framework        | <img src="https://img.shields.io/badge/nextdotjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">     |
| Styling          | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> |
| State Management | <img src="https://img.shields.io/badge/zustand-f06f34?style=for-the-badge&logo=zustand&logoColor=white">         |
| DataBase         | <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">         |

<br>

## Commit rules

✨Feat : 새로운 기능 추가 또는 기능 업데이트

🔨Fix : 버그 또는 에러 수정

👀Refactor : 코드 리팩토링(똑같은 기능인데 코드만 개선)

🎨Design : 디자인, 문장 수정

🏷Comment : 주석 수정 및 삭제

🍎Chore : 빌드 수정, 패키지 추가, 환경변수 설정 등 그 외 모든 것

📝Docs : 문서 수정, 블로그 포스트 추가

## 배운 점 & 아쉬운 점

### 배운 점

- TypeScript의 타입 지정, interface 사용, @types 라이브러리 사용 이유
- Next.js의 client/server component의 사용법
- Next.js 13버전의 구조와 그 사용법
- next-auth를 사용한 JWT / OAuth 로그인, 회원가입 구현법
- Clinet - Server - DataBase간 통신 구조
- MongoDB Atlas를 사용한 CRUD 구현 방법과 내장 method/function 사용법
- Zustand를 사용한 전역 state management

### 아쉬운 점

아쉬운 점은 추후 release를 통해 개선해나갈 예정입니다.

- Next.js 환경에서 Socket.io를 사용한 채팅 기능을 구현하지 못한 점
- 프로젝트가 OpenAPI 환경/상태에 의존성이 높은 점
- next-auth 라이브러리 환경에서 로그인-회원가입을 위한 페이지를 구현하지 못한 점
- 모바일 환경에 100% 최적화되지 못한 점

## LINKS

<a href="https://geulgil.vercel.app" target="_blank">Deployment</a>
<br>

## 라이센스

MIT &copy; [Rosenfence](mailto:rosenfence@gmail.com) / [JS-Ha](mailto:jshaha0911@gmail.com)
