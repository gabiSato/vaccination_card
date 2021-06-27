import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import VaccineRegistration from "./pages/VaccineRegistration";
import ChildVaccinations from "./pages/ChildVaccinations";
import ChildRegistration from "./pages/ChildRegistration";
import ChildrenList from "./pages/ChildrenList";
import VaccinesList from "./pages/VaccinesList";

import MainHeader from "./components/MainHeader";

const App = () => {
  return (
    <BrowserRouter>
      <MainHeader />

      <Switch>
        <Route exact path="/" component={ChildrenList} />
        <Route path="/vacinas" component={VaccinesList} />
        <Route path="/crianca/cadastrar" component={ChildRegistration} />
        <Route path="/crianca/:id/editar" component={ChildRegistration} />
        <Route path="/vacina/cadastrar" component={VaccineRegistration} />
        <Route path="/vacina/:id/editar" component={VaccineRegistration} />
        <Route path="/crianca/:id/vacinacoes" component={ChildVaccinations} />
      </Switch>

      <div style={{ height: 80 }}></div>
    </BrowserRouter>
  );
};

export default App;
