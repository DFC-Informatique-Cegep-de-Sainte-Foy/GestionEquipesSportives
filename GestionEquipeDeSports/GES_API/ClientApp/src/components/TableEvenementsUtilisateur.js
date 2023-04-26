import React from "react";
import { Table } from "react-bootstrap";
import { ListeEvenementsPourUtilisateur } from "./ListeEvenementsPourUtilisateur";

export const TableEvenementsUtilisateur = (props) => {
    var evenements = props.ev;
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom événement</th>
                    <th>Emplacement</th>
                    <th>Date début</th>
                    <th>Durée</th>
                    <th>Presence</th>
                    <th></th>
                </tr>
            </thead>
            <ListeEvenementsPourUtilisateur ev={evenements} />
        </Table>
    )
}
