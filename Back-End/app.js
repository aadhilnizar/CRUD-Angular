const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/upload')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const userSchema = new mongoose.Schema({
   firstName :String,
   email:{type:String,unique:true},
   password:String
})
 
const  User = mongoose.model('User',userSchema);

const SECRET_KEY = 'you_secret_key';

app.post('/register',async (req,res)=>{
   const {firstName,email,password} = req.body;
   console.log(req.body);
   
   try {
      const hashedPassword = await bcrypt.hash(password,10);
      console.log(hashedPassword);
      
      const user = new User({firstName,email,password:hashedPassword});
      console.log(user);
      
      await user.save();
      
      res.status(200).json({message:'User registered successfully'})
   } catch (error) {
      res.status(400).json({error:'User registration failed',details:error});
   }
});



app.post('/login', async (req,res)=>{
   
   console.log(req.body);
   const { email, password } = req.body;

   if (!email || !password) {
     return res.status(400).json({ message: 'email and password are required' });
   }
 
   try {
     // Find the user by username
     const user = await User.findOne({ email  });
 
     if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
   
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    
    // console.log('Fetched Users:', users); // Logging before sending response

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error); // Log for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users/edit/:id',async (req,res)=>{
  const id = req.params.id;
  const userDetail = await User.findById(id); 
  res.status(200).json(userDetail)
})

app.put('/users/edit/:id', async (req,res)=>{
  try {
    const {firstName , email , password} = req.body ; 
    const id = req.params.id ;
    console.log(req.body);
    
    const user = await User.findById(id);

    if(!user) {
      return  res.status(404).json({message:'User not found'})
    }
    let hashedPass = password ;
    if(password) {
      hashedPass = await bcrypt.hash(password,10);
    }

    console.log(firstName,email,password);
    
    const updatedUser = await User.findByIdAndUpdate(
      id,{firstName,email,password:hashedPass}
    )
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({message:'Server Error'})
  }
})

app.delete('/users/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

app.listen(3000,()=>{
   console.log('Running on port 3000')
})