//변수 선언 - DOM
const shop = document.getElementById("shop");
const container_main = document.querySelector(".container_main");
const all_delete = document.getElementById("all_delete");
const cart_num = document.querySelector(".cart_num");
const logoStyle = document.querySelector(".logoStyle");
const login = document.getElementById("login");
const inquiry = document.getElementById("inquiry");
const faq = document.getElementById("faq");
const used = document.getElementById("used");

//변수 선언 - localStorage
let cart_list_data = window.localStorage.getItem("cart_data");
let cart_data = JSON.parse(cart_list_data);

//페이지 이동동
//헤더 shopping cart 이미지 클릭 함수
shop.addEventListener("click", () => {
  window.location.href = "./shopping_basket";
});

//logo 클릭 시 이동
logoStyle.addEventListener("click", () => {
  window.location.href = "./main";
});

login.addEventListener("click", () => {
  Swal.fire({
    icon: "error",
    title: "로그인 준비중 입니다",
  });
});

//header
container_main.innerHTML = `
    <div class="table">
      <div class="row">
        <div class="row_image">이미지</div>
        <div class="row_name">상품명</div>
        <div class="row_price">가격</div>
        <div class="row_content">상세</div>
        <div class="row_management">관리</div>
      </div>
      <div class="tBody"></div>
      <button class="btnDel" id = "all_delete" onClick = "All_delete()">장바구니 비우기</button>
    </div>
`;
//body
function dataPrint() {
  const tbody = document.querySelector(".tBody");

  //console.log("cart_list_data",cart_data)
  tbody.innerHTML = cart_data
    .map((item) => {
      return `
         <div class="table_data">
            <div class="inputImg">
              <img class="imgstyle" src="${item.img}" alt="${item.img}">
            </div>
            <div class="inputName" id = inputname${item.id}>${item.name}</div>
            <div class="inputPrice" id = inputprice${item.id}>
              ${item.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div class="inputContent" id = inputcontent${item.id}>
              ${item.content}
            </div>
            <div class="data_btn">
                <button class="btnDel" 
                  id = delete_${item.id} 
                  onClick = "delete_fuc(${item.id})">삭제
                </button>
            </div>
        </div>
        `;
    })
    .join("");
}

//삭제 버튼 클릭 함수
function delete_fuc(item) {
  //console.log(item);
  const tbody = document.querySelector(".tBody");
  const new_data = cart_data.filter((element) => Number(element.id) !== item);
  //console.log(new_data)
  cart_data = new_data;

  const del = document.getElementById(`delete_${item}`);
  del.parentNode.parentNode.remove(del);

  window.localStorage.setItem("cart_data", JSON.stringify(new_data));
  cart_num.innerHTML = `<div>${cart_data.length}</div>`;

  if (cart_data.length === 0) {
    tbody.innerHTML = `<div class="empty_img"><img class="imageStyle" src="/Img/empty.png" alt="shopping_cart"></div>`;
  }
}

//모두 삭제 버튼 함수
function All_delete() {
  const tbody = document.querySelector(".tBody");
  tbody.innerHTML = "";

  cart_data.length = 0;
  tbody.innerHTML = `<div class="empty_img"><img class="imageStyle" src="/Img/empty.png" alt="shopping_cart"></div>`;
  window.localStorage.setItem("cart_data", JSON.stringify(cart_data));
  cart_num.innerHTML = `<div>${cart_data.length}</div>`;
}

//window onload 함수
window.onload = function () {
  //장바구니 숫자
  cart_num.innerHTML = `<div>${cart_data.length}</div>`;

  const tbody = document.querySelector(".tBody");
  const allDeleteBtn = document.getElementById("all_delete");
  if (cart_data.length === 0 || cart_data === null) {
    tbody.innerHTML = `<div class="empty_img"><img class="imageStyle" src="/Img/empty.png" alt="shopping_cart"></div>`;
    allDeleteBtn.style.display = "none";
  } else {
    dataPrint();
    allDeleteBtn.style.display = "block";
  }
};

//footer 버튼 클릭
inquiry.addEventListener("click", () => {
  Swal.fire({
    icon: "error",
    title: "1:1 문의 준비중입니다",
  });
});

faq.addEventListener("click", () => {
  Swal.fire({
    icon: "error",
    title: "FAQ 준비중입니다",
  });
});

used.addEventListener("click", () => {
  Swal.fire({
    icon: "error",
    title: "중고서점 준비중입니다",
  });
});
