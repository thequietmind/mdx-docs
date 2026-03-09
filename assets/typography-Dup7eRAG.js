import{n as o,o as e,p as i,F as l}from"./react-vendor-BFVi4CcX.js";import{T as t,B as h}from"./index-gR3xyJ2r.js";import"./prism-BJUJpkdA.js";import"./router-DlKSSB9a.js";function a(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...r.components};return i(l,{children:[e(n.h1,{children:"Typography"}),`
`,e(n.p,{children:"The Typography component is a fundamental building block for displaying text content in your application. Material UI's Typography component provides consistent, accessible, and customizable text styling with predefined variants that follow design system principles."}),`
`,e(n.p,{children:"Typography components can be used to display text with consistent styling and proper semantic meaning."}),`
`,e(n.h2,{children:"Variants"}),`
`,e(n.p,{children:"Material UI typography comes with several predefined variants that map to common HTML elements:"}),`
`,e(n.h3,{children:"Heading Variants"}),`
`,e(n.h4,{children:"h1 - Main Page Title"}),`
`,e(t,{variant:"h1",children:"Heading 1"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h1">Heading 1</Typography>
`})}),`
`,e(n.h4,{children:"h2 - Section Headers"}),`
`,e(t,{variant:"h2",children:"Heading 2"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h2">Heading 2</Typography>
`})}),`
`,e(n.h4,{children:"h3 - Subsection Headers"}),`
`,e(t,{variant:"h3",children:"Heading 3"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h3">Heading 3</Typography>
`})}),`
`,e(n.h4,{children:"h4 - Component Titles"}),`
`,e(t,{variant:"h4",children:"Heading 4"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h4">Heading 4</Typography>
`})}),`
`,e(n.h4,{children:"h5 - Subcomponent Titles"}),`
`,e(t,{variant:"h5",children:"Heading 5"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h5">Heading 5</Typography>
`})}),`
`,e(n.h4,{children:"h6 - Small Titles"}),`
`,e(t,{variant:"h6",children:"Heading 6"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h6">Heading 6</Typography>
`})}),`
`,e(n.h3,{children:"Body Text Variants"}),`
`,e(n.h4,{children:"Body 1 - Default Body Text"}),`
`,e(t,{variant:"body1",component:"div",children:e(n.p,{children:`This is body1 text. It's the default variant for body text and is used for
most content on the page. It provides good readability and is suitable for
paragraphs, descriptions, and general content.`})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="body1" component="div">
  This is body1 text. It's the default variant for body text.
</Typography>
`})}),`
`,e(n.h4,{children:"Body 2 - Smaller Body Text"}),`
`,e(t,{variant:"body2",component:"div",children:e(n.p,{children:`This is body2 text. It's slightly smaller than body1 and is often used for
secondary information, captions, or when you need to fit more content in a
smaller space.`})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="body2" component="div">
  This is body2 text. It's slightly smaller than body1.
</Typography>
`})}),`
`,e(n.h3,{children:"Special Variants"}),`
`,e(n.h4,{children:"Subtitle 1"}),`
`,e(t,{variant:"subtitle1",children:e(n.p,{children:"Subtitle 1 - Used for subtitles and secondary headings"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="subtitle1">
  Subtitle 1 - Used for subtitles and secondary headings
</Typography>
`})}),`
`,e(n.h4,{children:"Subtitle 2"}),`
`,e(t,{variant:"subtitle2",children:e(n.p,{children:"Subtitle 2 - Smaller subtitle variant"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="subtitle2">
  Subtitle 2 - Smaller subtitle variant
</Typography>
`})}),`
`,e(n.h4,{children:"Caption"}),`
`,e(t,{variant:"caption",children:e(n.p,{children:"Caption text - Used for small text like image captions, footnotes, or metadata"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="caption">
  Caption text - Used for small text like image captions
</Typography>
`})}),`
`,e(n.h4,{children:"Overline"}),`
`,e(t,{variant:"overline",children:e(n.p,{children:"OVERLINE TEXT - Used for small uppercase text like labels or categories"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="overline">
  OVERLINE TEXT - Used for small uppercase text
</Typography>
`})}),`
`,e(n.h2,{children:"Customizing Typography Variants"}),`
`,e(n.p,{children:"You can customize the font-size, font-weight, line-height, and other typography properties for each variant by configuring the theme's typography settings. This allows you to create a consistent design system that matches your brand requirements."}),`
`,e(n.h3,{children:"Theme Configuration"}),`
`,e(n.p,{children:"To customize typography variants, you need to modify your theme configuration. Here's how to do it:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // Customize the default font family
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    // Customize specific variants
    h1: {
      fontSize: "2.5rem", // 40px
      fontWeight: 700, // Bold
      lineHeight: 1.2, // 120%
      letterSpacing: "-0.02em", // Tighter letter spacing
      fontFamily: '"Poppins", sans-serif', // Custom font for headings
    },
    h2: {
      fontSize: "2rem", // 32px
      fontWeight: 600, // Semi-bold
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.75rem", // 28px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem", // 24px
      fontWeight: 500, // Medium
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem", // 20px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.125rem", // 18px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem", // 16px
      fontWeight: 400, // Regular
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    subtitle2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    body2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
      lineHeight: 1.43,
    },
    caption: {
      fontSize: "0.75rem", // 12px
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03em",
    },
    overline: {
      fontSize: "0.75rem", // 12px
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    // You can also add custom variants
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.03em",
      textTransform: "uppercase",
    },
  },
});
`})}),`
`,e(n.h3,{children:"Available Typography Properties"}),`
`,e(n.p,{children:"Each typography variant can be customized with the following properties:"}),`
`,i(n.ul,{children:[`
`,i(n.li,{children:[e(n.strong,{children:"fontSize"}),": Font size (can be px, rem, em, etc.)"]}),`
`,i(n.li,{children:[e(n.strong,{children:"fontWeight"}),": Font weight (100-900, or 'light', 'normal', 'bold', etc.)"]}),`
`,i(n.li,{children:[e(n.strong,{children:"lineHeight"}),": Line height (can be unitless ratio or specific values)"]}),`
`,i(n.li,{children:[e(n.strong,{children:"letterSpacing"}),": Letter spacing (em, px, etc.)"]}),`
`,i(n.li,{children:[e(n.strong,{children:"fontFamily"}),": Font family"]}),`
`,i(n.li,{children:[e(n.strong,{children:"textTransform"}),": Text transformation ('none', 'uppercase', 'lowercase', 'capitalize')"]}),`
`,i(n.li,{children:[e(n.strong,{children:"fontStyle"}),": Font style ('normal', 'italic')"]}),`
`,i(n.li,{children:[e(n.strong,{children:"textDecoration"}),": Text decoration ('none', 'underline', 'line-through')"]}),`
`]}),`
`,e(n.h3,{children:"Responsive Typography"}),`
`,e(n.p,{children:"You can also create responsive typography that adapts to different screen sizes:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2rem", // Default for mobile
      "@media (min-width:600px)": {
        fontSize: "2.5rem", // Tablet and up
      },
      "@media (min-width:900px)": {
        fontSize: "3rem", // Desktop and up
      },
    },
    body1: {
      fontSize: "0.875rem", // Mobile
      "@media (min-width:600px)": {
        fontSize: "1rem", // Tablet and up
      },
    },
  },
});
`})}),`
`,e(n.h3,{children:"Custom Typography Variants"}),`
`,e(n.p,{children:"You can also create completely custom typography variants:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`const theme = createTheme({
  typography: {
    // Custom variant
    display1: {
      fontSize: "3.5rem",
      fontWeight: 300,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      fontFamily: '"Playfair Display", serif',
    },
    display2: {
      fontSize: "2.8125rem",
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      fontFamily: '"Playfair Display", serif',
    },
    // Custom utility variant
    code: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: '"Roboto Mono", monospace',
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      padding: "2px 4px",
      borderRadius: "4px",
    },
  },
});
`})}),`
`,e(n.h3,{children:"Using Custom Variants"}),`
`,e(n.p,{children:"After defining custom variants, you can use them like any other variant:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="display1">
  Custom Display Heading
</Typography>

<Typography variant="code">
  const example = "This is code text";
</Typography>
`})}),`
`,e(n.h3,{children:"Complete Theme Example"}),`
`,e(n.p,{children:"Here's a complete example of how to integrate typography customization into your existing theme:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`// src/themes/lightTheme.js
export const lightTheme = {
  palette: {
    // ... existing palette configuration
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.03em",
      textTransform: "uppercase",
    },
  },
};
`})}),`
`,e(n.h2,{children:"Colors"}),`
`,e(n.p,{children:"Typography supports different color schemes that integrate with your Material UI theme:"}),`
`," ",`
`,e(t,{variant:"h6",color:"primary",children:e(n.p,{children:"Primary Color Text"})}),`
`,e(t,{variant:"h6",color:"secondary",children:e(n.p,{children:"Secondary Color Text"})}),`
`,e(t,{variant:"h6",color:"error",children:e(n.p,{children:"Error Color Text"})}),`
`,e(t,{variant:"h6",color:"warning",children:e(n.p,{children:"Warning Color Text"})}),`
`,e(t,{variant:"h6",color:"info",children:e(n.p,{children:"Info Color Text"})}),`
`,e(t,{variant:"h6",color:"success",children:e(n.p,{children:"Success Color Text"})}),`
`,e(t,{variant:"h6",color:"text.primary",children:e(n.p,{children:"Text Primary"})}),`
`,e(t,{variant:"h6",color:"text.secondary",children:e(n.p,{children:"Text Secondary"})}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h6" color="primary">
  Primary Color Text
</Typography>
<Typography variant="h6" color="secondary">
  Secondary Color Text
</Typography>
<Typography variant="h6" color="error">
  Error Color Text
</Typography>
<Typography variant="h6" color="warning">
  Warning Color Text
</Typography>
<Typography variant="h6" color="info">
  Info Color Text
</Typography>
<Typography variant="h6" color="success">
  Success Color Text
</Typography>
<Typography variant="h6" color="text.primary">
  Text Primary
</Typography>
<Typography variant="h6" color="text.secondary">
  Text Secondary
</Typography>
`})}),`
`,e(n.h2,{children:"Alignment"}),`
`,e(n.p,{children:"Typography components can be aligned in different ways:"}),`
`,i(h,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e(t,{variant:"h6",align:"left",children:e(n.p,{children:"Left Aligned Text"})}),e(t,{variant:"h6",align:"center",children:e(n.p,{children:"Center Aligned Text"})}),e(t,{variant:"h6",align:"right",children:e(n.p,{children:"Right Aligned Text"})}),e(t,{variant:"h6",align:"justify",children:e(n.p,{children:`Justified Text - This text is justified to create even margins on both
sides. It's useful for creating clean, professional-looking paragraphs.`})})]}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h6" align="left">
  Left Aligned Text
