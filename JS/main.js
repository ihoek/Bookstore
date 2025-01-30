//index 로컬스토로지
let main_data_map = [];
let infoData = [];
let local_data = window.localStorage.getItem("_data");

//변수 선언
const container_main = document.querySelector(".container_main");
const login = document.getElementById("login");
const shopping_cart = document.getElementById("shop");

//장바구니 로컬 스토로지
let shopping = [];
let shopping_data = [];
let ls_shopping = window.localStorage.getItem("shopping_data");

let heart_check = false;
//let heart_src = "./Img/heart.png";3

//값이 있을 때 메인 화면 구성
function dataMainPrint() {
  container_main.innerHTML = main_data_map
    .map((element) => {
      return `
    <div class="cardstyle">
          <img class="cardimg" src="${element.imgsrc}" id = ${element.id}>
          <div class="card_body">
            <h5 class="card_title">${element.name}</h5>
            <p class="card_content">${element.price}</p>
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
  if (ls_shopping !== null) {
    for (let j in JSON.parse(ls_shopping)) {
      shopping_data.push(JSON.parse(ls_shopping)[j]);
    }
  }
  JSON.parse(local_data).map((element) => {
    infoData = {
      id: element._id,
      imgsrc: element.img,
      name: element.name,
      price: element.career,
      heart_img_src: "./Img/heart.png",
    };
    main_data_map.push(infoData);
  });

  if (JSON.parse(local_data).length === 0) {
    nulldataPrint();
  } else {
    dataMainPrint();
  }
};

//heart 클릭 이벤트
function heart(item) {
  //item === element.id
  const heart_img = document.getElementById(`heart${item}`);
  let str_heart = heart_img.src;
  let str_heart_arr = str_heart.split("/")[str_heart.split("/").length - 1];
  //console.log(str_heart_arr); //heart.png
  console.log(heart_img);
  shopping = {
    id: item,
    check: heart_check,
    //src: heart_src,
  };

  if (str_heart_arr === "heart.png") {
    //버튼을 한번 클릭한 상태 check === false 상태
    heart_img.src = "./Img/fullheart.png";
    shopping_data.push(shopping);
    heart_check = true;
    main_data_map.map((item) => {
      return {
        ...item,
        heart_img_src: heart_img.src,
      };
    });
    console.log(main_data_map);
  } else {
    shopping_data.map((element) => {
      let index = shopping_data.indexOf(element);
      shopping_data.splice(index, 1);
    });
    heart_img.src = "./Img/heart.png";
    //heart_src = "./Img/heart.png";
    heart_check = false;
  }

  window.localStorage.setItem("shopping_data", JSON.stringify(shopping_data));
}
