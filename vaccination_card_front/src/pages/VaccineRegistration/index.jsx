import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Input,
  TextArea,
  Header,
  Grid,
  Breadcrumb,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const VaccineRegistration = (props) => {
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    description: "",
  });

  useEffect(() => {
    if (props.match.params?.id) getVaccine();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getVaccine = () => {
    axios.get(`/api/vaccines/${props.match.params.id}`).then((response) => {
      setForm({
        name: response.data.vaccine.name,
        manufacturer: response.data.vaccine.manufacturer,
        description: response.data.vaccine.description,
      });
    });
  };

  const submit = () => {
    props.match.params?.id ? updateVaccine() : registerVaccine();
  };

  const registerVaccine = () => {
    axios.post("/api/vaccines", form).then(() => {
      props.history.replace("/vacinas");
    });
  };

  const updateVaccine = () => {
    axios.put(`/api/vaccines/${props.match.params.id}`, form).then(() => {
      props.history.replace("/vacinas");
    });
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Section
          as={Link}
          to="/vacinas"
          link
          style={{ color: "#00b5ad", fontSize: 16 }}
        >
          <Icon name="arrow left" />
          voltar
        </Breadcrumb.Section>
      </Breadcrumb>

      <Header as="h1" color="teal">
        Cadastrar vacina
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
              label="Fabricante"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
            />

            <Form.Field
              control={TextArea}
              label="Descrição"
              name="description"
              value={form.description}
              onChange={handleChange}
            />

            <Button color="teal" size="large" onClick={submit}>
              Cadastrar
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default VaccineRegistration;
