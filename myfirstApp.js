//including the express module
var express = require('express');

//calling the express module

var myapp = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//calling mongoose module

var mongoose = require('mongoose');
myapp.use(bodyParser.json({limit:'10mb', extended:true}));
myapp.use(bodyParser.urlencoded({limit:'10mb', extended:true}));

//defining configuration of database
var dbPath  = "mongodb://localhost/myBlogApp";

// command to connect with database
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

	console.log("hello u are now connected");

});

// include the model file 

var Blog = require('./blogModel.js');

var myblogModel = mongoose.model('Blog');

//using routes

myapp.get('/', function(req , res){
	res.send("This is my first blog");
});


// start route to GET all blogs
myapp.get('/blogs',function(req, res) {

	myblogModel.find(function(err,result){
		if(err){
			res.send(err)
		}
		else{
			res.send(result)
		}


	});// end user model find 
  
});


// start route to Create a BLOG

	myapp.post('/blog/create',function(req, res) {

		var newBlog = new myblogModel({

			title 		: req.body.title,
			subTitle 	: req.body.subTitle,
			blogBody 	: req.body.blogBody

		}); // end newBlog 

		// set the date of blog creation
		var today = Date.now();
		newBlog.created = today;

		// lets set the tags into array
		//var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
		//newBlog.tags = allTags;

		// set the author information
		var authorInfo = {fullName: req.body.authorFullName,email:req.body.authorEmail};
		newBlog.authorInfo = authorInfo;

		// now lets save the file 
		newBlog.save(function(error){
			if(error){
				console.log(error);
				res.send(error);

			}
			else{
				//console.log(newBlog);
				res.send(newBlog);
			}

		}); // end new blog save

	  
	}); // end route to create a blog


// route to get a particular blog
myapp.get('/blogs/:id',function(req, res) {

	myblogModel.findOne({'_id':req.params.id},function(err,result){
		if(err){
			console.log("some error");
			res.send(err);
		}
		else{
			//console.log(result);
			res.send(result)
		}


	});// end user model find 
  
});


// end route to get a particular blog

// start route to edit a blog

myapp.put('/blogs/:id/edit',function(req,res){

	var update = req.body;
	myblogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if (err)
		{
			console.log("Please update");
			res.send(err)
		}

		else
		{
			res.send(result)
		}
	});
}); // end route to edit a blog using _id

// start the route to delete a blog 
myapp.post('/blogs/:id/delete',function(req, res) {

	myblogModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}


	});// end user model find 
  
});

// end delete 


//displaying message to indicate that app is running on port 3000
myapp.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});