# 📖Book Step
## ✅프로젝트 소개
<div>Comter 프로젝트 이후 Js DOM 사용의 미숙함과 함수를 만드는 것이 익숙치 않아 이번 프로젝트에서 DOM과 함수를 연습하고 자 하였다.</div>
<div>해당 프로젝트에서는 Manager페이지에서 입력한 값을 Main페이지에 띄워 사용자가 해당 아이템을 선택하고 장바구니 기능을 통해 값을 넣고자 하였다.</div>

## ✅개발 환경 및 사용 TOOL
<div>
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" />
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white" />
</div>

## ✅상세 기능

### Manager Page
![manager](https://github.com/user-attachments/assets/0e9bf5ae-37ea-4125-bae9-2b6c9a5f4c60)
<!-- 내용 -->
#### 1-1) 저장버튼
<div>아이디, 상품명, 가격, 상세정보를 차례대로 입력한 후 LocalStorage에 저장</div>
<div>아이디는 중복이 불가능 하며, 저장을 누른 후 나오는 이미지는 랜덤이다.</div>

#### 1-2) 수정버튼
<div>입력한 상품명, 가격, 상세정보를 가지고 와 수정할 수 있다.</div>

#### 1-3) 삭제버튼
<div>클릭한 버튼이 있는 행의 값을 삭제한다.</div>
<br><br><br>

###  Main Page
* 카테고리 선택

![main-카테고리-설정](https://github.com/user-attachments/assets/a3f3fb72-42f2-45e1-beb1-7067d976397a)

#### 2-1) 카테고리
<div>책의 종류에 따라 카테고리를 나누어 보여줄 수 있으며, 초기화면은 All로 지정되어 있다</div>

#### 2-2) 카드
<div>각 카드의 우측 상단의 하트 이미지를 클릭하면 찜한 카드가 LocalStorage에 저장된다.</div>
<br>
  
![main-쿼리스트링](https://github.com/user-attachments/assets/dd1f64a6-c2ae-4a79-8639-87e937356ede)

#### 2-3) 쿼리 스트링
<div>쿼리 스트링 기능을 활용하여 각 id에 해당하는 상세 페이지로 이동한다.</div>
<br><br><br>

###  상세 Page
* 장바구니 넣기

![submain-장바구니넣기](https://github.com/user-attachments/assets/6d592e76-2279-4fab-aada-f768d70fcb84)
  
#### 3-1) 장바구니 버튼
<div>해당 카드의 id를 기반으로 카드의 정보를 LocalStorage에서 찾아 새로운 LocalStorage에 저장해주고, 장바구니 이미지에 숫자를 count해준다.</div>
<br><br><br>

###  장바구니 Page
* 삭제버튼 클릭

![shopping-삭제](https://github.com/user-attachments/assets/623642d7-6719-4e05-b073-02897bf0ec61)

#### 4-1) 삭제버튼
<div>1-3과 동일한 방식으로 해당 값을 삭제해준다.</div>
<div>전체 삭제 버튼을 클릭한 경우 전체 내용을 삭제해준다.</div>
<br>

* 삭제버튼 클릭 시 숫자 
  
![shopping-counter](https://github.com/user-attachments/assets/5c5f71a7-0a50-4144-a69c-dfe1f96c7377)


<div>*** 모든 Js 코드는 AI의 도움없이 작성함을 알림</div>

