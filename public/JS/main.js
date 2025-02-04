//index 로컬스토로지
let main_data_map = [];
let local_data = window.localStorage.getItem("_data");

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

let cart_list_data = window.localStorage.getItem("cart_data");
let cart_list = JSON.parse(cart_list_data);

//페이지 이동
//logo 클릭 시 이동
logoStyle.addEventListener("click", () => {
  window.location.href = "./main";
});

//값이 있을 때 메인 화면 구성
function dataMainPrint() {
  container_main.innerHTML = main_data_map
    .map((element) => {
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
    dataMainPrint();
  }
});

//경제 선택
category_economy.addEventListener("click", () => {
  category_economy.style.borderBottom = "3px solid #6ca6cd";
  category_all.style.borderBottom = "none";
  category_humanities.style.borderBottom = "none";
  category_novel.style.borderBottom = "none";
  category_science.style.borderBottom = "none";
  let economyBooks = main_data_map.filter(
    (element) => element.genre === "경제"
  );
  if (economyBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    container_main.innerHTML = economyBooks
      .map((element) => {
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
      </div>`;
      })
      .join("");
  }
});
//인문 선택
category_humanities.addEventListener("click", () => {
  category_humanities.style.borderBottom = "3px solid #6ca6cd";
  category_economy.style.borderBottom = "none";
  category_all.style.borderBottom = "none";
  category_novel.style.borderBottom = "none";
  category_science.style.borderBottom = "none";
  let humanBooks = main_data_map.filter((element) => element.genre === "인문");
  if (humanBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    container_main.innerHTML = humanBooks
      .map((element) => {
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
      </div>`;
      })
      .join("");
  }
});

//소설 선택
category_novel.addEventListener("click", () => {
  category_novel.style.borderBottom = "3px solid #6ca6cd";
  category_economy.style.borderBottom = "none";
  category_all.style.borderBottom = "none";
  category_humanities.style.borderBottom = "none";
  category_science.style.borderBottom = "none";
  let novelBooks = main_data_map.filter((element) => element.genre === "소설");
  if (novelBooks.length === 0) {
    nulldataPrint(); // 데이터가 없을 때 빈 화면 표시
  } else {
    container_main.innerHTML = novelBooks
      .map((element) => {
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
      </div>`;
      })
      .join("");
  }
});

//자연과학 선택
category_science.addEventListener("click", () => {
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
    container_main.innerHTML = scienceBooks
      .map((element) => {
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
      </div>`;
      })
      .join("");
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
