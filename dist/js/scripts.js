function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}((e,t)=>{"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).LazyLoad=t()})(this,function(){function e(t,e){var n,r="LazyLoad::Initialized",t=new t(e);try{n=new CustomEvent(r,{detail:{instance:t}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent(r,!1,!1,{instance:t})}window.dispatchEvent(n)}var a="undefined"!=typeof window,o=a&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),U=a&&"IntersectionObserver"in window,n=a&&"classList"in document.createElement("p"),T={elements_selector:"img",container:o||a?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_poster:"poster",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1};function r(e){for(var t,n=[],r=0;t=e.children[r];r+=1)"SOURCE"===t.tagName&&n.push(t);return n}function i(e,t){b(e,"sizes",m(e,t.data_sizes)),b(e,"srcset",m(e,t.data_srcset)),b(e,"src",m(e,t.data_src))}function c(e,t,n){var r=t._settings;!n&&v(e)||(-1<$.indexOf(e.tagName)&&(K(e,t),_(e,r.class_loading)),z(e,t),H(e),g(r.callback_reveal,e,t),g(r.callback_set,e,t))}function s(e,t){return e=e||t.container.querySelectorAll(t.elements_selector),Array.prototype.slice.call(e).filter(function(e){return!v(e)})}function t(e,t){var n,r;this._settings=_extends({},T,e),this.loadingCount=0,n=this,U&&(n._observer=new IntersectionObserver(function(e){e.forEach(function(e){return(B(e)?G:V)(e.target,e,n)})},Z(n._settings))),this.update(t),r=this,a&&window.addEventListener("online",function(e){X(r)})}var l="data-",u="was-processed",d="ll-timeout",f="true",m=function(e,t){return e.getAttribute(l+t)},h=function(e,t,n){t=l+t;null===n?e.removeAttribute(t):e.setAttribute(t,n)},F=function(e){return h(e,u,null)},H=function(e){return h(e,u,f)},v=function(e){return m(e,u)===f},y=function(e,t){return h(e,d,t)},p=function(e){return m(e,d)},Q=function(e,t){return e.filter(function(e){return e!==t})},g=function(e,t,n,r){e&&(void 0!==r?e(t,n,r):void 0!==n?e(t,n):e(t))},E=function(e,t){e.loadingCount+=t,0===e._elements.length&&0===e.loadingCount&&g(e._settings.callback_finish,e)},b=function(e,t,n){n&&e.setAttribute(t,n)},j=function(e,t){var n=m(e,t.data_src),t=m(e,t.data_bg);n&&(e.style.backgroundImage='url("'.concat(n,'")')),t&&(e.style.backgroundImage=t)},P={IMG:function(e,t){var n=e.parentNode;n&&"PICTURE"===n.tagName&&r(n).forEach(function(e){i(e,t)}),i(e,t)},IFRAME:function(e,t){b(e,"src",m(e,t.data_src))},VIDEO:function(e,t){r(e).forEach(function(e){b(e,"src",m(e,t.data_src))}),b(e,"poster",m(e,t.data_poster)),b(e,"src",m(e,t.data_src)),e.load()}},z=function(e,t){var n=t._settings,r=e.tagName,r=P[r];r?(r(e,n),E(t,1),t._elements=Q(t._elements,e)):j(e,n)},_=function(e,t){n?e.classList.add(t):e.className+=(e.className?" ":"")+t},S=function(e,t){n?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},L="load",A="loadeddata",w="error",q=function(e,t,n){e.addEventListener(t,n)},C=function(e,t,n){e.removeEventListener(t,n)},J=function(e,t,n){q(e,L,t),q(e,A,t),q(e,w,n)},O=function(e,t,n){C(e,L,t),C(e,A,t),C(e,w,n)},I=function(e,t,n){var r=n._settings,a=t?r.class_loaded:r.class_error,t=t?r.callback_loaded:r.callback_error,e=e.target;S(e,r.class_loading),_(e,a),g(t,e,n),E(n,-1)},K=function(n,r){function a(e){I(e,!1,r),O(n,t,a)}var t=function e(t){I(t,!0,r),O(n,e,a)};J(n,t,a)},$=["IMG","IFRAME","VIDEO"],G=function(e,t,n){var r=n._settings;g(r.callback_enter,e,t,n),(r.load_delay?Y:M)(e,n)},M=function(e,t){var n=t._observer;c(e,t),n&&t._settings.auto_unobserve&&n.unobserve(e)},V=function(e,t,n){var r=n._settings;g(r.callback_exit,e,t,n),r.load_delay&&k(e)},k=function(e){var t=p(e);t&&(clearTimeout(t),y(e,null))},Y=function(e,t){var n=t._settings.load_delay;p(e)||(n=setTimeout(function(){M(e,t),k(e)},n),y(e,n))},B=function(e){return e.isIntersecting||0<e.intersectionRatio},Z=function(e){return{root:e.container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}},W=["IMG","IFRAME"],X=function(e){var t=e._settings;t.container.querySelectorAll("."+t.class_error).forEach(function(e){S(e,t.class_error),F(e)}),e.update()};if(t.prototype={update:function(e){var t,n=this,r=this._settings;this._elements=s(e,r),o||!this._observer?this.loadAll():(r.use_native&&"loading"in HTMLImageElement.prototype&&((t=this)._elements.forEach(function(e){-1!==W.indexOf(e.tagName)&&(e.setAttribute("loading","lazy"),c(e,t))}),this._elements=s(e,r)),this._elements.forEach(function(e){n._observer.observe(e)}))},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,t){c(e,this,t)},loadAll:function(){var t=this;this._elements.forEach(function(e){M(e,t)})}},a){var x=t,N=window.lazyLoadOptions;if(N)if(N.length)for(var D,R=0;D=N[R];R+=1)e(x,D);else e(x,N)}return t}),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),r=this;do{for(t=n.length;0<=--t&&n.item(t)!==r;);}while(t<0&&(r=r.parentElement));return r}),(()=>{function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)})(),(()=>{for(var o=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),r=Math.max(0,16-(n-o)),a=window.setTimeout(function(){e(n+r)},r);return o=n+r,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),((e,t)=>{"function"==typeof define&&define.amd?define([],function(){return t(e)}):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(b){function _(){var n={};return Array.prototype.forEach.call(arguments,function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}}),n}function i(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),r=n.length,a=-1,o="",i=n.charCodeAt(0);++a<r;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");o+=1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?"\\"+t.toString(16)+" ":128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+o}function S(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}function L(e,t,n){0===e&&document.body.focus(),n||(e.focus(),document.activeElement!==e&&(e.setAttribute("tabindex","-1"),e.focus(),e.style.outline="none"),b.scrollTo(0,t))}function A(e,t,n,r){t.emitEvents&&"function"==typeof b.CustomEvent&&(t=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:r}}),document.dispatchEvent(t))}var w={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0};return function(a,e){function t(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(o=e.target.closest(a))&&"a"===o.tagName.toLowerCase()&&!e.target.closest(y.ignore)&&o.hostname===b.location.hostname&&o.pathname===b.location.pathname&&/#/.test(o.href)){var t;try{n=i(decodeURIComponent(o.hash))}catch(e){n=i(o.hash)}if("#"===n){if(!y.topOnEmptyHash)return;t=document.documentElement}else t=document.querySelector(n);(t=t||"#top"!==n?t:document.documentElement)&&(e.preventDefault(),n=y,history.replaceState&&n.updateURL&&!history.state&&(r=(r=b.location.hash)||"",history.replaceState({smoothScroll:JSON.stringify(n),anchor:r||b.pageYOffset},document.title,r||b.location.href)),E.animateScroll(t,o))}var n,r}function n(e){var t;null===history.state||!history.state.smoothScroll||history.state.smoothScroll!==JSON.stringify(y)||"string"==typeof(t=history.state.anchor)&&t&&!(t=document.querySelector(i(history.state.anchor)))||E.animateScroll(t,null,{updateURL:!1})}var y,o,p,g,E={cancelScroll:function(e){cancelAnimationFrame(g),g=null,e||A("scrollCancel",y)}};E.animateScroll=function(r,a,e){E.cancelScroll();var o,i,c,s,l,u,d,f,m,t,h=_(y||w,e||{}),v="[object Number]"===Object.prototype.toString.call(r),e=v||!r.tagName?null:r;(v||e)&&(o=b.pageYOffset,h.header&&!p&&(p=document.querySelector(h.header)),t=(t=p)?parseInt(b.getComputedStyle(t).height,10)+t.offsetTop:0,s=v?r:((e,t,n,r)=>{var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),a=r?Math.min(a,S()-b.innerHeight):a})(e,t,parseInt("function"==typeof h.offset?h.offset(r,a):h.offset,10),h.clip),l=s-o,u=S(),d=0,t=(e=h).speedAsDuration?e.speed:Math.abs(l/1e3*e.speed),f=e.durationMax&&t>e.durationMax?e.durationMax:e.durationMin&&t<e.durationMin?e.durationMin:parseInt(t,10),m=function(e){var t,n;d+=e-(i=i||e),c=o+l*(n=1<(c=0===f?0:d/f)?1:c,"easeInQuad"===h.easing&&(t=n*n),"easeOutQuad"===h.easing&&(t=n*(2-n)),"easeInOutQuad"===h.easing&&(t=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===h.easing&&(t=n*n*n),"easeOutCubic"===h.easing&&(t=--n*n*n+1),"easeInOutCubic"===h.easing&&(t=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===h.easing&&(t=n*n*n*n),"easeOutQuart"===h.easing&&(t=1- --n*n*n*n),"easeInOutQuart"===h.easing&&(t=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===h.easing&&(t=n*n*n*n*n),"easeOutQuint"===h.easing&&(t=1+--n*n*n*n*n),"easeInOutQuint"===h.easing&&(t=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),(t=h.customEasing?h.customEasing(n):t)||n),b.scrollTo(0,Math.floor(c)),t=s,n=b.pageYOffset,(!(c==t||n==t||(o<t&&b.innerHeight+n)>=u)||(E.cancelScroll(!0),L(r,t,v),A("scrollStop",h,r,a),g=i=null))&&(g=b.requestAnimationFrame(m),i=e)},0===b.pageYOffset&&b.scrollTo(0,0),e=r,v||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id),"matchMedia"in b&&b.matchMedia("(prefers-reduced-motion)").matches?L(r,Math.floor(s),!1):(A("scrollStart",h,r,a),E.cancelScroll(!0),b.requestAnimationFrame(m)))};if(E.destroy=function(){y&&(document.removeEventListener("click",t,!1),b.removeEventListener("popstate",n,!1),E.cancelScroll(),g=p=o=y=null)},"querySelector"in document&&"addEventListener"in b&&"requestAnimationFrame"in b&&"closest"in b.Element.prototype)return E.destroy(),y=_(w,e||{}),p=y.header?document.querySelector(y.header):null,document.addEventListener("click",t,!1),y.updateURL&&y.popstate&&b.addEventListener("popstate",n,!1),E;throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs."}}),document.addEventListener("DOMContentLoaded",function(){function e(){var r=document.querySelector(".editorial-page--archive");if(r){let a=r.querySelector("#archive-category"),o=r.querySelector("#archive-month"),e=r.querySelector("#archive-search"),t=Array.from(r.querySelectorAll(".archive-card")),i=r.querySelector(".archive-empty"),n=Array.from(r.querySelectorAll(".archive-pagination button"));function c(){let n=e.value.trim().toLocaleLowerCase("cs-CZ"),r=0;t.forEach(e=>{var t=("all"===a.value||e.dataset.category===a.value)&&("all"===o.value||e.querySelector("time").textContent.slice(3,5)===o.value)&&e.dataset.search.includes(n);e.hidden=!t,t&&r++}),i.hidden=0<r}a.addEventListener("change",c),o.addEventListener("change",c),e.addEventListener("input",c),n.forEach((e,t)=>e.addEventListener("click",()=>{n.forEach(e=>{e.classList.remove("is-current"),e.removeAttribute("aria-current")}),e.classList.add("is-current"),e.setAttribute("aria-current","page")})),c()}}function t(){var i=document.querySelector(".match-page--list");if(i){let e=Array.from(i.querySelectorAll(".match-list__item")),n=Array.from(i.querySelectorAll("[data-filter]")),r=i.querySelector("#match-month"),a=i.querySelector("#match-season"),t=i.querySelector(".match-list__empty"),o="all";function c(){let n=0;e.forEach(e=>{var t=!("all"!==o&&e.dataset.venue!==o&&e.dataset.status!==o||"all"!==r.value&&e.dataset.month!==r.value||"2026"!==a.value);e.hidden=!t,t&&n++}),t.hidden=0<n}n.forEach(t=>t.addEventListener("click",()=>{o=t.dataset.filter,n.forEach(e=>e.classList.toggle("is-active",e===t)),c()})),r.addEventListener("change",c),a.addEventListener("change",c),c()}}function n(){var t=document.querySelector(".roster-page");if(t){let e=t.querySelector("#roster-season"),o=t.querySelector("#roster-position"),n=t.querySelector("#roster-search"),r=Array.from(t.querySelectorAll("[data-roster-group]")),i=t.querySelector("#roster-empty");t.querySelector("#roster-demo-note");function a(){let a=n.value.trim().toLocaleLowerCase("cs-CZ"),t=0;r.forEach(e=>{let n="all"===o.value||e.dataset.rosterGroup===o.value,r=0;e.querySelectorAll("tbody tr").forEach(e=>{var t=n&&(e.dataset.playerName.includes(a)||e.dataset.number.includes(a));e.hidden=!t,t&&r++}),e.hidden=!n||0===r,e.querySelector(".roster-group__count").textContent=r+" hráči",t+=r}),i.hidden=0<t}n.addEventListener("input",a),o.addEventListener("change",a),e.addEventListener("change",a),a()}}function r(){window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2&&window.jQuery("select.js-select2").each(function(){var e=window.jQuery(this);e.hasClass("select2-hidden-accessible")||e.select2({width:"100%",minimumResultsForSearch:1/0,dropdownAutoWidth:!1})})}function a(){var t=document.querySelector(".standings-page");if(t){let e=t.querySelector("table"),n=e.tBodies[0],r=Array.from(e.querySelectorAll("[data-sort]")),o=-1,i=!1;r.forEach((t,a)=>t.addEventListener("click",()=>{i=o===a&&!i,o=a;var e=Array.from(n.rows);e.sort((e,t)=>{var e=e.cells[a].textContent.trim(),t=t.cells[a].textContent.trim(),n=Number(e.replace("+","")),r=Number(t.replace("+","")),e=""===e||""===t||Number.isNaN(n)||Number.isNaN(r)?e.localeCompare(t,"cs",{numeric:!0}):n-r;return i?-e:e}),e.forEach(e=>n.appendChild(e)),r.forEach(e=>e.removeAttribute("aria-sort")),t.setAttribute("aria-sort",i?"descending":"ascending")}));t.querySelector("#standings-season")}}function o(){var t=document.querySelector(".youth-page");if(t){let e=Array.from(t.querySelectorAll("[data-youth-category]")),n=t.querySelector("#youth-current-category"),r={U20:"JUNIOŘI",U18:"DOROST",U16:"STARŠÍ ŽÁCI",U14:"ŽÁCI",U12:"MLADŠÍ ŽÁCI",U10:"MLADŠÍ ŽÁCI",U9:"PŘÍPRAVKA",U8:"PŘÍPRAVKA","Přípravka":"NEJMENŠÍ HOKEJISTÉ"};e.forEach(t=>t.addEventListener("click",()=>{e.forEach(e=>{e.classList.toggle("is-active",e===t),e.setAttribute("aria-selected",String(e===t))}),n.innerHTML=t.dataset.youthCategory+" <small>"+r[t.dataset.youthCategory]+"</small>"}))}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n,{once:!0}):n(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r,{once:!0}):r(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",a,{once:!0}):a(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o,{once:!0}):o();var i,c=document.querySelectorAll(".content table");for(i=0;i<c.length;++i){c[i].classList.add("table");var s=document.createElement("div");s.classList.add("table-responsive"),c[i].parentNode.insertBefore(s,c[i]),s.appendChild(c[i])}var l,u=document.querySelectorAll(".content iframe");for(l=0;l<u.length;++l){u[l].removeAttribute("height"),u[l].removeAttribute("width");var d=document.createElement("div");d.classList.add("ratio"),d.classList.add("ratio-16x9"),u[l].parentNode.insertBefore(d,u[l]),d.appendChild(u[l])}function f(){let t=document.querySelector(".menu-toggle"),n=document.querySelector(".main-nav");function r(){n.querySelectorAll(".main-nav__item").forEach(e=>{e.classList.remove("is-open");e=e.querySelector(".main-nav__trigger");e&&e.setAttribute("aria-expanded","false")})}function a(){n.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),r()}t&&n&&(t.addEventListener("click",()=>{var e=n.classList.toggle("is-open");t.setAttribute("aria-expanded",String(e)),e||r()}),n.querySelectorAll(".main-nav__trigger").forEach(n=>{n.addEventListener("click",()=>{var e,t=n.closest(".main-nav__item");t&&(e=!t.classList.contains("is-open"),r(),e)&&(t.classList.add("is-open"),n.setAttribute("aria-expanded","true"))})}),n.querySelectorAll(".main-nav__link").forEach(e=>{e.addEventListener("click",a)}),document.addEventListener("click",e=>{n.contains(e.target)||t.contains(e.target)||a()}))}function m(){var root=document.querySelector("[data-youth-board]");if(!root)return;var categoryButtons=root.querySelectorAll(".hc-youth-board__categories [data-category]"),categoryPanels=root.querySelectorAll("[data-youth-category-panel]");function activate(buttons,selected){buttons.forEach(function(button){var active=button===selected;button.classList.toggle("is-active",active);button.setAttribute("aria-selected",String(active))})}categoryButtons.forEach(function(button){button.addEventListener("click",function(){activate(categoryButtons,button);categoryPanels.forEach(function(panel){panel.hidden=panel.dataset.youthCategoryPanel!==button.dataset.category})})});categoryPanels.forEach(function(categoryPanel){var tabs=categoryPanel.querySelectorAll(".hc-youth-board__tabs [data-youth-tab]"),panels=categoryPanel.querySelectorAll("[data-youth-panel]");tabs.forEach(function(button){button.addEventListener("click",function(){activate(tabs,button);panels.forEach(function(panel){panel.hidden=panel.dataset.youthPanel!==button.dataset.youthTab})})})})}function h(){var a=document.querySelector(".hc-hero");if(a){let t=Array.from(a.querySelectorAll(".hc-hero__slide")),n=Array.from(a.querySelectorAll(".hc-hero__pagination button"));var o=a.querySelector(".hc-hero__prev"),i=a.querySelector(".hc-hero__next");let r=0,e=null;function c(e){r=(e+t.length)%t.length,t.forEach((e,t)=>{t=t===r;e.classList.toggle("is-active",t),e.setAttribute("aria-hidden",String(!t))}),n.forEach((e,t)=>{t=t===r;e.classList.toggle("is-active",t),e.setAttribute("aria-current",String(t))})}function s(){clearInterval(e),e=null}function l(){t.length<=1||window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s(),e=setInterval(()=>{c(r+1)},5500))}0<t.length&&(c(0),1<t.length)&&(o&&o.addEventListener("click",()=>{c(r-1)}),i&&i.addEventListener("click",()=>{c(r+1)}),n.forEach((e,t)=>{e.addEventListener("click",()=>{c(t)})}),l(),a.addEventListener("mouseenter",s),a.addEventListener("mouseleave",l),document.addEventListener("visibilitychange",()=>{(document.hidden?s:l)()}))}let r=document.querySelector(".hc-youth__board");if(r){let t="U20",n="Zápasy";r.querySelectorAll("[role=tab]").forEach(e=>{e.addEventListener("click",()=>{e.closest("[role=tablist]").querySelectorAll("[role=tab]").forEach(e=>{e.classList.remove("is-active"),e.setAttribute("aria-selected","false")}),e.classList.add("is-active"),e.setAttribute("aria-selected","true"),e.dataset.category?t=e.dataset.category:n=e.dataset.type,r.querySelector(".hc-youth__selected").textContent=(t+" · "+n).toUpperCase(),r.querySelector(".hc-youth__data").innerHTML=`
           <div class="hc-youth__row">
             <span>Kategorie</span>
             <strong>${t}</strong>
           </div>
           <div class="hc-youth__row">
             <span>Oddíl</span>
             <strong>HC Česká Lípa</strong>
           </div>
           <div class="hc-youth__row">
             <span>${n}</span>
             <a href="https://www.hcceskalipa.cz/" target="_blank" rel="noopener">
               Aktuální ${n.toLowerCase()} na webu klubu ↗
             </a>
           </div>
         `})})}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",f,{once:!0}):f(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",m,{once:!0}):m(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",h,{once:!0}):h();new LazyLoad({elements_selector:"[data-bg]"}),new SmoothScroll(".js-scroll",{speed:300})});
function initHcCover() {
  const popup = document.getElementById("hc-cover");
  if (!popup) return;

  const cookieName = "hc_cover_closed";
  const popupWasClosed = document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(cookieName + "="));

  if (popupWasClosed) return;

  const button = popup.querySelector(".hc-cover__close");
  const link = popup.querySelector(".hc-cover__link");
  const previousFocus = document.activeElement;

  function closeCover() {
    popup.classList.remove("is-visible");

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    document.cookie =
      cookieName + "=1; expires=" + expires.toUTCString() +
      "; path=/; SameSite=Lax";

    document.removeEventListener("keydown", handleKeydown);
    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeCover();
    }

    if (event.key === "Tab") {
      const focusable = [link, button].filter(Boolean);
      if (!focusable.length) return;
      const active = focusable.indexOf(document.activeElement);
      if (event.shiftKey && (active === 0 || active === -1)) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && active === focusable.length - 1) {
        event.preventDefault();
        focusable[0].focus();
      }
    }
  }

  popup.classList.add("is-visible");
  button.focus();

  button.addEventListener("click", closeCover);
  if (link) link.addEventListener("click", closeCover);
  popup.addEventListener("click", (event) => {
    if (event.target === popup) closeCover();
  });
  document.addEventListener("keydown", handleKeydown);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHcCover, { once: true });
} else {
  initHcCover();
}

function initPhotoGallery() {
  const root = document.querySelector(".photo-gallery");
  if (!root) return;

  const items = Array.from(root.querySelectorAll("[data-gallery-item]"));
  const lightbox = root.querySelector("[data-gallery-lightbox]");
  const image = root.querySelector("[data-gallery-image]");
  const caption = root.querySelector("[data-gallery-caption]");
  const counter = root.querySelector("[data-gallery-counter]");
  const closeButton = root.querySelector("[data-gallery-close]");
  const prevButton = root.querySelector("[data-gallery-prev]");
  const nextButton = root.querySelector("[data-gallery-next]");
  if (!items.length || !lightbox || !image || !closeButton) return;

  let current = 0;
  let previousFocus = null;
  let originalOverflow = "";

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.getAttribute("data-full").replace(/&amp;/g, "&");
    image.alt = item.dataset.alt || "";
    caption.textContent = image.alt;
    counter.textContent = (current + 1) + " / " + items.length;
  }

  function close() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = originalOverflow;
    document.removeEventListener("keydown", onKeydown);
    image.removeAttribute("src");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") close();
    else if (event.key === "ArrowLeft") show(current - 1);
    else if (event.key === "ArrowRight") show(current + 1);
    else if (event.key === "Tab") {
      const controls = [closeButton, prevButton, nextButton].filter(Boolean);
      const focusIndex = controls.indexOf(document.activeElement);
      if (event.shiftKey && (focusIndex === 0 || focusIndex === -1)) {
        event.preventDefault();
        controls[controls.length - 1].focus();
      } else if (!event.shiftKey && focusIndex === controls.length - 1) {
        event.preventDefault();
        controls[0].focus();
      }
    }
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      previousFocus = document.activeElement;
      originalOverflow = document.body.style.overflow;
      show(index);
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
      document.addEventListener("keydown", onKeydown);
    });
  });

  closeButton.addEventListener("click", close);
  if (prevButton) prevButton.addEventListener("click", () => show(current - 1));
  if (nextButton) nextButton.addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPhotoGallery, { once: true });
} else {
  initPhotoGallery();
}

function initPhotoFolders() {
  const root = document.querySelector(".photo-folders");
  if (!root) return;
  const month = root.querySelector("#folder-month");
  const category = root.querySelector("#folder-category");
  const search = root.querySelector("#folder-search");
  const cards = Array.from(root.querySelectorAll("[data-folder]"));
  const empty = root.querySelector("[data-folder-empty]");
  const form = root.querySelector("[data-folder-filters]");
  if (!month || !category || !search || !empty) return;
  function filter() {
    const query = search.value.trim().toLocaleLowerCase("cs-CZ");
    let shown = 0;
    cards.forEach((card) => {
      const visible =
        (month.value === "all" || card.dataset.month === month.value) &&
        (category.value === "all" || card.dataset.category === category.value) &&
        (card.dataset.name || "").toLocaleLowerCase("cs-CZ").includes(query);
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    empty.hidden = shown > 0;
  }
  if (form) form.addEventListener("submit", (event) => event.preventDefault());
  month.addEventListener("change", filter);
  category.addEventListener("change", filter);
  search.addEventListener("input", filter);
  filter();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPhotoFolders, { once: true });
} else {
  initPhotoFolders();
}
