# Leave Management System

A web-based Leave Management System built with Node.js, Express, MongoDB, and EJS. This system allows employees to apply for leave, track their leave status, and enables admins/mid-admins to manage and approve/reject leave requests.

## Features

- User Registration & Login
- Admin and Mid-Admin Authentication
- Leave Request and Approval System
- Automatic Daily Cron Job to Update Leave Status
- Cookie-based Session Management
- Clean UI with EJS Templating
- Modular Router Structure

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose ODM)
- **Templating Engine:** EJS
- **Task Scheduler:** node-cron
- **Middleware:** cookie-parser, body-parser


## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Debomitasahoo/ravenshaw-LMS.git
cd leave-management-system
```
```
npm install
PORT=3000
MONGODB_URL=mongodb://localhost:27017/leave-system
```
Start the server
```
npm run dev
Server will start on http://localhost:3000
```
