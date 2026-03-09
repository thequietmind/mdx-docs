import{j as l,r as C,n as U,o as e,p as i,F as le}from"./react-vendor-BFVi4CcX.js";import{g as W,a as $,c as p,u as L,b as h,I as E,d as b,e as O,s as f,P as ae,m as D,f as N,l as P,h as T,T as oe,B as g}from"./index-gR3xyJ2r.js";import{c as F}from"./prism-BJUJpkdA.js";import"./router-DlKSSB9a.js";function ce(t){return W("MuiAlert",t)}const z=$("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),de=p(l.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"})),he=p(l.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"})),pe=p(l.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"})),ue=p(l.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"})),ge=p(l.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),fe=t=>{const{variant:n,color:a,severity:r,classes:o}=t,u={root:["root",`color${b(a||r)}`,`${n}${b(a||r)}`,`${n}`],icon:["icon"],message:["message"],action:["action"]};return O(u,ce,o)},me=f(ae,{name:"MuiAlert",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:a}=t;return[n.root,n[a.variant],n[`${a.variant}${b(a.color||a.severity)}`]]}})(D(({theme:t})=>{const n=t.palette.mode==="light"?N:P,a=t.palette.mode==="light"?P:N;return{...t.typography.body2,backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(t.palette).filter(T(["light"])).map(([r])=>({props:{colorSeverity:r,variant:"standard"},style:{color:t.vars?t.vars.palette.Alert[`${r}Color`]:n(t.palette[r].light,.6),backgroundColor:t.vars?t.vars.palette.Alert[`${r}StandardBg`]:a(t.palette[r].light,.9),[`& .${z.icon}`]:t.vars?{color:t.vars.palette.Alert[`${r}IconColor`]}:{color:t.palette[r].main}}})),...Object.entries(t.palette).filter(T(["light"])).map(([r])=>({props:{colorSeverity:r,variant:"outlined"},style:{color:t.vars?t.vars.palette.Alert[`${r}Color`]:n(t.palette[r].light,.6),border:`1px solid ${(t.vars||t).palette[r].light}`,[`& .${z.icon}`]:t.vars?{color:t.vars.palette.Alert[`${r}IconColor`]}:{color:t.palette[r].main}}})),...Object.entries(t.palette).filter(T(["dark"])).map(([r])=>({props:{colorSeverity:r,variant:"filled"},style:{fontWeight:t.typography.fontWeightMedium,...t.vars?{color:t.vars.palette.Alert[`${r}FilledColor`],backgroundColor:t.vars.palette.Alert[`${r}FilledBg`]}:{backgroundColor:t.palette.mode==="dark"?t.palette[r].dark:t.palette[r].main,color:t.palette.getContrastText(t.palette[r].main)}}}))]}})),ve=f("div",{name:"MuiAlert",slot:"Icon"})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Ae=f("div",{name:"MuiAlert",slot:"Message"})({padding:"8px 0",minWidth:0,overflow:"auto"}),ye=f("div",{name:"MuiAlert",slot:"Action"})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),B={success:l.jsx(de,{fontSize:"inherit"}),warning:l.jsx(he,{fontSize:"inherit"}),error:l.jsx(pe,{fontSize:"inherit"}),info:l.jsx(ue,{fontSize:"inherit"})},s=C.forwardRef(function(n,a){const r=L({props:n,name:"MuiAlert"}),{action:o,children:u,className:m,closeText:v="Close",color:w,components:k={},componentsProps:V={},icon:S,iconMapping:H=B,onClose:M,role:X="alert",severity:A="success",slotProps:q={},slots:K={},variant:Y="standard",...Z}=r,c={...r,color:w,severity:A,variant:Y,colorSeverity:w||A},y=fe(c),d={slots:{closeButton:k.CloseButton,closeIcon:k.CloseIcon,...K},slotProps:{...V,...q}},[_,G]=h("root",{ref:a,shouldForwardComponentProp:!0,className:F(y.root,m),elementType:me,externalForwardedProps:{...d,...Z},ownerState:c,additionalProps:{role:X,elevation:0}}),[J,Q]=h("icon",{className:y.icon,elementType:ve,externalForwardedProps:d,ownerState:c}),[ee,ne]=h("message",{className:y.message,elementType:Ae,externalForwardedProps:d,ownerState:c}),[j,I]=h("action",{className:y.action,elementType:ye,externalForwardedProps:d,ownerState:c}),[te,re]=h("closeButton",{elementType:E,externalForwardedProps:d,ownerState:c}),[ie,se]=h("closeIcon",{elementType:ge,externalForwardedProps:d,ownerState:c});return l.jsxs(_,{...G,children:[S!==!1?l.jsx(J,{...Q,children:S||H[A]||B[A]}):null,l.jsx(ee,{...ne,children:u}),o!=null?l.jsx(j,{...I,children:o}):null,o==null&&M?l.jsx(j,{...I,children:l.jsx(te,{size:"small","aria-label":v,title:v,color:"inherit",onClick:M,...re,children:l.jsx(ie,{fontSize:"small",...se})})}):null]})});function xe(t){return W("MuiAlertTitle",t)}$("MuiAlertTitle",["root"]);const Te=t=>{const{classes:n}=t;return O({root:["root"]},xe,n)},be=f(oe,{name:"MuiAlertTitle",slot:"Root"})(D(({theme:t})=>({fontWeight:t.typography.fontWeightMedium,marginTop:-2}))),x=C.forwardRef(function(n,a){const r=L({props:n,name:"MuiAlertTitle"}),{className:o,...u}=r,m=r,v=Te(m);return l.jsx(be,{gutterBottom:!0,component:"div",ownerState:m,ref:a,className:F(v.root,o),...u})}),Ce=p(l.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),we=({severity:t,children:n})=>{const[a,r]=C.useState(!0);return a?e(s,{severity:t,action:e(E,{"aria-label":"close",color:"inherit",size:"small",onClick:()=>r(!1),children:e(Ce,{fontSize:"inherit"})}),children:n}):null};function R(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...U(),...t.components};return i(le,{children:[e(n.h1,{children:"Alert"}),`
`,i(n.p,{children:["The ",e(n.code,{children:"Alert"})," component displays important messages to users, such as success confirmations, error notifications, warnings, or informational messages. Material UI's Alert component provides a consistent, accessible, and customizable way to communicate feedback to users."]}),`
`,e(n.p,{children:"Alerts are used to provide contextual feedback about user actions, system status, or important information that requires user attention."}),`
`,e(n.h2,{children:"Variants"}),`
`,e(n.p,{children:"Material UI Alerts come in three variants to suit different design needs:"}),`
`,e(n.h3,{children:"Standard"}),`
`,e(n.p,{children:"The default variant with a colored background:"}),`
`,e(s,{severity:"info",children:e("span",{children:"This is an info alert — check it out!"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="info">
  <span>This is an info alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Filled"}),`
`,e(n.p,{children:"A variant with a solid colored background:"}),`
`,e(s,{severity:"success",variant:"filled",children:e("span",{children:"This is a filled success alert — check it out!"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="success" variant="filled">
  <span>This is a filled success alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Outlined"}),`
`,e(n.p,{children:"A variant with an outlined border:"}),`
`,e(s,{severity:"warning",variant:"outlined",children:e("span",{children:"This is an outlined warning alert — check it out!"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="warning" variant="outlined">
  <span>This is an outlined warning alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h2,{children:"Severity Levels"}),`
`,e(n.p,{children:"Alerts support different severity levels to convey different types of messages:"}),`
`,e(n.h3,{children:"Success"}),`
`,e(n.p,{children:"Used to indicate successful operations or positive feedback:"}),`
`,i(g,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e(s,{severity:"success",children:e("span",{children:"This is a success alert — check it out!"})}),e(s,{severity:"success",variant:"filled",children:e("span",{children:"This is a filled success alert — check it out!"})}),e(s,{severity:"success",variant:"outlined",children:e("span",{children:"This is an outlined success alert — check it out!"})})]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="success">
  <span>This is a success alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Error"}),`
`,e(n.p,{children:"Used to indicate errors or problems that need attention:"}),`
`,i(g,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e(s,{severity:"error",children:e("span",{children:"This is an error alert — check it out!"})}),e(s,{severity:"error",variant:"filled",children:e("span",{children:"This is a filled error alert — check it out!"})}),e(s,{severity:"error",variant:"outlined",children:e("span",{children:"This is an outlined error alert — check it out!"})})]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="error">
  <span>This is an error alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Warning"}),`
`,e(n.p,{children:"Used to indicate warnings or cautionary information:"}),`
`,i(g,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e(s,{severity:"warning",children:e("span",{children:"This is a warning alert — check it out!"})}),e(s,{severity:"warning",variant:"filled",children:e("span",{children:"This is a filled warning alert — check it out!"})}),e(s,{severity:"warning",variant:"outlined",children:e("span",{children:"This is an outlined warning alert — check it out!"})})]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="warning">
  <span>This is a warning alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Info"}),`
`,e(n.p,{children:"Used to provide informational messages:"}),`
`,i(g,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e(s,{severity:"info",children:e("span",{children:"This is an info alert — check it out!"})}),e(s,{severity:"info",variant:"filled",children:e("span",{children:"This is a filled info alert — check it out!"})}),e(s,{severity:"info",variant:"outlined",children:e("span",{children:"This is an outlined info alert — check it out!"})})]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="info">
  <span>This is an info alert — check it out!</span>
</Alert>
`})}),`
`,e(n.h2,{children:"With Title"}),`
`,e(n.p,{children:"Alerts can include a title for better organization:"}),`
`,i(g,{sx:{display:"flex",flexDirection:"column",gap:2},children:[i(s,{severity:"error",children:[e(x,{children:"Error"}),e("span",{children:"This is an error alert with a title — check it out!"})]}),i(s,{severity:"warning",children:[e(x,{children:"Warning"}),e("span",{children:"This is a warning alert with a title — check it out!"})]}),i(s,{severity:"info",children:[e(x,{children:"Info"}),e("span",{children:"This is an info alert with a title — check it out!"})]}),i(s,{severity:"success",children:[e(x,{children:"Success"}),e("span",{children:"This is a success alert with a title — check it out!"})]})]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  <span>This is an error alert with a title — check it out!</span>
</Alert>
`})}),`
`,e(n.h2,{children:"Icons"}),`
`,e(n.h3,{children:"With Icons (Default)"}),`
`,e(n.p,{children:"By default, alerts display an icon based on their severity:"}),`
`,e(s,{severity:"success",children:e("span",{children:"This alert has an icon by default"})}),`
`,e(n.h3,{children:"Without Icons"}),`
`,e(n.p,{children:"You can hide the icon if needed:"}),`
`,e(s,{severity:"info",icon:!1,children:e("span",{children:"This alert has no icon"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="info" icon={false}>
  <span>This alert has no icon</span>
</Alert>
`})}),`
`,e(n.h2,{children:"Dismissible Alerts"}),`
`,e(n.p,{children:"Alerts can be made dismissible with a close button:"}),`
`,e(we,{severity:"info",children:e("span",{children:"This is a dismissible alert — click the X to close it!"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`const [open, setOpen] = useState(true);

if (!open) return null;

<Alert
  severity="info"
  action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => setOpen(false)}
    >
      <Close fontSize="inherit" />
    </IconButton>
  }
>
  <span>This is a dismissible alert — click the X to close it!</span>
</Alert>;
`})}),`
`,e(n.h2,{children:"Common Props"}),`
`,e(n.p,{children:"The Alert component accepts various props to customize its appearance and behavior:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert
  severity="info" // 'error' | 'info' | 'success' | 'warning'
  variant="standard" // 'standard' | 'filled' | 'outlined'
  icon={true} // boolean | ReactNode
  onClose={handleClose} // function (makes alert dismissible)
  color="info" // 'error' | 'info' | 'success' | 'warning'
  action={<Button>Action</Button>} // ReactNode - custom action button
  sx={{}} // object - custom styles
>
  <span>Alert content</span>
</Alert>
`})}),`
`,e(n.h2,{children:"Accessibility"}),`
`,e(n.p,{children:"Material UI Alerts are built with accessibility in mind:"}),`
`,i(n.ul,{children:[`
`,i(n.li,{children:[e(n.strong,{children:"ARIA roles"}),": Proper ARIA roles and attributes for screen readers"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Color contrast"}),": Meets WCAG guidelines for color contrast ratios"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Icon indicators"}),": Visual and semantic indicators for different severity levels"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Keyboard navigation"}),": Full keyboard support for dismissible alerts"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Focus management"}),": Proper focus handling when alerts appear or disappear"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Screen reader announcements"}),": Alerts are properly announced to screen readers"]}),`
`]}),`
`,e(n.h2,{children:"Best Practices"}),`
`,i(n.ol,{children:[`
`,i(n.li,{children:[e(n.strong,{children:"Use appropriate severity levels"})," - Choose the right severity (error, warning, info, success) to match the message importance"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Keep messages concise"})," - Alert messages should be brief and actionable"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Use titles for complex messages"})," - Add AlertTitle for longer or more structured messages"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Make critical alerts dismissible"})," - Allow users to dismiss non-critical alerts"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Don't overuse alerts"})," - Reserve alerts for important information that requires attention"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Provide actionable content"})," - Include clear next steps when appropriate"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Consider placement"})," - Position alerts where users will notice them without being intrusive"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Use consistent styling"})," - Maintain consistent alert styling throughout your application"]}),`
`]}),`
`,e(n.h2,{children:"Examples"}),`
`,e(n.h3,{children:"Form Validation Error"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="error">
  <AlertTitle>Validation Error</AlertTitle>
  <span>Please correct the following errors:</span>
  <ul>
    <li>Email is required</li>
    <li>Password must be at least 8 characters</li>
  </ul>
</Alert>
`})}),`
`,e(n.h3,{children:"Success Confirmation"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="success" variant="filled">
  <span>Your changes have been saved successfully!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Warning Message"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert severity="warning" variant="outlined">
  <AlertTitle>Warning</AlertTitle>
  <span>This action cannot be undone. Are you sure you want to continue?</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Info with Action"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Alert
  severity="info"
  action={
    <Button color="inherit" size="small">
      Learn More
    </Button>
  }
>
  <span>New features are available. Click to learn more!</span>
</Alert>
`})}),`
`,e(n.h3,{children:"Auto-dismissing Alert"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`const [open, setOpen] = useState(true);

useEffect(() => {
  if (open) {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [open]);

{
  open && (
    <Alert severity="success" onClose={() => setOpen(false)}>
      <span>Operation completed successfully!</span>
    </Alert>
  );
}
`})}),`
`,e(n.h2,{children:"Documentation"}),`
`,i(n.ul,{children:[`
`,e(n.li,{children:e(n.a,{href:"https://mui.com/material-ui/react-alert/",children:"Material UI - Alert"})}),`
`]})]})}function Ie(t={}){const{wrapper:n}={...U(),...t.components};return n?e(n,{...t,children:e(R,{...t})}):R(t)}export{we as DismissibleAlert,Ie as default};
