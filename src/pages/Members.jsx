// src/pages/Members.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Snackbar,
  Alert,
  CircularProgress,
  Tab
} from '@mui/material';
import {
  Search,
  Add,
  PersonAdd,
  VerifiedUser,
  Payment,
  ManageAccounts,
  CloudUpload
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import membersData from "../../public/Member.json";
import { useNavigate } from 'react-router-dom';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: `1px solid ${theme.palette.divider}`,
}));

const StatsCard = styled(Card)(({ theme, color }) => ({
  background: color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '16px',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 120,
    height: 120,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
  }
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: 600,
  borderRadius: '8px',
  ...(status === 'active' && {
    background: 'linear-gradient(135deg, #4caf50, #45a049)',
    color: 'white'
  }),
  ...(status === 'inactive' && {
    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
    color: 'white'
  }),
  ...(status === 'suspended' && {
    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
    color: 'white'
  }),
  ...(status === 'pending' && {
    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
    color: 'white'
  })
}));

const KYCStatusChip = styled(Chip)(({ verified }) => ({
  fontWeight: 600,
  borderRadius: '8px',
  ...(verified ? {
    background: 'linear-gradient(135deg, #4caf50, #45a049)',
    color: 'white'
  } : {
    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
    color: 'white'
  })
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    setLoading(true);
    setTimeout(() => {
      // Add membershipFee field to each member since your JSON doesn't have it
      const membersWithFees = membersData.map(member => ({
        ...member,
        membershipFee: {
          paid: Math.random() > 0.3, // Randomize for demo (70% paid)
          amount: 1000,
          dueDate: "2025-12-31",
          lastPaymentDate: member.joinedAt
        }
      }));
      
      setMembers(membersWithFees);
      setLoading(false);
    }, 500);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddMember = (memberData) => {
    // Generate a unique member ID
    const newMemberId = `MEM${String(members.length + 1).padStart(4, '0')}`;
    
    const newMember = {
      _id: `member-${Date.now()}`,
      memberId: newMemberId,
      name: memberData.name,
      email: memberData.email,
      mobile: memberData.mobile,
      dob: memberData.dob,
      address: memberData.address,
      kyc: {
        ...memberData.kyc,
        verified: false,
        documents: memberData.uploadedDocuments || []
      },
      status: 'pending',
      joinedAt: new Date().toISOString(),
      membershipFee: {
        paid: false,
        amount: 1000,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        lastPaymentDate: null
      }
    };

    setMembers(prev => [newMember, ...prev]);
    setSnackbar({ open: true, message: 'Member registered successfully', severity: 'success' });
    setTabValue(0); // Switch to All Members tab
  };

  const handleKYCUpload = (memberId, kycData) => {
    setMembers(prev => prev.map(member => 
      member._id === memberId 
        ? { 
            ...member, 
            kyc: { ...member.kyc, ...kycData, verified: true },
            status: 'active' // Automatically activate member after KYC verification
          } 
        : member
    ));
    setSnackbar({ open: true, message: 'KYC documents uploaded successfully', severity: 'success' });
  };

  const handleFeeCollection = (memberId, feeData) => {
    setMembers(prev => prev.map(member => 
      member._id === memberId 
        ? { 
            ...member, 
            membershipFee: { 
              ...member.membershipFee, 
              paid: true,
              lastPaymentDate: new Date().toISOString()
            }
          } 
        : member
    ));
    setSnackbar({ open: true, message: 'Membership fee collected successfully', severity: 'success' });
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Members Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Manage society members, KYC verification, and membership fees
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonAdd sx={{ fontSize: 40, opacity: 0.8, mr: 2 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{members.length}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Members</Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VerifiedUser sx={{ fontSize: 40, opacity: 0.8, mr: 2 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {members.filter(m => m.kyc.verified).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>KYC Verified</Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Payment sx={{ fontSize: 40, opacity: 0.8, mr: 2 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {members.filter(m => m.membershipFee.paid).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Fee Paid</Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ManageAccounts sx={{ fontSize: 40, opacity: 0.8, mr: 2 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {members.filter(m => m.status === 'active').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Active Members</Typography>
              </Box>
            </Box>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Module Tabs */}
      <StyledPaper>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="All Members" />
          <Tab label="Member Registration" />
          <Tab label="Fee Collection" />
          <Tab label="Profile Management" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <MemberListView
            members={filteredMembers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <MemberRegistration 
            onAddMember={handleAddMember} 
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <FeeCollection 
            members={members.filter(m => !m.membershipFee.paid)} 
            onCollectFee={handleFeeCollection} 
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <ProfileManagement members={members} onKYCUpload={handleKYCUpload} />
        </TabPanel>
      </StyledPaper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Member List View Component
function MemberListView({ members, searchTerm, setSearchTerm, statusFilter, setStatusFilter, page, setPage, rowsPerPage, setRowsPerPage }) {
  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();
  const handleNewMemberClick = () =>{
    navigate('/addmember');
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search by name, email, or member ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ 
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ) 
          }}
          sx={{ minWidth: 300, flex: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select 
            value={statusFilter} 
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>

        <Button variant='contained' onClick={handleNewMemberClick} sx={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          Add Member
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Member ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Member Details</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>KYC Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Fee Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Member Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Join Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member) => (
              <TableRow key={member._id} hover>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {member.memberId}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{member.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {member.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.mobile}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {member.address.city}, {member.address.state}
                  </Typography>
                </TableCell>
                <TableCell>
                  <KYCStatusChip 
                    label={member.kyc.verified ? "Verified" : "Pending"} 
                    verified={member.kyc.verified}
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={member.membershipFee.paid ? "Paid" : "Due"} 
                    color={member.membershipFee.paid ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <StatusChip label={member.status} status={member.status} size="small" />
                </TableCell>
                <TableCell>
                  {new Date(member.joinedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

// Member Registration Component
function MemberRegistration({ onAddMember, activeStep, setActiveStep }) {
  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    address: { street: '', city: '', state: '', pincode: '', country: 'India' },
    kyc: { aadhar: '', pan: '' },
    uploadedDocuments: []
  });

  const [documentFiles, setDocumentFiles] = useState([]);

  const steps = ['Basic Information', 'Address Details', 'KYC Documents', 'Review & Submit'];

  const handleNext = () => {
    if (activeStep === 0 && (!memberData.name || !memberData.email || !memberData.mobile)) {
      alert('Please fill all required fields');
      return;
    }
    if (activeStep === 1 && (!memberData.address.street || !memberData.address.city || !memberData.address.state)) {
      alert('Please fill all address fields');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocumentFiles(files);
    setMemberData(prev => ({
      ...prev,
      uploadedDocuments: files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }))
    }));
  };

  const handleSubmit = () => {
    if (!memberData.kyc.aadhar || !memberData.kyc.pan) {
      alert('Please fill all KYC fields');
      return;
    }

    onAddMember(memberData);
    setActiveStep(0);
    setMemberData({
      name: '',
      email: '',
      mobile: '',
      dob: '',
      address: { street: '', city: '', state: '', pincode: '', country: 'India' },
      kyc: { aadhar: '', pan: '' },
      uploadedDocuments: []
    });
    setDocumentFiles([]);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Full Name *" 
              value={memberData.name} 
              onChange={(e) => setMemberData({...memberData, name: e.target.value})} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Email *" 
              type="email" 
              value={memberData.email} 
              onChange={(e) => setMemberData({...memberData, email: e.target.value})} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Mobile *" 
              value={memberData.mobile} 
              onChange={(e) => setMemberData({...memberData, mobile: e.target.value})} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Date of Birth" 
              type="date" 
              InputLabelProps={{ shrink: true }} 
              value={memberData.dob} 
              onChange={(e) => setMemberData({...memberData, dob: e.target.value})} 
            />
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Street Address *" 
              value={memberData.address.street} 
              onChange={(e) => setMemberData({...memberData, address: {...memberData.address, street: e.target.value}})} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label="City *" 
              value={memberData.address.city} 
              onChange={(e) => setMemberData({...memberData, address: {...memberData.address, city: e.target.value}})} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label="State *" 
              value={memberData.address.state} 
              onChange={(e) => setMemberData({...memberData, address: {...memberData.address, state: e.target.value}})} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label="Pincode" 
              value={memberData.address.pincode} 
              onChange={(e) => setMemberData({...memberData, address: {...memberData.address, pincode: e.target.value}})} 
            />
          </Grid>
        </Grid>
      )}

      {activeStep === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Aadhar Number *" 
              value={memberData.kyc.aadhar} 
              onChange={(e) => setMemberData({...memberData, kyc: {...memberData.kyc, aadhar: e.target.value}})} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="PAN Number *" 
              value={memberData.kyc.pan} 
              onChange={(e) => setMemberData({...memberData, kyc: {...memberData.kyc, pan: e.target.value}})} 
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              component="label" 
              startIcon={<CloudUpload />} 
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Upload Documents
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </Button>
            {documentFiles.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {documentFiles.length} file(s) selected
              </Typography>
            )}
          </Grid>
        </Grid>
      )}

      {activeStep === 3 && (
        <Box>
          <Typography variant="h6" gutterBottom>Review Member Information</Typography>
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography><strong>Name:</strong> {memberData.name}</Typography>
            <Typography><strong>Email:</strong> {memberData.email}</Typography>
            <Typography><strong>Mobile:</strong> {memberData.mobile}</Typography>
            <Typography><strong>Date of Birth:</strong> {memberData.dob}</Typography>
          </Card>
          
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Address</Typography>
            <Typography><strong>Street:</strong> {memberData.address.street}</Typography>
            <Typography><strong>City:</strong> {memberData.address.city}</Typography>
            <Typography><strong>State:</strong> {memberData.address.state}</Typography>
            <Typography><strong>Pincode:</strong> {memberData.address.pincode}</Typography>
          </Card>
          
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>KYC Details</Typography>
            <Typography><strong>Aadhar:</strong> {memberData.kyc.aadhar}</Typography>
            <Typography><strong>PAN:</strong> {memberData.kyc.pan}</Typography>
            <Typography><strong>Documents:</strong> {documentFiles.length} file(s)</Typography>
          </Card>
          
          {/* <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit Registration
          </Button> */}
        </Box>
        
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
          {activeStep === steps.length - 1 ? 'Submit Registration' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

// Fee Collection Component
function FeeCollection({ members, onCollectFee }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Pending Fee Collection ({members.length} members)
      </Typography>
      {members.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          All membership fees are up to date!
        </Typography>
      ) : (
        members.map(member => (
          <Card key={member._id} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight={600}>{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{member.memberId}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="body2">Due Amount: ₹{member.membershipFee.amount}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Due: {new Date(member.membershipFee.dueDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Chip label="Payment Due" color="error" />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => onCollectFee(member._id, { amount: member.membershipFee.amount })}
                  >
                    Collect Fee
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

// Profile Management Component
function ProfileManagement({ members, onKYCUpload }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [kycData, setKycData] = useState({ aadhar: '', pan: '', documents: [] });
  const [documentFiles, setDocumentFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocumentFiles(files);
    setKycData(prev => ({
      ...prev,
      documents: files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }))
    }));
  };

  const handleKYCSubmit = () => {
    if (selectedMember) {
      onKYCUpload(selectedMember._id, {
        ...kycData,
        aadhar: kycData.aadhar || selectedMember.kyc.aadhar,
        pan: kycData.pan || selectedMember.kyc.pan,
        verified: true
      });
      setKycData({ aadhar: '', pan: '', documents: [] });
      setDocumentFiles([]);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>Select Member</Typography>
        {members.map(member => (
          <Card 
            key={member._id} 
            sx={{ 
              mb: 1, 
              cursor: 'pointer',
              backgroundColor: selectedMember?._id === member._id ? 'action.selected' : 'background.paper'
            }} 
            onClick={() => {
              setSelectedMember(member);
              setKycData({ 
                aadhar: member.kyc.aadhar, 
                pan: member.kyc.pan, 
                documents: member.kyc.documents || [] 
              });
            }}
          >
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="subtitle2">{member.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {member.memberId} • {member.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      
      <Grid item xs={12} md={8}>
        {selectedMember ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Manage {selectedMember.name}
            </Typography>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Contact Information</Typography>
              <Typography><strong>Email:</strong> {selectedMember.email}</Typography>
              <Typography><strong>Mobile:</strong> {selectedMember.mobile}</Typography>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Address</Typography>
              <Typography>
                {selectedMember.address.street}, {selectedMember.address.city}, {selectedMember.address.state} - {selectedMember.address.pincode}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>KYC Information</Typography>
              <Typography><strong>Aadhar:</strong> {selectedMember.kyc.aadhar}</Typography>
              <Typography><strong>PAN:</strong> {selectedMember.kyc.pan}</Typography>
              <KYCStatusChip 
                label={selectedMember.kyc.verified ? "KYC Verified" : "KYC Pending"} 
                verified={selectedMember.kyc.verified}
                sx={{ mt: 1, mb: 2 }}
              />
              
              {!selectedMember.kyc.verified && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Update KYC Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        fullWidth 
                        label="Aadhar Number" 
                        value={kycData.aadhar} 
                        onChange={(e) => setKycData({...kycData, aadhar: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        fullWidth 
                        label="PAN Number" 
                        value={kycData.pan} 
                        onChange={(e) => setKycData({...kycData, pan: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        component="label" 
                        startIcon={<CloudUpload />} 
                        variant="outlined"
                        sx={{ mr: 2 }}
                      >
                        Upload KYC Documents
                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={handleFileUpload}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </Button>
                      {documentFiles.length > 0 && (
                        <Typography variant="body2">
                          {documentFiles.length} file(s) selected
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        onClick={handleKYCSubmit}
                        disabled={!kycData.aadhar || !kycData.pan}
                      >
                        Verify KYC
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Card>
          </Box>
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            Select a member to manage their profile
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}