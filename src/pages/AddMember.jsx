import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Stepper,
    Step,
    StepLabel,
    TextField,
    MenuItem,
    Typography,
    Avatar,
    IconButton,
    Card,
    CardContent,
    Divider,
    Grid,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const steps = ["Personal Info", "Contact & Address", "Documents", "Preview & Submit"];

export default function AddMember() {
    const [activeStep, setActiveStep] = useState(0);
    const [photo, setPhoto] = useState(null);

    const [formData, setFormData] = useState({
        applicantName: "",
        fatherHusbandName: "",
        motherName: "",
        dob: "",
        age: "",
        gender: "",
        maritalStatus: "",
        monthlyIncome: "",
        occupation: "",
        residenceType: "",
        correspondenceAddress: "",
        permanentAddress: "",
        contact: "",
        email: "",
        pan: "",
        aadhar: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            console.log("Submitted Data:", formData);
            alert("✅ Application Submitted!");
        }
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
    };

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Card
                sx={{
                    borderRadius: 4,
                    boxShadow: 8,
                    background: "linear-gradient(135deg,#e3f2fd,#ffffff)",
                    p: 2,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#1e3a8a" }}
                    >
                        Application For New Membership 
                    </Typography>

                    {/* Stepper */}
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Step Content */}
                    {activeStep === 0 && (
                        <Box>
                            <Box textAlign="center" mb={2}>
                                <Avatar
                                    src={photo}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        margin: "auto",
                                        border: "2px solid #1976d2",
                                    }}
                                />
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                >
                                    <input hidden accept="image/*" type="file" onChange={handlePhotoUpload} />
                                    <PhotoCamera />
                                </IconButton>
                            </Box>
                            <TextField
                                fullWidth
                                label="Applicant Name"
                                name="applicantName"
                                value={formData.applicantName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Father/Husband Name"
                                name="fatherHusbandName"
                                value={formData.fatherHusbandName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Mother's Name"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                type="date"
                                label="Date of Birth"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                select
                                fullWidth
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                            <TextField
                                select
                                fullWidth
                                label="Marital Status"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Married">Married</MenuItem>
                            </TextField>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Monthly Income"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                select
                                fullWidth
                                label="Residence Type"
                                name="residenceType"
                                value={formData.residenceType}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="Owned">Owned</MenuItem>
                                <MenuItem value="Rented">Rented</MenuItem>
                                <MenuItem value="Company Provided">Company Provided</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Correspondence Address"
                                name="correspondenceAddress"
                                value={formData.correspondenceAddress}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="Permanent Address"
                                name="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                multiline
                                rows={2}
                            />
                        </Box>
                    )}

                    {activeStep === 2 && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="PAN Card No."
                                name="pan"
                                value={formData.pan}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Aadhar No."
                                name="aadhar"
                                value={formData.aadhar}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                    )}

                    {activeStep === 3 && (
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                                📋 Preview Your Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box textAlign="center" mb={3}>
                                <Avatar
                                    src={photo}
                                    sx={{ width: 100, height: 100, margin: "auto" }}
                                />
                            </Box>
                            <Grid container spacing={2}>
                                {Object.entries(formData).map(([key, value]) => (
                                    <Grid item xs={6} key={key}>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                            {key.replace(/([A-Z])/g, " $1")}:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {value || "-"}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* Navigation Buttons */}
                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                            sx={{ borderRadius: 3 }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            sx={{
                                px: 4,
                                borderRadius: 3,
                                background: "linear-gradient(90deg,#1976d2,#42a5f5)",
                            }}
                        >
                            {activeStep === steps.length - 1 ? "Confirm & Submit" : "Next"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
