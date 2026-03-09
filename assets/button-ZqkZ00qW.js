import{n as a,o as e,p as t,F as c}from"./react-vendor-BFVi4CcX.js";import{B as i}from"./Button-MWXAgNH2.js";import"./prism-BJUJpkdA.js";import"./index-gR3xyJ2r.js";import"./router-DlKSSB9a.js";function o(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...r.components};return t(c,{children:[e(n.h1,{children:"Button"}),`
`,t(n.p,{children:["The ",e(n.code,{children:"Button"})," component is a fundamental UI element that allows users to trigger actions and events. Material UI's Button component provides a consistent, accessible, and customizable button implementation."]}),`
`,e(n.p,{children:"Buttons can be used to trigger actions, submit forms, or navigate to different pages."}),`
`,e(n.h2,{children:"Variants"}),`
`,e(n.p,{children:"Material UI buttons come in several variants to suit different use cases:"}),`
`,e(n.h3,{children:"Contained Button"}),`
`,e(n.p,{children:"The most prominent button style, used for primary actions:"}),`
`,e(i,{variant:"contained",color:"primary",children:e(n.p,{children:"Primary Action"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Button variant="contained" color="primary">
  Primary Action
</Button>
`})}),`
`,e(n.h3,{children:"Outlined Button"}),`
`,e(n.p,{children:"Used for secondary actions or when you want a less prominent button:"}),`
`,e(i,{variant:"outlined",color:"secondary",children:e(n.p,{children:"Secondary Action"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Button variant="outlined" color="secondary">
  Secondary Action
</Button>
`})}),`
`,e(n.h3,{children:"Text Button"}),`
`,e(n.p,{children:"The most subtle button style, often used for tertiary actions:"}),`
`,e(i,{variant:"text",color:"inherit",children:e(n.p,{children:"Text Button"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Button variant="text" color="inherit">
  Text Button
</Button>
`})}),`
`,e(n.h2,{children:"Colors"}),`
`,e(n.p,{children:"Buttons support different color schemes:"}),`
`,e(i,{variant:"contained",color:"primary",sx:{mr:.5,mb:1},children:e(n.p,{children:"Primary"})}),`
`,e(i,{variant:"contained",color:"secondary",sx:{mr:.5,mb:1},children:e(n.p,{children:"Secondary"})}),`
`,e(i,{variant:"contained",color:"success",sx:{mr:.5,mb:1},children:e(n.p,{children:"Success"})}),`
`,e(i,{variant:"contained",color:"error",sx:{mb:1},children:e(n.p,{children:"Error"})}),`
`,e(n.h2,{children:"Sizes"}),`
`,e(n.p,{children:"Buttons come in three sizes to accommodate different design needs:"}),`
`,e(i,{size:"small",variant:"contained",sx:{mr:.5,mb:1},children:e(n.p,{children:"Small"})}),`
`,e(i,{size:"medium",variant:"contained",sx:{mr:.5,mb:1},children:e(n.p,{children:"Medium"})}),`
`,e(i,{size:"large",variant:"contained",sx:{mb:1},children:e(n.p,{children:"Large"})}),`
`,e(n.h2,{children:"Common Props"}),`
`,e(n.p,{children:"The Button component accepts various props to customize its appearance and behavior:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Button
  variant="contained" // 'text' | 'outlined' | 'contained'
  color="primary" // 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  size="medium" // 'small' | 'medium' | 'large'
  disabled={false} // boolean
  fullWidth={false} // boolean
  startIcon={<Icon />} // ReactNode
  endIcon={<Icon />} // ReactNode
  onClick={handleClick} // function
>
  Button Text
</Button>
`})}),`
`,e(n.h2,{children:"Accessibility"}),`
`,e(n.p,{children:"Material UI buttons are built with accessibility in mind:"}),`
`,t(n.ul,{children:[`
`,t(n.li,{children:[e(n.strong,{children:"Keyboard navigation"}),": Buttons can be focused and activated using the keyboard"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Screen readers"}),": Proper ARIA labels and roles are automatically applied"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Color contrast"}),": Meets WCAG guidelines for color contrast ratios"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Focus indicators"}),": Clear visual focus indicators for keyboard users"]}),`
`]}),`
`,e(n.h2,{children:"Best Practices"}),`
`,t(n.ol,{children:[`
`,t(n.li,{children:[e(n.strong,{children:"Use clear, action-oriented text"})," that describes what the button does"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Choose appropriate variants"})," - contained for primary actions, outlined for secondary"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Maintain consistent sizing"})," within your interface"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Provide loading states"})," for buttons that trigger async operations"]}),`
`,t(n.li,{children:[e(n.strong,{children:"Use appropriate colors"})," to convey meaning (success, error, etc.)"]}),`
`]}),`
`,e(n.h2,{children:"Examples"}),`
`,e(n.h3,{children:"Button with Icons"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import { Button } from '@mui/material';
import { Send, Download } from '@mui/icons-material';

<Button variant="contained" startIcon={<Send />}>
  Send Message
</Button>

<Button variant="outlined" endIcon={<Download />}>
  Download File
</Button>
`})}),`
`,e(n.h3,{children:"Disabled State"}),`
`,t(n.p,{children:["Use the ",e(n.code,{children:"disabled"})," attribute to specify that a button should be disabled."]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Button variant="contained" disabled>
  Disabled Button
</Button>
`})}),`
`,e(n.h3,{children:"Full Width Button"}),`
`,t(n.p,{children:["Use the ",e(n.code,{children:"fullWidth"})," attribute to specify that a button should be full width."]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Button variant="contained" fullWidth>
  Full Width Button
</Button>
`})}),`
`,e(n.h2,{children:"Documentation"}),`
`,t(n.ul,{children:[`
`,e(n.li,{children:e(n.a,{href:"https://mui.com/material-ui/react-button/",children:"Material UI - Button"})}),`
`]})]})}function m(r={}){const{wrapper:n}={...a(),...r.components};return n?e(n,{...r,children:e(o,{...r})}):o(r)}export{m as default};
