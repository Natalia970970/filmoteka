!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequired7c6=n);var i=n("dNYR7"),a=n("ghnK3");n("78qpV");var o=n("5rOqX");function c(e){f.cardHolderLibrary.innerHTML=e.map((({id:e,poster_path:t,name:r,title:n,release_date:i,genres:a,original_language:c})=>`<li class="film__item" id="${e}"><a class="film__item__link">\n                ${(0,o.getMarkupImgPoster)(c,t,r,n)}\n                <h2>${(0,o.getShortName)(n||r)}</h2>\n                <p> ${(0,o.getGenresByID)(a)} | ${(0,o.getYear)(i)}</p>\n                <button class="film__trailer-btn" type="button">Trailer <span class="film__trailer-btn">&#9654;</span></button>\n              </a>\n            </li>`)).join("")}var s=n("aYvV9"),d=n("jcFG7");const l=document.querySelector(".empty__page"),u=document.querySelector(".empty__page-text");let m=1;const y=18;function _(e=0){e&&(m=e),l.classList.add("is-hidden"),u.classList.add("is-hidden"),(0,s.spiner)();const t=JSON.parse(localStorage.getItem("movies-watched"));(null==t?void 0:t.length)?b(t):(l.classList.remove("is-hidden"),u.classList.remove("is-hidden"),(0,s.spinerRemove)())}function g(e=0){e&&(m=e),l.classList.add("is-hidden"),u.classList.add("is-hidden"),(0,s.spiner)();const t=JSON.parse(localStorage.getItem("movies-queue"));(null==t?void 0:t.length)?b(t):(l.classList.remove("is-hidden"),u.classList.remove("is-hidden"),(0,s.spinerRemove)())}function b(e){let t=null;e.length<=y&&(c(e),(0,s.spinerRemove)()),t=e.length%y?Math.floor(e.length/y)+1:e.length/y,m===t?(c(e.slice(m*y-y,e.length)),(0,s.spinerRemove)()):(c(e.slice(m*y-y,m*y)),(0,s.spinerRemove)()),(0,d.getPagination)(m,t,!0)}s=n("aYvV9");var h=n("3ozO0"),L=n("1Gwk9"),p=n("dWD7p");const f={topButton:document.querySelector(".btn_top"),body:document.querySelector("body"),cardHolderLibrary:document.querySelector(".card-holder"),footerLink:document.querySelector(".footer__link"),stickyHeaderMyLibrary:document.querySelector(".js-my-library-header__sticky"),watchedBtn:document.querySelector(".js-watched"),queuedBtn:document.querySelector(".js-queue"),watchedBtnSticky:document.querySelector(".js-watched__sticky"),queuedBtnSticky:document.querySelector(".js-queue__sticky"),movieModal:document.querySelector(".js-movie-modal"),pagination:document.querySelector(".pagination__container")},S=(window.onscroll=function(){window.pageYOffset>200?f.stickyHeaderMyLibrary.classList.add("my-library-header__sticky"):f.stickyHeaderMyLibrary.classList.remove("my-library-header__sticky")},new(0,i.default));function v(e){e.target.classList.contains("my-library-header__button--current")||(f.watchedBtn.classList.add("my-library-header__button--current"),f.queuedBtn.classList.remove("my-library-header__button--current"),f.watchedBtnSticky.classList.add("my-library-header__button--current"),f.queuedBtnSticky.classList.remove("my-library-header__button--current"),f.cardHolderLibrary.innerHTML="",f.pagination.innerHTML="",(0,p.onSubmitScroll)(),_(1))}function q(e){e.target.classList.contains("my-library-header__button--current")||(f.queuedBtn.classList.add("my-library-header__button--current"),f.watchedBtn.classList.remove("my-library-header__button--current"),f.queuedBtnSticky.classList.add("my-library-header__button--current"),f.watchedBtnSticky.classList.remove("my-library-header__button--current"),f.cardHolderLibrary.innerHTML="",f.pagination.innerHTML="",(0,p.onSubmitScroll)(),g(1))}f.topButton.addEventListener("click",p.onSubmitScroll),f.footerLink.addEventListener("click",a.onOpenTeamModal),f.cardHolderLibrary.addEventListener("click",(function(e){if(e.target===e.currentTarget)return;if(e.target.classList.contains("film__trailer-btn"))return h.default.showTrailer(e.target.closest("li").id);S.movieId=e.target.closest("li").id,(0,s.spiner)(),S.fetchById().then((e=>{(0,L.showModal)(e.data),(0,s.spinerRemove)()}))})),f.watchedBtn.addEventListener("click",v),f.queuedBtn.addEventListener("click",q),f.movieModal.addEventListener("click",(function(e){if(e.target.classList.contains("add-watched")&&f.watchedBtn.classList.contains("my-library-header__button--current")){const e=f.cardHolderLibrary.children.length;f.cardHolderLibrary.innerHTML="",_(Number(document.querySelector(".pagination__item--current")&&1===e?document.querySelector(".pagination__item--current").id-1:0))}if(e.target.classList.contains("add-queue")&&f.queuedBtn.classList.contains("my-library-header__button--current")){const e=f.cardHolderLibrary.children.length;f.cardHolderLibrary.innerHTML="",g(Number(document.querySelector(".pagination__item--current")&&1===e?document.querySelector(".pagination__item--current").id-1:0))}})),f.watchedBtnSticky.addEventListener("click",v),f.queuedBtnSticky.addEventListener("click",q),f.pagination.addEventListener("click",(function(e){if(e.target===e.currentTarget||"UL"===e.target.nodeName)return;let t=null;if("svg"===e.target.nodeName||"BUTTON"===e.target.nodeName||"path"===e.target.nodeName)if(e.target.closest("button").classList.contains("pagination__left-btn")&&e.target.closest("button").classList.contains("on"))t=Number(document.querySelector(".pagination__item--current").id)-1;else{if(!e.target.closest("button").classList.contains("pagination__right-btn")||!e.target.closest("button").classList.contains("on"))return;t=Number(document.querySelector(".pagination__item--current").id)+1}else if(isNaN(e.target.closest("li").id))if("+"==e.target.closest("li").id)t=Number(document.querySelector(".pagination__item--current").id)+3;else{if("-"!=e.target.closest("li").id)return;t=Number(document.querySelector(".pagination__item--current").id)-3}else t=Number(e.target.closest("li").id);f.watchedBtn.classList.contains("my-library-header__button--current")?((0,p.onSubmitScroll)(),_(t)):((0,p.onSubmitScroll)(),g(t))})),_()}();
//# sourceMappingURL=my-library.26e65787.js.map
