import styled from 'styled-components';
import React, { Component } from 'react';
import {Thumbnail,Image,Grid,Row,Col,Button,Modal,ButtonGroup} from 'react-bootstrap'
import './styles.css';

export  function CardModal(props) {
    return (
        <Modal
            {...props}
            show={props.show}
            onHide={props.hide}
            bsSize="medium"
        >
            <Modal.Header closeButton style={{background: 'rgb(28,53,56)', color:'#FFF'}}>
            </Modal.Header>
            <Modal.Body style={{background: 'rgb(237,204,146)'}}>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}


const CustomThumbnail = styled(Thumbnail)`
&:hover {
    -webkit-transform: scale(1.05);
    -moz-transform:    scale(1.05);
    -o-transform:      scale(1.05);
    -ms-transform:     scale(1.05);
  }
`

const InGameButton = 
                    <ButtonGroup>
                    <Button bsStyle="danger">出售</Button>
                    <Button bsStyle="success">修建</Button>
                    </ButtonGroup>

export function Card(props){
    return(<CustomThumbnail href="#" alt="171x180" src={props.image} onClick={props.event} disabled={props.ai.indexOf(props.index)!==-1}>
        {!props.general?
        <div style={{textAlign:'center'}}>
        <p> 
          {props.prepare? 
                <Button id={props.id} bsStyle="warning" onClick={(event)=>{
                    props.selectWonder(event.target.id)
                }}>选择</Button>
                :<InGameButton/>
            }
        </p>
        </div>:
        null}
        </CustomThumbnail>
    )
}

export function GeneralCard(props){
    return(<Button disabled={props.ai.indexOf(props.index)!==-1|| props.user.indexOf(props.index)!==-1}><Image src={props.image}  class="card" onClick={props.event} /></Button>)
}
