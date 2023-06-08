const express = require("express");
// const { connect } = require("mongoose");
const connectDb = require("./db/dbConnection");
// var nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");   
const Contact = require("./models/userModel");
const Date_Schema = require("./models/DateModel");
const Date_Schema_for_subg = require("./models/DateModelforSubg");
const Deleted_model = require('./models/DeletedModel');
const Subg_vis_model = require('./models/Click_Data');
const SubGreddit = require("./models/subgredditModel");
const Posts = require("./models/PostModel");
const Report = require("./models/ReportModel");
const jwt = require("jsonwebtoken");
const PostModel = require("./models/PostModel");
const login_validation = require('./login_validation')
const register_validation = require('./register_validation')
app.use(cors());

app.use(express.json());

connectDb();
const port = 5000;

// const mongoose = require("mongoose")
// mongoose.set("strictQuery", false);
// const connectDb = async () => {
//     try{
//         const connect = await mongoose.connect(uri);
//         console.log("Database connected",connect.connection.host,connect.connection.name) 
//     }
//     catch (err){
//         console.log(err);
//         process.exit(1);
//     }
// }
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("MongoDB database connection established successfully!");
//     }
// });
app.get('/api/',(req,res) => {
    res.send("Hello world")
    // res.json({ message :"Get all contacts"})
})

app.post('/api/login',async(req,res) => {
    const {errors,valid_bit}=login_validation(req.body);
    // check_bit=1;
    console.log(req.body);
    if(valid_bit)
    {
    let {email, password} = req.body;
    const contact = await Contact.findOne({
        email
    });
    console.log(contact);
    if(contact===null)
    {
        console.log("here : ");
        res.send("Unregistered");
    }
    else{
        console.log("checking here");
        console.log(contact.password,password);
        if(await bcrypt.compare(password, contact.password))
        {
            console.log("in backend here");
            console.log(contact);
            // res.send(contact);   
            res.json({"contacts" : contact,token:generateToken(contact)});
        }
        else
        {
            res.json({"contacts" :"Incorrect Password"});
        }
    }
}
else
{
     res.status(404).json(errors);
}
}
)

app.post('/api/register',async(req,res) => {
    console.log(req.body);
    const {errors,valid_bit}=register_validation(req.body);
    if(valid_bit){
    let {email, password,age,firstName,lastName,ContactNumber,UserName} = req.body;
    const find_profile = await Contact.findOne({
        email
    });
    console.log("here in reg rotue")
    console.log(find_profile);
    // console.log(find_profile.email);
    // console.log(email);
    if(find_profile!=null && find_profile.email === email)
    {   
        res.send("INVALID");
    }
    else
    {
        let hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        password = hashedPassword;
        const contact = await Contact.create({
            email,
            password,
            age,
            firstName,
            lastName,
            ContactNumber,
            UserName
        }).then(
            res => {
                console.log(res.data);
            }   
        )
        res.json({"contacts" : contact,token:generateToken(contact)});
    }
}
else
{
    res.status(404).json(errors);
}
})

app.post('/api/send_email',async(req,res)=>{
    
})
app.post('/api/post',async(req,res) => {
    console.log(req.body);  
    let {Text,Subgreddit_id,Posted_by,Date} = req.body;
    console.log("here i am printintg the eke: ",Text,Subgreddit_id,Date);
    const contact = await Posts.create({
        Text,
        Subgreddit_id,
        Posted_by,
        Date
    }).then(
        res => {
            console.log(res.data);
        }   
    )
    let Subg_id =Subgreddit_id;
    const check_date = await Date_Schema.find({Date : Date, Subg_id : Subgreddit_id});
    console.log("printing the check_date here : ",check_date);
    if(check_date.length===0){
        let Date_Posts=[]
        const create_subg = await Date_Schema.create({
            Date,Date_Posts,Subg_id
        }).then(
            res => {
                console.log(res.data);
            }
        )
    }
    // var date = new Date()
    // date = date.toString();
    const for_subg_update = await SubGreddit.updateOne({_id : Subgreddit_id},{$push : {'Posts' : "dummy"}});
    const for_date = await Date_Schema.updateOne({Date : Date, Subg_id : Subgreddit_id},{$push : {'Date_Posts' : `${Subgreddit_id}`}});
    console.log("printing for date_here",check_date);
    res.send(contact);
})

