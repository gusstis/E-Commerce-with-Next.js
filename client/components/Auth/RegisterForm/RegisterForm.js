import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  return (
    <Form className="login-form">
      <Form.Input name="name" type="text" placeholder="Nombre"></Form.Input>
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
      ></Form.Input>
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de Usuario"
      ></Form.Input>
      <Form.Input
        name="email"
        type="text"
        placeholder="Coreeo Electrónico"
      ></Form.Input>
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
      ></Form.Input>
      <div className="actions">
        <Button type="button" basic>
          Iniciar Sesión
        </Button>
        <Button type="submit" className="submit">
          Registrar
        </Button>
      </div>
    </Form>
  );
}
