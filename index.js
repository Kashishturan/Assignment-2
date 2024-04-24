const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const ejs = require('ejs')
const path = require('path');
const port = 3005
const app = express();
app.use(express.json());
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://test:test@cluster0.6fzyxmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String

  });
  const User = mongoose.model('User', userSchema);

  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = new User({ username, password });
      await newUser.save();
      console.log(newUser);
      res.redirect('/login');
    } catch (err) {
      console.error('Error saving user:', err.message);
      res.redirect('/');
    }
  });



  app.post('/login', async (req, res) => {
    
    try {
        const checking = await User.findOne({ username: req.body.username })
        if (checking.username === req.body.username && checking.password === req.body.password) {
            res.redirect("/index")
        }
        else {
            await User.insertMany([data])
        }
    }
    catch(e) {
        console.log(e.message);
    }
  });

app.get('/', (req,res)=>{
    res.render('index')
})


app.get('/mois', (req,res)=>{
    res.render('mois')
})
app.get('/scrub', (req,res)=>{
    res.render('scrub')
})

app.get('/serum', (req,res)=>{
    res.render('serum')
})

app.get('/cleanser', (req,res)=>{
    res.render('cleanser')
})

app.get('/facewash', (req,res)=>{
    res.render('facewash')
})

app.get('/sunscreen', (req,res)=>{
    res.render('sunscreen')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/index', (req,res)=>{
    res.render('index')
})
app.get('/signup', (req,res)=>{
    res.render('signup')
})

app.get('/whyyoucare', (req,res)=>{
    res.render('whyyoucare')
})

app.listen(port, ()=>{
    console.log('Server at 3000')
})