app.post('/api/get_all_post_info',async(req,res) => {
    console.log(req.body);  
    let {Subg_id} = req.body;
    let temp1 = await Date_Schema.find({Subg_id : Subg_id});
    console.log("printing shit here : ",temp1);
    res.send(temp1);
})

app.post('/api/for_date_clicks',async(req,res) => {
    console.log(req.body);  
    let {Subg_id,Date} = req.body;
    let temp1 = await Subg_vis_model.findOne({Subg_id : Subg_id,Date : Date});

    console.log("printing temp1 shit here for search : ",temp1);

    if(temp1 === null){
        let Vis=[]
        const create_subg = await Subg_vis_model.create({
            Date,Subg_id,Vis
        }).then(
            res => {    
                console.log(res.data);
            }
        )
    }
    let temp2 = await Subg_vis_model.updateOne({Subg_id : Subg_id, Date : Date},{$push : {'Vis' : "visiting"}})
    console.log("printing temp 2 shit here : ",temp2);
    res.send(temp1);
})

app.post('/api/submitcomment',async(req,res) => {
    console.log(req.body);  
    let {_id, email, data} = req.body;
    const ds={_id : _id};
    console.log(_id,email,data);
    let total_data = {
        "email" : email,
        "data" : data
    }
    console.log(total_data,typeof(total_data));
    let temp1 = await Posts.updateOne(ds,{$push : {'Comments' : total_data}})
        console.log(temp1);
        res.send(temp1);    
    
})

app.post('/api/visiting_a_subg',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    console.log(_id);
    let temp1 = await Subg_vis_model.find({Subg_id : _id})
        console.log(temp1);
        res.send(temp1);    
    
})

app.post('/api/for_rep_vs_del',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    let temp1 = await Deleted_model.findOne({Subg_id : _id})
    console.log(_id);
        console.log("printing temp1 here : ",temp1);
        res.send(temp1);    
    
})

app.post('/api/report',async(req,res) => {
    console.log(req.body);  
    let {_id, ReportedBy, Concern,CreationDate} = req.body;
    const ds={_id : _id};
    console.log("printing the type of creation Date : ",CreationDate,typeof(CreationDate));
    console.log(_id,ReportedBy,Concern);
    let temp1 = await Posts.findOne(ds);
    console.log(temp1);
    let Posted_by = temp1.Posted_by,Text=temp1.Text,Subg_id=temp1.Subgreddit_id;
    console.log(Posted_by,Text);
    let ReportedWhom = Posted_by, Post_id = _id;
    ButtonState = ""
    const create_subg = await Report.create({
        Text, ReportedBy, ReportedWhom, Concern, Post_id,Subg_id,CreationDate,ButtonState
    }).then(
        res => {
            console.log(res.data);
        }
    )
    let find_id = await Deleted_model.findOne({Subg_id : Subg_id});
    console.log("printing findOne here : ")
    if(find_id===null){ 
        let Deleted=[0],Reported=[0]
        const create_del = await Deleted_model.create({
            Subg_id,Deleted,Reported
        }).then(
            res => {    
                console.log(res.data);
            }
        )
        console.log("printing the create_del : ",create_del);
    }
    find_id = await Deleted_model.findOne({Subg_id : Subg_id});
    console.log("printing the find_id : ",find_id); 
    let deltemp1 = await Deleted_model.updateOne({Subg_id : Subg_id},{$push : {'Deleted' : find_id.Deleted[find_id.Deleted.length-1]}})
    let deltemp2 = await Deleted_model.updateOne({Subg_id : Subg_id},{$push : {'Reported' : find_id.Reported[find_id.Reported.length-1]+1}})

    // const create_del_rep = await Deleted_model.create({
    //     Subg_id
    // })
    // console.log("printing create del rep",create_del_rep);
        res.send(create_subg);    
    
})

app.post('/api/get_comments',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    const ds={_id : _id};
    console.log(_id);
    
    let temp1 = await Posts.findOne(ds)
        console.log(temp1);
        res.send(temp1.Comments);     
})

