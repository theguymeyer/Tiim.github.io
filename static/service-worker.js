!function(){"use strict";try{self["workbox:core:4.3.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:4.3.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n){this.handler=s(t),this.match=e,this.method=n||"GET"}}class r extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);return s?t.origin!==location.origin&&0!==s.index?null:s.slice(1):null},t,s)}}const o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:self.registration.scope},a=e=>[o.prefix,e,o.suffix].filter(e=>e.length>0).join("-"),i=e=>e||a(o.runtime),c=e=>{const t=new URL(e,location);return t.origin===location.origin?t.pathname:t.href};class u{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",async e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&(await s,e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location);if(!s.protocol.startsWith("http"))return;let n,{params:r,route:o}=this.findMatchingRoute({url:s,request:e,event:t}),a=o&&o.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),a){try{n=a.handle({url:s,request:e,event:t,params:r})}catch(e){n=Promise.reject(e)}return n&&this._catchHandler&&(n=n.catch(e=>this._catchHandler.handle({url:s,event:t,err:e}))),n}}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const r of n){let n,o=r.match({url:e,request:t,event:s});if(o)return(Array.isArray(o)&&o.length>0||o.constructor===Object&&Object.keys(o).length>0)&&(n=o),{route:r,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=s(e)}setCatchHandler(e){this._catchHandler=s(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let l;const h=()=>(l||(l=new u,l.addFetchListener(),l.addCacheListener()),l),p=(e,s,o="GET")=>{let a;if("string"==typeof e){const t=new URL(e,location);a=new n(({url:e})=>e.href===t.href,s,o)}else if(e instanceof RegExp)a=new r(e,s,o);else if("function"==typeof e)a=new n(e,s,o);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return h().registerRoute(a),a},d=new Set;const g="cacheDidUpdate",f="cacheKeyWillBeUsed",m="cacheWillUpdate",w="cachedResponseWillBeUsed",y="fetchDidFail",v="fetchDidSucceed",q="requestWillFetch",j=(e,t)=>e.filter(e=>t in e),b=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const o=await caches.open(e),a=await k({plugins:r,request:t,mode:"read"});let i=await o.match(a,n);for(const t of r)w in t&&(i=await t[w].call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:i,request:a}));return i},R=async({request:e,response:t,event:s,plugins:n})=>{let r=t,o=!1;for(let t of n)if(m in t&&(o=!0,r=await t[m].call(t,{request:e,response:r,event:s}),!r))break;return o||(r=200===r.status?r:null),r||null},k=async({request:e,mode:t,plugins:s})=>{const n=j(s,f);let r=e;for(const e of n)r=await e[f].call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},x={put:async({cacheName:e,request:s,response:n,event:r,plugins:o=[],matchOptions:a}={})=>{const i=await k({plugins:o,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:c(i.url)});let u=await R({event:r,plugins:o,response:n,request:i});if(!u)return;const l=await caches.open(e),h=j(o,g);let p=h.length>0?await b({cacheName:e,matchOptions:a,request:i}):null;try{await l.put(i,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(let t of h)await t[g].call(t,{cacheName:e,event:r,oldResponse:p,newResponse:u,request:i})},match:b},O=async({request:e,fetchOptions:s,event:n,plugins:r=[]})=>{if(n&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}"string"==typeof e&&(e=new Request(e));const o=j(r,y),a=o.length>0?e.clone():null;try{for(let t of r)q in t&&(e=await t[q].call(t,{request:e.clone(),event:n}))}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}let i=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of r)v in e&&(t=await e[v].call(e,{event:n,request:i,response:t}));return t}catch(e){for(const t of o)await t[y].call(t,{error:e,event:n,originalRequest:a.clone(),request:i.clone()});throw e}};try{self["workbox:strategies:4.3.1"]&&_()}catch(e){}const N={cacheWillUpdate:({response:e})=>200===e.status||0===e.status?e:null};class E{constructor(e,t,{onupgradeneeded:s,onversionchange:n=this._onversionchange}={}){this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n,this._db=null}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),e.target.result.close()):this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=({target:t})=>{const n=t.result;s?n.close():(n.onversionchange=this._onversionchange.bind(this),e(n))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(({key:e})=>e)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:r,includeKeys:o}={}){return await this.transaction([e],"readonly",(a,i)=>{const c=a.objectStore(e),u=t?c.index(t):c,l=[];u.openCursor(s,n).onsuccess=({target:e})=>{const t=e.result;if(t){const{primaryKey:e,key:s,value:n}=t;l.push(o?{primaryKey:e,key:s,value:n}:n),r&&l.length>=r?i(l):t.continue()}else i(l)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,r)=>{const o=this._db.transaction(e,t);o.onabort=({target:e})=>r(e.error),o.oncomplete=()=>n(),s(o,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,r)=>{s.objectStore(t)[e](...n).onsuccess=({target:e})=>{r(e.result)}})}_onversionchange(){this.close()}close(){this._db&&(this._db.close(),this._db=null)}}E.prototype.OPEN_TIMEOUT=2e3;const T={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(T))for(const s of t)s in IDBObjectStore.prototype&&(E.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});try{self.workbox.v=self.workbox.v||{}}catch(e){}try{self["workbox:precaching:4.3.1"]&&_()}catch(e){}addEventListener("activate",()=>clients.claim()),addEventListener("install",()=>self.skipWaiting());var U=new class{constructor(e={}){if(this._cacheName=i(e.cacheName),e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[N,...e.plugins]}else this._plugins=[N];this._networkTimeoutSeconds=e.networkTimeoutSeconds,this._fetchOptions=e.fetchOptions||null,this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const r=[];let o;if(this._networkTimeoutSeconds){const{id:t,promise:a}=this._getTimeoutPromise({request:s,event:e,logs:n});o=t,r.push(a)}const a=this._getNetworkPromise({timeoutId:o,request:s,event:e,logs:n});r.push(a);let i=await Promise.race(r);if(i||(i=await a),!i)throw new t("no-response",{url:s.url});return i}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let r,o;try{o=await O({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){r=e}if(e&&clearTimeout(e),r||!o)o=await this._respondFromCache({request:t,event:n});else{const e=o.clone(),s=x.put({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){}}return o}_respondFromCache({event:e,request:t}){return x.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}({cacheName:"nf-v1"});p((function(e){var t=e.url;return"/assets/js/service-worker.js"!==t.pathname&&"/service-worker.js"!==t.pathname&&"/"===t.pathname}),U),p((function(e){var t=e.url;return"/assets/js/service-worker.js"!==t.pathname&&"/service-worker.js"!==t.pathname&&("string"==typeof/\.(js|css|png|jpg|jpeg|svg|md|json)/?t.pathname===/\.(js|css|png|jpg|jpeg|svg|md|json)/:/\.(js|css|png|jpg|jpeg|svg|md|json)/ instanceof RegExp&&/\.(js|css|png|jpg|jpeg|svg|md|json)/.test(t.pathname))}),U)}();