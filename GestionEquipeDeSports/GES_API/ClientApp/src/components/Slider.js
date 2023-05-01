import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './css/Slider.css';
import foot from '../images/foot.jpg';
import basket from '../images/basket.jpg';
import hockey from '../images/hockey.jpg';
import rugby from '../images/rugby.jpg';

function Slider() {
    const data = [
        {
            id:1,
            image: `${foot}`,
            title:"Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        },
        {
            id:2,
            image: `${basket}`,
            title:"Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        },
        {
            id:3,
            image: `${hockey}`,
            title:"Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        },
        {
            id:4,
            image: `${rugby}`,
            title:"Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        }
    ]

    return (
        <Carousel>
            {
                data.map( (slide) => (
                    <div key={slide.id}>
                        <img src={slide.image} alt="sport" />
                    </div>
                ))
            }
        

            
        </Carousel>
    )
}

export default Slider

