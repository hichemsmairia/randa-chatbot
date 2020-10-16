import React from 'react'
import { List, Icon, Avatar } from 'antd';
import './section.css'

function Message(props) {

    const AvatarSrc = props.who ==='bot' ? "https://img2.freepng.fr/20180409/trw/kisspng-robotics-technology-computer-icons-internet-bot-robotics-5acb92ea798de2.8860913715232908584979.jpg" : "https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png"  

    return (
        <div class="chat">
  <div class="mine messages">
  <div class="message last">

        <List.Item >
           
            <List.Item.Meta
                avatar={ <img 
                    src={AvatarSrc}
                    alt="new"
                    style={{
                        height:"50px",width:"50px"
                    }}
                    />}
                title={props.who}
                description={props.text}
            />
        </List.Item>
        </div>
        </div>
        </div>
    )   
}

export default Message
