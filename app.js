const bodyParser =  require("body-parser");
const express  = require("express");
const https = require("https");
const app = express();
app.use(express.static("public"))   //to use static files /public folder/
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
      res.sendFile(__dirname + "/signup.html")
});

app.post("/", function( req, res){
    //console.log("logged")
    let firstName =  req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.emails;
    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    let url = "https://us21.api.mailchimp.com/3.0/lists/6b74d967f3"
    options = {
        method: "POST",
        auth: "Abdul:8d60ae8b0a11c383c74f8a2d23bed2f1-us21"
    }

    const request = https.request(url, options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else {
            res.sendFile(__dirname + "/failure.html")
        }
          response.on("data", function(data){
            console.log(JSON.parse(data));
          })
    })

    request.write(jsonData);
    request.end();
    //console.log(firstName, lastName, email)
})

app.post("/failure", function(req, res){  //redirects to the root/home route
    res.redirect("/")
})


app.listen( process.env.PORT || 3000, function(){
    console.log("server on port 3000")
})

//8d60ae8b0a11c383c74f8a2d23bed2f1-us21
//6b74d967f3