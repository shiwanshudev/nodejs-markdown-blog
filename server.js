const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');

dotenv.config();
const app = express();
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
  .catch(error=>console.log(error));
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected database!')
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', {articles: articles});
});


app.use('/articles',articleRouter);

app.listen(PORT, ()=>{
  console.log(`Listening on port: ${PORT}`);
});