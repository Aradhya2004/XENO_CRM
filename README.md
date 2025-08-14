# CRM SYSTEM
This is a Customer Relationship Management (CRM) system developed for a company assignment. It
enables efficient handling of customer data, AI-powered suggestions, automated emails, marketing campaign
management, and rich data visualizations using pie charts.

## Features
- **Customer Data Ingestion:** Add and manage customer details with ease.
- **Campaign Creation:** Create and manage targeted marketing campaigns.
- **Campaign History:** Track past campaigns and their metadata.
- **Order History:** View detailed order records associated with each customer. 
- **AI-Powered Suggestions:** Generate smart recommendations using Google Gen AI (Google AI Studio).
- **Email Notifications:** Send confirmation emails to customers using Nodemailer.
- **Data Visualization:** Visualize customer demographics and behaviors via pie charts.
- **MongoDB Integration:** Persistent storage for customer, campaign, and order data.
- **RESTful APIs:** Built using Node.js and Express.js.

## Tech Stack
- **Frontend:** React (Vite), TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI Models:** Integrated with Google Gemini for powerful suggestions and insights

---

## Deployed Link
- [https://xeno-crm-0yfx.onrender.com](https://xeno-crm-0yfx.onrender.com)

---

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Aradhya2004/XENO_CRM.git](https://github.com/Aradhya2004/XENO_CRM.git)
   cd xeno-crm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root of the `server` folder and add:
   ```env
   PORT=8000 || 5000 
   MONGO_URI=<your_mongodb_uri>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   SESSION_SECRET=<your_session_secret>
   GOOGLE_GEN_AI_API_KEY=<your_google_gen_ai_api_key>
   FRONTEND_URL=http://localhost:5173
   EMAIL_USER=<your_email_user>
   EMAIL_PASS=<your_email_password>
   ```

4. **Run the application:**
   In the server folder:
   ```bash
   npm run dev
   ```
   In the client folder:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`

---

## Architecture Diagram

Below is the architecture diagram illustrating the flow of data:

```
+---------------------+
|      Frontend       |  (React + Chart.js / D3.js)
+----------+----------+
           |
           v
+----------+----------+
|   Node.js + Express |  <-- REST API
+----+-----------+----+
     |           |
     v           v
 MongoDB     Nodemailer
     |           
     v           
Google Generative AI

```

---

## Summary of AI Tools and Other Tech Used

- **Google Gen AI (AI Studio):** AI-based suggestions and auto-responses
- **Nodemailer:** Sending confirmation emails to customers
- **Node.js + Express:** Backend API and business logic
- **MongoDB:** Database for customer, campaign, and order data
- **Chart.js / D3.js:** Data visualization via pie charts
- **Postman:** API testing
- **Git & GitHub:** Version control

---

## Known Limitations or Assumptions

- Google Gen AI usage may require billing and has quota limitations.
- Email functionality depends on SMTP configuration (currently Gmail-based).
- Data visualizations are basic; no advanced filtering or export options yet.
- Authentication is minimal and not enterprise-grade.
- AI suggestions are generated based on sample prompts and limited context.

---

Feel free to contribute, raise issues, or suggest improvements!
