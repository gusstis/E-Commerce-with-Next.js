import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi } from "../../../api/address";

export default function AddressForm(props) {
  const { setShowModal } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (FormData) => {
      createAddress(FormData);
    },
  });

  const createAddress = async (FormData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);

    if (!response) {
      toast.warning("Error al crear la dirección..");
      setLoading(false);
    } else {
      formik.resetForm();
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Título de la dirección"
        placeholder="Título de la dirección"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths={"equal"}>
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="postalCode"
          type="text"
          label="Código postal"
          placeholder="Código postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Número de teléfono"
          placeholder="Número de teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          Crear dirección
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}

/* Ahora queda crear la colección de direcciones en el backend: collName: address
title:  type: text  campo  obligatorio
name:   type text   campo obligatorio
address:type text   campo obligatorio
city:   type text   campo obligatorio
state:  type text   campo obligatorio
postalCode: type text campo obligatorio
phone:  type text   campo obligatorio
#luego agregamos un campo relacionado (relacion) address ---> user
# ahara faltaría agregar roles y permisos, habilitar los endpoints(usuarios autenticados
>find
>delete
>create
>update
>findone
*/
