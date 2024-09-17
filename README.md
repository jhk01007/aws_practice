# 개요

- AWS의 다양한 서비스 사용해서 프론트엔드, 백엔드를 구성해 간단한 로그인/회원가입 프로그램 구현한다.
- AWS 서비스를 사용하는것이 주 목적이기 때문에 프론트, 백엔드는 최대한 간단하게 구성한다.
<br><br>
# 사용자 요구사항

- 사용자는 아이디 비밀번호 전화번호를 입력해서 회원가입 할 수 있어야 한다.
- 사용자는 회원가입시 자신의 프로필 이미지를 업로드할 수 있어야한다.
- 사용자는 자신의 아이디와 비밀번호를 입력해 로그인을 할 수 있어야 한다.
- 사용자는 자신의 정보(아이디, 전화번호, 프로필 사진)를조회할 수 있어야 한다.
- 사용자는 자신의 프로필 이미지를 변경할 수 있어야 한다.
<br><br>
# 프론트엔드 요구사항

1. **간단한 웹 페이지 만들어서 Github Repository에 올리기**
    - Axios를 통해 api통신을 한다.
2. **웹 페이지를 S3, CloudFront를 활용해서 배포하기**
3. **도메인 적용시키기**
    - 백엔드와 마찬가지로 ‘내 도메인 한국’을 활용한다.
4. **HTTPS 적용시키기**
<br><br>
# 백엔드 요구사항

1. **스프링부트 프로젝트를 하나 만들어서 Github Repository에 올린다.** 
    - 민감한 값이 포함된 파일(ex. application.yml, .env 등)은 .gitignore에 추가한다.
    - 데이터베이스 접근은 JPA로 한다.
    - S3를 활용해서 파일 업로드 기능을 구현한다.
2. **데이터베이스로 RDS 사용하기**
    - RDBMS는 MySQL을 사용한다.
    - 회원 태이블을 생성해 회원 정보를 관리한다.
3. **EC2에 배포하기**
4. **도메인 적용시키기**
    - Route 53을 활용해도 되지만 비용이 발생하기 때문에 무료로 도메인을 사용할 수 있는 ‘내 도메인 한국’을 활용한다.
<br><br>
# 아키텍처
![1](https://github.com/user-attachments/assets/df4f9ffa-c931-4e87-abe4-5b030021f81a)
<br><br>
# UI
## 1️⃣ 메인화면
<img width="1480" alt="1" src="https://github.com/user-attachments/assets/9bc12d3a-c09e-4574-8921-f6fe7ce6c867">

## 2️⃣ 회원가입
<img width="1496" alt="2" src="https://github.com/user-attachments/assets/22fbc6e6-126f-4363-873c-c920920c5bd5">

## 3️⃣ 프로필
<img width="1503" alt="3" src="https://github.com/user-attachments/assets/59f89c1b-9114-47d9-ad26-812dbf07277c">




