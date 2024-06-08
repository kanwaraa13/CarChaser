import React from 'react';
import html2pdf from 'html2pdf.js';
export const Pdf = () => {
const generatePdf = () => {
const htmlContent = `
<h1>Hello, World!</h1>
<p>This is a demo PDF generation from HTML in React.</p>
<h2>pardep</h2>
<!-- Add more HTML content here -->
`;
const pdf = html2pdf().from(htmlContent);
pdf.toPdf().output('dataurlnewwindow');
//html2pdf().from(htmlContent).save();
};
return (
<div>
   <button onClick={generatePdf}>Generate PDF</button>
</div>
);
};