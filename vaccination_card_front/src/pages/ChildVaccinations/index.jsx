import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Select,
  Input,
  Table,
  Icon,
  Header,
  Breadcrumb,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ChildVaccinations = (props) => {
  const initialFormState = {
    date: new Date(),
    vaccine_id: null,
    batch: "",
    nurse: "",
  };

  const [child, setChild] = useState({});
  const [vaccinesOptions, setVaccinesOptions] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    getChild();
    getChildVaccinations();
    getVaccines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (_e, data) => {
    setForm((prev) => ({ ...prev, [data.name]: data.value }));
  };

  const getChild = () => {
    axios.get(`/api/children/${props.match.params?.id}`).then((response) => {
      setChild(response.data.child);
    });
  };

  const getVaccines = () => {
    axios.get("/api/vaccines").then((response) => {
      const options = response.data.vaccines.map((vaccine) => ({
        key: vaccine.id,
        value: vaccine.id,
        text: vaccine.name,
      }));

      setVaccinesOptions(options);
    });
  };

  const registerVaccinations = () => {
    axios
      .post("/api/vaccinations", { child_id: child?.id, ...form })
      .then(() => {
        getChildVaccinations();
        setForm(initialFormState);
      });
  };

  const getChildVaccinations = () => {
    axios
      .get(`/api/vaccinations/child/${props.match.params?.id}`)
      .then((response) => {
        setVaccinations(response.data.vaccinations);
      });
  };

  const deleteVaccinations = (vaccineId) => {
    axios.delete(`/api/vaccinations/${vaccineId}`).then(() => {
      getChildVaccinations();
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
        Vacinações de {child?.name}
      </Header>

      <Form size="large">
        <Form.Group>
          <Form.Field
            control={Input}
            type="date"
            label="Data da vacinação"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <Form.Field
            control={Select}
            label="Vacina"
            options={vaccinesOptions}
            placeholder="Selecione uma vacina"
            name="vaccine_id"
            value={form.vaccine_id}
            onChange={handleSelectChange}
          />

          <Form.Field
            control={Input}
            label="Lote"
            width={4}
            name="batch"
            value={form.batch}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            label="Enfermeiro(a)"
            width={6}
            name="nurse"
            value={form.nurse}
            onChange={handleChange}
          />
        </Form.Group>

        <Button color="teal" size="large" onClick={registerVaccinations}>
          Cadastrar
        </Button>
      </Form>

      <Table basic padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.HeaderCell>Vacina</Table.HeaderCell>
            <Table.HeaderCell>Lote</Table.HeaderCell>
            <Table.HeaderCell>Enfermeiro(a)</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {vaccinations?.map((vaccination) => (
            <Table.Row key={vaccination.id}>
              <Table.Cell>
                {moment(vaccination.date).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.Cell>{vaccination.vaccine.name}</Table.Cell>
              <Table.Cell>{vaccination.batch}</Table.Cell>
              <Table.Cell>{vaccination.nurse}</Table.Cell>
              <Table.Cell textAlign="right" width={2}>
                <Button
                  icon
                  style={{ background: "transparent" }}
                  onClick={() => deleteVaccinations(vaccination.id)}
                >
                  <Icon name="trash" color="red" link />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default ChildVaccinations;
