!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a);var s=a("bpxeT"),i=a("2TvXO"),o=a("6JpON"),c=a("dIxxU"),l=a("5IjG7"),u=document.querySelector("#search-form"),d=document.querySelector(".load-more"),f=document.querySelector(".gallery");u.elements.searcBtn.setAttribute("disabled","true");var p=1,h="";function y(){return(y=e(s)(e(i).mark((function t(n){var r,a,s;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),u.elements.searcBtn.setAttribute("disabled","true"),p=1,r=n.currentTarget.elements.searchQuery,a=r.value,t.prev=4,t.next=7,m(a);case 7:if(0!==(s=t.sent).hits.length){t.next=13;break}return u.reset(0===s.hits.length),t.abrupt("return",e(o).Notify.failure("Sorry, there are no images matching your search query. Please try again."));case 13:if(!(s.totalHits<=40)){t.next=20;break}return w(s),t.next=17,g(s.hits);case 17:return f.innerHTML=t.sent,x(),t.abrupt("return",e(o).Notify.failure("We're sorry, but you've reached the end of search results."));case 20:return w(s),t.next=23,g(s.hits);case 23:f.innerHTML=t.sent,x(),console.log(h),d.classList.remove("visually-hidden"),t.next=32;break;case 29:t.prev=29,t.t0=t.catch(4),console.log(t.t0);case 32:case"end":return t.stop()}}),t,null,[[4,29]])})))).apply(this,arguments)}function b(){return(b=e(s)(e(i).mark((function t(){var n,r,a;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d.classList.add("visually-hidden"),p+=1,n=u.elements.searchQuery,r=n.value,t.prev=3,t.next=6,m(r);case 6:if(a=t.sent,console.log(h),!(a.totalHits-a.hits.length*p<=0)){t.next=17;break}return d.classList.add("visually-hidden"),t.t0=f,t.next=13,g(a.hits);case 13:return t.t1=t.sent,t.t0.insertAdjacentHTML.call(t.t0,"beforeend",t.t1),h.refresh(),t.abrupt("return",e(o).Notify.failure("We're sorry, but you've reached the end of search results."));case 17:return t.t2=f,t.next=20,g(a.hits);case 20:t.t3=t.sent,t.t2.insertAdjacentHTML.call(t.t2,"beforeend",t.t3),h.refresh(),d.classList.remove("visually-hidden"),t.next=29;break;case 26:t.prev=26,t.t4=t.catch(3),console.log(t.t4);case 29:case"end":return t.stop()}}),t,null,[[3,26]])})))).apply(this,arguments)}function m(e){return v.apply(this,arguments)}function v(){return(v=e(s)(e(i).mark((function t(n){var r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.default)({url:"https://pixabay.com/api/",params:{key:"33377492-476d22b77d4b85ba3622e340f",q:"".concat(n),image_type:"photo",orientation:"horizontal",safesearch:!0,page:p,per_page:40}});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function g(e){return e.map((function(e){var t=e.largeImageURL,n=e.webformatURL,r=e.tags,a=e.likes,s=e.views,i=e.comments,o=e.downloads;return'\n      <a class="gallery__item" href="'.concat(t,'">\n      <div class="photo-card">\n      <img class="gallery__image" src="').concat(n,'" alt="').concat(r,'" loading="lazy" />\n      <div class="info">\n        <p class="info-item">\n          <b>Likes</b>').concat(a,'\n        </p>\n        <p class="info-item">\n          <b>Views</b>').concat(s,'\n        </p>\n        <p class="info-item">\n          <b>Comments</b>').concat(i,'\n        </p>\n        <p class="info-item">\n          <b>Downloads</b>').concat(o,"\n        </p>\n      </div></div></a>\n    ")})).join("")}function x(){h=new(e(l))(".gallery a")}function w(t){e(o).Notify.info("Hooray! We found ".concat(t.totalHits," images."))}u.addEventListener("input",(function(){return u.elements.searcBtn.removeAttribute("disabled","true")})),u.addEventListener("submit",(function(e){return y.apply(this,arguments)})),d.addEventListener("click",(function(){return b.apply(this,arguments)}))}();
//# sourceMappingURL=infinityScroll.5ef66147.js.map