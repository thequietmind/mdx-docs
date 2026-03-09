import{r as T,j as h,n as J,o as n,p as a,F as ae}from"./react-vendor-BFVi4CcX.js";import{c as I}from"./prism-BJUJpkdA.js";import{g as A,a as w,u as S,e as j,s as u,P as re,b as x,T as s,t as k,c as O,I as z,B as oe}from"./index-gR3xyJ2r.js";import{B as N}from"./Button-MWXAgNH2.js";import{A as F}from"./Avatar-Bzy-u6V6.js";import{F as ie}from"./Favorite-DCwHn96Z.js";import"./router-DlKSSB9a.js";function se(t){return A("MuiCard",t)}w("MuiCard",["root"]);const de=t=>{const{classes:e}=t;return j({root:["root"]},se,e)},ce=u(re,{name:"MuiCard",slot:"Root"})({overflow:"hidden"}),m=T.forwardRef(function(e,r){const o=S({props:e,name:"MuiCard"}),{className:c,raised:d=!1,...l}=o,i={...o,raised:d},p=de(i);return h.jsx(ce,{className:I(p.root,c),elevation:d?8:void 0,ref:r,ownerState:i,...l})});function le(t){return A("MuiCardActions",t)}w("MuiCardActions",["root","spacing"]);const he=t=>{const{classes:e,disableSpacing:r}=t;return j({root:["root",!r&&"spacing"]},le,e)},pe=u("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,!r.disableSpacing&&e.spacing]}})({display:"flex",alignItems:"center",padding:8,variants:[{props:{disableSpacing:!1},style:{"& > :not(style) ~ :not(style)":{marginLeft:8}}}]}),D=T.forwardRef(function(e,r){const o=S({props:e,name:"MuiCardActions"}),{disableSpacing:c=!1,className:d,...l}=o,i={...o,disableSpacing:c},p=he(i);return h.jsx(pe,{className:I(p.root,d),ownerState:i,ref:r,...l})});function me(t){return A("MuiCardContent",t)}w("MuiCardContent",["root"]);const ue=t=>{const{classes:e}=t;return j({root:["root"]},me,e)},ge=u("div",{name:"MuiCardContent",slot:"Root"})({padding:16,"&:last-child":{paddingBottom:24}}),M=T.forwardRef(function(e,r){const o=S({props:e,name:"MuiCardContent"}),{className:c,component:d="div",...l}=o,i={...o,component:d},p=ue(i);return h.jsx(ge,{as:d,className:I(p.root,c),ownerState:i,ref:r,...l})});function Ce(t){return A("MuiCardHeader",t)}const R=w("MuiCardHeader",["root","avatar","action","content","title","subheader"]),ye=t=>{const{classes:e}=t;return j({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},Ce,e)},ve=u("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(t,e)=>[{[`& .${R.title}`]:e.title},{[`& .${R.subheader}`]:e.subheader},e.root]})({display:"flex",alignItems:"center",padding:16}),xe=u("div",{name:"MuiCardHeader",slot:"Avatar"})({display:"flex",flex:"0 0 auto",marginRight:16}),be=u("div",{name:"MuiCardHeader",slot:"Action"})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),fe=u("div",{name:"MuiCardHeader",slot:"Content"})({flex:"1 1 auto",[`.${k.root}:where(& .${R.title})`]:{display:"block"},[`.${k.root}:where(& .${R.subheader})`]:{display:"block"}}),$=T.forwardRef(function(e,r){const o=S({props:e,name:"MuiCardHeader"}),{action:c,avatar:d,component:l="div",disableTypography:i=!1,subheader:p,subheaderTypographyProps:P,title:H,titleTypographyProps:C,slots:U={},slotProps:B={},...W}=o,g={...o,component:l,disableTypography:i},y=ye(g),v={slots:U,slotProps:{title:C,subheader:P,...B}};let b=H;const[_,G]=x("title",{className:y.title,elementType:s,externalForwardedProps:v,ownerState:g,additionalProps:{variant:d?"body2":"h5",component:"span"}});b!=null&&b.type!==s&&!i&&(b=h.jsx(_,{...G,children:b}));let f=p;const[K,V]=x("subheader",{className:y.subheader,elementType:s,externalForwardedProps:v,ownerState:g,additionalProps:{variant:d?"body2":"body1",color:"textSecondary",component:"span"}});f!=null&&f.type!==s&&!i&&(f=h.jsx(K,{...V,children:f}));const[X,q]=x("root",{ref:r,className:y.root,elementType:ve,externalForwardedProps:{...v,...W,component:l},ownerState:g}),[Q,Y]=x("avatar",{className:y.avatar,elementType:xe,externalForwardedProps:v,ownerState:g}),[Z,ee]=x("content",{className:y.content,elementType:fe,externalForwardedProps:v,ownerState:g}),[ne,te]=x("action",{className:y.action,elementType:be,externalForwardedProps:v,ownerState:g});return h.jsxs(X,{...q,children:[d&&h.jsx(Q,{...Y,children:d}),h.jsxs(Z,{...ee,children:[b,f]}),c&&h.jsx(ne,{...te,children:c})]})});function Me(t){return A("MuiCardMedia",t)}w("MuiCardMedia",["root","media","img"]);const Te=t=>{const{classes:e,isMediaComponent:r,isImageComponent:o}=t;return j({root:["root",r&&"media",o&&"img"]},Me,e)},Ae=u("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t,{isMediaComponent:o,isImageComponent:c}=r;return[e.root,o&&e.media,c&&e.img]}})({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",variants:[{props:{isMediaComponent:!0},style:{width:"100%"}},{props:{isImageComponent:!0},style:{objectFit:"cover"}}]}),we=["video","audio","picture","iframe","img"],Se=["picture","img"],E=T.forwardRef(function(e,r){const o=S({props:e,name:"MuiCardMedia"}),{children:c,className:d,component:l="div",image:i,src:p,style:P,...H}=o,C=we.includes(l),U=!C&&i?{backgroundImage:`url("${i}")`,...P}:P,B={...o,component:l,isMediaComponent:C,isImageComponent:Se.includes(l)},W=Te(B);return h.jsx(Ae,{className:I(W.root,d),as:l,role:!C&&i?"img":void 0,ref:r,style:U,ownerState:B,src:C?i||p:void 0,...H,children:c})}),je=O(h.jsx("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"})),Pe=O(h.jsx("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"}));function L(t){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...J(),...t.components};return a(ae,{children:[n(e.h1,{children:"Card"}),`
`,a(e.p,{children:["The ",n(e.code,{children:"Card"})," component is a versatile container for displaying content. Material UI's Card component provides a consistent, accessible, and customizable way to present information in a structured format."]}),`
`,n(e.p,{children:"Cards are used to display content and actions about a single topic, such as articles, products, user profiles, or any other grouped information."}),`
`,n(e.h2,{children:"Basic Card"}),`
`,n(e.p,{children:"A simple card with content:"}),`
`,n(m,{sx:{maxWidth:345},children:a(M,{children:[n(s,{gutterBottom:!0,variant:"h5",component:"div",children:n(e.p,{children:"Card Title"})}),n(s,{variant:"body2",color:"text.secondary",children:n(e.p,{children:`This is a basic card with content. Cards are useful for displaying
information in a structured format.`})})]})}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card sx={{ maxWidth: 345 }}>
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      Card Title
    </Typography>
    <Typography variant="body2" color="text.secondary">
      This is a basic card with content.
    </Typography>
  </CardContent>
</Card>
`})}),`
`,n(e.h2,{children:"Card with Media"}),`
`,n(e.p,{children:"Cards can include images or other media:"}),`
`,a(m,{sx:{maxWidth:345},children:[n(E,{component:"img",height:"140",image:"https://mui.com/static/images/cards/contemplative-reptile.jpg",alt:"Green iguana"}),a(M,{children:[n(s,{gutterBottom:!0,variant:"h5",component:"div",children:n(e.p,{children:"Lizard"})}),n(s,{variant:"body2",color:"text.secondary",children:n(e.p,{children:`Lizards are a widespread group of squamate reptiles, with over 6,000
species, ranging across all continents except Antarctica.`})})]})]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="140"
    image="/path/to/image.jpg"
    alt="Image description"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      Card Title
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Card description text.
    </Typography>
  </CardContent>
</Card>
`})}),`
`,n(e.h2,{children:"Card with Actions"}),`
`,n(e.p,{children:"Cards can include action buttons:"}),`
`,a(m,{sx:{maxWidth:345},children:[a(M,{children:[n(s,{gutterBottom:!0,variant:"h5",component:"div",children:n(e.p,{children:"Card with Actions"})}),n(s,{variant:"body2",color:"text.secondary",children:n(e.p,{children:"This card includes action buttons at the bottom."})})]}),a(D,{children:[n(N,{size:"small",children:"Share"}),n(N,{size:"small",children:"Learn More"})]})]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card sx={{ maxWidth: 345 }}>
  <CardContent>
    <Typography variant="h5">Card with Actions</Typography>
    <Typography variant="body2" color="text.secondary">
      Card content here.
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
</Card>
`})}),`
`,n(e.h2,{children:"Card with Header"}),`
`,n(e.p,{children:"Cards can include a header with an avatar and action buttons:"}),`
`,a(m,{sx:{maxWidth:345},children:[n($,{avatar:n(F,{sx:{bgcolor:"primary.main"},"aria-label":"recipe",children:"R"}),action:n(z,{"aria-label":"settings",children:n(je,{})}),title:"Shrimp and Chorizo Paella",subheader:"September 14, 2016"}),n(E,{component:"img",height:"194",image:"https://mui.com/static/images/cards/paella.jpg",alt:"Paella dish"}),n(M,{children:n(s,{variant:"body2",color:"text.secondary",children:n(e.p,{children:`This impressive paella is a perfect party dish and a fun meal to cook
together with your guests.`})})}),a(D,{disableSpacing:!0,children:[n(z,{"aria-label":"add to favorites",children:n(ie,{})}),n(z,{"aria-label":"share",children:n(Pe,{})})]})]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card sx={{ maxWidth: 345 }}>
  <CardHeader
    avatar={
      <Avatar sx={{ bgcolor: "primary.main" }}>R</Avatar>
    }
    action={
      <IconButton>
        <MoreVert />
      </IconButton>
    }
    title="Card Title"
    subheader="Subtitle"
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      Card content here.
    </Typography>
  </CardContent>
  <CardActions>
    <IconButton>
      <Favorite />
    </IconButton>
    <IconButton>
      <Share />
    </IconButton>
  </CardActions>
</Card>
`})}),`
`,n(e.h2,{children:"Complete Card Example"}),`
`,n(e.p,{children:"A card with all features combined:"}),`
`,a(m,{sx:{maxWidth:345},children:[n($,{avatar:n(F,{sx:{bgcolor:"secondary.main"},children:"JD"}),title:"John Doe",subheader:"Product Designer"}),n(E,{component:"img",height:"140",image:"https://mui.com/static/images/cards/contemplative-reptile.jpg",alt:"Profile"}),a(M,{children:[n(s,{gutterBottom:!0,variant:"h6",component:"div",children:n(e.p,{children:"Featured Project"})}),n(s,{variant:"body2",color:"text.secondary",children:n(e.p,{children:"This is a complete card example with header, media, content, and actions."})})]}),a(D,{children:[n(N,{size:"small",color:"primary",children:n(e.p,{children:"View Project"})}),n(N,{size:"small",color:"primary",children:n(e.p,{children:"Contact"})})]})]}),`
`,n(e.h2,{children:"Elevation"}),`
`,n(e.p,{children:"Cards support different elevation levels for depth:"}),`
`,a(oe,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n(m,{elevation:0,sx:{p:2,minWidth:200},children:n(s,{variant:"h6",children:"Elevation 0"})}),n(m,{elevation:2,sx:{p:2,minWidth:200},children:n(s,{variant:"h6",children:"Elevation 2"})}),n(m,{elevation:8,sx:{p:2,minWidth:200},children:n(s,{variant:"h6",children:"Elevation 8"})}),n(m,{elevation:24,sx:{p:2,minWidth:200},children:n(s,{variant:"h6",children:"Elevation 24"})})]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card elevation={0}>No elevation</Card>
<Card elevation={2}>Low elevation</Card>
<Card elevation={8}>Medium elevation</Card>
<Card elevation={24}>High elevation</Card>
`})}),`
`,n(e.h2,{children:"Common Props"}),`
`,n(e.p,{children:"The Card component and its subcomponents accept various props:"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card
  elevation={1} // number (0-24) - shadow depth
  raised={false} // boolean - if true, elevation increases on hover
  sx={{}} // object - custom styles
>
  <CardHeader
    avatar={<Avatar />} // ReactNode
    title="Title" // string | ReactNode
    subheader="Subtitle" // string | ReactNode
    action={<IconButton />} // ReactNode
    titleTypographyProps={{}} // object
    subheaderTypographyProps={{}} // object
  />
  <CardMedia
    component="img" // 'img' | 'video' | 'iframe' | etc.
    image="/path/to/image.jpg" // string
    height={140} // number | string
    alt="Description" // string
  />
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardActions
    disableSpacing={false} // boolean - removes padding between actions
  >
    {/* Action buttons */}
  </CardActions>
</Card>
`})}),`
`,n(e.h2,{children:"Accessibility"}),`
`,n(e.p,{children:"Material UI Cards are built with accessibility in mind:"}),`
`,a(e.ul,{children:[`
`,a(e.li,{children:[n(e.strong,{children:"Semantic HTML"}),": Cards use appropriate semantic elements"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Keyboard navigation"}),": All interactive elements are keyboard accessible"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Screen readers"}),": Proper ARIA labels and roles"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Focus indicators"}),": Clear visual focus indicators for keyboard users"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Alt text"}),": Images in CardMedia should have descriptive alt text"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Color contrast"}),": Meets WCAG guidelines for text contrast"]}),`
`]}),`
`,n(e.h2,{children:"Best Practices"}),`
`,a(e.ol,{children:[`
`,a(e.li,{children:[n(e.strong,{children:"Use cards for grouped content"})," - Cards work best for related information"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Keep content concise"})," - Cards should contain focused, digestible content"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Provide clear actions"})," - Make action buttons clear and accessible"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Use appropriate elevation"})," - Higher elevation draws more attention"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Include meaningful images"})," - Use relevant, high-quality images in CardMedia"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Maintain consistent sizing"})," - Keep card dimensions consistent within a grid"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Consider responsive design"})," - Ensure cards work well on mobile devices"]}),`
`,a(e.li,{children:[n(e.strong,{children:"Use headers effectively"})," - CardHeader is great for metadata and avatars"]}),`
`]}),`
`,n(e.h2,{children:"Examples"}),`
`,n(e.h3,{children:"Product Card"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="200"
    image="/product-image.jpg"
    alt="Product name"
  />
  <CardContent>
    <Typography gutterBottom variant="h5">
      Product Name
    </Typography>
    <Typography variant="h6" color="primary">
      $99.99
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Product description here.
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small" variant="contained" fullWidth>
      Add to Cart
    </Button>
  </CardActions>
</Card>
`})}),`
`,n(e.h3,{children:"Article Card"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card>
  <CardHeader
    avatar={<Avatar>JD</Avatar>}
    title="Article Title"
    subheader="January 1, 2024"
  />
  <CardMedia
    component="img"
    height="194"
    image="/article-image.jpg"
    alt="Article"
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      Article excerpt or summary text goes here.
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Read More</Button>
    <Button size="small">Share</Button>
  </CardActions>
</Card>
`})}),`
`,n(e.h3,{children:"User Profile Card"}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`<Card sx={{ maxWidth: 345 }}>
  <CardContent sx={{ textAlign: "center" }}>
    <Avatar
      sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      src="/avatar.jpg"
    >
      JD
    </Avatar>
    <Typography variant="h5" gutterBottom>
      John Doe
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Product Designer
    </Typography>
    <Typography variant="body2" color="text.secondary">
      San Francisco, CA
    </Typography>
  </CardContent>
  <CardActions sx={{ justifyContent: "center" }}>
    <Button variant="contained">Follow</Button>
    <Button variant="outlined">Message</Button>
  </CardActions>
</Card>
`})}),`
`,n(e.h2,{children:"Documentation"}),`
`,a(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"https://mui.com/material-ui/react-card/",children:"Material UI - Card"})}),`
`]})]})}function ze(t={}){const{wrapper:e}={...J(),...t.components};return e?n(e,{...t,children:n(L,{...t})}):L(t)}export{ze as default};
