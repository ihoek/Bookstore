//index 로컬스토로지
let main_data_map = [];
let local_data = window.localStorage.getItem("_data");
let local_data_len = JSON.parse(local_data).length;

//변수 선언 - DOM
const container_main = document.querySelector(".container_main");
const login = document.getElementById("login");
const shopping_cart = document.getElementById("shop");
const shop = document.getElementById("shop");
const logoStyle = document.querySelector(".logoStyle");
const cart_num = document.querySelector(".cart_num");
const inquiry = document.getElementById("inquiry");
const faq = document.getElementById("faq");
const used = document.getElementById("used");
const category_all = document.getElementById("category_all");
const category_economy = document.getElementById("category_economy");
const category_humanities = document.getElementById("category_humanities");
const category_novel = document.getElementById("category_novel");
const category_science = document.getElementById("category_science");
const container_pagination = document.querySelector(".container_pagination");
const pagination_left = document.querySelector(".pagination_left");
const pagination_mid = document.querySelector(".pagination_mid");
const pagination_right = document.querySelector(".pagination_right");

let cart_list_data = window.localStorage.getItem("cart_data");
let cart_list = JSON.parse(cart_list_data);

//페이지 이동
//logo 클릭 시 이동
logoStyle.addEventListener("click", () => {
  window.location.href = "./main";
});

//값이 있을 때 메인 화면 구성
function dataMainPrint(page_min) {
  //console.log("page_min", page_min);
  pagination_mid.innerHTML = "";
  //console.log("local_data", JSON.parse(local_data).length);
  //console.log("page_min", page_min); //처음값 나중값 출력
  container_main.innerHTML = main_data_map
    .map((element, index) => {
      //console.log("index", index);
      if (page_min <= index && index < page_min + 5) {
        //해당 범위 내에만 출력
        return `
            <div class="cardstyle">
                  <img class="cardimg" 
                  src="${element.img}" 
                  id = ${element.id} 
                  onclick="MovePage(${element.id})">

                  <div class="card_body">
                    
                    <img class="heartimg" 
                    src=${element.heart_src} 
                    alt="heart" id="heart${element.id}" 
                    onclick="heart(${element.id})">
                  </div>
            </div>
            `;
      }
    })
    .join("");
  pagination_left.innerHTML = `<button class="paginav_left" onClick="page_pre(${page_min})"><</button>`;

  for (let i = 1; i <= Math.ceil(local_data_len / 5); i++) {
    pagination_mid.innerHTML += `<button class="paginav_mid" onClick="paginav(${i})" id="pagi_btn${i}">${i}</button>`;
  }
  pagination_right.innerHTML = `<button class="paginav_right" onClick="page_next(${page_min})">></button>`;
}

//페이지네이션 이동 함수 - all
function paginav(item) {
  console.log(`page${item}`);
  let cnt = (item - 1) * 5;

  dataMainPrint(cnt);
  const paginav_btn = document.getElementById(`pagi_btn${item}`);
  paginav_btn.style.backgroundColor = "red";
}

//페이지네이션 이동 함수 - 소설
function paginav_cat_novel(item) {
  console.log(`page${item}`);
  let cnt = (item - 1) * 5;
  dataNovelPrint(cnt);
  const paginav_btn = document.getElementById(`pagi_btn${item}`);
  paginav_btn.style.backgroundColor = "red";
}

//페이지네이션 이동 함수 - 경제
function paginav_cat_econo(item) {
  console.log(`page${item}`);
  let cnt = (item - 1) * 5;
  dataEconoPrint(cnt);
  const paginav_btn = document.getElementById(`pagi_btn${item}`);
  paginav_btn.style.backgroundColor = "red";
}

//페이지네이션 이동 함수 - 인문
function paginav_cat_human(item) {
  console.log(`page${item}`);
  let cnt = (item - 1) * 5;
  dataHumanPrint(cnt);
  const paginav_btn = document.getElementById(`pagi_btn${item}`);
  paginav_btn.style.backgroundColor = "red";
}

