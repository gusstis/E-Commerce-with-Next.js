import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function LoginForm(props) {
  const { showRegisterForm } = props;
  return (
    <Form className="login-form">
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo Electrónico"
      />
      <Form.Input name="password" type="password" placeholder="Contraseña" />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit">
            Entrar
          </Button>
          <button type="button"> Has olvidado la contraseña...</button>
        </div>
      </div>
    </Form>
  );
}
