'use strict'

const selectCurrent = document.querySelector('.rating__select-current');
const selectCurrentText = document.querySelector('.rating__select-current span');
const selectArrow = document.querySelector('.rating__select-current img');
const selectItems = document.querySelector('.rating__select-items');

const toggleClassActive = (element) => {
    element.classList.toggle('active');
}

selectCurrent.addEventListener('click', () => {
    toggleClassActive(selectItems);
    toggleClassActive(selectArrow);

    selectCurrent.classList.toggle('border');
});

selectItems.addEventListener('click', (e) => {
    toggleClassActive(selectItems);
    toggleClassActive(selectArrow);
    selectCurrent.classList.toggle('border');

    selectCurrentText.textContent = e.target.textContent;
    selectCurrent.classList.add('active');
});

const swiper = new Swiper('.swiper', {
    // loop: true,
    slidesPerView: 3,
    spaceBetween: 30,

    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },

    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        440: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});