//페이지네이션 이동 함수 - 자연과학
function paginav_cat_scien(item) {
  console.log(`page${item}`);
  let cnt = (item - 1) * 5;
  dataSciencePrint(cnt);
  const paginav_btn = document.getElementById(`pagi_btn${item}`);
  paginav_btn.style.backgroundColor = "red";
}

//페이지네이션 이전 이동 함수
function page_pre(current_page) {
  //console.log("이전 클릭");
  //console.log("current_page", current_page);
  let page = Math.ceil(current_page - 5);
  if (page < 0) {
    alert("이전으로 갈 수 없습니다.");
  } else {
    dataMainPrint(page);
    const paginav_btn = document.getElementById(`pagi_btn${current_page / 5}`);
    paginav_btn.style.backgroundColor = "red";
  }
}

//페이지네이션 다음 이동 함수
function page_next(current_page) {
  //console.log("다음 클릭");
  console.log("current_page", current_page + 5); //현재 위치한 index 값
  let page = current_page + 5;
  if (page < local_data_len) {
    console.log("pager", page);
    dataMainPrint(page);
    const paginav_btn = document.getElementById(
      `pagi_btn${current_page / 5 + 2}`
    );
    paginav_btn.style.backgroundColor = "red";
  } else {
    alert("이후로 갈 수 없습니다.");
  }
}

//값이 없을 때 메인 화면 구성
function nulldataPrint() {
  container_main.innerHTML = `<div class="empty_style"><img class="imageStyle" src="./Img/empty.png" alt="empty"></div>`;
  pagination_left.innerHTML = "";
  pagination_mid.innerHTML = "";
  pagination_right.innerHTML = "";
}

//카테고리 소설 선택 시 배열
let novelBooks = JSON.parse(local_data).filter(
  (element) => element.genre === "소설"
);

//카테고리 경제 선택 시 배열
let economyBooks = JSON.parse(local_data).filter(
  (element) => element.genre === "경제"
);

//카테고리 인문 선택 시 배열
let humanBooks = JSON.parse(local_data).filter(
  (element) => element.genre === "인문"
);

//카테고리 자연과학 선택 시 배열
let scienceBooks = JSON.parse(local_data).filter(
  (element) => element.genre === "자연과학"
);

//값이 있을 때 메인 화면 구성 - 경제
function dataEconoPrint(page_min) {
  pagination_mid.innerHTML = "";

  container_main.innerHTML = economyBooks
    .map((element, index) => {
      if (page_min <= index && index < page_min + 5) {
        //해당 범위 내에만 출력
        return `
            <div class="cardstyle">
                  <img class="cardimg" 
                  src="${element.img}" 
                  id = ${element.id} 
                  onclick="MovePage(${element.id})">

                  <div class="card_body">
                    
                    <img class="heartimg" 
                    src=${element.heart_src} 
                    alt="heart" id="heart${element.id}" 
                    onclick="heart(${element.id})">
                  </div>
            </div>
            `;
      }
    })
    .join("");
  pagination_left.innerHTML = `<button class="paginav_left" onClick="page_pre(${page_min})"><</button>`;

  for (let i = 1; i <= Math.ceil(economyBooks.length / 5); i++) {
    console.log("i", i);
    pagination_mid.innerHTML += `<button class="paginav_mid" onClick="paginav_cat_econo(${i})" id="pagi_btn${i}">${i}</button>`;
  }
  pagination_right.innerHTML = `<button class="paginav_right">></button>`;
}

//값이 있을 때 메인 화면 구성 - 소설
function dataNovelPrint(page_min) {
  pagination_mid.innerHTML = "";

  container_main.innerHTML = novelBooks
    .map((element, index) => {
      if (page_min <= index && index < page_min + 5) {
        //해당 범위 내에만 출력
        return `
            <div class="cardstyle">
                  <img class="cardimg" 
                  src="${element.img}" 
                  id = ${element.id} 
                  onclick="MovePage(${element.id})">

                  <div class="card_body">
                    
                    <img class="heartimg" 
                    src=${element.heart_src} 
                    alt="heart" id="heart${element.id}" 
                    onclick="heart(${element.id})">
                  </div>
            </div>
            `;
      }
    })
    .join("");
  pagination_left.innerHTML = `<button class="paginav_left" onClick="page_pre()"><</button>`;

  for (let i = 1; i <= Math.ceil(novelBooks.length / 5); i++) {
    console.log("i", i);
    pagination_mid.innerHTML += `<button class="paginav_mid" onClick="paginav_cat_novel(${i})" id="pagi_btn${i}">${i}</button>`;
  }
  pagination_right.innerHTML = `<button class="paginav_right">></button>`;
}

