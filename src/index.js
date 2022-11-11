import ApiServise from './js/API';

import throttle from 'lodash.throttle';
import { clickOnMovie } from './js/clickOnMovie';
import { onScroll } from './js/onScroll';
import { onSubmit } from './js/onSubmit';
import { renderCards } from './js/renderCards';
import { stickyHeader } from './js/sticky-header';
import trailer from './js/film-trailer.js';

import { showModal } from './js/film-modal';
import { spiner, spinerRemove, noInfo } from './js/notifications';
import { onOpenTeamModal } from './js/team-modal.js';
import { ruAllert, ruDelete } from './js/notifications';

export const refs = {
  searchForm: document.querySelector('.home-header__form'),
  stickyHeaderForm: document.querySelector('.home-header__form__sticky'),
  cardHolder: document.querySelector('.card-holder'),
  // conteiner: document.querySelector('.card-container.container'),
  stickyHeader: document.querySelector('.js-home-header__sticky'),
  stickyHeaderForm: document.querySelector('.home-header__form__sticky'),
  footerLink: document.querySelector('.footer__link'),
};

export const apiServise = new ApiServise();

refs.searchForm.addEventListener('submit', onSubmit);
// window.addEventListener('scroll', throttle(onScroll, 1000));
refs.stickyHeaderForm.addEventListener('submit', onSubmit);
refs.cardHolder.addEventListener('click', onCardClick);

refs.stickyHeaderForm.addEventListener('change', () => {
  refs.searchForm.elements[0].value = refs.stickyHeaderForm.elements[0].value;
});

refs.searchForm.addEventListener('change', () => {
  refs.stickyHeaderForm.elements[0].value = refs.searchForm.elements[0].value;
});

// refs.conteiner.addEventListener('click', clickOnMovie);
spiner();
apiServise.fetchDefault().then(data => {
  renderCards(data);
});
spinerRemove();

function onCardClick(e) {
  if (e.target === e.currentTarget) return;

  if (e.target.classList.contains('film__trailer-btn'))
    return trailer.showTrailer(e.target.closest('li').id);

  // apiServise.movieId = e.path[2].id без постера не відкривається модалка
  apiServise.movieId = e.target.closest('li').id;
  spiner();
  apiServise.fetchById().then(data => {
    console.log(data);
    if (!data) {
      noInfo();
      spinerRemove();
      return;
    }
    if (data.data.original_language === 'ru') {
      ruAllert();
      e.target.classList.add('ruContent');
      spinerRemove();
    } else {
      showModal(data.data);
      spinerRemove();
    }
  });

  if (e.target.classList.contains('ruContent')) {
    ruDelete();
  }

  // apiServise.movieId = e.path[2].id

  // apiServise.fetchById(e.path[2].id).then(console.log);
}
//модалка команди
refs.footerLink.addEventListener('click', onOpenTeamModal);
