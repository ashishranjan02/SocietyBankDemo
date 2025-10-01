import React, { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Stack,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ApprovalWorkflow() {
    const [loans, setLoans] = useState([]);
    const [filter, setFilter] = useState("all");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLoanId, setSelectedLoanId] = useState(null);

    useEffect(() => {
        const members = JSON.parse(localStorage.getItem("members") || "[]");
        const allLoans = members.flatMap((m) =>
            (m.loans || []).map((loan) => ({
                ...loan,
                memberId: m.memberId,
                memberName: m.name,
                status: loan.status || "pending",
            }))
        );
        setLoans(allLoans);
    }, []);

    const updateLoanStatus = (loanId, status) => {
        const updatedLoans = loans.map((l) =>
            l.loanId === loanId ? { ...l, status } : l
        );
        setLoans(updatedLoans);

        const members = JSON.parse(localStorage.getItem("members") || "[]");
        const updatedMembers = members.map((m) => ({
            ...m,
            loans: (m.loans || []).map((loan) =>
                loan.loanId === loanId ? { ...loan, status } : loan
            ),
        }));
        localStorage.setItem("members", JSON.stringify(updatedMembers));
    };

    const handleApprove = () => {
        updateLoanStatus(selectedLoanId, "approved");
        handleClose();
    };

    const handleReject = () => {
        updateLoanStatus(selectedLoanId, "rejected");
        handleClose();
    };

    const handleMenuOpen = (event, loanId) => {
        setAnchorEl(event.currentTarget);
        setSelectedLoanId(loanId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedLoanId(null);
    };

    const getStatusChip = (status) => {
        switch (status) {
            case "approved":
                return <Chip icon={<CheckCircleIcon />} label="Approved" color="success" size="small" />;
            case "rejected":
                return <Chip icon={<CancelIcon />} label="Rejected" color="error" size="small" />;
            default:
                return <Chip icon={<PendingActionsIcon />} label="Pending" color="warning" size="small" />;
        }
    };

    const getRowStyle = (status) => {
        switch (status) {
            case "approved":
                return { background: "linear-gradient(90deg, #e8f5e9, #c8e6c9)" };
            case "rejected":
                return { background: "linear-gradient(90deg, #ffebee, #ffcdd2)" };
            default:
                return { background: "linear-gradient(90deg, #fffde7, #fff9c4)" };
        }
    };

    const filteredLoans = filter === "all" ? loans : loans.filter((loan) => loan.status === filter);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Loan Approval Workflow
            </Typography>

            {/* Filter buttons */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {["all", "pending", "approved", "rejected"].map((f) => (
                    <Button
                        key={f}
                        variant={filter === f ? "contained" : "outlined"}
                        color={
                            f === "approved"
                                ? "success"
                                : f === "rejected"
                                    ? "error"
                                    : f === "pending"
                                        ? "warning"
                                        : "primary"
                        }
                        onClick={() => setFilter(f)}
                        size="small"
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Button>
                ))}
            </Stack>

            <Paper sx={{ p: 1.5, borderRadius: 3, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#283593" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Loan ID</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Member</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Loan</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Principal</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Interest (%)</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Tenure</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>EMI</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Total Payable</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Status</TableCell>
                            <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLoans.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} align="center" sx={{ fontSize: "0.875rem" }}>
                                    No loan applications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredLoans.map((loan) => (
                                <TableRow key={loan.loanId} sx={{ ...getRowStyle(loan.status) }}>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>{loan.loanId}</TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>
                                        {loan.memberName} ({loan.memberId})
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>{loan.product}</TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>₹{loan.principal}</TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>{loan.interest}</TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>{loan.tenureMonths}</TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>₹{loan.emi}</TableCell>
                                    <TableCell sx={{ fontSize: "0.85rem" }}>₹{loan.totalPayable}</TableCell>
                                    <TableCell>{getStatusChip(loan.status)}</TableCell>
                                    <TableCell>
                                        {loan.status === "pending" ? (
                                            <>
                                                <IconButton onClick={(e) => handleMenuOpen(e, loan.loanId)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl) && selectedLoanId === loan.loanId}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={handleApprove}>Approve</MenuItem>
                                                    <MenuItem onClick={handleReject}>Reject</MenuItem>
                                                </Menu>
                                            </>
                                        ) : (
                                            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                                                Actions not available
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}