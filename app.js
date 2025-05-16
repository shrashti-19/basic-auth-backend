const express =  require('express')
const app = express();
const authRoutes = require('./routes/auth')
const connectDB = require('./config/db');

connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Auth System backend running');
})

app.use('/api',authRoutes);
app.use(express.static('public'));

const PORT = process.env.PORT || 4000
app.listen(PORT , ()=>{
    console.log(`Server started on port ${PORT}`);
    
});