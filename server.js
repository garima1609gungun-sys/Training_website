require('dotenv').config();
const express=require('express');
const path=require('path');
const cors=require('cors');
const bodyParser=require('body-parser');

const app=express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files (site pages and assets)
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname,'public')));

// Twilio setup (optional) - requires env vars
const TWILIO_SID=process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN=process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM=process.env.TWILIO_PHONE_NUMBER;
const DEST_PHONE=process.env.DEST_PHONE || '+917599273648';

let twilioClient=null;
if(TWILIO_SID && TWILIO_TOKEN){
  const twilio = require('twilio');
  twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);
}

app.post('/api/enroll', async (req, res) => {
  const {name, email, phone, course, message} = req.body || {};
  if(!name || !email || !phone || !course) return res.status(400).json({error:'Missing required fields'});

  const smsBody = `New enrollment from ${name} (${phone}, ${email}) for ${course}. Message: ${message||'N/A'}`;

  if(twilioClient && TWILIO_FROM){
    try{
      await twilioClient.messages.create({body:smsBody,from:TWILIO_FROM,to:DEST_PHONE});
    }catch(err){
      console.error('Twilio error',err);
      return res.status(500).json({error:'Failed to send SMS notification.'});
    }
  } else {
    console.log('TWILIO not configured — enrollment:', smsBody);
  }

  return res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
