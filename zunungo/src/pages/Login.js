import React, { useEffect, useState } from 'react';
import { getUserData, addNewUserData, login, signup, getCurrentUser, resetPassword } from '../utils/api';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login({ user, setUser, lang, setLang }) {
  const [type, setType] = useState(true);
  const [loading, setloading] = useState(false);
  const [navigate, setnavigate] = useState(false);
  const [forgotPassword, setforgotPassword] = useState(false);
  const [navigateTo, setnavigateTo] = useState("");
  const [emailSent, setEmailSent] = useState('')

  useEffect(() => {
    setloading(true);
    // sessionStorage.setItem('zAuthToken');
    var uid = sessionStorage.getItem('zAuthUID');
    getCurrentUser(uid, (res) => {
      if (res.status) {
        setUser(res.data[0]);
        if (res.data[0].role == 'user') {
          setnavigateTo('/profile');
        } else if (res.data[0].role == 'ad') {
          setnavigateTo('/admin');
        }
        setnavigate(true);
      }
      setloading(false);
    })
  }, []);

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    console.log(formProps)
    var isErr = false;
    for (var key in formProps) {
      if (formProps.hasOwnProperty(key)) {
        if (!formProps[key]) {
          toast.error(key + " est requis / " + key + " is required");
          isErr = true;
        }
      }
    }
    if (!isErr) {
      await login(formProps, (res) => {
        console.log('handleSigninSubmit: ', res);
        if (res.status) {
          setUser(res.data[0]);
          if (res.data[0].role == 'user') {
            setnavigateTo('/profile');
          } else if (res.data[0].role == 'ad') {
            setnavigateTo('/admin');
          }
          setnavigate(true);
        }
        setloading(false);
      })
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    var isErr = false;
    for (var key in formProps) {
      if (formProps.hasOwnProperty(key)) {
        if (!formProps[key]) {
          toast.error(key + " est requis / " + key + " is required");
          isErr = true;
        }
      }
    }
    if (formProps.terms == "on" && !isErr) {
      formProps.role = 'user';
      await signup(formProps, (res) => {
        console.log('handleSignupSubmit: ', res);
        if (res.status) {
          setUser(res.data);
          setnavigateTo('/profile');
          setnavigate(true);
        }
        setloading(false);
      })
    } else {
      toast.error("Veuillez accepter les termes d'usage / Please accept the terms of use");
      setloading(false);
    }
  }


  const handleReset = async (e) => {
    e.preventDefault();
    setloading(true)
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    var isErr = false;
    for (var key in formProps) {
      if (formProps.hasOwnProperty(key)) {
        if (!formProps[key]) {
          toast.error(key + " est requis / " + key + " is required");
          isErr = true;
        }
      }
    }
    if (!isErr) {
      await resetPassword(formProps.email, (res) => {
        console.log('resetPassword: ', res);
        if (res.status) {
          toast.success("Si un compte est lié à cet e-mail, vous recevrez un e-mail contenant les instructions pour réinitialiser votre mot de passe.");
          toast.success("If there is an account linked to this email, you will receive an email with the instruction on how to reset your password.");
          
        }
        setloading(false)
      })
    } else {
      toast.error("Veuillez entrer votre email / Please enter your email ");
      setloading(false);
    }
  }

  return (
    <section className="signin" id="about">
      {navigate && <Navigate to={navigateTo} />}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Login / Connexion</h2>
            </div>
          </div>
          {!forgotPassword ? (
            <div className="col-lg-8 col-md-12 d-flex justify-content-center">
              {!loading ? (<div className="categories">
                {type ? (
                  <form onSubmit={handleSigninSubmit}>
                    <div className="form-row col-12 row">
                      <div className="form-group col-lg-6 col-sm-6 col-md-12" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>
                        Vous n'avez pas un compte? <br /> Don't have an account?
                      </div>
                      <div className="form-group col-lg-6 col-sm-6 col-md-12" style={{ textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => setType(!type)}>
                        Cliquez ici! / Click here!
                      </div>
                    </div>
                    <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                      <div className="form-group col-12">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="Email" required />
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" required />
                      </div>
                    </div>

                    <div className="row" style={{ display: 'flex', justifyContent: "center" }}>
                      <div className="main-button-yellow" style={{ margin: 'auto', width: 'fit-content', marginTop: '15px' }}>
                        <button className='action-btn' type="submit">Login</button>
                      </div>
                      <div className="main-button-yellow" onClick={() => setforgotPassword(true)} style={{ margin: 'auto', width: 'fit-content', marginTop: '15px' }}>
                        <button className='action-btn' type="submit">réinitialiser mon mot de passe / reset password</button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit}>
                    <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                      <div className="form-group col-lg-6 col-sm-6 col-md-12" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>
                        Vous avez déjà un compte? <br /> Already have an account?
                      </div>
                      <div className="form-group col-lg-6 col-sm-6 col-md-12" style={{ textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => setType(!type)}>
                        Cliquez ici! / Click here!
                      </div>
                    </div>
                    <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                      <div className="form-group col-md-6 col-sm-10" style={{ marginBottom: '15px' }}>
                        <label htmlFor="nom">Nom / Lastname</label>
                        <input type="text" name="nom" className="form-control" id="nom" placeholder="Nom / Lastname" required />
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <label htmlFor="prenom">Prenom / Firstname</label>
                        <input type="text" name="prenom" className="form-control" id="prenom" placeholder="Prenom / Firstname" required />
                      </div>
                    </div>
                    <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                      <div className="form-group col-md-6 col-sm-10" style={{ marginBottom: '15px' }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="Email" required />
                      </div>
                      <div className="form-group col-md-6 col-sm-10">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" required />
                      </div>
                    </div>
                    <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                      <div className="form-group col-md-6 col-sm-10">
                        <label htmlFor="phone">Telephone / Phone</label>
                        <input type="text" className="form-control" id="phone" name="phone" placeholder="xx xx xx xx" required />
                      </div>
                    </div>
                    <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                      <div className="form-group col-md-6 col-sm-10" style={{ marginBottom: '15px' }}>
                        <label htmlFor="city">Ville / City</label>
                        <input type="text" className="form-control" id="city" name="city" required />
                      </div>
                      <div className="form-group col-md-4 col-sm-10">
                        <label htmlFor="country">Pays / Country</label>
                        <input type="text" className="form-control" id="country" name="country" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="terms" name="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                          J'accepte d'être contacté par e-mail et par téléphone / I consent to be contacted via email and phone
                        </label>
                      </div>
                    </div>
                    {/* <button type="submit" className="btn btn-primary">Sign in</button> */}

                    <div className="row" style={{ display: 'flex', justifyContent: "space-around" }}>
                      <div className="main-button-yellow" style={{ margin: 'auto', width: 'fit-content', marginTop: '15px' }}>
                        <button className='action-btn' type="submit">Sign in</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>) : (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>) : (
            <div className="col-lg-8 col-md-12 d-flex justify-content-center">
              {!loading ? (<div className="categories">
                <form onSubmit={handleReset}>
                  <div className="form-row col-12 row">
                    <div className="form-group col-12" style={{ textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => {setforgotPassword(false); setType(true)}}>
                      Retourner A la page de connexion! / Return to Login Page!
                    </div>
                  </div>
                  <div className="form-row col-12 row" style={{ marginBottom: '15px' }}>
                    <div className="form-group col-12">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" className="form-control" id="email" placeholder="Email" required />
                    </div>
                  </div>

                  <div className="row" style={{ display: 'flex', justifyContent: "center" }}>
                    <div className="main-button-yellow" style={{ margin: 'auto', width: 'fit-content', marginTop: '15px' }}>
                      <button className='action-btn' type="submit">Envoyer les instructions</button>
                    </div>
                  </div>
                </form>
              </div>) : (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
