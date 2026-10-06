import{r as e,t}from"./react.yIOJJ3r4.js";var n=new Set([`__typename`,`_sys`,`_internalSys`,`_values`,`_internalValues`,`_content_source`,`_tina_metadata`]),r=(e,t,a=[])=>{if(t===null||i(t))return t;if(t instanceof String)return t.valueOf();if(Array.isArray(t))return t.map((t,n)=>r(e,t,[...a,n]));let o={};for(let[i,s]of Object.entries(t))o[i]=n.has(i)?s:r(e,s,[...a,i]);return o&&typeof o==`object`&&`type`in o&&o.type===`root`?o:{...o,_content_source:{queryId:e,path:a}}};function i(e){let t=typeof e;return t===`string`||t===`number`||t===`boolean`||t===`undefined`||e==null||e instanceof String||e instanceof Number||e instanceof Boolean}var a=e=>{let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t=(t<<5)-t+r&4294967295}return Math.abs(t).toString(36)},o=`
  [data-tina-field] {
    outline: 2px dashed rgba(34,150,254,0.5);
    transition: box-shadow ease-out 150ms;
  }
  [data-tina-field]:hover {
    outline: 2px solid rgba(34,150,254,1);
    cursor: pointer;
  }
  [data-tina-field-overlay] {
    outline: 2px dashed rgba(34,150,254,0.5);
    position: relative;
  }
  [data-tina-field-overlay]:hover {
    outline: 2px solid rgba(34,150,254,1);
    cursor: pointer;
  }
  [data-tina-field-overlay]::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 20;
    transition: opacity ease-out 150ms;
    background-color: rgba(34,150,254,0.3);
    opacity: 0;
  }
  /*
   * Only the blue fill/wash is gated to hover-capable pointers. On touch
   * screens (hover: none) :hover latches after a tap and never clears; a
   * stuck solid outline is acceptable tap feedback, but the full-bleed wash
   * flooding the tapped element is not. The solid outline above still applies
   * on touch; only the box-shadow wash and the overlay reveal are held back.
   */
  @media (hover: hover) {
    [data-tina-field]:hover {
      box-shadow: inset 100vi 100vh rgba(34,150,254,0.3);
    }
    [data-tina-field-overlay]:hover::after {
      opacity: 1;
    }
  }
`,s=e(t(),1),c=(e,t,n)=>{let r=e?._content_source;if(!r)return``;let{queryId:i,path:a}=r;return t?`${i}---${(typeof n==`number`?[...a,t,n]:[...a,t]).join(`.`)}`:`${i}---${a.join(`.`)}`},l=s.createContext(null);function u(){let e=s.useContext(l);return s.useMemo(()=>e==null?typeof window<`u`?[window.location.origin]:[]:Array.isArray(e)?[...e]:[e],[e])}function d(e,t){return typeof window>`u`||!t.includes(e.origin)?!1:e.source===window.parent}function f(e){let t=JSON.stringify({query:e.query,variables:e.variables}),n=s.useMemo(()=>a(t),[t]),i=s.useMemo(()=>{if(e.data){let t=JSON.parse(JSON.stringify(e.data));return r(n,t,[])}},[e.data,n]),c=u(),[l,f]=s.useState(i),[p,m]=s.useState(!1),[h,g]=s.useState(!1),[_,v]=s.useState(!1);return s.useEffect(()=>{m(!0),f(i),parent.postMessage({type:`url-changed`})},[n,i]),s.useEffect(()=>{if(h){let e=function(e){let t=e.target.getAttributeNames().find(e=>e.startsWith(`data-tina-field`)),n;if(t)e.preventDefault(),e.stopPropagation(),n=e.target.getAttribute(t);else{let t=e.target.closest(`[data-tina-field], [data-tina-field-overlay]`);if(t){let r=t.getAttributeNames().find(e=>e.startsWith(`data-tina-field`));r&&(e.preventDefault(),e.stopPropagation(),n=t.getAttribute(r))}}n&&_&&parent.postMessage({type:`field:selected`,fieldName:n},window.location.origin)},t=document.createElement(`style`);return t.type=`text/css`,t.textContent=o,document.head.appendChild(t),document.body.classList.add(`__tina-quick-editing-enabled`),document.addEventListener(`click`,e,!0),()=>{document.removeEventListener(`click`,e,!0),document.body.classList.remove(`__tina-quick-editing-enabled`),t.remove()}}},[h,_]),s.useEffect(()=>{e?.experimental___selectFormByFormId&&parent.postMessage({type:`user-select-form`,formId:e.experimental___selectFormByFormId()})},[n]),s.useEffect(()=>{let{experimental___selectFormByFormId:t,...i}=e;parent.postMessage({type:`open`,...i,id:n},window.location.origin);let a=e=>{if(d(e,c)&&(e.data.type===`quickEditEnabled`&&g(e.data.value),e.data.id===n&&e.data.type===`updateData`)){let t=e.data.data,i=r(n,JSON.parse(JSON.stringify(t)),[]);f(i),v(!0),document.querySelector(`[data-tina-field]`)?parent.postMessage({type:`quick-edit`,value:!0},window.location.origin):parent.postMessage({type:`quick-edit`,value:!1},window.location.origin)}};return window.addEventListener(`message`,a),()=>{window.removeEventListener(`message`,a),parent.postMessage({type:`close`,id:n},window.location.origin)}},[n,g,c]),{data:l,isClient:p}}export{c as n,f as t};