import React, { useEffect, useState } from "react";
import {Icon} from 'semantic-ui-react';
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth"; // De acá obtenemos si el user esta logged
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from '../components/Account/ChangePasswordForm';

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Adresses />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, setReloadUser } = props;

  return (
    <div className="acconut__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm
          user={user}
          logout={logout}
      </div>
    </div>
  );
}

function Adresses() {
  return (
    <div className="account__adresses" >
      <div className="title">
        Direcciones...
        <Icon name="plus" link />
        <div className="data">
          <p>Lista de direcciones...</p>
        </div>
        </div>
    </div>
  )
}
