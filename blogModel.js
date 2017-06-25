
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

// declaring new schema
var myBlogSchema = new Schema({

	title 		: {type:String,default:'',required:true},
	subTitle 	: {type:String,default:''},
	blogBody 	: {type:String,default:''},
	createdon		: {type:Date},
	lastModified : {type:Date},
	authorInfo  :  {} // information of author in form of obje-ct
	

});


mongoose.model('Blog',myBlogSchema); // including model Blog in newly created schema