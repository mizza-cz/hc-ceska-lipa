function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}).apply(this,arguments)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}((e,t)=>{"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).LazyLoad=t()})(this,function(){function e(t,e){var n,o="LazyLoad::Initialized",t=new t(e);try{n=new CustomEvent(o,{detail:{instance:t}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent(o,!1,!1,{instance:t})}window.dispatchEvent(n)}var a="undefined"!=typeof window,r=a&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),R=a&&"IntersectionObserver"in window,n=a&&"classList"in document.createElement("p"),U={elements_selector:"img",container:r||a?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_poster:"poster",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1};function o(e){for(var t,n=[],o=0;t=e.children[o];o+=1)"SOURCE"===t.tagName&&n.push(t);return n}function i(e,t){E(e,"sizes",m(e,t.data_sizes)),E(e,"srcset",m(e,t.data_srcset)),E(e,"src",m(e,t.data_src))}function c(e,t,n){var o=t._settings;!n&&y(e)||(-1<B.indexOf(e.tagName)&&(J(e,t),_(e,o.class_loading)),z(e,t),H(e),p(o.callback_reveal,e,t),p(o.callback_set,e,t))}function s(e,t){return e=e||t.container.querySelectorAll(t.elements_selector),Array.prototype.slice.call(e).filter(function(e){return!y(e)})}function t(e,t){var n,o;this._settings=_extends({},U,e),this.loadingCount=0,n=this,R&&(n._observer=new IntersectionObserver(function(e){e.forEach(function(e){return(G(e)?$:V)(e.target,e,n)})},W(n._settings))),this.update(t),o=this,a&&window.addEventListener("online",function(e){X(o)})}var l="data-",d="was-processed",u="ll-timeout",f="true",m=function(e,t){return e.getAttribute(l+t)},h=function(e,t,n){t=l+t;null===n?e.removeAttribute(t):e.setAttribute(t,n)},F=function(e){return h(e,d,null)},H=function(e){return h(e,d,f)},y=function(e){return m(e,d)===f},v=function(e,t){return h(e,u,t)},g=function(e){return m(e,u)},P=function(e,t){return e.filter(function(e){return e!==t})},p=function(e,t,n,o){e&&(void 0!==o?e(t,n,o):void 0!==n?e(t,n):e(t))},b=function(e,t){e.loadingCount+=t,0===e._elements.length&&0===e.loadingCount&&p(e._settings.callback_finish,e)},E=function(e,t,n){n&&e.setAttribute(t,n)},Q=function(e,t){var n=m(e,t.data_src),t=m(e,t.data_bg);n&&(e.style.backgroundImage='url("'.concat(n,'")')),t&&(e.style.backgroundImage=t)},j={IMG:function(e,t){var n=e.parentNode;n&&"PICTURE"===n.tagName&&o(n).forEach(function(e){i(e,t)}),i(e,t)},IFRAME:function(e,t){E(e,"src",m(e,t.data_src))},VIDEO:function(e,t){o(e).forEach(function(e){E(e,"src",m(e,t.data_src))}),E(e,"poster",m(e,t.data_poster)),E(e,"src",m(e,t.data_src)),e.load()}},z=function(e,t){var n=t._settings,o=e.tagName,o=j[o];o?(o(e,n),b(t,1),t._elements=P(t._elements,e)):Q(e,n)},_=function(e,t){n?e.classList.add(t):e.className+=(e.className?" ":"")+t},S=function(e,t){n?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},w="load",L="loadeddata",A="error",q=function(e,t,n){e.addEventListener(t,n)},k=function(e,t,n){e.removeEventListener(t,n)},K=function(e,t,n){q(e,w,t),q(e,L,t),q(e,A,n)},C=function(e,t,n){k(e,w,t),k(e,L,t),k(e,A,n)},O=function(e,t,n){var o=n._settings,a=t?o.class_loaded:o.class_error,t=t?o.callback_loaded:o.callback_error,e=e.target;S(e,o.class_loading),_(e,a),p(t,e,n),b(n,-1)},J=function(n,o){function a(e){O(e,!1,o),C(n,t,a)}var t=function e(t){O(t,!0,o),C(n,e,a)};K(n,t,a)},B=["IMG","IFRAME","VIDEO"],$=function(e,t,n){var o=n._settings;p(o.callback_enter,e,t,n),(o.load_delay?Y:I)(e,n)},I=function(e,t){var n=t._observer;c(e,t),n&&t._settings.auto_unobserve&&n.unobserve(e)},V=function(e,t,n){var o=n._settings;p(o.callback_exit,e,t,n),o.load_delay&&M(e)},M=function(e){var t=g(e);t&&(clearTimeout(t),v(e,null))},Y=function(e,t){var n=t._settings.load_delay;g(e)||(n=setTimeout(function(){I(e,t),M(e)},n),v(e,n))},G=function(e){return e.isIntersecting||0<e.intersectionRatio},W=function(e){return{root:e.container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}},Z=["IMG","IFRAME"],X=function(e){var t=e._settings;t.container.querySelectorAll("."+t.class_error).forEach(function(e){S(e,t.class_error),F(e)}),e.update()};if(t.prototype={update:function(e){var t,n=this,o=this._settings;this._elements=s(e,o),r||!this._observer?this.loadAll():(o.use_native&&"loading"in HTMLImageElement.prototype&&((t=this)._elements.forEach(function(e){-1!==Z.indexOf(e.tagName)&&(e.setAttribute("loading","lazy"),c(e,t))}),this._elements=s(e,o)),this._elements.forEach(function(e){n._observer.observe(e)}))},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,t){c(e,this,t)},loadAll:function(){var t=this;this._elements.forEach(function(e){I(e,t)})}},a){var x=t,N=window.lazyLoadOptions;if(N)if(N.length)for(var D,T=0;D=N[T];T+=1)e(x,D);else e(x,N)}return t}),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(()=>{function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)})(),(()=>{for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout(function(){e(n+o)},o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),((e,t)=>{"function"==typeof define&&define.amd?define([],function(){return t(e)}):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(E){function _(){var n={};return Array.prototype.forEach.call(arguments,function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}}),n}function i(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");r+=1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?"\\"+t.toString(16)+" ":128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r}function S(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}function w(e,t,n){0===e&&document.body.focus(),n||(e.focus(),document.activeElement!==e&&(e.setAttribute("tabindex","-1"),e.focus(),e.style.outline="none"),E.scrollTo(0,t))}function L(e,t,n,o){t.emitEvents&&"function"==typeof E.CustomEvent&&(t=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}}),document.dispatchEvent(t))}var A={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0};return function(a,e){function t(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(r=e.target.closest(a))&&"a"===r.tagName.toLowerCase()&&!e.target.closest(v.ignore)&&r.hostname===E.location.hostname&&r.pathname===E.location.pathname&&/#/.test(r.href)){var t;try{n=i(decodeURIComponent(r.hash))}catch(e){n=i(r.hash)}if("#"===n){if(!v.topOnEmptyHash)return;t=document.documentElement}else t=document.querySelector(n);(t=t||"#top"!==n?t:document.documentElement)&&(e.preventDefault(),n=v,history.replaceState&&n.updateURL&&!history.state&&(o=(o=E.location.hash)||"",history.replaceState({smoothScroll:JSON.stringify(n),anchor:o||E.pageYOffset},document.title,o||E.location.href)),b.animateScroll(t,r))}var n,o}function n(e){var t;null===history.state||!history.state.smoothScroll||history.state.smoothScroll!==JSON.stringify(v)||"string"==typeof(t=history.state.anchor)&&t&&!(t=document.querySelector(i(history.state.anchor)))||b.animateScroll(t,null,{updateURL:!1})}var v,r,g,p,b={cancelScroll:function(e){cancelAnimationFrame(p),p=null,e||L("scrollCancel",v)}};b.animateScroll=function(o,a,e){b.cancelScroll();var r,i,c,s,l,d,u,f,m,t,h=_(v||A,e||{}),y="[object Number]"===Object.prototype.toString.call(o),e=y||!o.tagName?null:o;(y||e)&&(r=E.pageYOffset,h.header&&!g&&(g=document.querySelector(h.header)),t=(t=g)?parseInt(E.getComputedStyle(t).height,10)+t.offsetTop:0,s=y?o:((e,t,n,o)=>{var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),a=o?Math.min(a,S()-E.innerHeight):a})(e,t,parseInt("function"==typeof h.offset?h.offset(o,a):h.offset,10),h.clip),l=s-r,d=S(),u=0,t=(e=h).speedAsDuration?e.speed:Math.abs(l/1e3*e.speed),f=e.durationMax&&t>e.durationMax?e.durationMax:e.durationMin&&t<e.durationMin?e.durationMin:parseInt(t,10),m=function(e){var t,n;u+=e-(i=i||e),c=r+l*(n=1<(c=0===f?0:u/f)?1:c,"easeInQuad"===h.easing&&(t=n*n),"easeOutQuad"===h.easing&&(t=n*(2-n)),"easeInOutQuad"===h.easing&&(t=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===h.easing&&(t=n*n*n),"easeOutCubic"===h.easing&&(t=--n*n*n+1),"easeInOutCubic"===h.easing&&(t=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===h.easing&&(t=n*n*n*n),"easeOutQuart"===h.easing&&(t=1- --n*n*n*n),"easeInOutQuart"===h.easing&&(t=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===h.easing&&(t=n*n*n*n*n),"easeOutQuint"===h.easing&&(t=1+--n*n*n*n*n),"easeInOutQuint"===h.easing&&(t=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),(t=h.customEasing?h.customEasing(n):t)||n),E.scrollTo(0,Math.floor(c)),t=s,n=E.pageYOffset,(!(c==t||n==t||(r<t&&E.innerHeight+n)>=d)||(b.cancelScroll(!0),w(o,t,y),L("scrollStop",h,o,a),p=i=null))&&(p=E.requestAnimationFrame(m),i=e)},0===E.pageYOffset&&E.scrollTo(0,0),e=o,y||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id),"matchMedia"in E&&E.matchMedia("(prefers-reduced-motion)").matches?w(o,Math.floor(s),!1):(L("scrollStart",h,o,a),b.cancelScroll(!0),E.requestAnimationFrame(m)))};if(b.destroy=function(){v&&(document.removeEventListener("click",t,!1),E.removeEventListener("popstate",n,!1),b.cancelScroll(),p=g=r=v=null)},"querySelector"in document&&"addEventListener"in E&&"requestAnimationFrame"in E&&"closest"in E.Element.prototype)return b.destroy(),v=_(A,e||{}),g=v.header?document.querySelector(v.header):null,document.addEventListener("click",t,!1),v.updateURL&&v.popstate&&E.addEventListener("popstate",n,!1),b;throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs."}}),document.addEventListener("DOMContentLoaded",function(){function e(){let r=document.getElementById("hc-cover");if(r){let n="hc_cover_closed";var e=document.cookie.split(";").some(e=>e.trim().startsWith(n+"="));if(!e){let o=r.querySelector(".hc-cover__close"),a=r.querySelector(".hc-cover__link"),t=document.activeElement;function i(){r.classList.remove("is-visible");var e=new Date;e.setMonth(e.getMonth()+1),document.cookie=n+"=1; expires="+e.toUTCString()+"; path=/; SameSite=Lax",document.removeEventListener("keydown",c),t&&"function"==typeof t.focus&&t.focus()}function c(e){var t,n;"Escape"===e.key&&i(),"Tab"===e.key&&(t=[a,o].filter(Boolean)).length&&(n=t.indexOf(document.activeElement),!e.shiftKey||0!==n&&-1!==n?e.shiftKey||n!==t.length-1||(e.preventDefault(),t[0].focus()):(e.preventDefault(),t[t.length-1].focus()))}r.classList.add("is-visible"),o.focus(),o.addEventListener("click",i),a&&a.addEventListener("click",i),r.addEventListener("click",e=>{e.target===r&&i()}),document.addEventListener("keydown",c)}}}function t(){var e=document.querySelector(".photo-gallery");if(e){let t=Array.from(e.querySelectorAll("[data-gallery-item]")),r=e.querySelector("[data-gallery-lightbox]"),i=e.querySelector("[data-gallery-image]"),c=e.querySelector("[data-gallery-caption]"),s=e.querySelector("[data-gallery-counter]"),l=e.querySelector("[data-gallery-close]"),d=e.querySelector("[data-gallery-prev]"),u=e.querySelector("[data-gallery-next]");if(t.length&&r&&i&&l){let o=0,n=null,a="";function f(e){o=(e+t.length)%t.length;e=t[o];i.src=e.getAttribute("data-full").replace(/&amp;/g,"&"),i.alt=e.dataset.alt||"",c.textContent=i.alt,s.textContent=o+1+" / "+t.length}function m(){r.hidden=!0,r.setAttribute("aria-hidden","true"),document.body.style.overflow=a,document.removeEventListener("keydown",h),i.removeAttribute("src"),n&&"function"==typeof n.focus&&n.focus()}function h(e){var t,n;"Escape"===e.key?m():"ArrowLeft"===e.key?f(o-1):"ArrowRight"===e.key?f(o+1):"Tab"===e.key&&(n=(t=[l,d,u].filter(Boolean)).indexOf(document.activeElement),!e.shiftKey||0!==n&&-1!==n?e.shiftKey||n!==t.length-1||(e.preventDefault(),t[0].focus()):(e.preventDefault(),t[t.length-1].focus()))}t.forEach((e,t)=>{e.addEventListener("click",()=>{n=document.activeElement,a=document.body.style.overflow,f(t),r.hidden=!1,r.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",l.focus(),document.addEventListener("keydown",h)})}),l.addEventListener("click",m),d&&d.addEventListener("click",()=>f(o-1)),u&&u.addEventListener("click",()=>f(o+1)),r.addEventListener("click",e=>{e.target===r&&m()})}}}function n(){window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2&&window.jQuery("select.js-select2").each(function(){var e=window.jQuery(this);e.hasClass("select2-hidden-accessible")||e.select2({width:"100%",minimumResultsForSearch:1/0,dropdownAutoWidth:!1})})}function o(){var t=document.querySelector(".standings-page");if(t){let e=t.querySelector("table"),n=e.tBodies[0],o=Array.from(e.querySelectorAll("[data-sort]")),r=-1,i=!1;o.forEach((t,a)=>t.addEventListener("click",()=>{i=r===a&&!i,r=a;var e=Array.from(n.rows);e.sort((e,t)=>{var e=e.cells[a].textContent.trim(),t=t.cells[a].textContent.trim(),n=Number(e.replace("+","")),o=Number(t.replace("+","")),e=""===e||""===t||Number.isNaN(n)||Number.isNaN(o)?e.localeCompare(t,"cs",{numeric:!0}):n-o;return i?-e:e}),e.forEach(e=>n.appendChild(e)),o.forEach(e=>e.removeAttribute("aria-sort")),t.setAttribute("aria-sort",i?"descending":"ascending")}));t.querySelector("#standings-season")}}function a(){var t=document.querySelector(".youth-page");if(t){let e=Array.from(t.querySelectorAll("[data-youth-category]")),n=t.querySelector("#youth-current-category"),o={U20:"JUNIOŘI",U18:"DOROST",U16:"STARŠÍ ŽÁCI",U14:"ŽÁCI",U12:"MLADŠÍ ŽÁCI",U10:"MLADŠÍ ŽÁCI",U9:"PŘÍPRAVKA",U8:"PŘÍPRAVKA","Přípravka":"NEJMENŠÍ HOKEJISTÉ"};e.forEach(t=>t.addEventListener("click",()=>{e.forEach(e=>{e.classList.toggle("is-active",e===t),e.setAttribute("aria-selected",String(e===t))}),n.innerHTML=t.dataset.youthCategory+" <small>"+o[t.dataset.youthCategory]+"</small>"}))}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n,{once:!0}):n(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o,{once:!0}):o(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",a,{once:!0}):a();var r,i=document.querySelectorAll(".content table");for(r=0;r<i.length;++r){i[r].classList.add("table");var c=document.createElement("div");c.classList.add("table-responsive"),i[r].parentNode.insertBefore(c,i[r]),c.appendChild(i[r])}var s,l=document.querySelectorAll(".content iframe");for(s=0;s<l.length;++s){l[s].removeAttribute("height"),l[s].removeAttribute("width");var d=document.createElement("div");d.classList.add("ratio"),d.classList.add("ratio-16x9"),l[s].parentNode.insertBefore(d,l[s]),d.appendChild(l[s])}function u(){let t=document.querySelector(".menu-toggle"),n=document.querySelector(".main-nav");function o(){n.querySelectorAll(".main-nav__item").forEach(e=>{e.classList.remove("is-open");e=e.querySelector(".main-nav__trigger");e&&e.setAttribute("aria-expanded","false")})}function a(){n.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),o()}t&&n&&(t.addEventListener("click",()=>{var e=n.classList.toggle("is-open");t.setAttribute("aria-expanded",String(e)),e||o()}),n.querySelectorAll(".main-nav__trigger").forEach(n=>{n.addEventListener("click",()=>{var e,t=n.closest(".main-nav__item");t&&(e=!t.classList.contains("is-open"),o(),e)&&(t.classList.add("is-open"),n.setAttribute("aria-expanded","true"))})}),n.querySelectorAll(".main-nav__link").forEach(e=>{e.addEventListener("click",a)}),document.addEventListener("click",e=>{n.contains(e.target)||t.contains(e.target)||a()}))}function f(){var t=document.querySelector("[data-youth-board]");if(t){let e=t.querySelectorAll(".hc-youth-board__categories [data-category]"),n=t.querySelectorAll("[data-youth-category-panel]");function a(e,n){e.forEach(e=>{var t=e===n;e.classList.toggle("is-active",t),e.setAttribute("aria-selected",String(t))})}e.forEach(t=>{t.addEventListener("click",()=>{a(e,t),n.forEach(e=>{e.hidden=e.dataset.youthCategoryPanel!==t.dataset.category})})}),n.forEach(e=>{let n=e.querySelectorAll(".hc-youth-board__tabs [data-youth-tab]"),o=e.querySelectorAll("[data-youth-panel]");n.forEach(t=>{t.addEventListener("click",()=>{a(n,t),o.forEach(e=>{e.hidden=e.dataset.youthPanel!==t.dataset.youthTab})})})})}}function m(){var a=document.querySelector(".hc-hero");if(a){let t=Array.from(a.querySelectorAll(".hc-hero__slide")),n=Array.from(a.querySelectorAll(".hc-hero__pagination button"));var r=a.querySelector(".hc-hero__prev"),i=a.querySelector(".hc-hero__next");let o=0,e=null;function c(e){o=(e+t.length)%t.length,t.forEach((e,t)=>{t=t===o;e.classList.toggle("is-active",t),e.setAttribute("aria-hidden",String(!t))}),n.forEach((e,t)=>{t=t===o;e.classList.toggle("is-active",t),e.setAttribute("aria-current",String(t))})}function s(){clearInterval(e),e=null}function l(){t.length<=1||window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s(),e=setInterval(()=>{c(o+1)},5500))}0<t.length&&(c(0),1<t.length)&&(r&&r.addEventListener("click",()=>{c(o-1)}),i&&i.addEventListener("click",()=>{c(o+1)}),n.forEach((e,t)=>{e.addEventListener("click",()=>{c(t)})}),l(),a.addEventListener("mouseenter",s),a.addEventListener("mouseleave",l),document.addEventListener("visibilitychange",()=>{(document.hidden?s:l)()}))}let o=document.querySelector(".hc-youth__board");if(o){let t="U20",n="Zápasy";o.querySelectorAll("[role=tab]").forEach(e=>{e.addEventListener("click",()=>{e.closest("[role=tablist]").querySelectorAll("[role=tab]").forEach(e=>{e.classList.remove("is-active"),e.setAttribute("aria-selected","false")}),e.classList.add("is-active"),e.setAttribute("aria-selected","true"),e.dataset.category?t=e.dataset.category:n=e.dataset.type,o.querySelector(".hc-youth__selected").textContent=(t+" · "+n).toUpperCase(),o.querySelector(".hc-youth__data").innerHTML=`
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
         `})})}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",u,{once:!0}):u(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",f,{once:!0}):f(),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",m,{once:!0}):m();new LazyLoad({elements_selector:"[data-bg]"}),new SmoothScroll(".js-scroll",{speed:300})});
(function () {
  "use strict";

  const root = document.querySelector("[data-fanshop]");
  if (!root || root.dataset.fanInitialized) return;
  root.dataset.fanInitialized = "true";

  const overlay = root.querySelector("[data-fan-overlay]");
  const modalBody = root.querySelector("[data-fan-body]");
  const modalTitle = root.querySelector("[data-fan-title]");
  const dialog = root.querySelector(".fan-dialog");
  const search = root.querySelector("[data-fan-search]");
  const orderUrl = root.dataset.orderUrl || "";
  const currency = new Intl.NumberFormat("cs-CZ", {
    style: "currency", currency: "CZK", maximumFractionDigits: 0
  });

  // Product details, variants, prices, and images originate from the server-rendered Twig DOM.
  // The browser never defines or owns the product catalog.
  const catalog = new Map(
    [...root.querySelectorAll("[data-fan-item]")].map((element) => [
      element.dataset.productId, element
    ])
  );

  const key = "hc-fanshop-cart-v2";
  let cart = [];
  let returnFocus = null;
  let customer = null;
  let checkoutValues = null;
  let shippingPrice = 0;

  const money = (value) => currency.format(value);
  const priceOf = (id) => Number(catalog.get(id)?.dataset.price || 0);
  const variantOf = (id, variantId) => {
    const template = [...root.querySelectorAll("[data-fan-detail-template]")]
      .find((item) => item.dataset.fanDetailTemplate === id);
    if (!template) return null;
    const control = [...template.content.querySelectorAll("[name=variantId]")]
      .find((item) => item.value === variantId);
    if (!control) return null;
    const label = control.closest("label");
    return label ? label.textContent.trim() : "";
  };

  const validItem = (item) =>
    item && catalog.has(String(item.id)) &&
    typeof item.variantId === "string" &&
    variantOf(String(item.id), item.variantId) !== null &&
    Number.isInteger(item.qty) && item.qty >= 1 && item.qty <= 99;

  try {
    const stored = JSON.parse(sessionStorage.getItem(key) || "[]");
    if (Array.isArray(stored)) cart = stored.filter(validItem);
  } catch (_error) {
    cart = [];
  }

  function storeCart() {
    try {
      sessionStorage.setItem(key, JSON.stringify(cart));
    } catch (_error) {
      // The demo still works when browser storage is disabled.
    }
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    root.querySelectorAll("[data-fan-count]").forEach((element) => {
      element.textContent = String(count);
    });
  }

  const subtotal = () => cart.reduce(
    (sum, item) => sum + priceOf(item.id) * item.qty, 0
  );

  function templateContent(name) {
    const template = root.querySelector('[data-fan-template="' + name + '"]');
    return template ? template.content.cloneNode(true) : document.createDocumentFragment();
  }

  function show(name, fragment) {
    const labels = {
      product: "Detail produktu",
      cart: "Nákupní košík",
      checkout: "Dokončení objednávky",
      summary: "Shrnutí objednávky"
    };
    if (overlay.hidden) returnFocus = document.activeElement;
    modalTitle.textContent = labels[name] || "Fanshop";
    modalBody.replaceChildren(fragment);
    overlay.hidden = false;
    document.body.classList.add("fan-modal-open");
    dialog.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("fan-modal-open");
    modalBody.replaceChildren();
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  }

  function showProduct(id) {
    const template = [...root.querySelectorAll("[data-fan-detail-template]")]
      .find((element) => element.dataset.fanDetailTemplate === id);
    if (template) show("product", template.content.cloneNode(true));
  }

  function fillText(container, selector, value) {
    container.querySelectorAll(selector).forEach((element) => {
      element.textContent = String(value);
    });
  }

  function lineFor(item, index) {
    const card = catalog.get(item.id);
    const fragment = templateContent("cart-line");
    const row = fragment.querySelector(".fan-line");
    const sourceImage = card.querySelector(".fan-product__image").firstElementChild;
    if (sourceImage) row.querySelector("[data-fan-line-image]").append(sourceImage.cloneNode(true));
    fillText(row, "[data-fan-line-name]", card.querySelector("h2").textContent.trim());
    fillText(row, "[data-fan-line-variant]", variantOf(item.id, item.variantId) || "Standard");
    fillText(row, "[data-fan-line-price]", money(priceOf(item.id)));
    fillText(row, "[data-fan-line-total]", money(priceOf(item.id) * item.qty));
    const qty = row.querySelector("[data-fan-qty]");
    qty.dataset.fanQty = String(index);
    qty.value = String(item.qty);
    row.querySelector("[data-fan-remove]").dataset.fanRemove = String(index);
    return row;
  }

  function showCart() {
    const fragment = templateContent(cart.length ? "cart" : "cart-empty");
    if (cart.length) {
      const lines = fragment.querySelector("[data-fan-lines]");
      cart.forEach((item, index) => lines.append(lineFor(item, index)));
      fillText(fragment, "[data-fan-subtotal]", money(subtotal()));
    }
    show("cart", fragment);
  }

  function shippingCost(form) {
    const selected = form.querySelector('input[name="shipping"]:checked');
    return selected ? Number(selected.dataset.price || 0) : 0;
  }

  function populateSummaryLines(container) {
    container.querySelectorAll("[data-fan-summary-lines]").forEach((list) => {
      list.replaceChildren();
      cart.forEach((item) => {
        const card = catalog.get(item.id);
        const fragment = templateContent("summary-line");
        const row = fragment.querySelector(".fan-summary-line");
        fillText(row, "[data-fan-summary-name]",
          card.querySelector("h2").textContent.trim() +
          " · " + (variantOf(item.id, item.variantId) || "Standard") + " × " + item.qty);
        fillText(row, "[data-fan-summary-price]", money(priceOf(item.id) * item.qty));
        list.append(row);
      });
    });
  }

  function updateTotals(container) {
    fillText(container, "[data-fan-shipping]", money(shippingPrice));
    fillText(container, "[data-fan-total]", money(subtotal() + shippingPrice));
    populateSummaryLines(container);
  }

  function showCheckout() {
    if (!cart.length) {
      showCart();
      return;
    }
    const fragment = templateContent("checkout");
    const form = fragment.querySelector("[data-fan-checkout]");
    if (checkoutValues) {
      for (const [name, value] of Object.entries(checkoutValues)) {
        const input = [...form.elements].find((element) => element.name === name && (
          element.type !== "radio" || element.value === value
        ));
        if (input) {
          if (input.type === "radio") input.checked = true;
          else input.value = value;
        }
      }
    }
    shippingPrice = shippingCost(form);
    updateTotals(fragment);
    show("checkout", fragment);
  }

  function showSummary(form) {
    if (!form.reportValidity()) return;
    const selectedPayment = form.querySelector('input[name="payment"]:checked');
    const selectedShipping = form.querySelector('input[name="shipping"]:checked');
    if (selectedPayment?.dataset.pickupOnly === "true" &&
        selectedShipping?.value !== "pickup") {
      const error = form.querySelector("[data-fan-form-error]");
      if (error) {
        error.textContent = "Tento způsob platby je dostupný pouze při osobním odběru.";
        error.hidden = false;
      }
      return;
    }
    const data = new FormData(form);
    customer = Object.fromEntries(data.entries());
    checkoutValues = customer;
    shippingPrice = shippingCost(form);
    const fragment = templateContent("summary");
    fillText(fragment, "[data-fan-customer]", customer.firstName + " " + customer.lastName);
    fillText(fragment, "[data-fan-email]", customer.email);
    fillText(fragment, "[data-fan-phone]", customer.phone);
    fillText(fragment, "[data-fan-address]", customer.street + ", " + customer.zip + " " + customer.city);
    fillText(fragment, "[data-fan-shipping-name]",
      selectedShipping?.closest("label")?.querySelector("strong")?.textContent || "");
    fillText(fragment, "[data-fan-payment-name]",
      selectedPayment?.closest("label")?.querySelector("strong")?.textContent || "");
    fillText(fragment, "[data-fan-summary-message]", orderUrl
      ? "Zkontrolujte údaje a odešlete objednávku."
      : "Ukázková objednávka. Bez nastaveného backendu se nic neodešle.");
    updateTotals(fragment);
    show("summary", fragment);
  }

  function submitOrder() {
    // Explicit integration point: real server must validate product/variant IDs,
    // quantity, inventory, pricing, shipping, CSRF, and customer data.
    // No browser-calculated prices are submitted as authoritative amounts.
    if (!orderUrl || !customer || !cart.length) return;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = orderUrl;
    form.hidden = true;
    for (const [name, value] of Object.entries(customer)) {
      const field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      field.value = value;
      form.append(field);
    }
    const items = document.createElement("input");
    items.type = "hidden";
    items.name = "items";
    items.value = JSON.stringify(cart.map(({ id, variantId, qty }) => ({
      productId: id, variantId, quantity: qty
    })));
    form.append(items);
    if (root.dataset.csrf) {
      const csrf = document.createElement("input");
      csrf.type = "hidden";
      csrf.name = "_token";
      csrf.value = root.dataset.csrf;
      form.append(csrf);
    }
    document.body.append(form);
    form.submit();
  }

  function applyFilters() {
    const category = root.querySelector("[data-fan-filter].is-active")?.dataset.fanFilter || "";
    const query = search.value.toLocaleLowerCase("cs-CZ").trim();
    let visible = 0;
    catalog.forEach((card) => {
      const title = card.querySelector("h2").textContent.toLocaleLowerCase("cs-CZ");
      const match = (!category || card.dataset.category === category) && title.includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    root.querySelector("[data-fan-noresults]").hidden = visible !== 0;
  }

  root.addEventListener("click", (event) => {
    const productButton = event.target.closest("[data-fan-product]");
    if (productButton) {
      showProduct(productButton.dataset.fanProduct);
      return;
    }
    const filter = event.target.closest("[data-fan-filter]");
    if (filter) {
      root.querySelectorAll("[data-fan-filter]").forEach((button) =>
        button.classList.toggle("is-active", button === filter)
      );
      applyFilters();
      return;
    }
    if (event.target.closest("[data-fan-close]")) {
      close();
      return;
    }
    const openButton = event.target.closest("[data-fan-open]");
    if (openButton) {
      if (openButton.dataset.fanOpen === "cart") showCart();
      if (openButton.dataset.fanOpen === "checkout") showCheckout();
      return;
    }
    const remove = event.target.closest("[data-fan-remove]");
    if (remove) {
      cart.splice(Number(remove.dataset.fanRemove), 1);
      storeCart();
      showCart();
      return;
    }
    if (event.target.closest("[data-fan-submit-order]")) submitOrder();
  });

  root.addEventListener("change", (event) => {
    if (event.target.matches("[data-fan-qty]")) {
      const index = Number(event.target.dataset.fanQty);
      if (!cart[index]) return;
      cart[index].qty = Math.max(1, Math.min(99, Number(event.target.value) || 1));
      storeCart();
      showCart();
      return;
    }
    if (event.target.name === "shipping") {
      const form = event.target.closest("[data-fan-checkout]");
      shippingPrice = shippingCost(form);
      updateTotals(form);
    }
  });

  root.addEventListener("submit", (event) => {
    if (event.target.matches("[data-fan-add]")) {
      event.preventDefault();
      const form = event.target;
      if (!form.reportValidity()) return;
      const id = form.dataset.productId;
      if (!catalog.has(id)) return;
      const data = new FormData(form);
      const variantId = String(data.get("variantId") || "");
      if (variantOf(id, variantId) === null) return;
      const qty = Math.max(1, Math.min(99, Number(data.get("qty")) || 1));
      const existing = cart.find((item) => item.id === id && item.variantId === variantId);
      if (existing) existing.qty = Math.min(99, existing.qty + qty);
      else cart.push({ id, variantId, qty });
      storeCart();
      showCart();
    } else if (event.target.matches("[data-fan-checkout]")) {
      event.preventDefault();
      showSummary(event.target);
    }
  });

  search?.addEventListener("input", applyFilters);
  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll(
      "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])"
    )].filter((element) => element.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  storeCart();
})();