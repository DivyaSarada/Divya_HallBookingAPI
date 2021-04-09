const os=require("os");
var path=require("path");
const fs=require("fs");
const express=require("express");
const app=express();
app.use(express.json())
var rooms=[];
var customer=[];
app.post('/create',(req,res)=>{
req.body.id=rooms.length+1;
rooms.push(req.body);
res.json({
    message:"Successful"
})
})
app.post('/booking',(req,res)=>{
    var c=0;
    for(var i=0;i<rooms.length;i++){
        if(!rooms[i].isBooked){
            req.body.room=rooms[i].Room;
            rooms[i].isBooked=true;
            rooms[i].Customer=req.body.Name;
            rooms[i].Date=req.body.Date;
            rooms[i].Start=req.body.Start;
            rooms[i].End=req.body.End;
            c=1;
            break;
        }
    }
    if(c==0){
        res.json({
            message:"All rooms are full"
        })
    }
customer.push(req.body);
res.json({
    message:"Room Booked"
})
})
app.get('/rooms',(req,res)=>{
    res.json(rooms);
})
app.get('/customers',(req,res)=>{
    res.json(customer);
})

const port =process.env.PORT||3000;
app.listen(port,()=>{console.log("Listening on "+`${port}`)});