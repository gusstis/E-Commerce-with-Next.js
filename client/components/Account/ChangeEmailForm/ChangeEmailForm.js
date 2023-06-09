import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yupToFormErrors.object(validationSchema()),
    onSubmit: async (FormData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response || response?.statusCode === 400) {
        // Si da StatusCode = 400 es porque el email ya existe en otro user
        toast.error("Error al actualizar e-mail");
      } else {
        setReloadUser(true); //Para recargar el usuario y actualizar el email en la página
        toast.success("E-mail actalizado");
        formik.handleReset(); //Para resetear el formulario
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu e-mail <span>( Tu e-mail actual: {user.email} )</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths={"equal"}>
          <Form.Input
            name="email"
            placeholder="Tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true), //Acá en lugar de true puede ir un texto
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true), //...o acá, mejor
  };
}
