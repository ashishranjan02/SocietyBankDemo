import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import members from "../../public/Member.json";

export default function TransactionModule() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("UPI");
  const [narration, setNarration] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [tab, setTab] = useState(0);
  const [notify, setNotify] = useState({ open: false, msg: "", type: "success" });

  useEffect(() => {
    const saved = localStorage.getItem("sb_transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const resetForm = () => {
    setAmount("");
    setNarration("");
    setMode("UPI");
    setToAccount("");
  };

  const handleTransaction = (type) => {
    if (!selectedMember || !amount) {
      setNotify({ open: true, msg: "Please fill all required fields", type: "error" });
      return;
    }

    if (type === "Transfer" && !toAccount) {
      setNotify({ open: true, msg: "Please select recipient account", type: "error" });
      return;
    }

    const txn = {
      txnId: Date.now(),
      
      accountId: selectedMember.accountId,
      memberId: selectedMember.memberId,
      type,

      mode: type === "Transfer" ? mode : "Cash",
      amount: parseFloat(amount),
      toAccount: type === "Transfer" ? toAccount : null,
      narration: narration || `${type} of ₹${amount}`,
      createdAt: new Date().toLocaleString(),
    };

    const newTxns = [txn, ...transactions];
    setTransactions(newTxns);
    localStorage.setItem("sb_transactions", JSON.stringify(newTxns));
    setNotify({ open: true, msg: `${type} Successful!`, type: "success" });
    resetForm();
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Transaction Management
      </Typography>

      {/* Member Selection */}
      <Box mb={3} maxWidth={400}>
        <Typography variant="body1" gutterBottom>
          Select Member:
        </Typography>
        <TextField
          select
          fullWidth
          value={selectedMember?.accountId || ""}
          onChange={(e) =>
            setSelectedMember(members.find((m) => m.accountId === e.target.value))
          }
        >
          <MenuItem value="">-- Choose --</MenuItem>
          {members.map((m) => (
            <MenuItem key={m.id} value={m.accountId}>
              {m.name} — {m.accountId}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Transactions UI - always visible */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab label="Cash Deposit" />
          <Tab label="Withdrawal" />
          <Tab label="Fund Transfer" />
          <Tab label="History" />
        </Tabs>

        {!selectedMember && (
          <Typography mt={3} color="text.secondary">
            Please select a member to perform transactions
          </Typography>
        )}

        {/* Deposit */}
        {tab === 0 && (
          <Box mt={3}>
            <Typography gutterBottom>
              Account: <b>{selectedMember?.accountId || "-"}</b>
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 2 }}
              required
              disabled={!selectedMember}
            />
            <TextField
              fullWidth
              label="Narration"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!selectedMember}
            />
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => handleTransaction("Deposit")}
                disabled={!selectedMember}
              >
                Deposit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={resetForm}
                disabled={!selectedMember}
              >
                Reset
              </Button>
            </Box>
          </Box>
        )}

        {/* Withdrawal */}
        {tab === 1 && (
          <Box mt={3}>
            <Typography gutterBottom>
              Account: <b>{selectedMember?.accountId || "-"}</b>
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 2 }}
              required
              disabled={!selectedMember}
            />
            <TextField
              fullWidth
              label="Narration"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!selectedMember}
            />
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleTransaction("Withdrawal")}
                disabled={!selectedMember}
              >
                Withdraw
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={resetForm}
                disabled={!selectedMember}
              >
                Reset
              </Button>
            </Box>
          </Box>
        )}

        {/* Transfer */}
        {tab === 2 && (
          <Box mt={3}>
            <Typography gutterBottom>
              From Account: <b>{selectedMember?.accountId || "-"}</b>
            </Typography>
            <TextField
              select
              fullWidth
              label="Transfer To"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              sx={{ mb: 2 }}
              required
              disabled={!selectedMember}
            >
              <MenuItem value="">-- Select Recipient --</MenuItem>
              {members
                .filter((m) => m.accountId !== selectedMember?.accountId)
                .map((m) => (
                  <MenuItem key={m.id} value={m.accountId}>
                    {m.name} — {m.accountId}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!selectedMember}
            >
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="NEFT">NEFT</MenuItem>
              <MenuItem value="IMPS">IMPS</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 2 }}
              required
              disabled={!selectedMember}
            />
            <TextField
              fullWidth
              label="Narration"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!selectedMember}
            />
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleTransaction("Transfer")}
                disabled={!selectedMember}
              >
                Transfer
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={resetForm}
                disabled={!selectedMember}
              >
                Reset
              </Button>
            </Box>
          </Box>
        )}

      
       {/* History */}
{tab === 3 && (
  <Box mt={3}>
    <Typography variant="h6" gutterBottom>
      Transaction History
    </Typography>
    <Box sx={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Txn ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Member ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Account ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Member Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mode</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Narration</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => {
          
            const memberData = members.find((m) => m.memberId === txn.memberId);
            return (
              <tr key={txn.txnId}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.txnId}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.memberId}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.accountId}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {memberData ? memberData.name : "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.type}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.mode}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>₹{txn.amount}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.narration}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{txn.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  </Box>
)}

        
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={notify.open}
        autoHideDuration={3000}
        onClose={() => setNotify({ ...notify, open: false })}
      >
        <Alert severity={notify.type}>{notify.msg}</Alert>
      </Snackbar>
    </Box>
  );
}