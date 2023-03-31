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
            {user !== undefined && ( //Condición para saber si el usuario está logueado o nop
              <MenuOptions //Una vez comprobado, renderizamos el Menú
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
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
        <Menu.Item as={"a"}>PlayStation</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item as={"a"}>Xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item as={"a"}>Switch</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  return (
    <Menu>
      {user ? ( //..si user existe
        <>
          <Link href="/orders">
            <Menu.Item as={"a"}>
              <Icon name="game" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as={"a"}>
              <Icon name="heart outline" />
              My wish list
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as={"a"}>
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>{" "}
          {/* Menú de usuario*/}
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          {" "}
          {/*Menú gral*/}
          <Icon name="user outline" />
          Mi Cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