//값이 있을 때 메인 화면 구성 - 인문
function dataHumanPrint(page_min) {
  pagination_mid.innerHTML = "";

  container_main.innerHTML = humanBooks
    .map((element, index) => {
      if (page_min <= index && index < page_min + 5) {
        //해당 범위 내에만 출력
        return `
            <div class="cardstyle">
                  <img class="cardimg" 
                  src="${element.img}" 
                  id = ${element.id} 
                  onclick="MovePage(${element.id})">

                  <div class="card_body">
                    
                    <img class="heartimg" 
                    src=${element.heart_src} 
                    alt="heart" id="heart${element.id}" 
                    onclick="heart(${element.id})">
                  </div>
            </div>
            `;
      }
    })
    .join("");
  pagination_left.innerHTML = `<button class="paginav_left" onClick="page_pre()"><</button>`;

  for (let i = 1; i <= Math.ceil(humanBooks.length / 5); i++) {
    console.log("i", i);
    pagination_mid.innerHTML += `<button class="paginav_mid" onClick="paginav_cat_human(${i})" id="pagi_btn${i}">${i}</button>`;
  }
  pagination_right.innerHTML = `<button class="paginav_right">></button>`;
}

//값이 있을 때 메인 화면 구성 - 자연과확
function dataSciencePrint(page_min) {
  pagination_mid.innerHTML = "";

  container_main.innerHTML = scienceBooks
    .map((element, index) => {
      if (page_min <= index && index < page_min + 5) {
        //해당 범위 내에만 출력
        return `
            <div class="cardstyle">
                  <img class="cardimg" 
                  src="${element.img}" 
                  id = ${element.id} 
                  onclick="MovePage(${element.id})">

                  <div class="card_body">
                    
                    <img class="heartimg" 
                    src=${element.heart_src} 
                    alt="heart" id="heart${element.id}" 
                    onclick="heart(${element.id})">
                  </div>
            </div>
            `;
      }
    })
    .join("");
  pagination_left.innerHTML = `<button class="paginav_left" onClick="page_pre()"><</button>`;

  for (let i = 1; i <= Math.ceil(scienceBooks.length / 5); i++) {
    console.log("i", i);
    pagination_mid.innerHTML += `<button class="paginav_mid" onClick="paginav_cat_scien(${i})" id="pagi_btn${i}">${i}</button>`;
  }
  pagination_right.innerHTML = `<button class="paginav_right">></button>`;
}

//login 버튼 클릭
login.addEventListener("click", () => {
  Swal.fire({
    icon: "error",
    title: "로그인 준비중 입니다",
  });
});
//장바구니 클릭 이벤트
shop.addEventListener("click", () => {
  window.location.href = "./shopping_basket";
});

//전체 선택
category_all.addEventListener("click", () => {
  category_all.style.borderBottom = "3px solid #6ca6cd";
  category_economy.style.borderBottom = "none";
  category_humanities.style.borderBottom = "none";
  category_novel.style.borderBottom = "none";
  category_science.style.borderBottom = "none";
  let allBook = main_data_map;
  if (allBook.length === 0) {
    nulldataPrint();
  } else {
    dataMainPrint(0);
    const paginav_btn = document.getElementById("pagi_btn1");
    paginav_btn.style.backgroundColor = "red";
  }
});

