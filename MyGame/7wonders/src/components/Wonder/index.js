import React, { Component } from 'react';
import {Thumbnail,Image,Grid,Row,Col,Button} from 'react-bootstrap'
import {CardModal,Card,GeneralCard} from './styled'
import './styles.css';

export default function Wonder(props){
        if(props.image.length===0)return <div/>
        let BoardModal = [0,0,0,0].map((item,index)=>
                (<Col xs={6} md={3}>
                    {props.ai.indexOf(index)===-1&&<CardModal
                    show={props.selectModal[index]}
                    hide={() =>props.hideModal(index)}
                    >
                    <Card 
                        index={index}
                        prepare={true}
                        image={props.image[index]}
                        selectWonder={props.selectWonder}
                        id={props.idArr[index]}
                        ai={props.ai}
                        user={props.user}
                    />
                    </CardModal>}
                </Col>)
            )
        let Board = [0,0,0,0].map((item,index)=>
        (<Col xs={6} md={3} >
            <GeneralCard  
                index={index}
                image={props.image[index]} 
                event={() => props.showModal(index)}
                ai={props.ai}
                user={props.user}
                />
        </Col>)
        )
        return(
            <div style={{marginTop:'20%'}}>
                {Board}
                {BoardModal}
            </div>)

}

