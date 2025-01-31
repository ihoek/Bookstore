//변수 선언 - DOM
const shop = document.getElementById("shop");
const container_main = document.querySelector(".container_main");
const all_delete = document.getElementById("all_delete");

//변수 선언 - localStorage
let cart_list_data = window.localStorage.getItem("cart_data");
let cart_data = JSON.parse(cart_list_data);
//헤더 shopping cart 이미지 클릭 함수
shop.addEventListener("click", () => {
    window.location.href = "./shopping_basket";
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
`
//body
function dataPrint(){
    const tbody = document.querySelector(".tBody");
    
    //console.log("cart_list_data",cart_data)
    tbody.innerHTML = cart_data.map((item) => {
        return `
         <div class="table_data">
            <div class="inputImg"><img class="imgstyle" src="${item.img}" alt="${item.img}"></div>
            <div class="inputName" id = inputname${item.id}>${item.name}</div>
            <div class="inputPrice" id = inputprice${item.id}>${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div class="inputContent" id = inputcontent${item.id}>${item.content}</div>
            <div class="data_btn">
                <button class="btnDel" id = delete_${item.id} onClick = "delete_fuc(${item.id})">삭제</button>
            </div>
        </div>
        `
    }).join("");
}

//삭제 버튼 클릭 함수
function delete_fuc(item) {
    //console.log(item);
    const tbody = document.querySelector(".tBody");
    const new_data = cart_data.filter((element) => Number(element.id) !==item);
    //console.log(new_data)
    cart_data = new_data;

    const del = document.getElementById(`delete_${item}`)
    del.parentNode.parentNode.remove(del);

    window.localStorage.setItem("cart_data",JSON.stringify(new_data));

    if(cart_data.length === 0){
        tbody.innerHTML = `<div class="empty_img"><img class="imageStyle" src="/Img/empty.png" alt="shopping_cart"></div>`
    }
}

//모두 삭제 버튼 함수
function All_delete(){
    const tbody = document.querySelector(".tBody");
    tbody.innerHTML = "";

    cart_data.length = 0;
    tbody.innerHTML = `<div class="empty_img"><img class="imageStyle" src="/Img/empty.png" alt="shopping_cart"></div>`
    window.localStorage.setItem("cart_data",JSON.stringify(cart_data));
}

//window onload 함수
window.onload = function () {
    const tbody = document.querySelector(".tBody");
    
    if(cart_data.length === 0){
        tbody.innerHTML = `<div class="empty_img"><img class="imageStyle" src="/Img/empty.png" alt="shopping_cart"></div>`
    }else{
        dataPrint();
    }
    
}
