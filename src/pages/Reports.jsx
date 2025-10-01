import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { generatePDF, generateAllReportsPDF } from "../Model/pdfService";

// Mock Members
const members = [
  { memberId: "MSR-0001", name: "Satyam Ray", email: "satyam.ray@example.com" },
  { memberId: "MSR-0002", name: "Ananya Singh", email: "ananya.singh@example.com" },
  { memberId: "MSR-0003", name: "Rohit Sharma", email: "rohit.sharma@example.com" },
  { memberId: "MSR-0004", name: "Priya Nair", email: "priya.nair@example.com" },
  { memberId: "MSR-0005", name: "Vikram Patel", email: "vikram.patel@example.com" },
  { memberId: "MSR-0006", name: "Sneha Verma", email: "sneha.verma@example.com" },
  { memberId: "MSR-0007", name: "Amitabh Singh", email: "amitabh.singh@example.com" },
  { memberId: "MSR-0008", name: "Meera Joshi", email: "meera.joshi@example.com" },
  { memberId: "MSR-0009", name: "Rakesh Kumar", email: "rakesh.kumar@example.com" },
  { memberId: "MSR-0010", name: "Anjali Mehta", email: "anjali.mehta@example.com" },
];

const Reports = () => {
  const [tab, setTab] = useState(0);

  // Financial Reports
  const [reportType, setReportType] = useState("daily");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState([]);

  // Loan Reports
  const [loanMember, setLoanMember] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loanReports, setLoanReports] = useState([]);

  // Profit & Loss Reports
  const [plDate, setPlDate] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [plReports, setPlReports] = useState([]);

  // Dividend Reports
  const [selectedMember, setSelectedMember] = useState("");
  const [dividendAmount, setDividendAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [dividendReports, setDividendReports] = useState([]);

  // --- Add handlers ---
  const handleAddReport = () => {
    if (!date || !amount || !description) return;
    setReports([...reports, { id: reports.length + 1, type: reportType, date, amount, description }]);
    setDate(""); setAmount(""); setDescription("");
  };

  const handleAddLoanReport = () => {
    if (!loanMember || !loanAmount || !dueDate) return;
    setLoanReports([...loanReports, { id: loanReports.length + 1, member: loanMember, loanAmount, dueDate }]);
    setLoanMember(""); setLoanAmount(""); setDueDate("");
  };

  const handleAddPLReport = () => {
    if (!plDate || !income || !expense) return;
    setPlReports([...plReports, { id: plReports.length + 1, date: plDate, income, expense, profitLoss: Number(income) - Number(expense) }]);
    setPlDate(""); setIncome(""); setExpense("");
  };

  const handleAddDividendReport = () => {
    if (!selectedMember || !dividendAmount || !period) return;
    const member = members.find(m => m.memberId === selectedMember);
    setDividendReports([...dividendReports, { id: dividendReports.length + 1, memberId: member.memberId, name: member.name, email: member.email, dividendAmount, period }]);
    setSelectedMember(""); setDividendAmount(""); setPeriod("");
  };

  // --- PDF Download Handlers ---
  const handleDownloadPDF = (title, columns, data) => {
    generatePDF(title, columns, data);
  };

  const handleDownloadAllReports = () => {
    generateAllReportsPDF({
      reports,
      loanReports,
      plReports,
      dividendReports
    });
  };

  // --- Print Handlers ---
  const handlePrint = (tableId, title) => {
    const printContent = document.getElementById(tableId);
    if (!printContent) {
      console.error(`Table with id ${tableId} not found`);
      return;
    }

    const WinPrint = window.open("", "_blank", "width=900,height=650");
    if (!WinPrint) {
      alert("Popup blocked! Please allow popups for this site to print.");
      return;
    }

    WinPrint.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Society Bank - ${title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px; 
              color: #333;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 3px solid #1a237e; 
              padding-bottom: 15px;
            }
            .company-name { 
              font-size: 28px; 
              font-weight: bold; 
              color: #1a237e; 
              margin-bottom: 5px;
            }
            .subtitle { 
              color: #666; 
              font-size: 16px; 
              margin-bottom: 10px;
            }
            .report-title { 
              font-size: 20px; 
              color: #333; 
              margin-top: 10px;
            }
            .report-date { 
              color: #888; 
              font-size: 14px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            th { 
              background-color: #1a237e; 
              color: white; 
              padding: 12px; 
              text-align: left; 
              font-weight: bold;
              border: 1px solid #ddd;
            }
            td { 
              padding: 10px; 
              border: 1px solid #ddd; 
            }
            tr:nth-child(even) { 
              background-color: #f8f9fa; 
            }
            tr:hover { 
              background-color: #e9ecef; 
            }
            .footer { 
              margin-top: 40px; 
              text-align: center; 
              font-size: 12px; 
              color: #666; 
              border-top: 1px solid #ddd; 
              padding-top: 15px;
            }
            .amount { 
              font-weight: bold; 
              color: #1a237e; 
            }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Society Bank</div>
            <div class="subtitle">Premium Banking Solutions</div>
            <div class="report-title">${title}</div>
            <div class="report-date">Generated on: ${new Date().toLocaleDateString()}</div>
          </div>
          ${printContent.outerHTML}
          <div class="footer">
            <p>© 2024 Society Bank. All rights reserved.</p>
            <p>Confidential Report - For Internal Use Only</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            }
          </script>
        </body>
      </html>
    `);
    
    WinPrint.document.close();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom color="primary">
        Reports
      </Typography>

      {/* Download All Reports Button */}
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleDownloadAllReports}
        sx={{ mb: 2 }}
      >
        Download All Reports PDF
      </Button>

      <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="Financial Reports" />
        <Tab label="Loan Outstanding Reports" />
        <Tab label="Profit & Loss Reports" />
        <Tab label="Member Dividend Reports" />
      </Tabs>

      {/* ================== Financial Reports ================== */}
      {tab === 0 && (
        <>
          <Card sx={{ mb: 3, borderLeft: '4px solid #1a237e' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Add {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField select label="Report Type" value={reportType} onChange={(e) => setReportType(e.target.value)} fullWidth>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField type={reportType === "daily" ? "date" : "month"} label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField type="number" label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleAddReport} disabled={!date || !amount || !description}>
                    Add Report
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box mb={2}>
            <Button 
              sx={{ mr: 1 }} 
              variant="outlined" 
              onClick={() => handleDownloadPDF("Financial Reports", ["id", "type", "date", "amount", "description"], reports)}
            >
              Download PDF
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => handlePrint("financial-table", "Financial Reports")}
            >
              Print
            </Button>
          </Box>

          <Paper id="financial-table" sx={{ overflowX: "auto", border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1a237e' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.length > 0 ? (
                  reports.map(r => (
                    <TableRow key={r.id} hover>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1a237e' }}>₹{r.amount}</TableCell>
                      <TableCell>{r.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No financial reports added yet</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}

      {/* ================== Loan Reports ================== */}
      {tab === 1 && (
        <>
          <Card sx={{ mb: 3, borderLeft: '4px solid #3949ab' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Add Loan Outstanding Report
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField select label="Select Member" value={loanMember} onChange={(e) => setLoanMember(e.target.value)} fullWidth>
                    <MenuItem value="">Select Member</MenuItem>
                    {members.map(m => <MenuItem key={m.memberId} value={m.name}>{m.memberId} - {m.name}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}><TextField type="number" label="Loan Amount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><TextField type="date" label="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                <Grid item xs={12}><Button variant="contained" color="secondary" onClick={handleAddLoanReport} disabled={!loanMember || !loanAmount || !dueDate}>Add Loan Report</Button></Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box mb={2}>
            <Button sx={{ mr: 1 }} variant="outlined" onClick={() => handleDownloadPDF("Loan Reports", ["id", "member", "loanAmount", "dueDate"], loanReports)}>Download PDF</Button>
            <Button variant="outlined" onClick={() => handlePrint("loan-table", "Loan Outstanding Reports")}>Print</Button>
          </Box>

          <Paper id="loan-table" sx={{ overflowX: "auto", border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#3949ab' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Member</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Loan Amount</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanReports.length > 0 ? (
                  loanReports.map(l => (
                    <TableRow key={l.id} hover>
                      <TableCell>{l.id}</TableCell>
                      <TableCell>{l.member}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#3949ab' }}>₹{l.loanAmount}</TableCell>
                      <TableCell>{l.dueDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No loan reports added yet</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}

      {/* ================== Profit & Loss Reports ================== */}
      {tab === 2 && (
        <>
          <Card sx={{ mb: 3, borderLeft: '4px solid #2e7d32' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Add Profit & Loss Report
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}><TextField type="month" label="Month" value={plDate} onChange={(e) => setPlDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                <Grid item xs={12} sm={4}><TextField type="number" label="Total Income" value={income} onChange={(e) => setIncome(e.target.value)} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><TextField type="number" label="Total Expense" value={expense} onChange={(e) => setExpense(e.target.value)} fullWidth /></Grid>
                <Grid item xs={12}><Button variant="contained" color="success" onClick={handleAddPLReport} disabled={!plDate || !income || !expense}>Add Report</Button></Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box mb={2}>
            <Button sx={{ mr: 1 }} variant="outlined" onClick={() => handleDownloadPDF("Profit & Loss Reports", ["id", "date", "income", "expense", "profitLoss"], plReports)}>Download PDF</Button>
            <Button variant="outlined" onClick={() => handlePrint("pl-table", "Profit & Loss Reports")}>Print</Button>
          </Box>

          <Paper id="pl-table" sx={{ overflowX: "auto", border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#2e7d32' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Month</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Income</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Expense</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Profit / Loss</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plReports.length > 0 ? (
                  plReports.map(pl => (
                    <TableRow key={pl.id} hover>
                      <TableCell>{pl.id}</TableCell>
                      <TableCell>{pl.date}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>₹{pl.income}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#d32f2f' }}>₹{pl.expense}</TableCell>
                      <TableCell style={{ fontWeight: 'bold', color: pl.profitLoss >= 0 ? "#2e7d32" : "#d32f2f" }}>₹{pl.profitLoss}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No profit & loss reports added yet</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}

      {/* ================== Dividend Reports ================== */}
      {tab === 3 && (
        <>
          <Card sx={{ mb: 3, borderLeft: '4px solid #0288d1' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Add Member Dividend Report
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField select label="Select Member" value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} fullWidth>
                    <MenuItem value="">Select Member</MenuItem>
                    {members.map(m => <MenuItem key={m.memberId} value={m.memberId}>{m.memberId} - {m.name}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}><TextField type="number" label="Dividend Amount" value={dividendAmount} onChange={(e) => setDividendAmount(e.target.value)} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><TextField type="month" label="Period" value={period} onChange={(e) => setPeriod(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                <Grid item xs={12}><Button variant="contained" color="info" onClick={handleAddDividendReport} disabled={!selectedMember || !dividendAmount || !period}>Add Dividend Report</Button></Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box mb={2}>
            <Button sx={{ mr: 1 }} variant="outlined" onClick={() => handleDownloadPDF("Dividend Reports", ["id", "memberId", "name", "email", "dividendAmount", "period"], dividendReports)}>Download PDF</Button>
            <Button variant="outlined" onClick={() => handlePrint("dividend-table", "Member Dividend Reports")}>Print</Button>
          </Box>

          <Paper id="dividend-table" sx={{ overflowX: "auto", border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#0288d1' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Member ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dividend Amount</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Period</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dividendReports.length > 0 ? (
                  dividendReports.map(d => (
                    <TableRow key={d.id} hover>
                      <TableCell>{d.id}</TableCell>
                      <TableCell>{d.memberId}</TableCell>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>{d.email}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>₹{d.dividendAmount}</TableCell>
                      <TableCell>{d.period}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No dividend reports added yet</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Reports;