import{aT as I}from"./DPxB2w_0.js";const k=Object.freeze({ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1,excludeKeys:void 0,excludeValues:void 0,replacer:void 0});function F(c,l){l?l={...k,...l}:l=k;const o=C(l);return o.dispatch(c),o.toString()}const K=Object.freeze(["prototype","__proto__","constructor"]);function C(c){let l="",o=new Map;const t=r=>{l+=r};return{toString(){return l},getContext(){return o},dispatch(r){return c.replacer&&(r=c.replacer(r)),this[r===null?"null":typeof r](r)},object(r){if(r&&typeof r.toJSON=="function")return this.object(r.toJSON());const f=Object.prototype.toString.call(r);let h="";const a=f.length;a<10?h="unknown:["+f+"]":h=f.slice(8,a-1),h=h.toLowerCase();let p=null;if((p=o.get(r))===void 0)o.set(r,o.size);else return this.dispatch("[CIRCULAR:"+p+"]");if(typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(r))return t("buffer:"),t(r.toString("utf8"));if(h!=="object"&&h!=="function"&&h!=="asyncfunction")this[h]?this[h](r):c.ignoreUnknown||this.unkown(r,h);else{let s=Object.keys(r);c.unorderedObjects&&(s=s.sort());let n=[];c.respectType!==!1&&!A(r)&&(n=K),c.excludeKeys&&(s=s.filter(e=>!c.excludeKeys(e)),n=n.filter(e=>!c.excludeKeys(e))),t("object:"+(s.length+n.length)+":");const i=e=>{this.dispatch(e),t(":"),c.excludeValues||this.dispatch(r[e]),t(",")};for(const e of s)i(e);for(const e of n)i(e)}},array(r,f){if(f=f===void 0?c.unorderedArrays!==!1:f,t("array:"+r.length+":"),!f||r.length<=1){for(const p of r)this.dispatch(p);return}const h=new Map,a=r.map(p=>{const s=C(c);s.dispatch(p);for(const[n,i]of s.getContext())h.set(n,i);return s.toString()});return o=h,a.sort(),this.array(a,!1)},date(r){return t("date:"+r.toJSON())},symbol(r){return t("symbol:"+r.toString())},unkown(r,f){if(t(f),!!r&&(t(":"),r&&typeof r.entries=="function"))return this.array(Array.from(r.entries()),!0)},error(r){return t("error:"+r.toString())},boolean(r){return t("bool:"+r)},string(r){t("string:"+r.length+":"),t(r)},function(r){t("fn:"),A(r)?this.dispatch("[native]"):this.dispatch(r.toString()),c.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(r.name)),c.respectFunctionProperties&&this.object(r)},number(r){return t("number:"+r)},xml(r){return t("xml:"+r.toString())},null(){return t("Null")},undefined(){return t("Undefined")},regexp(r){return t("regex:"+r.toString())},uint8array(r){return t("uint8array:"),this.dispatch(Array.prototype.slice.call(r))},uint8clampedarray(r){return t("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(r))},int8array(r){return t("int8array:"),this.dispatch(Array.prototype.slice.call(r))},uint16array(r){return t("uint16array:"),this.dispatch(Array.prototype.slice.call(r))},int16array(r){return t("int16array:"),this.dispatch(Array.prototype.slice.call(r))},uint32array(r){return t("uint32array:"),this.dispatch(Array.prototype.slice.call(r))},int32array(r){return t("int32array:"),this.dispatch(Array.prototype.slice.call(r))},float32array(r){return t("float32array:"),this.dispatch(Array.prototype.slice.call(r))},float64array(r){return t("float64array:"),this.dispatch(Array.prototype.slice.call(r))},arraybuffer(r){return t("arraybuffer:"),this.dispatch(new Uint8Array(r))},url(r){return t("url:"+r.toString())},map(r){t("map:");const f=[...r];return this.array(f,c.unorderedSets!==!1)},set(r){t("set:");const f=[...r];return this.array(f,c.unorderedSets!==!1)},file(r){return t("file:"),this.dispatch([r.name,r.size,r.type,r.lastModfied])},blob(){if(c.ignoreUnknown)return t("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},domwindow(){return t("domwindow")},bigint(r){return t("bigint:"+r.toString())},process(){return t("process")},timer(){return t("timer")},pipe(){return t("pipe")},tcp(){return t("tcp")},udp(){return t("udp")},tty(){return t("tty")},statwatcher(){return t("statwatcher")},securecontext(){return t("securecontext")},connection(){return t("connection")},zlib(){return t("zlib")},context(){return t("context")},nodescript(){return t("nodescript")},httpparser(){return t("httpparser")},dataview(){return t("dataview")},signal(){return t("signal")},fsevent(){return t("fsevent")},tlswrap(){return t("tlswrap")}}}const H="[native code] }",L=H.length;function A(c){return typeof c!="function"?!1:Function.prototype.toString.call(c).slice(-L)===H}class _{constructor(l,o){l=this.words=l||[],this.sigBytes=o===void 0?l.length*4:o}toString(l){return(l||R).stringify(this)}concat(l){if(this.clamp(),this.sigBytes%4)for(let o=0;o<l.sigBytes;o++){const t=l.words[o>>>2]>>>24-o%4*8&255;this.words[this.sigBytes+o>>>2]|=t<<24-(this.sigBytes+o)%4*8}else for(let o=0;o<l.sigBytes;o+=4)this.words[this.sigBytes+o>>>2]=l.words[o>>>2];return this.sigBytes+=l.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new _([...this.words])}}const R={stringify(c){const l=[];for(let o=0;o<c.sigBytes;o++){const t=c.words[o>>>2]>>>24-o%4*8&255;l.push((t>>>4).toString(16),(t&15).toString(16))}return l.join("")}},E={stringify(c){const l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=[];for(let t=0;t<c.sigBytes;t+=3){const r=c.words[t>>>2]>>>24-t%4*8&255,f=c.words[t+1>>>2]>>>24-(t+1)%4*8&255,h=c.words[t+2>>>2]>>>24-(t+2)%4*8&255,a=r<<16|f<<8|h;for(let p=0;p<4&&t*8+p*6<c.sigBytes*8;p++)o.push(l.charAt(a>>>6*(3-p)&63))}return o.join("")}},P={parse(c){const l=c.length,o=[];for(let t=0;t<l;t++)o[t>>>2]|=(c.charCodeAt(t)&255)<<24-t%4*8;return new _(o,l)}},W={parse(c){return P.parse(unescape(encodeURIComponent(c)))}};class D{constructor(){this._data=new _,this._nDataBytes=0,this._minBufferSize=0,this.blockSize=512/32}reset(){this._data=new _,this._nDataBytes=0}_append(l){typeof l=="string"&&(l=W.parse(l)),this._data.concat(l),this._nDataBytes+=l.sigBytes}_doProcessBlock(l,o){}_process(l){let o,t=this._data.sigBytes/(this.blockSize*4);l?t=Math.ceil(t):t=Math.max((t|0)-this._minBufferSize,0);const r=t*this.blockSize,f=Math.min(r*4,this._data.sigBytes);if(r){for(let h=0;h<r;h+=this.blockSize)this._doProcessBlock(this._data.words,h);o=this._data.words.splice(0,r),this._data.sigBytes-=f}return new _(o,f)}}class J extends D{update(l){return this._append(l),this._process(),this}finalize(l){l&&this._append(l)}}const z=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],G=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],S=[];class V extends J{constructor(){super(...arguments),this._hash=new _([...z])}reset(){super.reset(),this._hash=new _([...z])}_doProcessBlock(l,o){const t=this._hash.words;let r=t[0],f=t[1],h=t[2],a=t[3],p=t[4],s=t[5],n=t[6],i=t[7];for(let e=0;e<64;e++){if(e<16)S[e]=l[o+e]|0;else{const x=S[e-15],m=(x<<25|x>>>7)^(x<<14|x>>>18)^x>>>3,w=S[e-2],N=(w<<15|w>>>17)^(w<<13|w>>>19)^w>>>10;S[e]=m+S[e-7]+N+S[e-16]}const u=p&s^~p&n,d=r&f^r&h^f&h,g=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),B=(p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25),y=i+B+u+G[e]+S[e],v=g+d;i=n,n=s,s=p,p=a+y|0,a=h,h=f,f=r,r=y+v|0}t[0]=t[0]+r|0,t[1]=t[1]+f|0,t[2]=t[2]+h|0,t[3]=t[3]+a|0,t[4]=t[4]+p|0,t[5]=t[5]+s|0,t[6]=t[6]+n|0,t[7]=t[7]+i|0}finalize(l){super.finalize(l);const o=this._nDataBytes*8,t=this._data.sigBytes*8;return this._data.words[t>>>5]|=128<<24-t%32,this._data.words[(t+64>>>9<<4)+14]=Math.floor(o/4294967296),this._data.words[(t+64>>>9<<4)+15]=o,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function q(c){return new V().finalize(c).toString(E)}function j(c,l={}){const o=typeof c=="string"?c:F(c,l);return q(o).slice(0,10)}function tt(c,l,o={}){return c===l||F(c,o)===F(l,o)}var U={exports:{}},M={exports:{}};(function(){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l={rotl:function(o,t){return o<<t|o>>>32-t},rotr:function(o,t){return o<<32-t|o>>>t},endian:function(o){if(o.constructor==Number)return l.rotl(o,8)&16711935|l.rotl(o,24)&4278255360;for(var t=0;t<o.length;t++)o[t]=l.endian(o[t]);return o},randomBytes:function(o){for(var t=[];o>0;o--)t.push(Math.floor(Math.random()*256));return t},bytesToWords:function(o){for(var t=[],r=0,f=0;r<o.length;r++,f+=8)t[f>>>5]|=o[r]<<24-f%32;return t},wordsToBytes:function(o){for(var t=[],r=0;r<o.length*32;r+=8)t.push(o[r>>>5]>>>24-r%32&255);return t},bytesToHex:function(o){for(var t=[],r=0;r<o.length;r++)t.push((o[r]>>>4).toString(16)),t.push((o[r]&15).toString(16));return t.join("")},hexToBytes:function(o){for(var t=[],r=0;r<o.length;r+=2)t.push(parseInt(o.substr(r,2),16));return t},bytesToBase64:function(o){for(var t=[],r=0;r<o.length;r+=3)for(var f=o[r]<<16|o[r+1]<<8|o[r+2],h=0;h<4;h++)r*8+h*6<=o.length*8?t.push(c.charAt(f>>>6*(3-h)&63)):t.push("=");return t.join("")},base64ToBytes:function(o){o=o.replace(/[^A-Z0-9+\/]/ig,"");for(var t=[],r=0,f=0;r<o.length;f=++r%4)f!=0&&t.push((c.indexOf(o.charAt(r-1))&Math.pow(2,-2*f+8)-1)<<f*2|c.indexOf(o.charAt(r))>>>6-f*2);return t}};M.exports=l})();var Z=M.exports,T={utf8:{stringToBytes:function(c){return T.bin.stringToBytes(unescape(encodeURIComponent(c)))},bytesToString:function(c){return decodeURIComponent(escape(T.bin.bytesToString(c)))}},bin:{stringToBytes:function(c){for(var l=[],o=0;o<c.length;o++)l.push(c.charCodeAt(o)&255);return l},bytesToString:function(c){for(var l=[],o=0;o<c.length;o++)l.push(String.fromCharCode(c[o]));return l.join("")}}},b=T;/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var Q=function(c){return c!=null&&(O(c)||X(c)||!!c._isBuffer)};function O(c){return!!c.constructor&&typeof c.constructor.isBuffer=="function"&&c.constructor.isBuffer(c)}function X(c){return typeof c.readFloatLE=="function"&&typeof c.slice=="function"&&O(c.slice(0,0))}(function(){var c=Z,l=b.utf8,o=Q,t=b.bin,r=function(f,h){f.constructor==String?h&&h.encoding==="binary"?f=t.stringToBytes(f):f=l.stringToBytes(f):o(f)?f=Array.prototype.slice.call(f,0):!Array.isArray(f)&&f.constructor!==Uint8Array&&(f=f.toString());for(var a=c.bytesToWords(f),p=f.length*8,s=1732584193,n=-271733879,i=-1732584194,e=271733878,u=0;u<a.length;u++)a[u]=(a[u]<<8|a[u]>>>24)&16711935|(a[u]<<24|a[u]>>>8)&4278255360;a[p>>>5]|=128<<p%32,a[(p+64>>>9<<4)+14]=p;for(var d=r._ff,g=r._gg,B=r._hh,y=r._ii,u=0;u<a.length;u+=16){var v=s,x=n,m=i,w=e;s=d(s,n,i,e,a[u+0],7,-680876936),e=d(e,s,n,i,a[u+1],12,-389564586),i=d(i,e,s,n,a[u+2],17,606105819),n=d(n,i,e,s,a[u+3],22,-1044525330),s=d(s,n,i,e,a[u+4],7,-176418897),e=d(e,s,n,i,a[u+5],12,1200080426),i=d(i,e,s,n,a[u+6],17,-1473231341),n=d(n,i,e,s,a[u+7],22,-45705983),s=d(s,n,i,e,a[u+8],7,1770035416),e=d(e,s,n,i,a[u+9],12,-1958414417),i=d(i,e,s,n,a[u+10],17,-42063),n=d(n,i,e,s,a[u+11],22,-1990404162),s=d(s,n,i,e,a[u+12],7,1804603682),e=d(e,s,n,i,a[u+13],12,-40341101),i=d(i,e,s,n,a[u+14],17,-1502002290),n=d(n,i,e,s,a[u+15],22,1236535329),s=g(s,n,i,e,a[u+1],5,-165796510),e=g(e,s,n,i,a[u+6],9,-1069501632),i=g(i,e,s,n,a[u+11],14,643717713),n=g(n,i,e,s,a[u+0],20,-373897302),s=g(s,n,i,e,a[u+5],5,-701558691),e=g(e,s,n,i,a[u+10],9,38016083),i=g(i,e,s,n,a[u+15],14,-660478335),n=g(n,i,e,s,a[u+4],20,-405537848),s=g(s,n,i,e,a[u+9],5,568446438),e=g(e,s,n,i,a[u+14],9,-1019803690),i=g(i,e,s,n,a[u+3],14,-187363961),n=g(n,i,e,s,a[u+8],20,1163531501),s=g(s,n,i,e,a[u+13],5,-1444681467),e=g(e,s,n,i,a[u+2],9,-51403784),i=g(i,e,s,n,a[u+7],14,1735328473),n=g(n,i,e,s,a[u+12],20,-1926607734),s=B(s,n,i,e,a[u+5],4,-378558),e=B(e,s,n,i,a[u+8],11,-2022574463),i=B(i,e,s,n,a[u+11],16,1839030562),n=B(n,i,e,s,a[u+14],23,-35309556),s=B(s,n,i,e,a[u+1],4,-1530992060),e=B(e,s,n,i,a[u+4],11,1272893353),i=B(i,e,s,n,a[u+7],16,-155497632),n=B(n,i,e,s,a[u+10],23,-1094730640),s=B(s,n,i,e,a[u+13],4,681279174),e=B(e,s,n,i,a[u+0],11,-358537222),i=B(i,e,s,n,a[u+3],16,-722521979),n=B(n,i,e,s,a[u+6],23,76029189),s=B(s,n,i,e,a[u+9],4,-640364487),e=B(e,s,n,i,a[u+12],11,-421815835),i=B(i,e,s,n,a[u+15],16,530742520),n=B(n,i,e,s,a[u+2],23,-995338651),s=y(s,n,i,e,a[u+0],6,-198630844),e=y(e,s,n,i,a[u+7],10,1126891415),i=y(i,e,s,n,a[u+14],15,-1416354905),n=y(n,i,e,s,a[u+5],21,-57434055),s=y(s,n,i,e,a[u+12],6,1700485571),e=y(e,s,n,i,a[u+3],10,-1894986606),i=y(i,e,s,n,a[u+10],15,-1051523),n=y(n,i,e,s,a[u+1],21,-2054922799),s=y(s,n,i,e,a[u+8],6,1873313359),e=y(e,s,n,i,a[u+15],10,-30611744),i=y(i,e,s,n,a[u+6],15,-1560198380),n=y(n,i,e,s,a[u+13],21,1309151649),s=y(s,n,i,e,a[u+4],6,-145523070),e=y(e,s,n,i,a[u+11],10,-1120210379),i=y(i,e,s,n,a[u+2],15,718787259),n=y(n,i,e,s,a[u+9],21,-343485551),s=s+v>>>0,n=n+x>>>0,i=i+m>>>0,e=e+w>>>0}return c.endian([s,n,i,e])};r._ff=function(f,h,a,p,s,n,i){var e=f+(h&a|~h&p)+(s>>>0)+i;return(e<<n|e>>>32-n)+h},r._gg=function(f,h,a,p,s,n,i){var e=f+(h&p|a&~p)+(s>>>0)+i;return(e<<n|e>>>32-n)+h},r._hh=function(f,h,a,p,s,n,i){var e=f+(h^a^p)+(s>>>0)+i;return(e<<n|e>>>32-n)+h},r._ii=function(f,h,a,p,s,n,i){var e=f+(a^(h|~p))+(s>>>0)+i;return(e<<n|e>>>32-n)+h},r._blocksize=16,r._digestsize=16,U.exports=function(f,h){if(f==null)throw new Error("Illegal argument "+f);var a=c.wordsToBytes(r(f,h));return h&&h.asBytes?a:h&&h.asString?t.bytesToString(a):c.bytesToHex(a)}})();var Y=U.exports;const rt=I(Y);export{j as h,tt as i,rt as m};