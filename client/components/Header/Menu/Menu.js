import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const [titleModal, setTitleModal] = useState("Inicia Sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      //funcion asincrona anonima autoconvocada, porque no  se puede poner async en el useEffect
      const response = await getMeApi(logout);
      setUser(response); // así los datos de usuario los tenemos en setUser
    })();
  }, [auth]);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {auth ? (
              <button onClick={logout}>Cerrar sesión</button>
            ) : (
              <MenuOptions onShowModal={onShowModal} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms() {
  return (
    <Menu>
      <Link href="/play-station">
        <Menu.Item>PlayStation</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item>Xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item>Switch</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal } = props;
  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Mi Cuenta
      </Menu.Item>
    </Menu>
  );
}
