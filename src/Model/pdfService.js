import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (title, columns, data) => {
  const doc = new jsPDF();
  let yOffset = addHeader(doc, title);
  let pageNumber = 1;

  const body = data.map(row =>
    columns.map(col => {
      let val = row[col];
      if (val === undefined || val === null) return "";
      if (col.toLowerCase().includes("amount") || 
          col.toLowerCase().includes("income") || 
          col.toLowerCase().includes("expense") || 
          col.toLowerCase().includes("profit") || 
          col.toLowerCase().includes("dividend")) {
        return `₹${Number(val).toLocaleString()}`;
      }
      return String(val);
    })
  );

  doc.autoTable({
    startY: yOffset,
    head: [columns.map(col => col.charAt(0).toUpperCase() + col.slice(1))],
    body: body,
    theme: 'grid',
    headStyles: {
      fillColor: [26, 35, 126],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 10,
    },
    bodyStyles: {
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { top: yOffset },
    didDrawPage: function (data) {
      addFooter(doc, pageNumber);
      pageNumber++;
    }
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};

export const generateAllReportsPDF = (reportsData) => {
  const { reports, loanReports, plReports, dividendReports } = reportsData;
  const doc = new jsPDF();
  let pageNumber = 1;
  let yOffset = addHeader(doc, "Comprehensive Reports Summary");

  const addTable = (title, columns, data) => {
    if (yOffset > 250) {
      doc.addPage();
      yOffset = addHeader(doc, "Comprehensive Reports Summary (Continued)");
      pageNumber++;
    }

    doc.setFontSize(12);
    doc.setTextColor(26, 35, 126);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 14, yOffset);
    yOffset += 8;

    if (data.length > 0) {
      const body = data.map(row =>
        columns.map(col => {
          let val = row[col];
          if (val === undefined || val === null) return "";
          if (col.toLowerCase().includes("amount") || 
              col.toLowerCase().includes("income") || 
              col.toLowerCase().includes("expense") || 
              col.toLowerCase().includes("profit") || 
              col.toLowerCase().includes("dividend")) {
            return `₹${Number(val).toLocaleString()}`;
          }
          return String(val);
        })
      );

      doc.autoTable({
        startY: yOffset,
        head: [columns.map(col => col.charAt(0).toUpperCase() + col.slice(1))],
        body: body,
        theme: 'grid',
        headStyles: {
          fillColor: [57, 73, 171],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 8,
        },
        margin: { top: yOffset },
        didDrawPage: function (data) {
          addFooter(doc, pageNumber);
        }
      });

      yOffset = doc.lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'italic');
      doc.text("No data available", 14, yOffset);
      yOffset += 10;
    }
  };

  // Add summary statistics
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Reports: ${reports.length + loanReports.length + plReports.length + dividendReports.length}`, 14, yOffset);
  yOffset += 20;

  addTable("Financial Reports", ["id", "type", "date", "amount", "description"], reports);
  addTable("Loan Outstanding Reports", ["id", "member", "loanAmount", "dueDate"], loanReports);
  addTable("Profit & Loss Reports", ["id", "date", "income", "expense", "profitLoss"], plReports);
  addTable("Member Dividend Reports", ["id", "memberId", "name", "email", "dividendAmount", "period"], dividendReports);

  // Add final summary
  if (yOffset > 200) {
    doc.addPage();
    yOffset = addHeader(doc, "Report Summary");
    pageNumber++;
  }

  doc.setFontSize(11);
  doc.setTextColor(26, 35, 126);
  doc.setFont('helvetica', 'bold');
  doc.text("Summary Statistics", 14, yOffset);
  yOffset += 10;

  const totalIncome = plReports.reduce((sum, report) => sum + Number(report.income), 0);
  const totalExpense = plReports.reduce((sum, report) => sum + Number(report.expense), 0);
  const totalProfit = totalIncome - totalExpense;

  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Financial Reports: ${reports.length}`, 14, yOffset);
  doc.text(`Total Loan Reports: ${loanReports.length}`, 14, yOffset + 5);
  doc.text(`Total P&L Reports: ${plReports.length}`, 14, yOffset + 10);
  doc.text(`Total Dividend Reports: ${dividendReports.length}`, 14, yOffset + 15);
  doc.text(`Net Profit/Loss: ₹${totalProfit.toLocaleString()}`, 14, yOffset + 20);

  doc.save("Society_Bank_Comprehensive_Reports.pdf");
};

const addHeader = (doc, title) => {
  // Company name instead of logo
  doc.setFontSize(20);
  doc.setTextColor(26, 35, 126);
  doc.setFont('helvetica', 'bold');
  doc.text('Society Bank', 14, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(128, 128, 128);
  doc.setFont('helvetica', 'normal');
  doc.text('Premium Banking Solutions', 14, 27);
  
  // Report title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 40);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 47);
  
  return 55; // Return the Y position after header
};

const addFooter = (doc, pageNumber) => {
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  
  // Footer line
  doc.setDrawColor(200, 200, 200);
  doc.line(14, pageHeight - 20, 196, pageHeight - 20);
  
  // Footer text
  doc.text('Society Bank - Confidential Report', 14, pageHeight - 15);
  doc.text(`Page ${pageNumber}`, 196, pageHeight - 15, { align: 'right' });
  doc.text('© 2024 Society Bank. All rights reserved.', 105, pageHeight - 10, { align: 'center' });
};