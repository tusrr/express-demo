
const Joi =  require('joi'); // returns a class , so pascal notn in class var/const by convention
const express = require('express');
const dotenv = require('dotenv')
const app = express(); // express() func returns an object of type express, conventionally called an app
//this has   http methods {get,post,put ,delete}
dotenv.config()
app.use(express.json());

const courses =[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"}
]

app.get('/',(req,res)=>{
    res.send('Hello Express from Tushar ')
})
app.get('/api/courses',(req,res)=>{
    //logic to get list of database from the courses
    res.send(courses)
})


app.get('/api/courses/:id',(req,res)=>{
    // res.send(req.params.id)
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id doesnt exist')
    res.send(course)
})

app.get('/api/posts/:year/:month',(req,res)=>{
    // res.send(req.params)
    res.send(req.query)
})

app.post('/api/courses',(req,res)=>{

    // if(!req.body.name|| req.body.name.length < 3){
    //     //400 bad request
    //     res.status(400).send('Name is reqd and should be min of 3 char')
    //     return;
    // }
    
    // instead use npm joi for validation

   

    const schema = Joi.object({
        name: Joi
        .string()
        .min(3)
        .required()
    })
    
    const { error, value } = schema.validate({ name: 'ABC' }); // Valid because 'ABC' has 3 characters
    
  
    
   const course ={
    id:courses.length+1,
    name:req.body.name
   }
   courses.push(course);
   res.send(course)
})  


app.put('/api/courses/:id',(req,res)=>{
    //Look up the course
    //if not existing,return 404

    //update course
    //return the updated course 

    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id doesnt exist')

    // validation logicc here

    course.name == req.body.name;
    res.send(course)


})


app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course,not existing return 404
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id doesnt exist')
    // delete

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course)

    //return the same course
})













const PORT = process.env.PORT||3000;

// console.log(process.env.PORT)
// console.log(process.env)


app.listen(PORT,()=>console.log(`listening on port ${PORT}...`))