app.post('/api/get_reports',async(req,res) => {
    console.log("printing the body : ",req.body);  
    let {id} = req.body;
    const ds={Subg_id : id};
    console.log(id);
    console.log("printing the ds here : ",ds);
    let temp1 = await Report.find(ds)
    let temp2 = []
    for(let i = 0 ; i < temp1.length ; i++ )
    {
        let cur_date = new Date();
        cur_date= cur_date.toString();
        cur_date= Date.parse(cur_date);
        let prev_date = Date.parse(temp1[i].CreationDate);
        let time_in_ms = cur_date - prev_date;
        function diff_hours(time_in_ms) 
        {
        return Math.abs(Math.round(time_in_ms/ (60000*60)));
        }
        // console.log("sad man : ",time_in_ms);
        if(diff_hours(time_in_ms)>=10*24 && temp1[i].ButtonState==="")
        {
            _id = temp1[i]._id
            let o1= await Report.findByIdAndDelete(_id);
            console.log("here in deleting reporting due to time expiry")
            // res.send("-1")
        }
        else temp2.push(temp1[i])
    }
    // else
    res.send(temp2);  
    // res.send("ok");
})

app.post('/api/get_subg_data',async(req,res) => {
    console.log("printing the body : ",req.body);  
    let {Subgreddit_id} = req.body;
    const ds={_id : Subgreddit_id};
    console.log("printing the ds here : ",ds);
    let temp1 = await SubGreddit.findOne(ds)
    res.send(temp1);  
    // res.send("ok");
})

app.post('/api/submit_btn_data',async(req,res) => {
    console.log("printing the body : ",req.body);  
    let {ButtonState,_id,Post_id,Posted_by,Subgreddit_id} = req.body;
    console.log(ButtonState,_id,Post_id,Posted_by,Subgreddit_id);
    // if(timetaken==0)
    // {
    let for_update = { $set:{ButtonState : ButtonState}}
    const upd_profile = await Report.updateOne(
        {_id : _id},
        for_update
        );
    if(ButtonState==="block"){
        let temp2 = await SubGreddit.updateOne({_id : Subgreddit_id},{$pull : {'People' : `${Posted_by}`}})
        let temp1 = await SubGreddit.updateOne({_id : Subgreddit_id},{$push : {'BlockedPeople' : `${Posted_by}`}})

    }
    if(ButtonState==="delete"){
        let o1= await Report.findByIdAndDelete(_id);
        let o2= await Posts.findByIdAndDelete(Post_id) 
        
        let find_id = await Deleted_model.findOne({Subg_id : Subgreddit_id});

        
        let temp1 = await Deleted_model.updateOne({Subg_id : Subgreddit_id},{$push : {'Deleted' : find_id.Deleted[find_id.Deleted.length-1]+1}})
        let temp2 = await Deleted_model.updateOne({Subg_id : Subgreddit_id},{$push : {'Reported' : find_id.Reported[find_id.Reported.length-1]}})
        const for_subg_update = await SubGreddit.updateOne({_id : Subgreddit_id},{$pop : {'Posts' : -1}});
        // let temp3 = await SubGreddit.updateOne({_id : Subgreddit_id},{$push : {'Posts' : }})

    }
    res.send(upd_profile);  
    // }
    // else res.send("operation stopped")
})
app.post('/api/get_btn_data',async(req,res) => {
    console.log("printing the body : ",req.body);  
    let {_id} = req.body;
    console.log(_id);
    // let for_update = { $set:{ButtonState : ButtonState}}
    const upd_profile = await Report.findOne(
        {_id : _id}
    );
    res.send(upd_profile.ButtonState);  
})

app.post('/api/post_info',async(req,res) => {
    console.log(req.body);  
    let {Posted_by,Subgreddit_id} = req.body;
    console.log("here i am printintg the posted_by: ",Posted_by,Subgreddit_id);
    const contact = await Posts.find({
        Subgreddit_id : Subgreddit_id
    })
    
    // const contact = await Posts.find()
    console.log(contact);
    res.send(contact);
})

app.post('/api/MySubgreddit',async(req,res) => {
    console.log(req.body);
    let {Name, Description, Tags, Banned, Owner,Date,email,Image} = req.body;
    People = [email]
    console.log("displaying image and the body: ",req.body)
    const create_subg = await SubGreddit.create({
        Name, Description, Tags, Banned, Owner, Date,People,Image
    }).then(
        res => {
            console.log(res.data);
        }
    )

    // People = [email];
    // Time = new Date().toLocaleString()
    // const temp2 = await Date_Schema_for_subg.create({
    //     Time,Subg_id,People
    // }).then(
    //     res => {
    //         console.log(res.data);
    //     }   
    // )
    res.send("Data Sent Sucessfully")
})

