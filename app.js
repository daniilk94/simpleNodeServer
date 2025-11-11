import express from 'express';
import indexPage from './api/index.js';
import dataPage from './api/data.js';
import homePage from './api/homepage.js';

const app =  express();

app.use('/', homePage);
app.use('/index', indexPage);
app.use('/data', dataPage);

app.use((req,res)=>{
    res.status(404).json({'Error': 'Page not found'});
});

app.listen(3000, ()=>{
    console.log('Server is live on port 3000');
})

export default app;