//경제 선택
category_economy.addEventListener("click", () => {
  pagination_mid.innerHTML = "";

  category_economy.style.borderBottom = "3px solid #6ca6cd";
  category_all.style.borderBottom = "none";
  category_humanities.style.borderBottom = "none";
  category_novel.style.borderBottom = "none";
  category_science.style.borderBottom = "none";

  if (economyBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    dataEconoPrint(0);
    const paginav_btn = document.getElementById("pagi_btn1");
    paginav_btn.style.backgroundColor = "red";
  }
});
//인문 선택
category_humanities.addEventListener("click", () => {
  pagination_mid.innerHTML = "";

  category_humanities.style.borderBottom = "3px solid #6ca6cd";
  category_economy.style.borderBottom = "none";
  category_all.style.borderBottom = "none";
  category_novel.style.borderBottom = "none";
  category_science.style.borderBottom = "none";
  let humanBooks = main_data_map.filter((element) => element.genre === "인문");
  if (humanBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    dataHumanPrint(0);
    const paginav_btn = document.getElementById(`pagi_btn1`);
    paginav_btn.style.backgroundColor = "red";
  }
});

//소설 선택
category_novel.addEventListener("click", () => {
  pagination_mid.innerHTML = "";

  category_novel.style.borderBottom = "3px solid #6ca6cd";
  category_economy.style.borderBottom = "none";
  category_all.style.borderBottom = "none";
  category_humanities.style.borderBottom = "none";
  category_science.style.borderBottom = "none";

  if (novelBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    dataNovelPrint(0);
    const paginav_btn = document.getElementById("pagi_btn1");
    paginav_btn.style.backgroundColor = "red";
  }
});

//자연과학 선택
category_science.addEventListener("click", () => {
  pagination_mid.innerHTML = "";

  category_science.style.borderBottom = "3px solid #6ca6cd";
  category_economy.style.borderBottom = "none";
  category_all.style.borderBottom = "none";
  category_humanities.style.borderBottom = "none";
  category_novel.style.borderBottom = "none";
  let scienceBooks = main_data_map.filter(
    (element) => element.genre === "자연과학"
  );
  if (scienceBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    dataSciencePrint(0);
    const paginav_btn = document.getElementById(`pagi_btn1`);
    paginav_btn.style.backgroundColor = "red";
  }
});

//window 로드
window.onload = function (event) {
  //페이지 이동 감지 후 새로 고침
  if (event.persisted == true) {
    location.reload(); // 새로고침
  }

  if (JSON.parse(local_data).length === 0) {
    nulldataPrint();
  } else {
    //main data map - 화면을 그리기 위한 배열
    JSON.parse(local_data).map((element) => {
      //console.log("element",element)
      let infoData = {
        id: element.id,
        img: element.img,
        name: element.name,
        price: element.price,
        heart_src: element.heart_src,
        content: element.content,
        heart_chk: element.heart_chk,
        genre: element.genre,
      };

      main_data_map.push(infoData);
    });

    category_all.click();
  }
  //장바구니 숫자
  if (cart_list_data === null || cart_list.length === 0) {
    cart_num.innerHTML = "0";
  } else {
    cart_num.innerHTML = `<div>${cart_list.length}</div>`;
  }
};

//MovePage 함수
function MovePage(item) {
  //item -> id값값
  window.location.href = `./submain?id=${item}`;
}

//heart 클릭 이벤트
function heart(item) {
  //item === element.id
  let heart_src_id = document.getElementById(`heart${item}`);
  let new_data = main_data_map.map((element) => {
    if (Number(element.id) === item) {
      //해당 영역 클릭
      if (element.heart_chk === false) {
        heart_src_id.src = "./Img/fullheart.png";
        //element.heart_chk = true;
        //console.log(element.heart_chk)
        return {
          ...element,
          heart_chk: true,
          heart_src: "./Img/fullheart.png",
        };
      } else {
        heart_src_id.src = "./Img/heart.png";
        return {
          ...element,
          heart_chk: false,
          heart_src: "./Img/heart.png",
        };
      }
    } else {
      return { ...element };
    }
  });
  //console.log(new_data);
  main_data_map = new_data;
  window.localStorage.setItem("_data", JSON.stringify(new_data));
}

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
