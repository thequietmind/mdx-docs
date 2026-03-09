import{n as r,o as n,p as o,F as s}from"./react-vendor-BFVi4CcX.js";function c(t){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...r(),...t.components};return o(s,{children:[n(e.h1,{children:"mdx-docs"}),`
`,n(e.p,{children:"Welcome to the mdx-docs example. This is the default demo site for the package."}),`
`,n(e.h2,{children:"Getting Started"}),`
`,n(e.p,{children:"Create a site repo and install the package:"}),`
`,n(e.pre,{children:n(e.code,{className:"language-sh",children:`npm install mdx-docs
`})}),`
`,o(e.p,{children:["Then in your ",n(e.code,{children:"main.jsx"}),":"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`import { createApp } from "mdx-docs";
import { pages } from "./config/pages.js";
import { site } from "./config/site.js";

createApp({ pages, site });
`})})]})}function i(t={}){const{wrapper:e}={...r(),...t.components};return e?n(e,{...t,children:n(c,{...t})}):c(t)}export{i as default};