app.post('/api/add_followers',async(req,res) => {
    console.log(req.body);
    let {Posted_by,my_email} = req.body;
    console.log("printing received info : ",Posted_by,my_email);
    const ds = {"email":Posted_by}
    const ds2= {"email" : my_email}
    console.log(ds);
    let temp1 = await Contact.updateOne(ds,{$push : {'Followers' : `${my_email}`}})
    let temp2 = await Contact.updateOne(ds2,{$push : {'Following' : `${Posted_by}`}})
    console.log(temp1,temp2);
    res.send(temp1);
})

app.post('/api/save_post',async(req,res) => {
    console.log(req.body);
    let {_id,my_email} = req.body;
    console.log("printing received info : ",_id,my_email);
    const ds = {"email":my_email}
    console.log(ds);
    let user_info = await Contact.findOne(ds);
    console.log(user_info.SavedPost);
    console.log(user_info.SavedPost.includes(_id));
    if(user_info.SavedPost.includes(_id)===false)
    {
    let temp1 = await Contact.updateOne(ds,{$push : {'SavedPost' : `${_id}`}})
    console.log(temp1);
    res.send(temp1);
    }
    else
    res.send("already saved");
})

app.post('/api/MySubgreddit_info',async(req,res) => {
    console.log(req.body);
    let {Owner} = req.body;
    let create_subg = await SubGreddit.find({
        Owner : Owner
    })
    console.log(create_subg);
    res.json(create_subg)
})

app.post('/api/get_banned_words',async(req,res) => {
    console.log(req.body);
    let {_id} = req.body;
    let create_subg = await SubGreddit.findOne({
        _id : _id
    })
    console.log(create_subg);
    res.send(create_subg.Banned)
})

app.post('/api/saved_info',async(req,res) => {
    console.log(req.body);
    let {email} = req.body;
    let create_subg = await Contact.findOne({
        email : email
    })
    console.log(create_subg);
    res.send(create_subg.SavedPost)
})

app.post('/api/Subgreddit_info_for_display',async(req,res) => {
    console.log(req.body);
    let {id} = req.body;
    let db = {_id : id["id"]}
    console.log(db)
    let create_subg = await SubGreddit.find(db)
    console.log(create_subg);
    res.json(create_subg)
})

app.post('/api/Subgreddit_info',async(req,res) => {
    console.log(req.body);
    let {Owner} = req.body;
    let create_subg = await SubGreddit.find()
    console.log(create_subg);
    res.json(create_subg)
})
app.post('/api/saved_post_info',async(req,res) => {
    console.log(req.body);
    let {_id} = req.body;
    let create_subg = await Posts.findOne({_id : _id})
    console.log(create_subg);
    res.send(create_subg)
})
app.post('/api/del_saved_post',async(req,res) => {
    console.log(req.body);
    let {_id,email} = req.body;

    console.log("printing the id and  email here : ",_id,email);
    const ds = {email : email};
    let temp = await Contact.updateOne(ds,{$pull : {'SavedPost' : `${_id}`}})
    console.log(temp);
    res.send(temp)
})

