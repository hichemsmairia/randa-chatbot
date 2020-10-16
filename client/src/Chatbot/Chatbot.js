import React, { useEffect,useState } from 'react';
import Sky from 'react-sky';

import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
//import Card from "./Sections/Card";
import './Sections/section.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Navbar from '../components/layout/Navbar'
import Typography from '@material-ui/core/Typography';
//import { Card } from 'antd';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  
function Chatbot() {

    const [Data,setData] = useState([])
    const classes = useStyles();
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect( () => {

        eventQuery('3aslema') // event 'acceuille 
       
    }, [])
   

    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
         console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: { /// fullfimentMessages 
                    text: {
                        text: " essayer de reformer votre question حاول صياغة السؤال بطريقة اخرى"
                    }
                }
            }

            dispatch(saveMessage(conversation))  


        }

    }


    const eventQuery = async (event) => {


        //
         
      
       
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " il y'a un probleme quelque part ... veuillez verifier votre connection et réessayer "
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }


        

    }


    const keyPressHanlder = (e) => {
        
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('veuillez tapez un message d abord')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    


    const renderOneMessage = (message, i) => {
        console.log('message', message)

        // we need to give some condition here to separate message kinds 

        // template for normal text 

        const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />


        if (message.content && message.content.text && message.content.text.text)
         {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } 
        else if
         (message.content && message.content.card.title) 
         {

            

            return <div>
 <Card className={classes.root}>  
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={message.content.card.imageUri}
          title={message.content.card.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {message.content.card.subtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {message.content.card.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={message.content.card.buttons[0].postback} size="small" color="primary">
          Achetez maintenant !
                    
        </Button>
        
      </CardActions>
    </Card>
            </div>
        }

    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }

    const fetchData = async () => {
        const result = await Axios.get('/api/dialogflow/products')
        console.log(result.data)
       setData(result.data)
       console.log(Data)
       console.log("le socre du  produits sont " + Data.score)
       
       
       }
       window.setTimeout(fetchData(),50000)
       


    return (
         <div>
<Sky 
          images={{
            0: "https://www.flaticon.com/svg/static/icons/svg/3577/3577392.svg"
            
          }}
          how={20} 
          time={200} 
          size={'100px'} 
          background={'rgb(47, 57, 57)'} 
        />
      
<Navbar/>


            <div>

                

                    



          
                 
       <div  className="chatbot">
      

        <div  className="ChatbotAnimation" >
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>


                {renderMessage(messagesFromRedux)}


            </div>
            <div className="inputCustom">
            <input  
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1.2rem'
                }}
                placeholder="Ecrivez votre message ..."
                onKeyPress={keyPressHanlder}
                type="text"
            />

            <img style={{width:"50px",height:"50px"}} src={"https://i.pinimg.com/originals/d4/64/1c/d4641c0801e5b5d0050977515c632222.gif"}/> 
            </div>
        </div>
        
        </div>
        
        </div>
        <div>
        <div class="container">
  <div class="card">
      
    <div class="card-head">
    <span class="product-top">
            Meileure produit 
              </span>
      <img src={Data.image} alt="logo" class="card-logo"/>
      
      <div class="product-detail">
            <h2></h2> 
      </div>
      
    </div>
    <div class="card-body">
      <div class="product-desc">
        <span class="product-title">
        {Data.productName}
                                </span>
        <span class="product-caption">
        {Data.bodyParts} <br/> {Data.productType}
        
              </span>
        
      </div>
      <div class="product-properties">
        
        
       

              

              

      </div>
      <div class="product-properties"> 
      <span class="product-buy">
             <a href={Data.link}>Achetez !</a>
              </span></div>

      
    </div>
  </div>
</div>





     
            </div>


           
            
        </div>
    )

    
}

export default Chatbot;
