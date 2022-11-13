import ApiServiselibrary from './js/API';
//import { renderCardsLibrary } from './js/renderCards';
//import { showModalLibrary } from './js/film-modal';
import { onOpenTeamModal } from './js/team-modal.js';
import { switcher } from './js/switcher';
import { onQueuedBtn, onWatchedBtn } from './js/btnWatchedQueue.js';
import { spiner, spinerRemove, noInfo } from './js/notifications';
import trailer from './js/film-trailer.js';
import { showModal } from './js/film-modal';
import { onSubmitScroll } from './js/onSubmit.js';

export const refs = {
  cardHolderLibrary: document.querySelector('.card-holder'),
  footerLink: document.querySelector('.footer__link'),
  stickyHeaderMyLibrary: document.querySelector(
    '.js-my-library-header__sticky'
  ),
  watchedBtn: document.querySelector('.js-watched'),
  queuedBtn: document.querySelector('.js-queue'),
  movieModal: document.querySelector('.js-movie-modal'),
  pagination: document.querySelector('.pagination__container'),
};

const stickyMyLibrary = (window.onscroll = function showHeaderMyLibrary() {
  if (window.pageYOffset > 200) {
    refs.stickyHeaderMyLibrary.classList.add('my-library-header__sticky');
  } else {
    refs.stickyHeaderMyLibrary.classList.remove('my-library-header__sticky');
  }
});

const apiServise = new ApiServiselibrary();

refs.footerLink.addEventListener('click', onOpenTeamModal);
refs.cardHolderLibrary.addEventListener('click', onCardClick);
refs.watchedBtn.addEventListener('click', onWatched);
refs.queuedBtn.addEventListener('click', onQueued);
refs.movieModal.addEventListener('click', onModalClick);
refs.pagination.addEventListener('click', onPagination);

// Початкове завантаження
onWatchedBtn();

function onWatched(e) {
  if (e.target.classList.contains('my-library-header__button--current')) return;

  e.target.classList.add('my-library-header__button--current');
  refs.queuedBtn.classList.remove('my-library-header__button--current');
  refs.cardHolderLibrary.innerHTML = '';
  onWatchedBtn(1);
}

function onQueued(e) {
  if (e.target.classList.contains('my-library-header__button--current')) return;

  e.target.classList.add('my-library-header__button--current');
  refs.watchedBtn.classList.remove('my-library-header__button--current');
  refs.cardHolderLibrary.innerHTML = '';
  onQueuedBtn(1);
}

function onCardClick(e) {
  if (e.target === e.currentTarget) return;

  if (e.target.classList.contains('film__trailer-btn'))
    return trailer.showTrailer(e.target.closest('li').id);

  apiServise.movieId = e.target.closest('li').id;
  spiner();
  apiServise.fetchById().then(data => {
    showModal(data.data);
    spinerRemove();
  });
}

// Перезавантаження сторінки бібліотеки після видалення фільму
function onModalClick(e) {
  if (
    e.target.classList.contains('add-watched') &&
    refs.watchedBtn.classList.contains('my-library-header__button--current')
  ) {
    refs.cardHolderLibrary.innerHTML = '';
    onWatchedBtn();
  }
  if (
    e.target.classList.contains('add-queue') &&
    refs.queuedBtn.classList.contains('my-library-header__button--current')
  ) {
    refs.cardHolderLibrary.innerHTML = '';
    onQueuedBtn();
  }
}

// Відстежування пагінації
function onPagination(e) {
  if (e.target === e.currentTarget || e.target.nodeName === 'UL') return;

  let id = null;
  if (
    e.target.nodeName === 'svg' ||
    e.target.nodeName === 'BUTTON' ||
    e.target.nodeName === 'path'
  ) {
    if (
      e.target.closest('button').classList.contains('pagination__left-btn') &&
      e.target.closest('button').classList.contains('on')
    )
      id = Number(document.querySelector('.pagination__item--current').id) - 1;
    else if (
      e.target.closest('button').classList.contains('pagination__right-btn') &&
      e.target.closest('button').classList.contains('on')
    )
      id = Number(document.querySelector('.pagination__item--current').id) + 1;
    else return;
  } else {
    if (!isNaN(e.target.closest('li').id))
      id = Number(e.target.closest('li').id);
    else if (e.target.closest('li').id === '...')
      return apiServise.query ? successPages(1, 1) : successPages(1);
    else return;
  }

  if (
    refs.watchedBtn.classList.contains('my-library-header__button--current')
  ) {
    onSubmitScroll();
    onWatchedBtn(id);
  } else {
    onSubmitScroll();
    onQueuedBtn(id);
  }
}
