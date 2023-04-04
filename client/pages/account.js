import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth"; // De acá obtenemos si el user esta logged
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = getMeApi(logout);
    })();
  }, []);

  return (
    <BasicLayout className="account">
      <Configuration user={user} logout={logout} />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout } = props;

  return (
    <div className="acconut__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm user={user} logout={logout} />
      </div>
    </div>
  );
}
