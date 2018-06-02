




import React, { Component } from 'react';
import './css.css'
import {Button,Well} from 'react-bootstrap'

export default function Gamble(props){
        return(    
        <div>  
            <Well>{props.number===-1?'点一下爽一年':props.number}</Well>
            <Button bsStyle="primary" onClick={props.gamble}>单双定先手</Button>
        </div>
        )

}