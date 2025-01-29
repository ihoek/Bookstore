//index 로컬스토로지
let main_data_map = [];
let infoData = [];
let local_data = window.localStorage.getItem("_data");

//변수 선언
const container_main = document.querySelector(".container_main");
const login = document.getElementById("login");
const shopping_cart = document.getElementById("shop");

let heartbtn_check = false; //하트버튼 확인용

//장바구니 로컬 스토로지
let shopping = [];
let shopping_data = [];

//값이 있을 때 메인 화면 구성
function dataMainPrint() {
  container_main.innerHTML = main_data_map.map((element) => {
    return `
    <div class="cardstyle">
          <img class="cardimg" src="${element.imgsrc}" id = ${element.id}>
          <div class="card_body">
            <h5 class="card_title">${element.name}</h5>
            <p class="card_content">${element.price}</p>
            <img class="heartimg cardimg" src="./Img/heart.png" alt="heart" id="heart${element.id}" onclick="heart(${element.id})">
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

  if(JSON.parse(local_data).length === 0 ){
    nulldataPrint();
  }else{
    dataMainPrint();
  }
}


//heart 클릭 이벤트
function heart(item){
  //item === element.id
  const heart_img = document.getElementById(`heart${item}`);
  let str_heart = heart_img.src;
  let str_heart_arr = str_heart.split("/")[str_heart.split("/").length-1];
  //console.log(str_heart_arr)

  shopping = {
    id : item,
    check : heartbtn_check
  }


  if(str_heart_arr === "heart.png"){//버튼을 한번 클릭한 상태
    heart_img.src = "./Img/fullheart.png";
    heartbtn_check = true;
  }else{
    heart_img.src = "./Img/heart.png";
    heartbtn_check = false;
  }

  

  if(shopping_data.indexOf(item)>=0){//값이 이미 존재하는 경우
    console.log("index" ,shopping_data.indexOf(item))
  }else{
    shopping_data.push(shopping);
  }

  shopping_data.map((element) => {
    if(element.id.indexOf(item) >=0){
      return {
        ...element,
        
      }
    }
    console.log(element)
  })
  window.localStorage.setItem("shopping_data",JSON.stringify(shopping_data))
  //shopping_data = new_data;
  //window.localStorage.setItem("shopping_data",JSON.stringify(new_data))
}
