import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Grid from "./components/Grid";
import React from "react";
import Grid_Time from "./components/Grid_Time";
import Form from "./components/Form";
import Control_Tiempo from "./components/Control_Tiempo"
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="clientes" element={<Grid />} />
      <Route path="control/:clienteId" element={<Grid_Time />} />
      <Route path="registro" element={<Form />} />
      <Route path="update/:clienteId" element={<Form />} />
      <Route path="tiempo" element={<Control_Tiempo />} />
    </Routes>
  );
};

export default Router;
