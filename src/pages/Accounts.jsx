import React, { useState, useEffect } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit, AccountBalance, Receipt, Person, Email, Phone, CalendarToday, LocationOn, VerifiedUser, Add, Check } from '@mui/icons-material';
import members from "../../public/Member.json";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

// TabPanel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Member Profile Dialog Component
const MemberProfileDialog = ({ open, onClose, member, accounts }) => {
  if (!member) return null;

  // Get accounts for this member
  const memberAccounts = accounts.filter(acc => acc.memberId === member.memberId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
            <Person fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5">{member.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Member ID: {member.memberId}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person fontSize="small" />
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Full Name</Typography>
                    <Typography variant="body1">{member.name}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Date of Birth</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday fontSize="small" />
                      {new Date(member.dob).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Email</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email fontSize="small" />
                      {member.email}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Mobile</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone fontSize="small" />
                      {member.mobile}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn fontSize="small" />
                  Address Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Street</Typography>
                    <Typography variant="body1">{member.address.street}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">City</Typography>
                    <Typography variant="body1">{member.address.city}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">State</Typography>
                    <Typography variant="body1">{member.address.state}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Pincode</Typography>
                    <Typography variant="body1">{member.address.pincode}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Country</Typography>
                    <Typography variant="body1">{member.address.country}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedUser fontSize="small" />
                  KYC Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Aadhar Number</Typography>
                    <Typography variant="body1">{member.kyc.aadhar}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">PAN Number</Typography>
                    <Typography variant="body1">{member.kyc.pan}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">KYC Status</Typography>
                    <Typography variant="body1">
                      <Chip 
                        label={member.kyc.verified ? "Verified" : "Pending"} 
                        color={member.kyc.verified ? "success" : "warning"}
                        size="small"
                      />
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Document Status</Typography>
                    <Typography variant="body1">
                      <Chip 
                        label={member.kyc.documents[0]?.status || "Unknown"} 
                        color={member.kyc.documents[0]?.status === "verified" ? "success" : "default"}
                        size="small"
                      />
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Membership Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Member Since</Typography>
                    <Typography variant="body1">
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Account ID</Typography>
                    <Typography variant="body1">{member.accountId}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Role</Typography>
                    <Typography variant="body1">
                      <Chip 
                        label={member.role} 
                        color="primary"
                        size="small"
                      />
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="textSecondary">Status</Typography>
                    <Typography variant="body1">
                      <Chip 
                        label={member.status} 
                        color={member.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Account Details Section */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountBalance fontSize="small" />
                  Account Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {memberAccounts.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Account ID</TableCell>
                          <TableCell>Account Type</TableCell>
                          <TableCell>Balance</TableCell>
                          <TableCell>Interest Rate</TableCell>
                          <TableCell>Created Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {memberAccounts.map((account) => (
                          <TableRow key={account.accountId}>
                            <TableCell>{account.accountId}</TableCell>
                            <TableCell>
                              <Chip 
                                label={account.type.toUpperCase()} 
                                color={
                                  account.type === 'savings' ? 'primary' : 
                                  account.type === 'fd' ? 'secondary' : 
                                  account.type === 'rd' ? 'info' : 'success'
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>₹{account.balance.toLocaleString()}</TableCell>
                            <TableCell>{account.interestRate}%</TableCell>
                            <TableCell>{new Date(account.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Chip 
                                label={account.status} 
                                color={account.status === 'active' ? 'success' : 'default'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 3 }}>
                    No accounts found for this member.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Add Account Component
const AddAccount = ({ members, onAddAccount }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountData, setAccountData] = useState({
    memberId: '',
    accountType: 'savings',
    initialBalance: '',
    interestRate: 4.0
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const [newAccount, setNewAccount] = useState(null);

  const steps = ['Select Member', 'Account Details', 'Confirmation'];

  const handleMemberChange = (event) => {
    const memberId = event.target.value;
    setAccountData({ ...accountData, memberId });
    
    const member = members.find(m => m.memberId === memberId);
    setSelectedMember(member);
  };

  const handleAccountTypeChange = (event) => {
    const accountType = event.target.value;
    let interestRate = 4.0;
    
    // Set default interest rates based on account type
    switch(accountType) {
      case 'savings':
        interestRate = 4.0;
        break;
      case 'fd':
        interestRate = 6.5;
        break;
      case 'rd':
        interestRate = 5.5;
        break;
      case 'current':
        interestRate = 3.0;
        break;
      default:
        interestRate = 4.0;
    }
    
    setAccountData({ ...accountData, accountType, interestRate });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (!accountData.memberId || !accountData.initialBalance) {
      alert('Please fill all required fields');
      return;
    }

    const createdAccount = {
      accountId: `ACC-${10000 + Math.floor(Math.random() * 1000)}`,
      memberId: accountData.memberId,
      memberName: selectedMember.name,
      mobile: selectedMember.mobile,
      type: accountData.accountType,
      balance: parseFloat(accountData.initialBalance),
      interestRate: accountData.interestRate,
      createdAt: new Date().toISOString(),
      status: 'active',
      transactions: [
        {
          transactionId: `TXN-${Date.now()}`,
          type: 'credit',
          amount: parseFloat(accountData.initialBalance),
          description: 'Initial deposit - Account opening',
          timestamp: new Date().toISOString()
        }
      ]
    };

    setNewAccount(createdAccount);
    onAddAccount(createdAccount);
    setAccountCreated(true);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setAccountData({
      memberId: '',
      accountType: 'savings',
      initialBalance: '',
      interestRate: 4.0
    });
    setSelectedMember(null);
    setAccountCreated(false);
    setNewAccount(null);
  };

  const availableMembers = members;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Add />
          Create New Account
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>Step 1: Select Member</Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Member</InputLabel>
              <Select
                value={accountData.memberId}
                label="Select Member"
                onChange={handleMemberChange}
              >
                {availableMembers.map((member) => (
                  <MenuItem key={member.memberId} value={member.memberId}>
                    {member.memberId} - {member.name} ({member.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedMember && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>Member Information:</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Name:</strong> {selectedMember.name}</Typography>
                      <Typography variant="body2"><strong>Email:</strong> {selectedMember.email}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Mobile:</strong> {selectedMember.mobile}</Typography>
                      <Typography variant="body2"><strong>Member Since:</strong> {new Date(selectedMember.joinedAt).toLocaleDateString()}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                onClick={handleNext}
                disabled={!accountData.memberId}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Step 2: Account Details</Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Account Type</InputLabel>
              <Select
                value={accountData.accountType}
                label="Account Type"
                onChange={handleAccountTypeChange}
              >
                <MenuItem value="savings">Savings Account</MenuItem>
                <MenuItem value="fd">Fixed Deposit</MenuItem>
                <MenuItem value="rd">Recurring Deposit</MenuItem>
                <MenuItem value="current">Current Account</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Initial Balance (₹)"
              type="number"
              value={accountData.initialBalance}
              onChange={(e) => setAccountData({ ...accountData, initialBalance: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="number"
              value={accountData.interestRate}
              onChange={(e) => setAccountData({ ...accountData, interestRate: parseFloat(e.target.value) })}
              sx={{ mb: 3 }}
              inputProps={{ step: "0.1" }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                disabled={!accountData.initialBalance}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
              <Check />
              Account Created Successfully!
            </Typography>
            
            {newAccount && (
              <Card variant="outlined" sx={{ mb: 3, bgcolor: 'success.light' }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>New Account Details:</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Account ID:</strong> {newAccount.accountId}</Typography>
                      <Typography variant="body2"><strong>Member:</strong> {newAccount.memberName}</Typography>
                      <Typography variant="body2"><strong>Account Type:</strong> {newAccount.type.toUpperCase()}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Initial Balance:</strong> ₹{newAccount.balance.toLocaleString()}</Typography>
                      <Typography variant="body2"><strong>Interest Rate:</strong> {newAccount.interestRate}%</Typography>
                      <Typography variant="body2"><strong>Status:</strong> <Chip label="Active" color="success" size="small" /></Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleReset}>
                Create Another Account
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Account List View Component
const AccountListView = ({ 
  accounts, 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter, 
  page, 
  setPage, 
  rowsPerPage, 
  setRowsPerPage,
  onRowClick
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Accounts"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={typeFilter}
              label="Account Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="fd">Fixed Deposit</MenuItem>
              <MenuItem value="rd">Recurring Deposit</MenuItem>
              <MenuItem value="current">Current</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Member ID</TableCell>
              <TableCell>Member Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account) => (
              <TableRow 
                key={account.accountId}
                hover
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                onClick={() => onRowClick(account.memberId)}
              >
                <TableCell>{account.accountId}</TableCell>
                <TableCell>{account.memberId}</TableCell>
                <TableCell>{account.memberName}</TableCell>
                <TableCell>{account.mobile}</TableCell>
                <TableCell>
                  <Chip 
                    label={account.type.toUpperCase()} 
                    color={
                      account.type === 'savings' ? 'primary' : 
                      account.type === 'fd' ? 'secondary' : 
                      account.type === 'rd' ? 'info' : 'success'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>₹{account.balance.toLocaleString()}</TableCell>
                <TableCell>{account.interestRate}%</TableCell>
                <TableCell>
                  <Chip 
                    label={account.status} 
                    color={account.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when clicking edit button
                    console.log('Edit account:', account.accountId);
                  }}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={accounts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

// Transaction Component
const Transaction = ({ accounts, onAddTransaction }) => {
  const [transactionData, setTransactionData] = useState({
    accountId: '',
    type: 'credit', // credit or debit
    amount: '',
    description: ''
  });

  const handleSubmit = () => {
    onAddTransaction({
      ...transactionData,
      transactionId: `TXN-${Date.now()}`,
      timestamp: new Date().toISOString()
    });
    setTransactionData({
      accountId: '',
      type: 'credit',
      amount: '',
      description: ''
    });
  };

  const selectedAccount = accounts.find(acc => acc.accountId === transactionData.accountId);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Transaction Management
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>New Transaction</Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Account</InputLabel>
                <Select
                  value={transactionData.accountId}
                  label="Select Account"
                  onChange={(e) => setTransactionData({ ...transactionData, accountId: e.target.value })}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.accountId} value={account.accountId}>
                      {account.accountId} - {account.memberName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedAccount && (
                <Box sx={{ mb: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Current Balance:</strong> ₹{selectedAccount.balance.toLocaleString()}
                  </Typography>
                </Box>
              )}

              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>Transaction Type</Typography>
                <RadioGroup
                  value={transactionData.type}
                  onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value })}
                  row
                >
                  <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                  <FormControlLabel value="debit" control={<Radio />} label="Debit" />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Amount (₹)"
                type="number"
                value={transactionData.amount}
                onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={transactionData.description}
                onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                sx={{ mb: 2 }}
              />

              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleSubmit}
                disabled={!transactionData.accountId || !transactionData.amount}
              >
                Process Transaction
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
          {accounts.flatMap(acc => acc.transactions || [])
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5)
            .map((transaction, index) => (
            <Card key={index} sx={{ mb: 1 }}>
              <CardContent sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {transaction.accountId}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" display="block">
                      {transaction.description}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold"
                      color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </Typography>
                    <Chip 
                      label={transaction.type.toUpperCase()} 
                      color={transaction.type === 'credit' ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

// Main Component
const AccountManagementSystem = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState('');

  // Updated accounts data with correct member IDs that match Member.json
  const [accounts, setAccounts] = useState([
    {
      accountId: "ACC-10001",
      memberId: "MSR-0001",
      memberName: "Satyam Ray",
      mobile: "+919810000001",
      type: "savings",
      balance: 12500.50,
      interestRate: 4.0,
      createdAt: "2025-01-15T10:00:00Z",
      status: "active",
      transactions: [
        {
          transactionId: "TXN-001",
          type: "credit",
          amount: 10000,
          description: "Initial deposit",
          timestamp: "2025-01-15T10:00:00Z"
        }
      ]
    },
    {
      accountId: "ACC-10002",
      memberId: "MSR-0002",
      memberName: "Ananya Singh",
      mobile: "+919810000002",
      type: "fd",
      balance: 50000.00,
      interestRate: 6.5,
      createdAt: "2025-02-20T14:30:00Z",
      status: "active",
      transactions: [
        {
          transactionId: "TXN-003",
          type: "credit",
          amount: 50000,
          description: "Fixed deposit",
          timestamp: "2025-02-20T14:30:00Z"
        }
      ]
    },
    {
      accountId: "ACC-10003",
      memberId: "MSR-0003",
      memberName: "Rohit Sharma",
      mobile: "+919810000003",
      type: "rd",
      balance: 15000.00,
      interestRate: 5.5,
      createdAt: "2025-03-10T11:00:00Z",
      status: "active",
      transactions: [
        {
          transactionId: "TXN-004",
          type: "credit",
          amount: 5000,
          description: "Recurring deposit installment",
          timestamp: "2025-03-10T11:00:00Z"
        }
      ]
    },
    {
      accountId: "ACC-10004",
      memberId: "MSR-0004",
      memberName: "Priya Nair",
      mobile: "+919810000004",
      type: "current",
      balance: 75000.75,
      interestRate: 3.0,
      createdAt: "2025-04-05T16:45:00Z",
      status: "active",
      transactions: [
        {
          transactionId: "TXN-005",
          type: "credit",
          amount: 75000.75,
          description: "Business account opening",
          timestamp: "2025-04-05T16:45:00Z"
        }
      ]
    },
    {
      accountId: "ACC-10005",
      memberId: "MSR-0005",
      memberName: "Vikram Patel",
      mobile: "+919810000005",
      type: "savings",
      balance: 25000.00,
      interestRate: 4.0,
      createdAt: "2025-05-22T14:20:00Z",
      status: "active",
      transactions: []
    },
    {
      accountId: "ACC-10006",
      memberId: "MSR-0006",
      memberName: "Sneha Verma",
      mobile: "+919810000006",
      type: "fd",
      balance: 100000.00,
      interestRate: 6.5,
      createdAt: "2025-04-12T10:00:00Z",
      status: "active",
      transactions: []
    }
  ]);

  // Debug: Log members data to console
  useEffect(() => {
    console.log('Available members from Member.json:', members);
    console.log('Available accounts:', accounts);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddTransaction = (transactionData) => {
    const updatedAccounts = accounts.map(account => {
      if (account.accountId === transactionData.accountId) {
        const newBalance = transactionData.type === 'credit' 
          ? account.balance + parseFloat(transactionData.amount)
          : account.balance - parseFloat(transactionData.amount);
        
        return {
          ...account,
          balance: newBalance,
          transactions: [...(account.transactions || []), transactionData]
        };
      }
      return account;
    });
    
    setAccounts(updatedAccounts);
    alert(`Transaction successful! Transaction ID: ${transactionData.transactionId}`);
  };

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
    // Switch to Accounts tab to see the newly created account
    setTabValue(0);
  };

  const handleAccountRowClick = (memberId) => {
    console.log('Clicked member ID:', memberId);
    console.log('Looking for member in:', members);
    
    const member = members.find(m => m.memberId === memberId);
    console.log('Found member:', member);
    
    if (member) {
      setSelectedMember(member);
      setProfileDialogOpen(true);
      setError('');
    } else {
      setError(`Member with ID "${memberId}" not found in Member.json`);
      console.error('Member not found. Available member IDs:', members.map(m => m.memberId));
    }
  };

  const handleCloseProfileDialog = () => {
    setProfileDialogOpen(false);
    setSelectedMember(null);
    setError('');
  };

  // Filter accounts based on search term and type
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.mobile.includes(searchTerm);
    const matchesType = typeFilter === 'all' || account.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <StyledPaper>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Accounts" />
          <Tab label="Transactions" />
          <Tab label="Add New Account" />
        </Tabs>

        {/* Tab 1: Accounts */}
        <TabPanel value={tabValue} index={0}>
          <AccountListView 
            accounts={filteredAccounts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            onRowClick={handleAccountRowClick}
          />
        </TabPanel>

        {/* Tab 2: Transactions */}
        <TabPanel value={tabValue} index={1}>
          <Transaction 
            accounts={accounts}
            onAddTransaction={handleAddTransaction}
          />
        </TabPanel>

        {/* Tab 3: Add New Account */}
        <TabPanel value={tabValue} index={2}>
          <AddAccount 
            members={members}
            onAddAccount={handleAddAccount}
          />
        </TabPanel>
      </StyledPaper>

      <MemberProfileDialog 
        open={profileDialogOpen}
        onClose={handleCloseProfileDialog}
        member={selectedMember}
        accounts={accounts}
      />
    </>
  );
};

export default AccountManagementSystem;