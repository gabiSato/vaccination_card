import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Icon,
  Header,
  Button,
  Breadcrumb,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const VaccinesList = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    getVaccines();
  }, []);

  const getVaccines = () => {
    axios.get("/api/vaccines").then((response) => {
      setVaccines(response.data.vaccines);
    });
  };

  const deleteVaccine = (vaccineId) => {
    axios.delete(`/api/vaccines/${vaccineId}`).then(() => {
      getVaccines();
    });
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Section
          as={Link}
          to="/"
          link
          style={{ color: "#00b5ad", fontSize: 16 }}
        >
          <Icon name="arrow left" />
          voltar
        </Breadcrumb.Section>
      </Breadcrumb>

      <Header as="h1" color="teal">
        Lista de Vacinas
      </Header>

      <Button as={Link} to="/vacina/cadastrar" color="teal">
        <Icon name="add" />
        Adicionar vacina
      </Button>

      <Table basic padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Fabricante</Table.HeaderCell>
            <Table.HeaderCell>Descrição</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {vaccines.map((vaccine) => (
            <Table.Row key={vaccine.id}>
              <Table.Cell>{vaccine.name}</Table.Cell>
              <Table.Cell>{vaccine.manufacturer}</Table.Cell>
              <Table.Cell>{vaccine.description}</Table.Cell>
              <Table.Cell textAlign="right" width={2}>
                <Button
                  as={Link}
                  to={`/vacina/${vaccine.id}/editar`}
                  icon
                  style={{ background: "transparent" }}
                >
                  <Icon name="edit" />
                </Button>

                <Button
                  icon
                  style={{ background: "transparent" }}
                  onClick={() => deleteVaccine(vaccine.id)}
                >
                  <Icon name="trash" color="red" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default VaccinesList;
