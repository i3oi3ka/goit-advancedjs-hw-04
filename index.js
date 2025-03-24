import{S as y,a as m,i as d}from"./assets/vendor-DkEYWuMb.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function l(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=l(r);fetch(r.href,s)}})();const t={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".js-loadMore-btn")},o={page:1,perPage:15,maxPage:1},L="49310743-65b3f3ce2dd3324f0da11ae2e",n="active",u="is-hidden",g=new y(".js-gallery a",{captionsData:"alt",captionDelay:250});function f(i){return i.map(e=>`<li class="gallery-item">
              <a href="${e.largeImageURL}"><img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}"/></a>
              <ul class="gallery-item-desc">
                <li>
                  <h3>Likes</h3>
                  <p>${e.likes}</p>
                </li>
                <li>
                  <h3>Views</h3>
                  <p>${e.views}</p>
                </li>
                <li>
                  <h3>Comments</h3>
                  <p>${e.comments}</p>
                </li>
                <li>
                  <h3>Downloads</h3>
                  <p>${e.downloads}</p>
                </li>
              </ul>
        </li>`).join("")}m.defaults.baseURL="https://pixabay.com";async function v(i){i.preventDefault();const e=i.currentTarget;t.loadMoreBtn.classList.add(u),o.page=1;const l=e.elements.request.value.trim();if(l===""){d.show({title:"Error",message:"You entered an empty string",position:"topRight"});return}o.q=l,t.loader.classList.add(n);try{const a=await h(o);if(t.loader.classList.remove(n),a.total===0){d.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.gallery.innerHTML="";return}o.maxPage=Math.ceil(a.totalHits/o.perPage),t.gallery.innerHTML=f(a.hits),g.refresh(),o.maxPage!==1&&(t.loadMoreBtn.classList.remove(u),t.loadMoreBtn.addEventListener("click",p))}catch(a){t.loader.classList.remove(n),console.log(a)}finally{e.reset()}}async function p(i){t.loadMoreBtn.disabled=!0,t.loader.classList.add(n),o.page+=1;try{const e=await h(o);t.loader.classList.remove(n),t.gallery.insertAdjacentHTML("beforeend",f(e.hits));const l=t.gallery.querySelector("li").getBoundingClientRect().height;window.scrollBy({top:l*2,left:0,behavior:"smooth"}),g.refresh(),t.loadMoreBtn.disabled=!1,o.page>=o.maxPage&&(t.loadMoreBtn.classList.add(u),t.loadMoreBtn.removeEventListener("click",p),d.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.log(e),t.loader.classList.remove(n)}}async function h({q:i,page:e=1,perPage:l=15}){return(await m.get("api/",{params:{key:L,q:i,page:e,per_page:l}})).data}t.form.addEventListener("submit",v);
//# sourceMappingURL=index.js.map
