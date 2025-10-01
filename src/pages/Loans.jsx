// src/pages/ApplicationForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import memberData from "../../public/Member.json";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [form, setForm] = useState({
    id: "",
    loanId: "",
    memberId: "",
    product: "",
    principal: "",
    interest: "",
    tenureMonths: "",
  });

  // ✅ Load members: first from localStorage, else from Member.json
 useEffect(() => {
  const stored = localStorage.getItem("members");
  if (stored) {
    setMembers(JSON.parse(stored));
  } else {
    setMembers(memberData);
    localStorage.setItem("members", JSON.stringify(memberData));
  }
}, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (e) => {
    const memberId = e.target.value;
    setSelectedMember(memberId);

    const member = members.find((m) => m.memberId === memberId);
    if (member) {
      setForm((f) => ({
        ...f,
        memberId: member.memberId,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const membersData = JSON.parse(localStorage.getItem("members") || "[]");

    // EMI Calculation
    const P = parseFloat(form.principal);
    const annualRate = parseFloat(form.interest);
    const N = parseInt(form.tenureMonths, 10);
    const R = annualRate / 12 / 100;

    const emi =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const newLoan = {
      ...form,
      id: uuidv4(),
      loanId: "LOAN-" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
      emi: emi.toFixed(2),
      totalPayable: (emi * N).toFixed(2),
      repaymentSchedule: [],
    };

    // ✅ Add loan to the correct member
    const updatedMembers = membersData.map((m) => {
      if (m.memberId === form.memberId) {
        return {
          ...m,
          loans: [...(m.loans || []), newLoan],
        };
      }
      return m;
    });

    localStorage.setItem("members", JSON.stringify(updatedMembers));
    setMembers(updatedMembers);

    alert("Loan added for " + form.memberId);

    // Reset form
    setForm({
      id: "",
      loanId: "",
      memberId: "",
      product: "",
      principal: "",
      interest: "",
      tenureMonths: "",
    });
    setSelectedMember("");

    navigate("/approvalloan");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Loan Application Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Member Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="member-select-label">Select Member</InputLabel>
            <Select
              labelId="member-select-label"
              label="member-select-label"
              value={selectedMember}
              onChange={handleMemberChange}
              required
            >
              {members.map((m) => (
                <MenuItem key={m.memberId} value={m.memberId}>
                  {m.name} ({m.memberId})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="product-label">Loan Item</InputLabel>
            <Select
              labelId="product-label"
              label="product-label"
              name="product"
              value={form.product}
              onChange={handleChange}
              required
            >
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Car">Car</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Gold">Gold Loan</MenuItem>
              <MenuItem value="Business">Business Loan</MenuItem>
              <MenuItem value="Vehicle">Vehicle Loan</MenuItem>
              <MenuItem value="Mortgage">Mortgage</MenuItem>
              <MenuItem value="EducationPlus">Education Plus</MenuItem>
              <MenuItem value="Agriculture">Agriculture Loan</MenuItem>
            </Select>
          </FormControl>


          <TextField
            fullWidth
            label="Principal Amount"
            name="principal"
            type="number"
            value={form.principal}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Interest (%)"
            name="interest"
            type="number"
            value={form.interest}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Tenure (Months)"
            name="tenureMonths"
            type="number"
            value={form.tenureMonths}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Submit Application
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}