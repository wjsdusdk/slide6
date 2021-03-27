// 1. 변수 지정

var sliderWrapper = document.querySelector(".container"),
    sliderContainer = document.querySelector(".slider-container"),
    slides = document.querySelectorAll(".slide"),
    slideCount = slides.length, // 슬라이드의 개수
    topHeight = 0,
    currentIndex = 0,
    navPrev = document.getElementById("prev"),
    navNext = document.getElementById("next"),
    timer = undefined, // 빈 값이라는 의미
    pagerHTML = "",
    pager = document.querySelector(".pager");
// pagerBtn = document.querySelectorAll(".pager span");
// 3. 슬라이드가 있으면 가로로 배열하기로 옮김 (여기는 아직 pager가 생성되기 전이라서)

// 2. 슬라이드의 높이 확인하여 부모의 높이로 지정하기

// topHeight = slides[0].offsetHeight;
// console.log(topHeight) //

for (var i = 0; i < slideCount; i++) {
    if (topHeight < slides[i].offsetHeight) {
        topHeight = slides[i].offsetHeight;
    }
}

console.log(topHeight);

sliderWrapper.style.height = topHeight + "px";
sliderContainer.style.height = topHeight + "px";

// 3. 슬라이드가 있으면 가로로 배열하기

for (var a = 0; a < slideCount; a++) {
    slides[a].style.left = a * 100 + "%";

    // pager.innerHTML = '<span data-idx="' + a + '">' + (a + 1) + "</span>";
    // 마지막 pager만 생성됨 (1개만 생성됨)

    // pagerHTML = pagerHTML + '<span data-idx="' + a + '">' + (a + 1) + "</span>";
    // i = i + 2 를 축약하면 i += 2 -> 이것을 이용해서 축약
    pagerHTML += '<span data-idx="' + a + '">' + (a + 1) + "</span>";
    pager.innerHTML = pagerHTML;
}

var pagerBtn = document.querySelectorAll(".pager span");

// 4. 슬라이드 이동 함수

function goToSlide(idx) {
    sliderContainer.style.left = idx * -100 + "%";
    sliderContainer.classList.add("animated");
    currentIndex = idx;

    // updateNav();

    // 모든 pager에서 .active 제거
    for (var y = 0; y < pagerBtn.length; y++) {
        pagerBtn[y].classList.remove("active");
    }

    // 활성화 또는 클릭된 pagerBtn에만 .active 추가
    pagerBtn[idx].classList.add("active");
}

// 5. 버튼 기능 업데이트 함수

/* function updateNav() {
    // 첫 페이지라면
    if (currentIndex == 0) {
        navPrev.classList.add("disabled");
    } else {
        navPrev.classList.remove("disabled");
    }

    // 마지막 페이지라면
    if (currentIndex == slideCount - 1) {
        navNext.classList.add("disabled");
    } else {
        navNext.classList.remove("disabled");
    }
} */

// 6. 버튼을 클릭하면 슬라이드 이동시기키

navPrev.addEventListener("click", function (e) {
    e.preventDefault();

    // goToSlide(currentIndex - 1);

    // 첫 페이지라면
    if (currentIndex == 0) {
        goToSlide(slideCount - 1);
    } else {
        goToSlide(currentIndex - 1);
    }
});
navNext.addEventListener("click", function (e) {
    e.preventDefault();

    // goToSlide(currentIndex + 1);

    // 마지막 페이지라면
    if (currentIndex == slideCount - 1) {
        goToSlide(0);
    } else {
        goToSlide(currentIndex + 1);
    }
});

// 7. 첫번째 슬라이드 먼저 보이도록 하기

goToSlide(0); // 이걸 안적으면 처음에 pagerBtn이 활성화되있지 않기 때문에 적음
// 이걸 안적으면 처음에 이전 화살표가 표시되기 때문에 적음

// 8. 자동 슬라이드

// 4초마다 goToSlide(숫자); 0, 1, 2, 3, ... 5, 0
// setInterval(할 일, 4000);
// 함수 = 할 일 = function() {실제 할 일}
// 실제 할 일 = goToSlide(숫자); 0, 1, 2, 3, ... 5, 0

/* var timer = setInterval(function () {
    // goToSlide(숫자); 0, 1, 2, 3, ... 5, 0
    // ci 0 4초 ni 1,ci 1 4초 ni 2 ... ci 5 4초 ni 0

    var nextIdx = (currentIndex + 1) % slideCount; // 나눈 나머지
    goToSlide(nextIdx);
}, 1000); */

// 자동 슬라이드 함수 (재사용이 가능하도록 함수로 만듬)
function startAutoSlide() {
    timer = setInterval(function () {
        // goToSlide(숫자); 0, 1, 2, 3, ... 5, 0
        // ci 0 4초 ni 1,ci 1 4초 ni 2 ... ci 5 4초 ni 0

        var nextIdx = (currentIndex + 1) % slideCount; // 나눈 나머지
        goToSlide(nextIdx);
    }, 1000);
}
startAutoSlide();

// clearInterval(대상)
// sliderWrapper에 마우스가 들어오면 할 일, 나가면 할 일

// 마우스가 들어오면 자동 슬라이드 멈춤

sliderWrapper.addEventListener("mouseenter", function () {
    clearInterval(timer);
});

// 마우스가 나가면 자동 슬라이드 시작
sliderWrapper.addEventListener("mouseleave", function () {
    startAutoSlide();
});

// 9. pager 클릭으로 슬라이드 이동하기

for (var x = 0; x < pagerBtn.length; x++) {
    pagerBtn[x].addEventListener("click", function () {
        // innerText 내용 반환 // A.innerText 내용 확인(저장) // A.innerText = 'B'; A를 B로 교체
        // innerHTML 태그 반환 // A.innerHTML 내용 확인(저장) // A.innerHTML = 'B'; A를 B로 교체

        // 방법 1
        console.log(event.target);
        var pagerNum = event.target.getAttribute("data-idx");

        // 방법 2
        // console.log(event.target.innerText)
        // var pagerNum = event.target.innerText - 1;

        goToSlide(pagerNum);

        /* // 모든 pagerBtn에서 .active 제거하고 클릭된 요소에만 .active 추가
        for (var y = 0; y < pagerBtn.length; y++) {
            pagerBtn[y].classList.remove('active');
        }

        event.target.classList.add('active');

        4. 슬라이드 이동 함수로 옮김 */
    });
}
