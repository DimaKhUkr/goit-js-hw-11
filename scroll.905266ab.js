function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i);var s=i("7Y9D8"),a=i("fZKcF"),o=i("cyIMT");const l=document.querySelector("#search-form"),c=document.querySelector(".load-more"),d=document.querySelector(".gallery");l.elements.searcBtn.setAttribute("disabled","true");let u=1,f="";function h(e){return e.map((({largeImageURL:e,webformatURL:t,tags:n,likes:r,views:i,comments:s,downloads:a})=>`\n      <a class="gallery__item" href="${e}">\n      <div class="photo-card">\n      <img class="gallery__image" src="${t}" alt="${n}" loading="lazy" />\n      <div class="info">\n        <p class="info-item">\n          <b>Likes</b>${r}\n        </p>\n        <p class="info-item">\n          <b>Views</b>${i}\n        </p>\n        <p class="info-item">\n          <b>Comments</b>${s}\n        </p>\n        <p class="info-item">\n          <b>Downloads</b>${a}\n        </p>\n      </div></div></a>\n    `)).join("")}function y(){f=new(e(a))(".gallery a")}function m(t){e(s).Notify.info(`Hooray! We found ${t.totalHits} images.`)}l.addEventListener("input",(()=>l.elements.searcBtn.removeAttribute("disabled","true"))),l.addEventListener("submit",(async function(t){t.preventDefault(),l.elements.searcBtn.setAttribute("disabled","true"),u=1;const{value:n}=t.currentTarget.elements.searchQuery;if(0===n.trim().length)return l.reset(),e(s).Notify.failure("Sorry, there are no images matching your search query. Please try again.");try{const t=await(0,o.default)(n,u,40);if(0===t.hits.length)return l.reset(0===t.hits.length),e(s).Notify.failure("Sorry, there are no images matching your search query. Please try again.");if(t.totalHits<=40)return m(t),d.innerHTML=await h(t.hits),y(),e(s).Notify.failure("We're sorry, but you've reached the end of search results.");m(t),d.innerHTML=await h(t.hits),y(),c.classList.remove("visually-hidden")}catch(e){console.log(e)}})),c.addEventListener("click",(async function(){c.classList.add("visually-hidden"),u+=1;const{value:t}=l.elements.searchQuery;try{const n=await(0,o.default)(t,u,40);if(console.log(f),n.totalHits-(n.hits.length*u+40)<=0)return c.classList.add("visually-hidden"),d.insertAdjacentHTML("beforeend",await h(n.hits)),f.refresh(),e(s).Notify.failure("We're sorry, but you've reached the end of search results.");d.insertAdjacentHTML("beforeend",await h(n.hits)),function(){const{height:e}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:2.5*e,behavior:"smooth"})}(),f.refresh(),c.classList.remove("visually-hidden")}catch(e){console.log(e)}}));
//# sourceMappingURL=scroll.905266ab.js.map
