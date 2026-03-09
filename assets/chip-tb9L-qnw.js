import{j as k,r as h,n as K,o as a,p as o,F as de}from"./react-vendor-BFVi4CcX.js";import{c as D}from"./prism-BJUJpkdA.js";import{c as J,g as pe,a as he,u as ue,o as be,j as U,b as B,d as t,e as Ce,s as H,m as ge,h as S,n as b,B as C}from"./index-gR3xyJ2r.js";import{A as z}from"./Avatar-Bzy-u6V6.js";import"./router-DlKSSB9a.js";const ve=J(k.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}));function fe(l){return pe("MuiChip",l)}const r=he("MuiChip",["root","sizeSmall","sizeMedium","colorDefault","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),ye=l=>{const{classes:e,disabled:n,size:c,color:d,iconColor:g,onDelete:v,clickable:p,variant:u}=l,x={root:["root",u,n&&"disabled",`size${t(c)}`,`color${t(d)}`,p&&"clickable",p&&`clickableColor${t(d)}`,v&&"deletable",v&&`deletableColor${t(d)}`,`${u}${t(d)}`],label:["label",`label${t(c)}`],avatar:["avatar",`avatar${t(c)}`,`avatarColor${t(d)}`],icon:["icon",`icon${t(c)}`,`iconColor${t(g)}`],deleteIcon:["deleteIcon",`deleteIcon${t(c)}`,`deleteIconColor${t(d)}`,`deleteIcon${t(u)}Color${t(d)}`]};return Ce(x,fe,e)},me=H("div",{name:"MuiChip",slot:"Root",overridesResolver:(l,e)=>{const{ownerState:n}=l,{color:c,iconColor:d,clickable:g,onDelete:v,size:p,variant:u}=n;return[{[`& .${r.avatar}`]:e.avatar},{[`& .${r.avatar}`]:e[`avatar${t(p)}`]},{[`& .${r.avatar}`]:e[`avatarColor${t(c)}`]},{[`& .${r.icon}`]:e.icon},{[`& .${r.icon}`]:e[`icon${t(p)}`]},{[`& .${r.icon}`]:e[`iconColor${t(d)}`]},{[`& .${r.deleteIcon}`]:e.deleteIcon},{[`& .${r.deleteIcon}`]:e[`deleteIcon${t(p)}`]},{[`& .${r.deleteIcon}`]:e[`deleteIconColor${t(c)}`]},{[`& .${r.deleteIcon}`]:e[`deleteIcon${t(u)}Color${t(c)}`]},e.root,e[`size${t(p)}`],e[`color${t(c)}`],g&&e.clickable,g&&c!=="default"&&e[`clickableColor${t(c)})`],v&&e.deletable,v&&c!=="default"&&e[`deletableColor${t(c)}`],e[u],e[`${u}${t(c)}`]]}})(ge(({theme:l})=>{const e=l.palette.mode==="light"?l.palette.grey[700]:l.palette.grey[300];return{maxWidth:"100%",fontFamily:l.typography.fontFamily,fontSize:l.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(l.vars||l).palette.text.primary,backgroundColor:(l.vars||l).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:l.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${r.disabled}`]:{opacity:(l.vars||l).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${r.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:l.vars?l.vars.palette.Chip.defaultAvatarColor:e,fontSize:l.typography.pxToRem(12)},[`& .${r.avatarColorPrimary}`]:{color:(l.vars||l).palette.primary.contrastText,backgroundColor:(l.vars||l).palette.primary.dark},[`& .${r.avatarColorSecondary}`]:{color:(l.vars||l).palette.secondary.contrastText,backgroundColor:(l.vars||l).palette.secondary.dark},[`& .${r.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:l.typography.pxToRem(10)},[`& .${r.icon}`]:{marginLeft:5,marginRight:-6},[`& .${r.deleteIcon}`]:{WebkitTapHighlightColor:"transparent",color:l.vars?`rgba(${l.vars.palette.text.primaryChannel} / 0.26)`:b(l.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:l.vars?`rgba(${l.vars.palette.text.primaryChannel} / 0.4)`:b(l.palette.text.primary,.4)}},variants:[{props:{size:"small"},style:{height:24,[`& .${r.icon}`]:{fontSize:18,marginLeft:4,marginRight:-4},[`& .${r.deleteIcon}`]:{fontSize:16,marginRight:4,marginLeft:-4}}},...Object.entries(l.palette).filter(S(["contrastText"])).map(([n])=>({props:{color:n},style:{backgroundColor:(l.vars||l).palette[n].main,color:(l.vars||l).palette[n].contrastText,[`& .${r.deleteIcon}`]:{color:l.vars?`rgba(${l.vars.palette[n].contrastTextChannel} / 0.7)`:b(l.palette[n].contrastText,.7),"&:hover, &:active":{color:(l.vars||l).palette[n].contrastText}}}})),{props:n=>n.iconColor===n.color,style:{[`& .${r.icon}`]:{color:l.vars?l.vars.palette.Chip.defaultIconColor:e}}},{props:n=>n.iconColor===n.color&&n.color!=="default",style:{[`& .${r.icon}`]:{color:"inherit"}}},{props:{onDelete:!0},style:{[`&.${r.focusVisible}`]:{backgroundColor:l.vars?`rgba(${l.vars.palette.action.selectedChannel} / calc(${l.vars.palette.action.selectedOpacity} + ${l.vars.palette.action.focusOpacity}))`:b(l.palette.action.selected,l.palette.action.selectedOpacity+l.palette.action.focusOpacity)}}},...Object.entries(l.palette).filter(S(["dark"])).map(([n])=>({props:{color:n,onDelete:!0},style:{[`&.${r.focusVisible}`]:{background:(l.vars||l).palette[n].dark}}})),{props:{clickable:!0},style:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:l.vars?`rgba(${l.vars.palette.action.selectedChannel} / calc(${l.vars.palette.action.selectedOpacity} + ${l.vars.palette.action.hoverOpacity}))`:b(l.palette.action.selected,l.palette.action.selectedOpacity+l.palette.action.hoverOpacity)},[`&.${r.focusVisible}`]:{backgroundColor:l.vars?`rgba(${l.vars.palette.action.selectedChannel} / calc(${l.vars.palette.action.selectedOpacity} + ${l.vars.palette.action.focusOpacity}))`:b(l.palette.action.selected,l.palette.action.selectedOpacity+l.palette.action.focusOpacity)},"&:active":{boxShadow:(l.vars||l).shadows[1]}}},...Object.entries(l.palette).filter(S(["dark"])).map(([n])=>({props:{color:n,clickable:!0},style:{[`&:hover, &.${r.focusVisible}`]:{backgroundColor:(l.vars||l).palette[n].dark}}})),{props:{variant:"outlined"},style:{backgroundColor:"transparent",border:l.vars?`1px solid ${l.vars.palette.Chip.defaultBorder}`:`1px solid ${l.palette.mode==="light"?l.palette.grey[400]:l.palette.grey[700]}`,[`&.${r.clickable}:hover`]:{backgroundColor:(l.vars||l).palette.action.hover},[`&.${r.focusVisible}`]:{backgroundColor:(l.vars||l).palette.action.focus},[`& .${r.avatar}`]:{marginLeft:4},[`& .${r.avatarSmall}`]:{marginLeft:2},[`& .${r.icon}`]:{marginLeft:4},[`& .${r.iconSmall}`]:{marginLeft:2},[`& .${r.deleteIcon}`]:{marginRight:5},[`& .${r.deleteIconSmall}`]:{marginRight:3}}},...Object.entries(l.palette).filter(S()).map(([n])=>({props:{variant:"outlined",color:n},style:{color:(l.vars||l).palette[n].main,border:`1px solid ${l.vars?`rgba(${l.vars.palette[n].mainChannel} / 0.7)`:b(l.palette[n].main,.7)}`,[`&.${r.clickable}:hover`]:{backgroundColor:l.vars?`rgba(${l.vars.palette[n].mainChannel} / ${l.vars.palette.action.hoverOpacity})`:b(l.palette[n].main,l.palette.action.hoverOpacity)},[`&.${r.focusVisible}`]:{backgroundColor:l.vars?`rgba(${l.vars.palette[n].mainChannel} / ${l.vars.palette.action.focusOpacity})`:b(l.palette[n].main,l.palette.action.focusOpacity)},[`& .${r.deleteIcon}`]:{color:l.vars?`rgba(${l.vars.palette[n].mainChannel} / 0.7)`:b(l.palette[n].main,.7),"&:hover, &:active":{color:(l.vars||l).palette[n].main}}}}))]}})),xe=H("span",{name:"MuiChip",slot:"Label",overridesResolver:(l,e)=>{const{ownerState:n}=l,{size:c}=n;return[e.label,e[`label${t(c)}`]]}})({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap",variants:[{props:{variant:"outlined"},style:{paddingLeft:11,paddingRight:11}},{props:{size:"small"},style:{paddingLeft:8,paddingRight:8}},{props:{size:"small",variant:"outlined"},style:{paddingLeft:7,paddingRight:7}}]});function E(l){return l.key==="Backspace"||l.key==="Delete"}const i=h.forwardRef(function(e,n){const c=ue({props:e,name:"MuiChip"}),{avatar:d,className:g,clickable:v,color:p="default",component:u,deleteIcon:x,disabled:I=!1,icon:$,label:X,onClick:R,onDelete:f,onKeyDown:O,onKeyUp:M,size:G="medium",variant:_="filled",tabIndex:Y,skipFocusWhenDisabled:q=!1,slots:Q={},slotProps:Z={},...ee}=c,ae=h.useRef(null),le=be(ae,n),T=s=>{s.stopPropagation(),f&&f(s)},ne=s=>{s.currentTarget===s.target&&E(s)&&s.preventDefault(),O&&O(s)},re=s=>{s.currentTarget===s.target&&f&&E(s)&&f(s),M&&M(s)},w=v!==!1&&R?!0:v,P=w||f?U:u||"div",j={...c,component:P,disabled:I,size:G,color:p,iconColor:h.isValidElement($)&&$.props.color||p,onDelete:!!f,clickable:w,variant:_},m=ye(j),ie=P===U?{component:u||"div",focusVisibleClassName:m.focusVisible,...f&&{disableRipple:!0}}:{};let A=null;f&&(A=x&&h.isValidElement(x)?h.cloneElement(x,{className:D(x.props.className,m.deleteIcon),onClick:T}):k.jsx(ve,{className:m.deleteIcon,onClick:T}));let W=null;d&&h.isValidElement(d)&&(W=h.cloneElement(d,{className:D(m.avatar,d.props.className)}));let F=null;$&&h.isValidElement($)&&(F=h.cloneElement($,{className:D(m.icon,$.props.className)}));const L={slots:Q,slotProps:Z},[oe,te]=B("root",{elementType:me,externalForwardedProps:{...L,...ee},ownerState:j,shouldForwardComponentProp:!0,ref:le,className:D(m.root,g),additionalProps:{disabled:w&&I?!0:void 0,tabIndex:q&&I?-1:Y,...ie},getSlotProps:s=>({...s,onClick:y=>{s.onClick?.(y),R?.(y)},onKeyDown:y=>{s.onKeyDown?.(y),ne?.(y)},onKeyUp:y=>{s.onKeyUp?.(y),re?.(y)}})}),[ce,se]=B("label",{elementType:xe,externalForwardedProps:L,ownerState:j,className:m.label});return k.jsxs(oe,{as:P,...te,children:[W||F,k.jsx(ce,{...se,children:X}),A]})}),N=J(k.jsx("path",{d:"M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25m6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8"})),$e=()=>{const[l,e]=h.useState(["Chip 1","Chip 2","Chip 3"]),n=c=>{e(d=>d.filter(g=>g!==c))};return a(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:l.map(c=>a(i,{label:c,onDelete:()=>n(c)},c))})},ke=()=>{const[l,e]=h.useState(!1);return a(i,{label:l?"Selected":"Click me",onClick:()=>e(!l),color:l?"primary":"default"})};function V(l){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...K(),...l.components};return o(de,{children:[a(e.h1,{children:"Chip"}),`
`,o(e.p,{children:["The ",a(e.code,{children:"Chip"})," component displays a compact element that can represent an input, attribute, or action. Material UI's Chip component provides a consistent, accessible, and customizable way to display tags, labels, or interactive elements."]}),`
`,a(e.p,{children:"Chips are used to display small pieces of information, such as tags, filters, selections, or actions that can be clicked or deleted."}),`
`,a(e.h2,{children:"Variants"}),`
`,a(e.p,{children:"Material UI Chips come in two variants:"}),`
`,a(e.h3,{children:"Filled (Default)"}),`
`,a(e.p,{children:"The default variant with a solid background:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{label:"Filled"}),a(i,{label:"Chip",color:"primary"}),a(i,{label:"Chip",color:"secondary"})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Filled" />
<Chip label="Chip" color="primary" />
<Chip label="Chip" color="secondary" />
`})}),`
`,a(e.h3,{children:"Outlined"}),`
`,a(e.p,{children:"A variant with an outlined border:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{label:"Outlined",variant:"outlined"}),a(i,{label:"Chip",variant:"outlined",color:"primary"}),a(i,{label:"Chip",variant:"outlined",color:"secondary"})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Outlined" variant="outlined" />
<Chip label="Chip" variant="outlined" color="primary" />
<Chip label="Chip" variant="outlined" color="secondary" />
`})}),`
`,a(e.h2,{children:"Sizes"}),`
`,a(e.p,{children:"Chips come in two sizes:"}),`
`,o(C,{sx:{display:"flex",gap:1,alignItems:"center",flexWrap:"wrap"},children:[a(i,{label:"Small",size:"small"}),a(i,{label:"Medium",size:"medium"}),a(i,{label:"Small",size:"small",variant:"outlined"}),a(i,{label:"Medium",size:"medium",variant:"outlined"})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Small" size="small" />
<Chip label="Medium" size="medium" />
`})}),`
`,a(e.h2,{children:"Colors"}),`
`,a(e.p,{children:"Chips support different color schemes:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{label:"Default"}),a(i,{label:"Primary",color:"primary"}),a(i,{label:"Secondary",color:"secondary"}),a(i,{label:"Success",color:"success"}),a(i,{label:"Error",color:"error"}),a(i,{label:"Warning",color:"warning"}),a(i,{label:"Info",color:"info"})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Success" color="success" />
<Chip label="Error" color="error" />
<Chip label="Warning" color="warning" />
<Chip label="Info" color="info" />
`})}),`
`,a(e.h2,{children:"Deletable Chips"}),`
`,a(e.p,{children:"Chips can include a delete icon:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{label:"Deletable",onDelete:()=>{}}),a(i,{label:"Deletable",variant:"outlined",onDelete:()=>{}}),a(i,{label:"Deletable",color:"primary",onDelete:()=>{}})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Deletable" onDelete={() => {}} />
`})}),`
`,a(e.h3,{children:"Interactive Deletable Chips"}),`
`,a($e,{}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const [chips, setChips] = useState(["Chip 1", "Chip 2", "Chip 3"]);

const handleDelete = (chipToDelete) => {
  setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
};

{chips.map((chip) => (
  <Chip
    key={chip}
    label={chip}
    onDelete={() => handleDelete(chip)}
  />
))}
`})}),`
`,a(e.h2,{children:"Clickable Chips"}),`
`,a(e.p,{children:"Chips can be made clickable:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{label:"Clickable",onClick:()=>{}}),a(i,{label:"Clickable",variant:"outlined",onClick:()=>{}}),a(ke,{})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Clickable" onClick={() => {}} />
`})}),`
`,a(e.h2,{children:"Icon Chips"}),`
`,a(e.p,{children:"Chips can include icons:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{icon:a(N,{}),label:"With Icon"}),a(i,{icon:a(N,{}),label:"With Icon",color:"primary"}),a(i,{icon:a(N,{}),label:"Deletable",onDelete:()=>{}})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip icon={<Face />} label="With Icon" />
<Chip
  icon={<Face />}
  label="Deletable"
  onDelete={() => {}}
/>
`})}),`
`,a(e.h2,{children:"Avatar Chips"}),`
`,a(e.p,{children:"Chips can display avatars:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{avatar:a(z,{children:"M"}),label:"Avatar"}),a(i,{avatar:a(z,{alt:"Natacha",src:"/static/images/avatar/1.jpg"}),label:"Avatar",variant:"outlined"}),a(i,{avatar:a(z,{children:"JD"}),label:"Deletable",onDelete:()=>{}})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
<Chip
  avatar={<Avatar alt="Natacha" src="/avatar.jpg" />}
  label="Avatar"
  variant="outlined"
/>
`})}),`
`,a(e.h2,{children:"Custom Delete Icon"}),`
`,a(e.p,{children:"You can customize the delete icon:"}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip
  label="Custom Delete"
  onDelete={() => {}}
  deleteIcon={<Check />}
/>
`})}),`
`,a(e.h2,{children:"Disabled Chips"}),`
`,a(e.p,{children:"Chips can be disabled:"}),`
`,o(C,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:[a(i,{label:"Disabled",disabled:!0}),a(i,{label:"Disabled",disabled:!0,variant:"outlined"}),a(i,{label:"Disabled",disabled:!0,onDelete:()=>{}})]}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip label="Disabled" disabled />
<Chip label="Disabled" disabled onDelete={() => {}} />
`})}),`
`,a(e.h2,{children:"Common Props"}),`
`,a(e.p,{children:"The Chip component accepts various props to customize its appearance and behavior:"}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Chip
  label="Label" // string | ReactNode
  variant="filled" // 'filled' | 'outlined'
  color="default" // 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  size="medium" // 'small' | 'medium'
  icon={<Icon />} // ReactNode
  avatar={<Avatar />} // ReactNode
  onDelete={handleDelete} // function - makes chip deletable
  onClick={handleClick} // function - makes chip clickable
  disabled={false} // boolean
  deleteIcon={<DeleteIcon />} // ReactNode - custom delete icon
  sx={{}} // object - custom styles
/>
`})}),`
`,a(e.h2,{children:"Accessibility"}),`
`,a(e.p,{children:"Material UI Chips are built with accessibility in mind:"}),`
`,o(e.ul,{children:[`
`,o(e.li,{children:[a(e.strong,{children:"Keyboard navigation"}),": Clickable and deletable chips are keyboard accessible"]}),`
`,o(e.li,{children:[a(e.strong,{children:"ARIA attributes"}),": Proper ARIA labels and roles for screen readers"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Focus indicators"}),": Clear visual focus indicators"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Delete action"}),": Delete action is properly announced to screen readers"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Color contrast"}),": Meets WCAG guidelines for color contrast ratios"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Interactive elements"}),": All interactive chips have proper event handlers"]}),`
`]}),`
`,a(e.h2,{children:"Best Practices"}),`
`,o(e.ol,{children:[`
`,o(e.li,{children:[a(e.strong,{children:"Use chips for tags and labels"})," - Chips work well for displaying tags, categories, or labels"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Keep labels concise"})," - Short, clear labels work best in chips"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Provide delete functionality"})," - Use deletable chips when users should be able to remove items"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Use appropriate colors"})," - Choose colors that match your design system and convey meaning"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Consider clickable chips"})," - Make chips clickable when they represent selectable options"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Use icons meaningfully"})," - Icons can enhance understanding but shouldn't replace clear labels"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Group related chips"})," - Display related chips together in a flex container"]}),`
`,o(e.li,{children:[a(e.strong,{children:"Handle deletion gracefully"})," - Provide clear feedback when chips are deleted"]}),`
`]}),`
`,a(e.h2,{children:"Examples"}),`
`,a(e.h3,{children:"Filter Chips"}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const [filters, setFilters] = useState(["Active", "Featured"]);

const handleDelete = (filterToDelete) => {
  setFilters((filters) => filters.filter((filter) => filter !== filterToDelete));
};

<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  {filters.map((filter) => (
    <Chip
      key={filter}
      label={filter}
      onDelete={() => handleDelete(filter)}
      color="primary"
    />
  ))}
</Box>
`})}),`
`,a(e.h3,{children:"Selectable Chips"}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const [selected, setSelected] = useState([]);

const handleToggle = (value) => {
  setSelected((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value]
  );
};

const options = ["Option 1", "Option 2", "Option 3"];

<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  {options.map((option) => (
    <Chip
      key={option}
      label={option}
      onClick={() => handleToggle(option)}
      color={selected.includes(option) ? "primary" : "default"}
    />
  ))}
</Box>
`})}),`
`,a(e.h3,{children:"User Tags"}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`const users = [
  { name: "John Doe", avatar: "JD" },
  { name: "Jane Smith", avatar: "JS" },
];

<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  {users.map((user) => (
    <Chip
      key={user.name}
      avatar={<Avatar>{user.avatar}</Avatar>}
      label={user.name}
      onDelete={() => {}}
    />
  ))}
</Box>
`})}),`
`,a(e.h3,{children:"Status Chips"}),`
`,a(e.pre,{children:a(e.code,{className:"language-jsx",children:`<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  <Chip label="Active" color="success" />
  <Chip label="Pending" color="warning" />
  <Chip label="Inactive" color="default" />
  <Chip label="Error" color="error" />
</Box>
`})}),`
`,a(e.h2,{children:"Documentation"}),`
`,o(e.ul,{children:[`
`,a(e.li,{children:a(e.a,{href:"https://mui.com/material-ui/react-chip/",children:"Material UI - Chip"})}),`
`]})]})}function je(l={}){const{wrapper:e}={...K(),...l.components};return e?a(e,{...l,children:a(V,{...l})}):V(l)}export{ke as ClickableChips,$e as DeletableChips,je as default};
