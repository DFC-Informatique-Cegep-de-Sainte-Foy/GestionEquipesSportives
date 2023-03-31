import { React, useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";

export const PageModifieUnEvenement = () => {
    const [evenements, setEvenements] = useState({});
    const [equipes, setEquipes] = useState([]);
    const [description, setDescription] = useState('');
    const {id} = useParams();

    function recupereInformationsEvenements(){

    }

    function    recupereInformationsEquipes(){

    }


}

