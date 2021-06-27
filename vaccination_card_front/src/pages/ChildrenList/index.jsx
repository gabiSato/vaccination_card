import React, { useEffect, useState } from "react";
import { Container, Table, Icon, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import axios from "axios";

const ChildrenList = (props) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = () => {
    axios.get("/api/children").then((response) => {
      setChildren(response.data.children);
    });
  };

  const deleteChild = (childId) => {
    axios.delete(`/api/children/${childId}`).then(() => {
      getChildren();
    });
  };

  return (
    <Container>
      <Header as="h1" color="teal">
        Lista de Crianças
      </Header>

      <Button as={Link} to="/crianca/cadastrar" color="teal">
        <Icon name="add" />
        Cadastrar criança
      </Button>

      <Table basic padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Cpf</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {children.map((child) => (
            <Table.Row key={child.id}>
              <Table.Cell>{child.name}</Table.Cell>
              <Table.Cell>{child.cpf}</Table.Cell>
              <Table.Cell textAlign="right" width={3}>
                <Button
                  as={Link}
                  to={`/crianca/${child.id}/vacinacoes`}
                  icon
                  style={{ background: "transparent" }}
                >
                  <Icon name="eye" />
                </Button>

                <Button
                  as={Link}
                  to={`/crianca/${child.id}/editar`}
                  icon
                  style={{ background: "transparent" }}
                >
                  <Icon name="edit" />
                </Button>

                <Button
                  icon
                  style={{ background: "transparent" }}
                  onClick={() => deleteChild(child.id)}
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

export default ChildrenList;
