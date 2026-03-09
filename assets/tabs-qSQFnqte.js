import{r as c,j as m,n as He,o as n,p as d,F as Cn}from"./react-vendor-BFVi4CcX.js";import{g as ge,a as Te,u as Se,d as Ue,e as xe,s as H,j as Xe,m as ye,c as ie,x as wn,y as Ke,z as Ye,A as qe,D as se,w as In,E as fe,b as Y,F as Bn,B as R,T as Pn}from"./index-gR3xyJ2r.js";import{F as Ge}from"./Favorite-DCwHn96Z.js";import{c as L}from"./prism-BJUJpkdA.js";import"./router-DlKSSB9a.js";function Mn(t){return ge("MuiTab",t)}const y=Te("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper","icon"]),En=t=>{const{classes:e,textColor:o,fullWidth:a,wrapped:s,icon:h,label:v,selected:g,disabled:p}=t,S={root:["root",h&&v&&"labelIcon",`textColor${Ue(o)}`,a&&"fullWidth",s&&"wrapped",g&&"selected",p&&"disabled"],icon:["iconWrapper","icon"]};return xe(S,Mn,e)},Rn=H(Xe,{name:"MuiTab",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.label&&o.icon&&e.labelIcon,e[`textColor${Ue(o.textColor)}`],o.fullWidth&&e.fullWidth,o.wrapped&&e.wrapped,{[`& .${y.iconWrapper}`]:e.iconWrapper},{[`& .${y.icon}`]:e.icon}]}})(ye(({theme:t})=>({...t.typography.button,maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center",lineHeight:1.25,variants:[{props:({ownerState:e})=>e.label&&(e.iconPosition==="top"||e.iconPosition==="bottom"),style:{flexDirection:"column"}},{props:({ownerState:e})=>e.label&&e.iconPosition!=="top"&&e.iconPosition!=="bottom",style:{flexDirection:"row"}},{props:({ownerState:e})=>e.icon&&e.label,style:{minHeight:72,paddingTop:9,paddingBottom:9}},{props:({ownerState:e,iconPosition:o})=>e.icon&&e.label&&o==="top",style:{[`& > .${y.icon}`]:{marginBottom:6}}},{props:({ownerState:e,iconPosition:o})=>e.icon&&e.label&&o==="bottom",style:{[`& > .${y.icon}`]:{marginTop:6}}},{props:({ownerState:e,iconPosition:o})=>e.icon&&e.label&&o==="start",style:{[`& > .${y.icon}`]:{marginRight:t.spacing(1)}}},{props:({ownerState:e,iconPosition:o})=>e.icon&&e.label&&o==="end",style:{[`& > .${y.icon}`]:{marginLeft:t.spacing(1)}}},{props:{textColor:"inherit"},style:{color:"inherit",opacity:.6,[`&.${y.selected}`]:{opacity:1},[`&.${y.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}}},{props:{textColor:"primary"},style:{color:(t.vars||t).palette.text.secondary,[`&.${y.selected}`]:{color:(t.vars||t).palette.primary.main},[`&.${y.disabled}`]:{color:(t.vars||t).palette.text.disabled}}},{props:{textColor:"secondary"},style:{color:(t.vars||t).palette.text.secondary,[`&.${y.selected}`]:{color:(t.vars||t).palette.secondary.main},[`&.${y.disabled}`]:{color:(t.vars||t).palette.text.disabled}}},{props:({ownerState:e})=>e.fullWidth,style:{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"}},{props:({ownerState:e})=>e.wrapped,style:{fontSize:t.typography.pxToRem(12)}}]}))),u=c.forwardRef(function(e,o){const a=Se({props:e,name:"MuiTab"}),{className:s,disabled:h=!1,disableFocusRipple:v=!1,fullWidth:g,icon:p,iconPosition:S="top",indicator:I,label:x,onChange:T,onClick:B,onFocus:k,selected:P,selectionFollowsFocus:C,textColor:ee="inherit",value:z,wrapped:ce=!1,...j}=a,U={...a,disabled:h,disableFocusRipple:v,selected:P,icon:!!p,iconPosition:S,label:!!x,fullWidth:g,textColor:ee,wrapped:ce},q=En(U),G=p&&x&&c.isValidElement(p)?c.cloneElement(p,{className:L(q.icon,p.props.className)}):p,ne=N=>{!P&&T&&T(N,z),B&&B(N)},X=N=>{C&&!P&&T&&T(N,z),k&&k(N)};return m.jsxs(Rn,{focusRipple:!v,className:L(q.root,s),ref:o,role:"tab","aria-selected":P,disabled:h,onClick:ne,onFocus:X,ownerState:U,tabIndex:P?0:-1,...j,children:[S==="top"||S==="start"?m.jsxs(c.Fragment,{children:[G,x]}):m.jsxs(c.Fragment,{children:[x,G]}),I]})}),zn=ie(m.jsx("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"})),jn=ie(m.jsx("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}));function Nn(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2}function An(t,e,o,a={},s=()=>{}){const{ease:h=Nn,duration:v=300}=a;let g=null;const p=e[t];let S=!1;const I=()=>{S=!0},x=T=>{if(S){s(new Error("Animation cancelled"));return}g===null&&(g=T);const B=Math.min(1,(T-g)/v);if(e[t]=h(B)*(o-p)+p,B>=1){requestAnimationFrame(()=>{s(null)});return}requestAnimationFrame(x)};return p===o?(s(new Error("Element already at target position")),I):(requestAnimationFrame(x),I)}const Wn={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function Fn(t){const{onChange:e,...o}=t,a=c.useRef(),s=c.useRef(null),h=()=>{a.current=s.current.offsetHeight-s.current.clientHeight};return wn(()=>{const v=Ke(()=>{const p=a.current;h(),p!==a.current&&e(a.current)}),g=Ye(s.current);return g.addEventListener("resize",v),()=>{v.clear(),g.removeEventListener("resize",v)}},[e]),c.useEffect(()=>{h(),e(a.current)},[e]),m.jsx("div",{style:Wn,...o,ref:s})}function On(t){return ge("MuiTabScrollButton",t)}const Ln=Te("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),kn=t=>{const{classes:e,orientation:o,disabled:a}=t;return xe({root:["root",o,a&&"disabled"]},On,e)},Dn=H(Xe,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.orientation&&e[o.orientation]]}})({width:40,flexShrink:0,opacity:.8,[`&.${Ln.disabled}`]:{opacity:0},variants:[{props:{orientation:"vertical"},style:{width:"100%",height:40,"& svg":{transform:"var(--TabScrollButton-svgRotate)"}}}]}),Vn=c.forwardRef(function(e,o){const a=Se({props:e,name:"MuiTabScrollButton"}),{className:s,slots:h={},slotProps:v={},direction:g,orientation:p,disabled:S,...I}=a,x=qe(),T={isRtl:x,...a},B=kn(T),k=h.StartScrollButtonIcon??zn,P=h.EndScrollButtonIcon??jn,C=se({elementType:k,externalSlotProps:v.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:T}),ee=se({elementType:P,externalSlotProps:v.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:T});return m.jsx(Dn,{component:"div",className:L(B.root,s),ref:o,role:null,ownerState:T,tabIndex:null,...I,style:{...I.style,...p==="vertical"&&{"--TabScrollButton-svgRotate":`rotate(${x?-90:90}deg)`}},children:g==="left"?m.jsx(k,{...C}):m.jsx(P,{...ee})})});function $n(t){return ge("MuiTabs",t)}const me=Te("MuiTabs",["root","vertical","list","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),ke=(t,e)=>t===e?t.firstChild:e&&e.nextElementSibling?e.nextElementSibling:t.firstChild,De=(t,e)=>t===e?t.lastChild:e&&e.previousElementSibling?e.previousElementSibling:t.lastChild,ae=(t,e,o)=>{let a=!1,s=o(t,e);for(;s;){if(s===t.firstChild){if(a)return;a=!0}const h=s.disabled||s.getAttribute("aria-disabled")==="true";if(!s.hasAttribute("tabindex")||h)s=o(t,s);else{s.focus();return}}},Hn=t=>{const{vertical:e,fixed:o,hideScrollbar:a,scrollableX:s,scrollableY:h,centered:v,scrollButtonsHideMobile:g,classes:p}=t;return xe({root:["root",e&&"vertical"],scroller:["scroller",o&&"fixed",a&&"hideScrollbar",s&&"scrollableX",h&&"scrollableY"],list:["list","flexContainer",e&&"flexContainerVertical",e&&"vertical",v&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",g&&"scrollButtonsHideMobile"],scrollableX:[s&&"scrollableX"],hideScrollbar:[a&&"hideScrollbar"]},$n,p)},Un=H("div",{name:"MuiTabs",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[{[`& .${me.scrollButtons}`]:e.scrollButtons},{[`& .${me.scrollButtons}`]:o.scrollButtonsHideMobile&&e.scrollButtonsHideMobile},e.root,o.vertical&&e.vertical]}})(ye(({theme:t})=>({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex",variants:[{props:({ownerState:e})=>e.vertical,style:{flexDirection:"column"}},{props:({ownerState:e})=>e.scrollButtonsHideMobile,style:{[`& .${me.scrollButtons}`]:{[t.breakpoints.down("sm")]:{display:"none"}}}}]}))),Xn=H("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.scroller,o.fixed&&e.fixed,o.hideScrollbar&&e.hideScrollbar,o.scrollableX&&e.scrollableX,o.scrollableY&&e.scrollableY]}})({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap",variants:[{props:({ownerState:t})=>t.fixed,style:{overflowX:"hidden",width:"100%"}},{props:({ownerState:t})=>t.hideScrollbar,style:{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}},{props:({ownerState:t})=>t.scrollableX,style:{overflowX:"auto",overflowY:"hidden"}},{props:({ownerState:t})=>t.scrollableY,style:{overflowY:"auto",overflowX:"hidden"}}]}),Kn=H("div",{name:"MuiTabs",slot:"List",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.list,e.flexContainer,o.vertical&&e.flexContainerVertical,o.centered&&e.centered]}})({display:"flex",variants:[{props:({ownerState:t})=>t.vertical,style:{flexDirection:"column"}},{props:({ownerState:t})=>t.centered,style:{justifyContent:"center"}}]}),Yn=H("span",{name:"MuiTabs",slot:"Indicator"})(ye(({theme:t})=>({position:"absolute",height:2,bottom:0,width:"100%",transition:t.transitions.create(),variants:[{props:{indicatorColor:"primary"},style:{backgroundColor:(t.vars||t).palette.primary.main}},{props:{indicatorColor:"secondary"},style:{backgroundColor:(t.vars||t).palette.secondary.main}},{props:({ownerState:e})=>e.vertical,style:{height:"100%",width:2,right:0}}]}))),qn=H(Fn)({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),Ve={},F=c.forwardRef(function(e,o){const a=Se({props:e,name:"MuiTabs"}),s=In(),h=qe(),{"aria-label":v,"aria-labelledby":g,action:p,centered:S=!1,children:I,className:x,component:T="div",allowScrollButtonsMobile:B=!1,indicatorColor:k="primary",onChange:P,orientation:C="horizontal",ScrollButtonComponent:ee,scrollButtons:z="auto",selectionFollowsFocus:ce,slots:j={},slotProps:U={},TabIndicatorProps:q={},TabScrollButtonProps:G={},textColor:ne="primary",value:X,variant:N="standard",visibleScrollbar:de=!1,...Qe}=a,M=N==="scrollable",w=C==="vertical",_=w?"scrollTop":"scrollLeft",te=w?"top":"left",le=w?"bottom":"right",be=w?"clientHeight":"clientWidth",J=w?"height":"width",A={...a,component:T,allowScrollButtonsMobile:B,indicatorColor:k,orientation:C,vertical:w,scrollButtons:z,textColor:ne,variant:N,visibleScrollbar:de,fixed:!M,hideScrollbar:M&&!de,scrollableX:M&&!w,scrollableY:M&&w,centered:S&&!M,scrollButtonsHideMobile:!B},O=Hn(A),Ze=se({elementType:j.StartScrollButtonIcon,externalSlotProps:U.startScrollButtonIcon,ownerState:A}),en=se({elementType:j.EndScrollButtonIcon,externalSlotProps:U.endScrollButtonIcon,ownerState:A}),[Ce,nn]=c.useState(!1),[D,we]=c.useState(Ve),[Ie,tn]=c.useState(!1),[Be,ln]=c.useState(!1),[Pe,on]=c.useState(!1),[Me,rn]=c.useState({overflow:"hidden",scrollbarWidth:0}),Ee=new Map,W=c.useRef(null),V=c.useRef(null),K={slots:j,slotProps:{indicator:q,scrollButton:G,...U}},Re=()=>{const l=W.current;let r;if(l){const i=l.getBoundingClientRect();r={clientWidth:l.clientWidth,scrollLeft:l.scrollLeft,scrollTop:l.scrollTop,scrollWidth:l.scrollWidth,top:i.top,bottom:i.bottom,left:i.left,right:i.right}}let b;if(l&&X!==!1){const i=V.current.children;if(i.length>0){const f=i[Ee.get(X)];b=f?f.getBoundingClientRect():null}}return{tabsMeta:r,tabMeta:b}},Q=fe(()=>{const{tabsMeta:l,tabMeta:r}=Re();let b=0,i;w?(i="top",r&&l&&(b=r.top-l.top+l.scrollTop)):(i=h?"right":"left",r&&l&&(b=(h?-1:1)*(r[i]-l[i]+l.scrollLeft)));const f={[i]:b,[J]:r?r[J]:0};if(typeof D[i]!="number"||typeof D[J]!="number")we(f);else{const E=Math.abs(D[i]-f[i]),$=Math.abs(D[J]-f[J]);(E>=1||$>=1)&&we(f)}}),ue=(l,{animation:r=!0}={})=>{r?An(_,W.current,l,{duration:s.transitions.duration.standard}):W.current[_]=l},ze=l=>{let r=W.current[_];w?r+=l:r+=l*(h?-1:1),ue(r)},je=()=>{const l=W.current[be];let r=0;const b=Array.from(V.current.children);for(let i=0;i<b.length;i+=1){const f=b[i];if(r+f[be]>l){i===0&&(r=l);break}r+=f[be]}return r},an=()=>{ze(-1*je())},sn=()=>{ze(je())},[cn,{onChange:Ne,...dn}]=Y("scrollbar",{className:L(O.scrollableX,O.hideScrollbar),elementType:qn,shouldForwardComponentProp:!0,externalForwardedProps:K,ownerState:A}),bn=c.useCallback(l=>{Ne?.(l),rn({overflow:null,scrollbarWidth:l})},[Ne]),[Ae,We]=Y("scrollButtons",{className:L(O.scrollButtons,G.className),elementType:Vn,externalForwardedProps:K,ownerState:A,additionalProps:{orientation:C,slots:{StartScrollButtonIcon:j.startScrollButtonIcon||j.StartScrollButtonIcon,EndScrollButtonIcon:j.endScrollButtonIcon||j.EndScrollButtonIcon},slotProps:{startScrollButtonIcon:Ze,endScrollButtonIcon:en}}}),un=()=>{const l={};l.scrollbarSizeListener=M?m.jsx(cn,{...dn,onChange:bn}):null;const b=M&&(z==="auto"&&(Ie||Be)||z===!0);return l.scrollButtonStart=b?m.jsx(Ae,{direction:h?"right":"left",onClick:an,disabled:!Ie,...We}):null,l.scrollButtonEnd=b?m.jsx(Ae,{direction:h?"left":"right",onClick:sn,disabled:!Be,...We}):null,l},Fe=fe(l=>{const{tabsMeta:r,tabMeta:b}=Re();if(!(!b||!r)){if(b[te]<r[te]){const i=r[_]+(b[te]-r[te]);ue(i,{animation:l})}else if(b[le]>r[le]){const i=r[_]+(b[le]-r[le]);ue(i,{animation:l})}}}),oe=fe(()=>{M&&z!==!1&&on(!Pe)});c.useEffect(()=>{const l=Ke(()=>{W.current&&Q()});let r;const b=E=>{E.forEach($=>{$.removedNodes.forEach(Z=>{r?.unobserve(Z)}),$.addedNodes.forEach(Z=>{r?.observe(Z)})}),l(),oe()},i=Ye(W.current);i.addEventListener("resize",l);let f;return typeof ResizeObserver<"u"&&(r=new ResizeObserver(l),Array.from(V.current.children).forEach(E=>{r.observe(E)})),typeof MutationObserver<"u"&&(f=new MutationObserver(b),f.observe(V.current,{childList:!0})),()=>{l.clear(),i.removeEventListener("resize",l),f?.disconnect(),r?.disconnect()}},[Q,oe]),c.useEffect(()=>{const l=Array.from(V.current.children),r=l.length;if(typeof IntersectionObserver<"u"&&r>0&&M&&z!==!1){const b=l[0],i=l[r-1],f={root:W.current,threshold:.99},E=pe=>{tn(!pe[0].isIntersecting)},$=new IntersectionObserver(E,f);$.observe(b);const Z=pe=>{ln(!pe[0].isIntersecting)},Le=new IntersectionObserver(Z,f);return Le.observe(i),()=>{$.disconnect(),Le.disconnect()}}},[M,z,Pe,I?.length]),c.useEffect(()=>{nn(!0)},[]),c.useEffect(()=>{Q()}),c.useEffect(()=>{Fe(Ve!==D)},[Fe,D]),c.useImperativeHandle(p,()=>({updateIndicator:Q,updateScrollButtons:oe}),[Q,oe]);const[hn,pn]=Y("indicator",{className:L(O.indicator,q.className),elementType:Yn,externalForwardedProps:K,ownerState:A,additionalProps:{style:D}}),Oe=m.jsx(hn,{...pn});let re=0;const fn=c.Children.map(I,l=>{if(!c.isValidElement(l))return null;const r=l.props.value===void 0?re:l.props.value;Ee.set(r,re);const b=r===X;return re+=1,c.cloneElement(l,{fullWidth:N==="fullWidth",indicator:b&&!Ce&&Oe,selected:b,selectionFollowsFocus:ce,onChange:P,textColor:ne,value:r,...re===1&&X===!1&&!l.props.tabIndex?{tabIndex:0}:{}})}),mn=l=>{if(l.altKey||l.shiftKey||l.ctrlKey||l.metaKey)return;const r=V.current,b=Bn(r).activeElement;if(b.getAttribute("role")!=="tab")return;let f=C==="horizontal"?"ArrowLeft":"ArrowUp",E=C==="horizontal"?"ArrowRight":"ArrowDown";switch(C==="horizontal"&&h&&(f="ArrowRight",E="ArrowLeft"),l.key){case f:l.preventDefault(),ae(r,b,De);break;case E:l.preventDefault(),ae(r,b,ke);break;case"Home":l.preventDefault(),ae(r,null,ke);break;case"End":l.preventDefault(),ae(r,null,De);break}},he=un(),[vn,gn]=Y("root",{ref:o,className:L(O.root,x),elementType:Un,externalForwardedProps:{...K,...Qe,component:T},ownerState:A}),[Tn,Sn]=Y("scroller",{ref:W,className:O.scroller,elementType:Xn,externalForwardedProps:K,ownerState:A,additionalProps:{style:{overflow:Me.overflow,[w?`margin${h?"Left":"Right"}`:"marginBottom"]:de?void 0:-Me.scrollbarWidth}}}),[xn,yn]=Y("list",{ref:V,className:L(O.list,O.flexContainer),elementType:Kn,externalForwardedProps:K,ownerState:A,getSlotProps:l=>({...l,onKeyDown:r=>{mn(r),l.onKeyDown?.(r)}})});return m.jsxs(vn,{...gn,children:[he.scrollButtonStart,he.scrollbarSizeListener,m.jsxs(Tn,{...Sn,children:[m.jsx(xn,{"aria-label":v,"aria-labelledby":g,"aria-orientation":C==="vertical"?"vertical":null,role:"tablist",...yn,children:fn}),Ce&&Oe]}),he.scrollButtonEnd]})}),_e=ie(m.jsx("path",{d:"M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9m0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0 14.3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22"})),Je=ie(m.jsx("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"})),ve=({children:t,value:e,index:o,...a})=>n("div",{role:"tabpanel",hidden:e!==o,id:`simple-tabpanel-${o}`,"aria-labelledby":`simple-tab-${o}`,...a,children:e===o&&n(R,{sx:{p:3},children:n(Pn,{children:t})})}),Gn=()=>{const[t,e]=c.useState(0);return d(R,{sx:{width:"100%"},children:[n(R,{sx:{borderBottom:1,borderColor:"divider"},children:d(F,{value:t,onChange:(a,s)=>{e(s)},children:[n(u,{label:"Item One"}),n(u,{label:"Item Two"}),n(u,{label:"Item Three"})]})}),n(ve,{value:t,index:0,children:"Content for Item One"}),n(ve,{value:t,index:1,children:"Content for Item Two"}),n(ve,{value:t,index:2,children:"Content for Item Three"})]})},_n=()=>{const[t,e]=c.useState(0);return n(R,{sx:{width:"100%"},children:d(F,{value:t,onChange:(o,a)=>e(a),children:[n(u,{icon:n(Je,{}),label:"Recents"}),n(u,{icon:n(Ge,{}),label:"Favorites"}),n(u,{icon:n(_e,{}),label:"Nearby"})]})})},Jn=()=>{const[t,e]=c.useState(0);return n(R,{sx:{width:"100%"},children:d(F,{value:t,onChange:(o,a)=>e(a),children:[n(u,{icon:n(Je,{})}),n(u,{icon:n(Ge,{})}),n(u,{icon:n(_e,{})})]})})};function $e(t){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...He(),...t.components};return d(Cn,{children:[n(e.h1,{children:"Tabs"}),`
`,d(e.p,{children:["The ",n(e.code,{children:"Tabs"})," component provides a way to organize content into multiple panels that can be switched between. Material UI's Tabs component provides a consistent, accessible, and customizable navigation pattern."]}),`
`,n(e.p,{children:"Tabs are used to organize related content into separate views, allowing users to switch between different sections without navigating to different pages."}),`
`,n(e.h2,{children:"Basic Tabs"}),`
`,n(e.p,{children:"A simple tab navigation with text labels:"}),`
`,n(Gn,{}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<Box sx={{ width: "100%" }}>
  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    <Tabs value={value} onChange={handleChange}>
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
    </Tabs>
  </Box>
  <TabPanel value={value} index={0}>
    Content for Item One
  </TabPanel>
  <TabPanel value={value} index={1}>
    Content for Item Two
  </TabPanel>
  <TabPanel value={value} index={2}>
    Content for Item Three
  </TabPanel>
</Box>
`})}),`
`,n(e.h2,{children:"Tab Variants"}),`
`,n(e.p,{children:"Tabs support different visual variants:"}),`
`,n(e.h3,{children:"Standard (Default)"}),`
`,n(R,{sx:{borderBottom:1,borderColor:"divider",mb:3},children:d(F,{value:0,children:[n(u,{label:"Standard"}),n(u,{label:"Tabs"})]})}),`
`,n(e.h3,{children:"Scrollable Tabs"}),`
`,n(e.p,{children:"When tabs don't fit in the available width, they become scrollable:"}),`
`,n(R,{sx:{borderBottom:1,borderColor:"divider",mb:3,maxWidth:400},children:d(F,{value:0,variant:"scrollable",scrollButtons:"auto",children:[n(u,{label:"Item One"}),n(u,{label:"Item Two"}),n(u,{label:"Item Three"}),n(u,{label:"Item Four"}),n(u,{label:"Item Five"}),n(u,{label:"Item Six"}),n(u,{label:"Item Seven"})]})}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs
  value={value}
  variant="scrollable"
  scrollButtons="auto"
  onChange={handleChange}
>
  <Tab label="Item One" />
  <Tab label="Item Two" />
  {/* More tabs */}
</Tabs>
`})}),`
`,n(e.h3,{children:"Full Width Tabs"}),`
`,n(e.p,{children:"Tabs that span the full width of their container:"}),`
`,n(R,{sx:{borderBottom:1,borderColor:"divider",mb:3},children:d(F,{value:0,variant:"fullWidth",children:[n(u,{label:"Full Width"}),n(u,{label:"Tab Two"}),n(u,{label:"Tab Three"})]})}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs value={value} variant="fullWidth" onChange={handleChange}>
  <Tab label="Item One" />
  <Tab label="Item Two" />
  <Tab label="Item Three" />
</Tabs>
`})}),`
`,n(e.h2,{children:"Icons"}),`
`,n(e.h3,{children:"Icon with Label"}),`
`,n(e.p,{children:"Tabs can include icons along with labels:"}),`
`,n(_n,{}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs value={value} onChange={handleChange}>
  <Tab icon={<PhoneIcon />} label="Recents" />
  <Tab icon={<FavoriteIcon />} label="Favorites" />
  <Tab icon={<PersonPinIcon />} label="Nearby" />
</Tabs>
`})}),`
`,n(e.h3,{children:"Icon Only"}),`
`,n(e.p,{children:"Tabs can display only icons:"}),`
`,n(Jn,{}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs value={value} onChange={handleChange}>
  <Tab icon={<PhoneIcon />} />
  <Tab icon={<FavoriteIcon />} />
  <Tab icon={<PersonPinIcon />} />
</Tabs>
`})}),`
`,n(e.h2,{children:"Vertical Tabs"}),`
`,n(e.p,{children:"Tabs can be displayed vertically:"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 224 }}>
  <Tabs
    orientation="vertical"
    value={value}
    onChange={handleChange}
    sx={{ borderRight: 1, borderColor: "divider" }}
  >
    <Tab label="Item One" />
    <Tab label="Item Two" />
    <Tab label="Item Three" />
  </Tabs>
  <TabPanel value={value} index={0}>
    Content for Item One
  </TabPanel>
  <TabPanel value={value} index={1}>
    Content for Item Two
  </TabPanel>
  <TabPanel value={value} index={2}>
    Content for Item Three
  </TabPanel>
