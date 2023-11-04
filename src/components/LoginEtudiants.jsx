import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import photo from "./photo/emsi.jpg";
import "./CSS/Login.css";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function LoginEtudiants() {
  const outletData = useOutletContext();

  const [numeroAppoge, setNumeroAppoge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://localhost:7118/api/Etudiants/LoginWithApp/${numeroAppoge}`
    );
    if (!response.data.isValid) {
      setErrorMessage("le numéro appoge n'est pas valide");
    } else {
      outletData.setLoginResponse(response.data);
      navigate("/Etudiants");
    }
  };
  const h3Style = {
    letterSpacing: "1px",
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2">
              <form onSubmit={handleSubmit}>
                <h3 className="fw-normal" style={h3Style}>
                  Connexion
                </h3>
                <label className="form-label">Numéro apogée</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Numéro apogée"
                  value={numeroAppoge}
                  onChange={(e) => setNumeroAppoge(e.target.value)}
                />
                <br></br>
                <button className="btn btn-block btnStyle col-12" type="submit">
                  Se connecter
                </button>
              </form>
            </div>
            <div className="msgError">{errorMessage && <p>{errorMessage}</p>}</div>
          </div>

          <div className="col-sm-6 d-none d-sm-block">
            <img src={photo} alt="Login image" className="w-100 vh-90" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginEtudiants;
