# Gungun Prasad - Cloud Training (Website + Enrollment backend)

This repository contains a responsive static website (multiple pages) and a small Node.js backend that accepts enrollment form submissions and (optionally) sends an SMS notification to a configured phone number using Twilio.

Quick setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment (optional, required to send SMS):

- Copy `.env.example` to `.env` and fill `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`.
- `DEST_PHONE` defaults to `+917599273648` (the number you provided). Change it if you need a different target number.

3. Run the app:

```bash
npm start
```

4. Open `http://localhost:3000/index.html` in a browser. Fill the enrollment form to test.

Notes
- Sending SMS requires a Twilio account and a valid Twilio phone number.
- If Twilio is not configured the server will log the enrollment to the console instead of sending an SMS.