app.post('/api/MySubgreddit_del',async(req,res) => {
    console.log(req.body);  
    let _id = req.body.id;
    console.log(_id);
    let create_subg = await SubGreddit.findByIdAndDelete(_id)
    console.log(create_subg);
    let get_post_data = await PostModel.find({Subgreddit_id : _id});
    console.log("get_post_data : ",get_post_data)
    // for(let i = 0 ; i < get_post_data.length ; i++){
    //     let post_id = get_post_data[i].Post_id;
    //     let relevent_persons = Contact.find({SavedPost : post_id})
    // }
    console.log("checking order of execution : ");
    let del_post = await PostModel.deleteMany({Subgreddit_id : _id});
    let del_click_data = await Subg_vis_model.deleteMany({Subg_id : _id});
    let del_date_model = await Date_Schema.deleteMany({Subg_id : _id});
    let del_date_sub_model = await Date_Schema_for_subg.deleteMany({Subg_id : _id});
    let del_model = await Deleted_model.deleteMany({Subg_id : _id});
    let report_model = await Report.deleteMany({Subg_id : _id});
    console.log("del_post : ",del_post);
    console.log("del_click_data : ",del_click_data);
    console.log("del_date_model : ",del_date_model);
    console.log("del_date_sub_model : ",del_date_sub_model);
    console.log("del_model : ",del_model);
    console.log("report_model : ",report_model);
    res.json(get_post_data)
})
app.post('/api/MySubgreddit_del_2',async(req,res) => {
    let {posts} = req.body;
    console.log("printing the post data for checking : ",posts)
    for(let i = 0 ; i < posts.length ; i++){
        let temp1 = await Contact.updateMany({},{$pull : {'SavedPost' : `${posts[i]._id}`}})
    }
})
app.post('/api/upvotes',async(req,res) => {
    console.log(req.body);  
    let {_id,email} = req.body;
    const ds={_id : _id};
    console.log(_id);
    let create_subg = await Posts.findOne(ds);
    console.log(create_subg);
    if(create_subg.Upvotes.includes(email)===false)
    {
        let temp1 = await Posts.updateOne(ds,{$push : {'Upvotes' : `${email}`}})
        console.log(temp1);
        res.json({len : create_subg.Upvotes.length+1})
    }
    else res.send("invalid");
})
app.post('/api/downvotes',async(req,res) => {
    console.log(req.body);  
    let {_id,email} = req.body;
    const ds={_id : _id};
    console.log(_id);
    let create_subg = await Posts.findOne(ds);
    console.log(create_subg);
    if(create_subg.Downvotes.includes(email)===false)
    {
        let temp1 = await Posts.updateOne(ds,{$push : {'Downvotes' : `${email}`}})
        console.log(temp1);
        res.json({len : create_subg.Downvotes.length+1})
    }
    else res.send("invalid");
})



app.post('/api/get_upvotes',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    const ds={_id : _id};
    console.log(_id);
    let create_subg = await Posts.findOne(ds);
    console.log(create_subg);
    console.log("lets print the lenght : ",create_subg.Upvotes);
    res.json({len : create_subg.Upvotes.length})
})
app.post('/api/get_downvotes',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    const ds={_id : _id};
    console.log(_id);
    let create_subg = await Posts.findOne(ds);
    console.log(create_subg);
    console.log("lets print the lenght : ",create_subg.Downvotes);
    res.json({len : create_subg.Downvotes.length})
})

app.post('/api/MySubgreddit_users',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    console.log("here i am printintg the id",_id);
    let ds = {_id : _id["id"]}
    console.log(ds)
    let temp = await SubGreddit.findOne(ds)
    console.log(temp)
    res.send(temp)
})

app.post('/api/reject_user',async(req,res) => {
    console.log(req.body);  
    let {_id,ele} = req.body;
    console.log("here i am printintg the eke: ",_id,ele);
    let ds = {_id : _id["id"]}
    console.log(ds,ele["ele"])
    let temp = await SubGreddit.updateOne(ds,{$pull : {'RequestedPeople' : `${ele["ele"]}`}})
    console.log(temp)
    res.send(temp)  
})

app.post('/api/accept_user',async(req,res) => {
    console.log(req.body);  
    let {_id,ele,Time} = req.body;
    console.log("here i am printintg the eke: ",_id,ele,Time);
    let ds = {_id : _id}
    console.log(ds,ele["ele"])
    let Subg_id = _id;
    let temp = await SubGreddit.updateOne(ds,{$pull : {'RequestedPeople' : `${ele["ele"]}`}})
    console.log(temp)
    let temp1 = await SubGreddit.updateOne(ds,{$push : {'People' : `${ele["ele"]}`}})
    console.log(temp1);
    let People = await SubGreddit.findOne({_id});
    People = People.People;
    console.log("printing the peopls :",People)
    const temp2 = await Date_Schema_for_subg.create({
        Time,Subg_id,People
    }).then(
        res => {
            console.log(res.data);
        }   
    )
    console.log(temp2)
    res.send(temp)  
})