</Box>
`})}),`
`,n(e.h2,{children:"Disabled Tabs"}),`
`,n(e.p,{children:"Individual tabs can be disabled:"}),`
`,n(R,{sx:{borderBottom:1,borderColor:"divider",mb:3},children:d(F,{value:0,children:[n(u,{label:"Active"}),n(u,{label:"Disabled",disabled:!0}),n(u,{label:"Active"})]})}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs value={value} onChange={handleChange}>
  <Tab label="Active" />
  <Tab label="Disabled" disabled />
  <Tab label="Active" />
</Tabs>
`})}),`
`,n(e.h2,{children:"Colored Tabs"}),`
`,n(e.p,{children:"Tabs support different color schemes:"}),`
`,d(R,{sx:{display:"flex",flexDirection:"column",gap:2,mb:3},children:[d(F,{value:0,textColor:"primary",indicatorColor:"primary",children:[n(u,{label:"Primary"}),n(u,{label:"Tabs"})]}),d(F,{value:0,textColor:"secondary",indicatorColor:"secondary",children:[n(u,{label:"Secondary"}),n(u,{label:"Tabs"})]})]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs
  value={value}
  textColor="primary"
  indicatorColor="primary"
  onChange={handleChange}
>
  <Tab label="Item One" />
  <Tab label="Item Two" />
</Tabs>
`})}),`
`,n(e.h2,{children:"Common Props"}),`
`,n(e.p,{children:"The Tabs component accepts various props to customize its appearance and behavior:"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Tabs
  value={0} // number - index of selected tab
  onChange={handleChange} // function - called when tab changes
  variant="standard" // 'standard' | 'scrollable' | 'fullWidth'
  orientation="horizontal" // 'horizontal' | 'vertical'
  textColor="inherit" // 'inherit' | 'primary' | 'secondary'
  indicatorColor="primary" // 'primary' | 'secondary'
  scrollButtons="auto" // false | true | 'auto'
  centered={false} // boolean - center tabs
  sx={{}} // object - custom styles
>
  <Tab
    label="Label" // string | ReactNode
    icon={<Icon />} // ReactNode
    disabled={false} // boolean
    value={0} // number - tab index (if different from position)
  />
</Tabs>
`})}),`
`,n(e.h2,{children:"Accessibility"}),`
`,n(e.p,{children:"Material UI Tabs are built with accessibility in mind:"}),`
`,d(e.ul,{children:[`
`,d(e.li,{children:[n(e.strong,{children:"ARIA attributes"}),": Proper ARIA roles and attributes for screen readers"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Keyboard navigation"}),": Arrow keys can be used to navigate between tabs"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Focus management"}),": Proper focus handling when switching tabs"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Screen reader support"}),": Tab labels and content are properly announced"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Tab panels"}),': Use proper role="tabpanel" for tab content']}),`
`,d(e.li,{children:[n(e.strong,{children:"Active indicator"}),": Clear visual indication of the active tab"]}),`
`]}),`
`,n(e.h2,{children:"Best Practices"}),`
`,d(e.ol,{children:[`
`,d(e.li,{children:[n(e.strong,{children:"Keep tab labels concise"})," - Short, clear labels work best"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Limit the number of tabs"})," - Too many tabs can be overwhelming"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Use scrollable tabs for many items"})," - Enable scrolling when you have many tabs"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Provide clear content"})," - Each tab panel should have distinct, relevant content"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Consider mobile experience"})," - Scrollable tabs work well on mobile devices"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Use icons appropriately"})," - Icons can enhance understanding but shouldn't replace clear labels"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Maintain state properly"})," - Use controlled components for predictable behavior"]}),`
`,d(e.li,{children:[n(e.strong,{children:"Group related content"})," - Tabs should contain related information"]}),`
`]}),`
`,n(e.h2,{children:"Examples"}),`
`,n(e.h3,{children:"Controlled Tabs"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<Box sx={{ width: "100%" }}>
  <Tabs value={value} onChange={handleChange}>
    <Tab label="Overview" />
    <Tab label="Details" />
    <Tab label="Settings" />
  </Tabs>
  {/* Tab content */}
</Box>
`})}),`
`,n(e.h3,{children:"Tabs with Navigation"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
  // Navigate or update content based on tab
};

<Tabs value={value} onChange={handleChange}>
  <Tab label="Home" />
  <Tab label="Products" />
  <Tab label="About" />
  <Tab label="Contact" />
</Tabs>
`})}),`
`,n(e.h3,{children:"Tabs with Badges"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`import { Badge } from "@mui/material";

<Tabs value={value} onChange={handleChange}>
  <Tab
    label={
      <Badge badgeContent={4} color="primary">
        Messages
      </Badge>
    }
  />
  <Tab label="Notifications" />
</Tabs>
`})}),`
`,n(e.h2,{children:"Documentation"}),`
`,d(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"https://mui.com/material-ui/react-tabs/",children:"Material UI - Tabs"})}),`
`]})]})}function lt(t={}){const{wrapper:e}={...He(),...t.components};return e?n(e,{...t,children:n($e,{...t})}):$e(t)}export{Gn as BasicTabs,Jn as IconOnlyTabs,_n as IconTabs,ve as TabPanel,lt as default};
