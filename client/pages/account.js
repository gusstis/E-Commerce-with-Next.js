import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth"; // De acá obtenemos si el user esta logged
import { getMeApi } from "../api/user";

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
      <Configuration />
    </BasicLayout>
  );
}

function Configuration() {
  return (
    <div className="acconut__configuration">
      <div className="title">Configuración</div>
      <div className="data">Formularios de configuración</div>
    </div>
  );
}
