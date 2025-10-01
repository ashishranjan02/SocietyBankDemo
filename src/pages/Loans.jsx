import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Divider,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import memberData from "../../public/Member.json";

const steps = ["Select Member", "Loan Details", "Contact Info", "Preview & Submit"];

export default function SmartLoanApplication() {
  const [activeStep, setActiveStep] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");

  const [form, setForm] = useState({
    applicantName: "",
    fatherHusbandName: "",
    membershipNo: "",
    purpose: "",
    monthlyIncome: "",
    requiredLoan: "",
    tenure: "",
    presentAddress: "",
    permanentAddress: "",
    residenceType: "",
    maritalStatus: "",
    dob: "",
    age: "",
    mobile: "",
    email: "",
    pan: "",
    aadhar: "",
  });

  // Load member data
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
      setForm((prev) => ({
        ...prev,
        applicantName: member.name,
        membershipNo: member.memberId,
        mobile: member.mobile || "",
        email: member.email || "",
        age: member.age || "",
        maritalStatus: member.maritalStatus || "",
        presentAddress: member.presentAddress || "",
        permanentAddress: member.permanentAddress || "",
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Save loan to member
      const loan = {
        loanId: uuidv4(),
        product: form.purpose,
        principal: parseFloat(form.requiredLoan),
        tenureMonths: parseInt(form.tenure),
        interest: 10, // Fixed interest example
        emi: calculateEMI().toFixed(2),
        totalPayable: (calculateEMI() * parseInt(form.tenure)).toFixed(2),
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      const updatedMembers = members.map((m) =>
        m.memberId === selectedMember
          ? { ...m, loans: [...(m.loans || []), loan] }
          : m
      );

      setMembers(updatedMembers);
      localStorage.setItem("members", JSON.stringify(updatedMembers));

      alert("✅ Loan Application Submitted Successfully!");
      // Reset form
      setForm({
        applicantName: "",
        fatherHusbandName: "",
        membershipNo: "",
        purpose: "",
        monthlyIncome: "",
        requiredLoan: "",
        tenure: "",
        presentAddress: "",
        permanentAddress: "",
        residenceType: "",
        maritalStatus: "",
        dob: "",
        age: "",
        mobile: "",
        email: "",
        pan: "",
        aadhar: "",
      });
      setSelectedMember("");
      setPhoto(null);
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const calculateEMI = () => {
    const P = parseFloat(form.requiredLoan) || 0;
    const R = 10 / 100 / 12; // 10% yearly
    const N = parseInt(form.tenure) || 0;
    return N && P ? (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1) : 0;
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 8, background: "linear-gradient(135deg,#e3f2fd,#ffffff)", p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 3 }}>
            Loan Application Form
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Box textAlign="center" mb={2}>
                <Avatar src={photo} sx={{ width: 100, height: 100, margin: "auto", border: "2px solid #1976d2" }} />
                <IconButton color="primary" component="label">
                  <input hidden accept="image/*" type="file" onChange={handlePhotoUpload} />
                  <PhotoCamera />
                </IconButton>
              </Box>

              <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                <InputLabel>Select Member</InputLabel>
                <Select value={selectedMember} onChange={handleMemberChange} required>
                  {members.map((m) => (
                    <MenuItem key={m.memberId} value={m.memberId}>
                      {m.name} ({m.memberId})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField fullWidth label="Applicant Name" name="applicantName" value={form.applicantName} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Father/Husband Name" name="fatherHusbandName" value={form.fatherHusbandName} onChange={handleChange} sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} sx={{ mb: 2 }}>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField fullWidth type="date" label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField fullWidth type="number" label="Age" name="age" value={form.age} onChange={handleChange} />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <TextField fullWidth label="Purpose of Loan" name="purpose" value={form.purpose} onChange={handleChange} sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" fullWidth label="Monthly Income" name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" fullWidth label="Required Loan Amount" name="requiredLoan" value={form.requiredLoan} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type="number" fullWidth label="Tenure (Months)" name="tenure" value={form.tenure} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ textAlign: "center", background: "#f8fafc", borderRadius: 2 }}>
                    <Typography variant="body1" color="text.secondary">Estimated EMI:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>₹{calculateEMI().toFixed(2)}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="PAN Card No." name="pan" value={form.pan} onChange={handleChange} sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Aadhar No." name="aadhar" value={form.aadhar} onChange={handleChange} sx={{ mb: 2 }} />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <TextField fullWidth label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth type="email" label="Email" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Present Address" name="presentAddress" value={form.presentAddress} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Permanent Address" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} sx={{ mb: 2 }} />
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>Preview Loan Application</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box textAlign="center" mb={2}>
                <Avatar src={photo} sx={{ width: 100, height: 100, margin: "auto" }} />
              </Box>
              <Grid container spacing={2}>
                {Object.entries(form).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{key.replace(/([A-Z])/g, " $1")}:</Typography>
                    <Typography variant="body2" color="text.secondary">{value || "-"}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" sx={{ borderRadius: 3 }}>Back</Button>
            <Button onClick={handleNext} variant="contained" sx={{ px: 4, borderRadius: 3, background: "linear-gradient(90deg,#1976d2,#42a5f5)" }}>
              {activeStep === steps.length - 1 ? "Confirm & Submit" : "Next"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
