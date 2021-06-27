import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Input,
  Header,
  Grid,
  Breadcrumb,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import axios from "axios";

const ChildRegistration = (props) => {
  const [form, setForm] = useState({
    name: "",
    cpf: "",
  });

  useEffect(() => {
    if (props.match.params?.id) getChild();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getChild = () => {
    axios.get(`/api/children/${props.match.params.id}`).then((response) => {
      setForm({
        name: response.data.child.name,
        cpf: response.data.child.cpf,
      });
    });
  };

  const submit = () => {
    props.match.params?.id ? updateChild() : registerChild();
  };

  const registerChild = () => {
    axios.post("/api/children", form).then(() => {
      props.history.replace("/");
    });
  };

  const updateChild = () => {
    axios.put(`/api/children/${props.match.params.id}`, form).then(() => {
      props.history.replace("/");
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
        {props.match.params?.id ? "Editar" : "Cadastrar"} criança
      </Header>

      <Grid>
        <Grid.Column width={8}>
          <Form size="large">
            <Form.Field
              control={Input}
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Form.Field
              control={Input}
              label="Cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
            />

            <Button color="teal" size="large" onClick={submit}>
              {props.match.params?.id ? "Atualizar" : "Cadastrar"}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ChildRegistration;