</Typography>
<Typography variant="h6" align="center">
  Center Aligned Text
</Typography>
<Typography variant="h6" align="right">
  Right Aligned Text
</Typography>
`})}),`
`,e(n.h2,{children:"Common Props"}),`
`,e(n.p,{children:"The Typography component accepts various props to customize its appearance and behavior:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography
  variant="body1" // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline'
  color="text.primary" // 'initial' | 'inherit' | 'primary' | 'secondary' | 'text.primary' | 'text.secondary' | 'error' | 'warning' | 'info' | 'success'
  align="inherit" // 'inherit' | 'left' | 'center' | 'right' | 'justify'
  gutterBottom={false} // boolean - adds bottom margin
  noWrap={false} // boolean - prevents text wrapping
  paragraph={false} // boolean - adds bottom margin (same as gutterBottom)
  display="initial" // 'initial' | 'block' | 'inline'
  variantMapping={{}} // object - maps variants to HTML elements
>
  Typography content
</Typography>
`})}),`
`,e(n.h2,{children:"Accessibility"}),`
`,e(n.p,{children:"Material UI typography components are built with accessibility in mind:"}),`
`,i(n.ul,{children:[`
`,i(n.li,{children:[e(n.strong,{children:"Semantic HTML"}),": Each variant maps to the appropriate HTML element (h1, h2, p, etc.)"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Screen readers"}),": Proper heading hierarchy and semantic structure"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Color contrast"}),": Meets WCAG guidelines for text contrast ratios"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Focus indicators"}),": Clear visual focus indicators for keyboard navigation"]}),`
`]}),`
`,e(n.h2,{children:"Best Practices"}),`
`,i(n.ol,{children:[`
`,i(n.li,{children:[e(n.strong,{children:"Use proper heading hierarchy"})," - Start with h1 for the main title, then h2, h3, etc."]}),`
`,i(n.li,{children:[e(n.strong,{children:"Choose appropriate variants"})," - Use body1 for main content, body2 for secondary text"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Maintain consistent spacing"})," - Let natural document flow handle spacing"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Consider color contrast"})," - Ensure text is readable in both light and dark modes"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Use semantic meaning"})," - Choose variants based on content meaning, not just appearance"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Customize systematically"})," - When customizing typography, maintain consistency across variants"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Test readability"})," - Ensure your custom font sizes and weights maintain good readability"]}),`
`,i(n.li,{children:[e(n.strong,{children:"Consider responsive design"})," - Use responsive typography for better mobile experience"]}),`
`]}),`
`,e(n.h2,{children:"Examples"}),`
`,e(n.h3,{children:"Article Layout"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="h1">
  Article Title
</Typography>
<Typography variant="subtitle1" color="text.secondary">
  Article subtitle or description
</Typography>
<Typography variant="body1">
  This is the main content of the article. It uses body1 for optimal readability.
</Typography>
<Typography variant="body2" color="text.secondary">
  Additional information or metadata
</Typography>
`})}),`
`,e(n.h3,{children:"Form Labels"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="subtitle2">
  Form Section Title
</Typography>
<Typography variant="body2" color="text.secondary">
  Form field description or help text
</Typography>
`})}),`
`,e(n.h3,{children:"Error Messages"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Typography variant="body2" color="error">
  This field is required
</Typography>
`})}),`
`,e(n.h2,{children:"Documentation"}),`
`,i(n.ul,{children:[`
`,e(n.li,{children:e(n.a,{href:"https://mui.com/material-ui/react-typography/",children:"Material UI - Typography"})}),`
`]})]})}function g(r={}){const{wrapper:n}={...o(),...r.components};return n?e(n,{...r,children:e(a,{...r})}):a(r)}export{g as default};