app.post('/api/add_request',async(req,res) => {
    console.log(req.body);  
    let {_id,email} = req.body;
    console.log("here i am printintg the eke: ",_id,email);
    let ds = {_id : _id}
    // console.log(ds,ele["ele"])
    // let temp = await SubGreddit.updateOne(ds,{$pull : {'RequestedPeople' : `${ele["ele"]}`}})
    // console.log(temp)
    let temp1 = await SubGreddit.updateOne(ds,{$push : {'RequestedPeople' : `${email}`}})

    res.send(temp1)  
})
app.post('/api/people_and_time',async(req,res) => {
    console.log(req.body);  
    let {_id} = req.body;
    let ds = {Subg_id : _id}
    // let temp = await SubGreddit.updateOne(ds,{$pull : {'RequestedPeople' : `${ele["ele"]}`}})
    // console.log(temp)
    let temp1 = await Date_Schema_for_subg.find(ds)
    console.log(ds)
    console.log("here i am printintg the eke: ",_id);
    console.log("here is subg dates : ",temp1);
    res.send(temp1)  
})

app.post('/api/leave',async(req,res) => {
    console.log(req.body);  
    let {_id,email} = req.body;
    console.log("here i am printintg the eke: ",_id,email);
    let ds = {_id : _id}
    // console.log(ds,ele["ele"])
    let temp = await SubGreddit.updateOne(ds,{$pull : {'People' : `${email}`}})
    let temp1 = await SubGreddit.updateOne(ds,{$push : {'LeftPeople' : `${email}`}})
    // let temp = await Contact.updateOne(ds,{$pull : {'People' : `${email}`}})
    // let temp = await Contact.findOne(ds);
    console.log(temp)
    res.send("temp")  
})

app.post('/api/delete_followers',async(req,res) => {
    console.log(req.body);  
    let {_id,ele,email} = req.body;
    console.log("here i am printintg the eke in delete_followers: ",_id,ele);
    let ds = {_id : _id}
    let ds1 ={email : ele["ele"]}
    console.log(ds,ele["ele"],email)
    let temp = await Contact.updateOne(ds,{$pull : {'Followers' : `${ele["ele"]}`}})  // To DO : delete from followings here 
    let temp1 = await Contact.updateOne(ds1,{$pull : {'Following' : `${email}`}})  // To DO : delete from followings here 
    console.log(temp,temp1)
    res.send(temp)  
})

app.post('/api/delete_following',async(req,res) => {
    console.log(req.body);  
    let {_id,ele,email} = req.body;
    console.log("here i am printintg the eke in delete following: ",_id,ele);
    let ds = {_id : _id}
    let ds1 ={email : ele["ele"]}
    console.log(ds,ele["ele"])
    let temp = await Contact.updateOne(ds,{$pull : {'Following' : `${ele["ele"]}`}})  // To DO : delete from followings here 
    let temp1 = await Contact.updateOne(ds1,{$pull : {'Followers' : `${email}`}})  // To DO : delete from followings here 
    console.log(temp,temp1)
    res.send(temp)  
})
app.post('/api/get_user_info',async(req,res)=>{
    console.log(req.body);  
    let {_id} = req.body;
    console.log("here i am printintg the eke in get_user_info: ",_id);
    let temp = await Contact.findOne({_id});
    console.log(temp)
    res.send(temp)  
})

app.post('/api/get_user_info_by_email',async(req,res)=>{
    console.log(req.body);  
    let {email} = req.body;
    console.log("here i am printintg the eke: ",email);
    let temp = await Contact.findOne({email});
    console.log("printing the data here in info by email : ",temp);
    console.log(temp)
    res.send(temp.Followers)  
})


app.post("/api/update",async (req,res) =>{
    console.log(req.body, "printing here in update the body");
    // console.log(typeof(req.body))
    let {email, password,age,firstName,lastName,ContactNumber,UserName} = req.body;
  
    console.log(email,password,age,firstName);
    let for_update = { $set:{firstName : firstName,age : age, lastName : lastName, ContactNumber : ContactNumber, UserName : UserName}}
    const upd_profile = await Contact.updateOne(
        {email : email},
        for_update
    );
    console.log(upd_profile,"printing the update profile");
    res.send("OK")
})

app.get("/api/auth",(req,res)=>{
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
  
    console.log(token);
  
    if (token == null) {
      console.log("token is NULL");
      return res.sendStatus(401);
    }
  
    jwt.verify(token, "ppt1524", (err, user) => {
      if (err) {
        console.log("came here in the errors zone",err)
        return res.send("INVALID_USER");
      }
  
      console.log("user", user);
  
      req.user = user;
      res.status(200).send(user);
    })
})

// Generate JWT
const generateToken = (data) => {
    return jwt.sign({data},"ppt1524");
}



app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})