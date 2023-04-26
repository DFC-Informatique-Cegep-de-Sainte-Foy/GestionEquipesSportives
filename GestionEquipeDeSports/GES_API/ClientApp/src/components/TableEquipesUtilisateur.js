import React from "react";
import { Table } from "react-bootstrap";
import { ListeEquipesPourUtilisateur } from "./ListeEquipesPourUtilisateur";

export const TableEquipesUtilisateur = (props) => {
    var equipes = props.eq;
    return (
        <Table striped bordered >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Region</th>
                    <th>Sport</th>
                    <th>Association sportive</th>
                </tr>
            </thead>
            <ListeEquipesPourUtilisateur eq={equipes} />
        </Table>
    )
}
