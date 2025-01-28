//변수 선언
let main_data_map = [];
let infoData = [];
let local_data = window.localStorage.getItem("_data");

const container_main = document.querySelector(".container_main");
const login = document.getElementById("login");
const shopping_cart = document.getElementById("shop");



//값이 있을 때 메인 화면 구성
function dataMainPrint() {
  container_main.innerHTML = main_data_map.map((element) => {
    return `
    <div class="cardstyle card">
          <img src="${element.imgsrc}" class="card-img-top" id = ${element.id}>
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.price}</p>
            <a href="#" class="btn btn-primary">장바구니</a>
          </div>
      </div>`;
  }).join("");
}

//값이 없을 때 메인 화면 구성
function nulldataPrint(){
  container_main.innerHTML = `<div class="empty_style"><img class="imageStyle" src="./Img/empty.png" alt="empty"></div>`;
}

//login 버튼 클릭
login.addEventListener(("click"),() => {
  Swal.fire({
    icon: "error",
    title: "로그인 준비중 입니다",
  });
})


//window 로드
  window.onload = function(){    
    JSON.parse(local_data).map((element) => {
      infoData = {
        id : element._id,
        imgsrc: element.img,
        name: element.name,
        price: element.career,
      };
      main_data_map.push(infoData);
    });

    console.log("len",JSON.parse(local_data).length)
    if(JSON.parse(local_data).length === 0 ){
      console.log("1");
      nulldataPrint();
    }else{
      dataMainPrint();
    }
    
    //console.log("total",main_data_map);
  }