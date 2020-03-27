import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import logo from "~/assets/fastfeet-logo.png";
import { Container, Content, Profile } from "./styles";
import { signOut } from "~/store/modules/auth/actions";
import history from "~/services/history";

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const { pathname } = history.location;
  const imageClick = () => {
    history.push({
      pathname: `/dashboard`
    });
  };
  return (
    <Container>
      <Content>
        <img src={logo} alt="fastfeet" onClick={() => imageClick()} />

        <nav>
          <Link
            to="/orders"
            className={pathname.includes("orders") ? "selecionado" : null}
          >
            ENCOMENDAS
          </Link>
          <Link
            to="/deliveryman"
            className={pathname.includes("deliveryman") ? "selecionado" : null}
          >
            ENTREGADORES
          </Link>
          <Link
            to="/recipients"
            className={pathname.includes("recipients") ? "selecionado" : null}
          >
            DESTINATÁRIOS
          </Link>
          <Link
            to="/problems"
            className={pathname.includes("problems") ? "selecionado" : null}
          >
            PROBLEMAS
          </Link>
        </nav>
        <div>
          <aside>
            <Profile>
              <div>
                <strong>{profile.name}</strong>
                <button onClick={() => dispatch(signOut())} type="button">
                  sair do sistema
                </button>
              </div>
            </Profile>
          </aside>
        </div>
      </Content>
    </Container>
  );
}
