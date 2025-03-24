(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=s(o);fetch(o.href,c)}})();const f=document.querySelector(".DarkThemeToggle"),k=document.querySelector(".App"),l=document.querySelector("#search-input"),u=document.querySelector(".TaskList__list"),m=document.querySelector(".TaskList__link"),L=document.querySelector(".TaskSearchBar__button"),_=()=>document.querySelectorAll(".TaskList__deleteIcon"),T=()=>document.querySelectorAll(".TaskList__checkbox"),y=t=>{t.length||(u.innerHTML=`<li class='EmptyList'>
    <img class='EmptyList__img' src="./assets/icon-empty.svg" alt="list is empty" />
    <p>قائمة المهام فارغة</p>
  </li>`)};function p(){k.classList.toggle("App--isDark"),i("darkModeFlag",k.classList.contains("App--isDark"))}f.addEventListener("click",p);const n=t=>{const e=localStorage.getItem(t);return e?JSON.parse(e):!1},i=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},d=t=>{let e="";t.forEach(s=>{e+=`<li class="TaskList__taskContent${s.isCompleted?" TaskList__taskContent--isActive":""}" >
        <div class='TaskList__checkbox' tabindex="0" role="button">
          <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="checkmark" />
        </div>
        <div class='TaskList__valueContent'>
          <p class='TaskList__value'>
            ${s.value}
          </p>
          <img src="./assets/icon-basket.svg"
               class='TaskList__deleteIcon'
               alt="basket-icon"
          />
        </div>
      </li>`}),u.innerHTML=e,l.value="",l.focus(),y(t)},g=()=>{_().forEach((t,e)=>{t.addEventListener("click",()=>h(e))}),T().forEach((t,e)=>{t.addEventListener("click",s=>S(s,e))})},h=t=>{if(!confirm("Are you sure you want to delete"))return;const s=n("tasks");s.splice(t,1),i("tasks",s),d(s),g()},v=t=>{t.preventDefault();let e=l.value;if(!e)return;const s={value:e,isCompleted:!1},a=n("tasks")||[];a.push(s),i("tasks",a),d(a),g()};L.addEventListener("click",v);const E=()=>{n("darkModeFlag")&&p(),d(n("tasks"))};E();const S=(t,e)=>{const s=n("tasks");t.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive"),s[e].isCompleted=!s[e].isCompleted,i("tasks",s)};m.addEventListener("click",()=>{u.classList.toggle("TaskList__list--hideCompleted"),m.classList.toggle("TaskList__link--isActive")});
