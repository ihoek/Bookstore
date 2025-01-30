//index 로컬스토로지
let main_data_map = [];
let local_data = window.localStorage.getItem("_data");

//변수 선언
const container_main = document.querySelector(".container_main");
const login = document.getElementById("login");
const shopping_cart = document.getElementById("shop");

//장바구니 로컬 스토로지
//let shopping = [];
let shopping_data = [];
let ls_shopping = window.localStorage.getItem("shopping_data");

//값이 있을 때 메인 화면 구성
function dataMainPrint() {
  container_main.innerHTML = main_data_map
    .map((element) => {
      return `
    <div class="cardstyle">
          <img class="cardimg" src="${element.imgsrc}" id = ${element.id}>
          <div class="card_body">
            <h5 class="card_title">${element.name}</h5>
            <p class="card_content">${element.content}</p>
            <img class="heartimg cardimg" src=${element.heart_img_src} alt="heart" id="heart${element.id}" onclick="heart(${element.id})">
          </div>
      </div>`;
    })
    .join("");
}

//값이 없을 때 메인 화면 구성
function nulldataPrint() {
  container_main.innerHTML = `<div class="empty_style"><img class="imageStyle" src="./Img/empty.png" alt="empty"></div>`;
}

//login 버튼 클릭
login.addEventListener("click", () => {
  Swal.fire({
    icon: "error",
    title: "로그인 준비중 입니다",
  });
});

//window 로드
window.onload = function () {  
  if (JSON.parse(local_data) === null) {
    nulldataPrint();
  } else {
    //main data map - 화면을 그리기 위한 배열
  JSON.parse(local_data).map((element) => {
    let infoData = {
      id: element._id,
      imgsrc: element.img,
      name: element.name,
      price: element.age,
      heart_img_src: element.heart_src,
      content : element.career,
      heart_chk : element.heart_chk
    };
    main_data_map.push(infoData);
  });

  //쇼핑 local Storage 생성
  JSON.parse(local_data).map((element) => {
    let shopping = {
      id : element._id,
      imgsrc : element.img,
      name : element.name,
      price : element.age,
      content : element.career,
      check : element.heart_chk,
    }
    shopping_data.push(shopping);
  });

  dataMainPrint();
 
  }
};



//heart 클릭 이벤트
function heart(item) {
  //item === element.id
    let new_shopping_data = shopping_data.map((element) =>{
      let heart_src_id = document.getElementById(`heart${item}`);
      if(Number(element.id) === item){
        if(element.check === false){
          heart_src_id.src = "./Img/fullheart.png";
          return {
            ...element,
            check : true
          }
        }else{
          heart_src_id.src = "./Img/heart.png";
          return {
            ...element,
            check : false
          }
        }
      }else{
        return {
          ...element
        }
      }
    });
    shopping_data = new_shopping_data;
    window.localStorage.setItem("shopping_data", JSON.stringify(new_shopping_data));

    let new_data = JSON.parse(local_data).map((element) =>{
      
      //console.log("element",element)
      if(Number(element._id) === item){
        if(element.heart_chk === false){
          
          return{
            ...element,
            heart_chk : true,
            heart_src : "./Img/fullheart.png",
          }
        }else{
          
          return{
            ...element,
            heart_chk : false,
            heart_src : "./Img/heart.png",
          }
        }
      }else{
        return {
          ...element
        }
      }
      
    });
    local_data = new_data;
    window.localStorage.setItem("_data", JSON.stringify(new_data));

}

