# Appointment Management System

A web platform where doctors register and publish their free time slots, and patients book, reschedule and review appointments. Built with Next.js and MongoDB.

## Features

- Separate doctor and patient accounts with sign-in and profile pages
- Doctors list and manage their daily slots and view their schedule
- Patients browse a doctor's free slots, create an appointment and reschedule it
- No-show check and appointment modification endpoints
- Two-way reviews: patients can review doctors and doctors can review patients, to build trust

## Tech stack

- Next.js (App Router), React, TypeScript
- MongoDB with Mongoose
- Authentication with JWT (jose) and password hashing (bcrypt)
- NextUI, Framer Motion, Axios, Moment.js
- Nodemailer

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your own values
npm run dev
```

Open http://localhost:3000 in your browser.

## Author

Tejas Kakani - [LinkedIn](https://www.linkedin.com/in/tejas-kakani) | [Portfolio](https://tejaskakani.github.io/myportfolio)
