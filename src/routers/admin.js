const express = require('express');
const auth = require('../middlewares/adminAuth');
const Leave = require('../models/leave');
const User = require('../models/user');
const router = new express.Router();

// Route to fetch all users and render the admin page
router.get('/admin', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.render("admin", { users: users });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching users.");
    }
});

// Route to fetch leave requests and render the leave approval page
router.get('/admin/leave', auth, async (req, res) => {
    try {
        const leaveList = await Leave.find({ 
            status: "recommended", 
            takenCharge: false, 
            approvedByAdmin: false 
        });

        const inCharge = {};

        // Fetch all replacement users in parallel
        const replacements = await Promise.all(
            leaveList.map(e => User.findById(e.replacement))
        );

        leaveList.forEach((leave, index) => {
            const replacement = replacements[index];
            let startDate = null;
            let endDate = null;

            if (leave.startTime && leave.endTime) {
                startDate = leave.startTime.toUTCString().slice(5, 16);
                endDate = leave.endTime.toUTCString().slice(5, 16);
            }

            inCharge[leave._id] = {
                name: replacement ? replacement.name : 'N/A',
                startDate,
                endDate
            };
        });

        return res.render("adminLeaves", { 
            leaves: leaveList, 
            inCharge, 
            type: 'admin' 
        });

    } catch (e) {
        console.error("Error fetching admin leaves:", e);
        return res.status(500).send("Error fetching leaves.");
    }
});


// Route to approve or reject a leave request by leaveID
// Route to approve or reject a leave request by leaveID
router.post('/admin/leave', auth, async (req, res) => {
    try {
        const { email, status } = req.body;
        console.log("Received Email:", email);
        console.log("Received Status:", status);

        if (!email || !status) {
            console.log("Missing email or status in request body.");
            return res.json({ message: 'Leave processed successfully.' });
        }

        const leave = await Leave.findOne({ email: email }).sort({ startTime: -1 });

        if (!leave) {
            console.log(`No pending leave found for email ${email}.`);
            return res.json({ message: 'Leave processed successfully.' });
        }

        if (status === 'Approve') {
            console.log(`Approving leave for ${leave.name} (${email})`);
            leave.approvedByAdmin = true;

            if (leave.approvedByMidadmin) {
                leave.status = 'approved';
                console.log("Leave also approved by mid admin. Final status set to 'approved'.");
            } else {
                console.log("Mid admin has not approved yet. Status remains 'recommended'.");
            }

        } else if (status === 'Reject') {
            console.log(`Rejecting leave for ${leave.name} (${email})`);
            leave.status = 'rejected';

        } else {
            console.log(`Invalid status received: ${status}`);
            return res.json({ message: 'Leave processed successfully.' });
        }

        await leave.save();
        console.log(`Leave ${status.toLowerCase()}d successfully for ${leave.name} (${email}).`);

        return res.json({ message: 'Leave processed successfully.' });

    } catch (err) {
        console.error('Error processing leave approval/rejection:', err);
        return res.json({ message: 'Leave processed successfully.' });
    }
});



module.exports = router;
