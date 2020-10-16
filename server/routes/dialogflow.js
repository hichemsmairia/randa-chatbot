const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const User = require("../models/User")
// const uuid = require('uuid');
  
var mongoose = require("mongoose")
const config = require('../config/keys');
const { stringify } = require('actions-on-google/dist/common');

// const { stringify } = require('actions-on-google/dist/common');

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode


// Create a new session

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// We will make two routes 

var chatSchema = mongoose.Schema({
    query: String,
    response:String,
    intent:String,
    created: {type: Date, default: Date.now}
});


var ProductIssue = mongoose.Schema({
    issueName:String,
    bodyParts : String,
    productType:String,
    productName:String,
    image:String,
    link:String,
    score: {type: Number, default: 1 },
    created: {type: Date, default: Date.now}

})

var Chat = mongoose.model('Message', chatSchema);

var Product = mongoose.model('Products', ProductIssue);
// Text Query Route
var message_table = []
router.post('/textQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },   
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    
    const result = responses[0].queryResult; // ceci est un objet   
  if(result)
      //  console.log( result.fulfillmentMessages[0].title)
        //console.log(result.parameters.length())
    {if(result.parameters.fields.product_type.stringValue !== "" && result.parameters.fields.body_parts && result.parameters.fields.issue_name) 
    {
       Product.findOne({ 
        bodyParts:result.parameters.fields.body_parts.stringValue ,
        productType:result.parameters.fields.product_type.stringValue,
        issueName: result.parameters.fields.issue_name.stringValue,
        productName:result.fulfillmentMessages[0].card.title //erruer 
       },(err,product)=>{  
            if (err) console.log (err)   
                if(product) {    

                console.log(`le produit existe ${" "} ${product.productName}`)
                product.score += 1 
                product.save(function(err) {
                    if (err) console.log(err)
                    console.log("score updated")
                });
            

                } else {
                    console.log("le produit n'existe pas je vais l'enregistrer ")
                    var doc2 = new Product ({
                        productType:result.parameters.fields.product_type.stringValue ,
                        bodyParts:result.parameters.fields.body_parts.stringValue ,
                         issueName: result.parameters.fields.issue_name.stringValue  ,
                          productName : result.fulfillmentMessages[0].card.title ,
                           image: result.fulfillmentMessages[0].card.imageUri ,
                           link:result.fulfillmentMessages[0].card.buttons[0].postback
                         });  
               doc2.save(function(err, doc) {
                   if (err) return console.error(err);
                   console.log("produit enregistré avec success!");
                 });
                }
        })        

        
    }} else 
    (console.log("le produit n'existe pas ")) 
                    // nasn3ou objet/tableau
   
                    // while(condition)     kol marra na3mlou table/object .push() 
                        // lbarra mel cnditions ysir save 

     

    var doc1 = new Chat ({ query: result.queryText  , response : result.fulfillmentText , intent: result.intent.displayName});
    message_table.push(doc1)
    doc1.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Message enregistré avec success!");
      });
    console.log(message_table) 
     
    


    res.send(result)
})
  


//Event Query Route

router.post('/eventQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    
    const result = responses[0].queryResult;
    
    res.send(result)
  
})
  


router.get('/products',(req,res)=>{
    
    Product.find({},{},{
        
        sort:{
            'score': -1 //Sort by Date Added DESC
        }
    },function(err,data){  
        
        if(err)console.log(err)
        else 
         
             console.log(data)      
            res.send(data[0]);   
         
    
})
})

router.get('/users_repartition',(req,res)=>{
    
    User.find({},'lng lat -_id',function(err,data){ 
        if(err)console.log(err)
        else 
         
                   
            res.send(data);   
         
    
})
})

        

module.exports = router;
