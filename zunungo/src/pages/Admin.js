import React, { useEffect, useState } from 'react';
import { getUserData, addNewUserData, updateApplicationData, getUserApplications, getAllApplications, getAllFilesCategories, getUserFiles, updateCatType } from '../utils/api';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import { toast } from 'react-toastify';

export default function Admin({ user, setUser, lang, setLang }) {

  const [loading, setloading] = useState(false);
  const [navigate, setnavigate] = useState(false);
  const [showFilesCats, setshowFilesCats] = useState(false);
  const [showNewType, setshowNewType] = useState(false);
  const [filesCats, setfilesCats] = useState([]);
  const [selectedCat, setselectedCat] = useState('');
  const [newTypeName, setnewTypeName] = useState('');
  const [allowMultipleFiles, setallowMultipleFiles] = useState(true);
  

  const [navigateTo, setnavigateTo] = useState("");
  const [showdetails, setshowdetails] = useState(false);
  const [userApplications, setuserApplications] = useState([]);
  const [selectedProgramData, setselectedProgramData] = useState({});
  const [selectedUserData, setselectedUserData] = useState({});

  useEffect(() => {
    setloading(true);
    if (!user || user.role != 'ad') {
      setTimeout(() => {
        toast.error("Veuillez vous connecter / Please login");
        setnavigateTo('/login');
        setnavigate(true);
      }, 2000)
    } else {
      getAllApplications((res) => {
        if (res.status) {
          console.log('res.data: ', res.data)
          setuserApplications(res.data);
          getAllFilesCategories((res) => {
            if (res.status) {
              console.log('res.data: ', res.data)
              setfilesCats(res.data);
              setloading(false);
            }
          })
        }
      })

    }
  }, []);


  const setInputs = (obj) => {
    console.log('obj.data: ', obj.data);
    console.log("document.forms: ", document.forms['myForm'])
    setselectedProgramData(obj);
    getUserData(obj, (res) => {
      if (res.status) {
        setselectedUserData(res.data[0]);
      }
    });
    for (let key in obj.data) {
      document.forms['myForm'][key].value = obj.data[key];
    }
  }

  const handleStatusChange = (e, app, index) => {
    var list = userApplications.slice();
    console.log('app: ', app);
    app.status = e.target.value;
    list[index].status = e.target.value;
    var d = {
      update_date: (new Date()).toISOString(),
      uid: app.uid,
      status: e.target.value
    }

    updateApplicationData(d, true, (res) => {
      if (res.status) {
        console.log('success');

        setuserApplications(list);
        setloading(false);
      }
    })
  }

  const desactivateCat = (cat) => {
    // desactivateCat
  }

  const addNewCaseType = () => {
    setshowNewType(true);
    setnewTypeName("");
  }

  const saveNewCaseType = () => {
    setloading(true);
    var d = {
      catId: filesCats.length + 1,
      catName: newTypeName,
      allowMultipleFiles: allowMultipleFiles
    }

    updateCatType(d, (res) => {
      setshowNewType(false);
      setnewTypeName("");
      getAllFilesCategories((res) => {
        if (res.status) {
          console.log('res.data: ', res.data)
          setfilesCats(res.data);
          setloading(false);
        }
      })
    })
  }

  return (
    <section className="signin" id="about">
      {navigate && <Navigate to={navigateTo} />}
      {user && (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Admin</h2>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center">

              {showdetails ? (
                <div className="col-12 d-flex justify-content-center">
                  <div className="col-12 d-flex justify-content-center animate__animated animate__backInUp">
                    <div className="col-12 d-flex justify-content-center">
                      <form name='myForm' id='myForm'>
                        <div className="card panel-default" style={{ margin: '18px 4px' }}>
                          <div className="card-header">
                            1. Contact Info
                          </div>
                          <div className="row card-body">
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                              <div><strong>Phone: </strong> {selectedUserData.phone || 'Introuvable'}</div>
                              <div><strong>Email: </strong> {selectedUserData.email || 'Introuvable'}</div>
                            </div>
                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '18px 4px' }}>
                          <div className="card-header">
                            1. Nom (Name)
                          </div>
                          <div className="row card-body">

                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="col-xs-12 col-sm-12 col-md-12 pRL0">
                                <div className="form-group m0050">
                                  <div className="m5050">Nom de Famille (Last/Family Name)</div>
                                  <input name="_ctl0:txtLastName" maxLength="33"
                                    id="ContentPlaceHolder1_formApplicant__ctl0_txtLastName"
                                    className="form-control nameinput" type="text" aria-label="Last / Family name" />
                                </div>
                                <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl0_txtLastName"
                                  style={{ display: "none" }}></label>
                              </div>
                            </div>


                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="col-xs-12 col-sm-12 col-md-12 pRL0">
                                <div className="form-group m0050">
                                  <div className="m5050">Prenom (First Name)</div>
                                  <input name="_ctl0:txtFirstName" maxLength="33"
                                    id="ContentPlaceHolder1_formApplicant__ctl0_txtFirstName" className="form-control"
                                    type="text" aria-label="First Name" />
                                </div>
                                <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl0_txtFirstName"
                                  style={{ display: "none" }}></label>
                              </div>
                              {/* <div className="col-xs-12 col-sm-12 col-md-12 pRL0">
                                <div className="form-group">
                                  <div className="combo checkbox mt0 ml5">
                                    <label>
                                      <span aria-label="No First Name"><input
                                        id="ContentPlaceHolder1_formApplicant__ctl0_cbxFirstName"
                                        type="checkbox"
                                        name="_ctl0:cbxFirstName" /></span>
                                      <small> No First Name</small>
                                    </label>
                                  </div>
                                </div>
                              </div> */}
                            </div>


                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="col-xs-12 col-sm-12 col-md-12 pRL0">
                                <div className="form-group m0050">
                                  <div className="m5050">Autre(s) prenom (Middle Name)</div>
                                  <input name="_ctl0:txtMiddleName" maxLength="33"
                                    id="ContentPlaceHolder1_formApplicant__ctl0_txtMiddleName" className="form-control"
                                    type="text" aria-label="Middle Name" />
                                </div>
                                <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl0_txtMiddleName"
                                  style={{ display: "none" }}></label>
                              </div>
                              {/* <div className="col-xs-12 col-sm-12 col-md-12 pRL0">
                                <div className="form-group">
                                  <div className="combo checkbox mt0 ml5">
                                    <label>
                                      <span aria-label="No Middle Name"><input
                                        id="ContentPlaceHolder1_formApplicant__ctl0_cbxMiddleName"
                                        type="checkbox"
                                        name="_ctl0:cbxMiddleName" /></span>
                                      <small> No Middle Name</small>
                                    </label>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>

                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            2. Sex (Gender)
                          </div>
                          <div className="card-body">

                            <div className="col-xs-12 col-sm-12">
                              <div className="row form-group">
                                <div className="col-xs-6 col-sm-3 col-md-2">
                                  <label className="radio-inline">
                                    <span><input id="ContentPlaceHolder1_formApplicant__ctl1_rdoGenderM" type="radio"
                                      name="_ctl1:grpGender"
                                      value="rdoGenderM" /></span> Homme (Male)
                                  </label>
                                </div>
                                <div className="col-xs-6 col-sm-3 col-md-2">
                                  <label className="radio-inline">
                                    <span><input id="ContentPlaceHolder1_formApplicant__ctl1_rdoGenderF" type="radio"
                                      name="_ctl1:grpGender"
                                      value="rdoGenderF" /></span> Femme (Female)
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12">

                            </div>


                          </div>
                        </div>

                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            3. Date de naissance (Birth Date)
                          </div>
                          <div className="row card-body">

                            <div className="col-xs-7 col-sm-2">
                              <div className="form-group">
                                <div className="m5050" htmlFor="txtMonthOfBirth">Moi (Month)</div>
                                <input name="_ctl2:txtMonthOfBirth" maxLength="2"
                                  id="ContentPlaceHolder1_formApplicant__ctl2_txtMonthOfBirth" className="form-control"
                                  type="text" placeholder="mm" />
                              </div>
                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl2_txtMonthOfBirth"
                                style={{ display: "none" }}></label>
                            </div>
                            <div className="col-xs-7 col-sm-2">
                              <div className="form-group">
                                <div className="m5050" htmlFor="txtDayOfBirth">Jour (Day)</div>
                                <input name="_ctl2:txtDayOfBirth" maxLength="2"
                                  id="ContentPlaceHolder1_formApplicant__ctl2_txtDayOfBirth" className="form-control"
                                  type="text" placeholder="dd" />
                              </div>
                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl2_txtDayOfBirth"
                                style={{ display: "none" }}></label>
                            </div>
                            <div className="col-xs-7 col-sm-3">
                              <div className="form-group">
                                <div className="m5050">Annee (Year)</div>
                                <input name="_ctl2:txtYearOfBirth" maxLength="4"
                                  id="ContentPlaceHolder1_formApplicant__ctl2_txtYearOfBirth" className="form-control"
                                  type="text" placeholder="yyyy" />
                              </div>
                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl2_txtYearOfBirth"
                                style={{ display: "none" }}></label>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                            </div>


                          </div>
                        </div>

                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            4. Ville de naissance (City Where You Were Born)
                          </div>
                          <div className="card-body">

                            {/* <div className="col-xs-12 col-sm-12">
                              <span id="HelpBirthCity" className="help-block"
                                aria-describedby="ContentPlaceHolder1_formApplicant__ctl3_txtBirthCity">
                                Enter Birth City Only. Do not enter District/County/Province/State.
                              </span>
                            </div> */}
                            <div className="col-xs-12 col-sm-8">
                              <div className="form-group m0050">
                                <div className="m5050">Ville de naissance (Birth City)</div>
                                <input name="_ctl3:txtBirthCity" maxLength="33"
                                  id="ContentPlaceHolder1_formApplicant__ctl3_txtBirthCity" className="form-control nameinput"
                                  type="text" aria-label="Birth City" />
                              </div>
                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl3_txtBirthCity"
                                style={{ display: "none" }}></label>
                            </div>
                            {/* <div className="col-xs-12 col-sm-12">
                              <div className="form-group">
                                <div className="combo checkbox mt0 ml5">
                                  <label>
                                    <input id="ContentPlaceHolder1_formApplicant__ctl3_cbxBirthCity" type="checkbox"
                                      name="_ctl3:cbxBirthCity" />
                                    <small className="mt2"> Birth City Unknown</small>
                                  </label>
                                </div>
                              </div>
                            </div> */}
                            {/* <div className="col-xs-12 col-sm-12">

                            </div>


                            <div className="col-xs-12 col-sm-12">

                            </div> */}

                          </div>
                        </div>

                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            5. Pays de naissance (Country Where You Were Born)
                          </div>
                          <div className="card-body">

                            <div className="col-xs-12 col-sm-8">
                              <select name="_ctl4:drpBirthCountry"
                                id="ContentPlaceHolder1_formApplicant__ctl4_drpBirthCountry" className="form-control">
                                <option defaultValue="selected" value="0">Select A Country...</option>
                                <option value="54">Afghanistan</option>
                                <option value="93">Albania</option>
                                <option value="1">Algeria</option>
                                <option value="279">American Samoa</option>
                                <option value="94">Andorra</option>
                                <option value="2">Angola</option>
                                <option value="95">Anguilla</option>
                                <option value="170">Antigua and Barbuda</option>
                                <option value="171">Argentina</option>
                                <option value="96">Armenia</option>
                                <option value="97">Aruba</option>
                                <option value="202">Australia</option>
                                <option value="98">Austria</option>
                                <option value="99">Azerbaijan</option>
                                <option value="220">Bahamas, The</option>
                                <option value="55">Bahrain</option>
                                <option value="287">Baker Island</option>
                                <option value="56">Bangladesh</option>
                                <option value="172">Barbados</option>
                                <option value="100">Belarus</option>
                                <option value="101">Belgium</option>
                                <option value="173">Belize</option>
                                <option value="3">Benin</option>
                                <option value="102">Bermuda</option>
                                <option value="57">Bhutan</option>
                                <option value="174">Bolivia</option>
                                <option value="290">Bonaire</option>
                                <option value="103">Bosnia and Herzegovina</option>
                                <option value="4">Botswana</option>
                                <option value="175">Brazil</option>
                                <option value="267">British Indian Ocean Territory</option>
                                <option value="104">British Virgin Islands</option>
                                <option value="58">Brunei</option>
                                <option value="105">Bulgaria</option>
                                <option value="5">Burkina Faso</option>
                                <option value="59">Burma</option>
                                <option value="6">Burundi</option>
                                <option value="8">Cabo Verde</option>
                                <option value="60">Cambodia</option>
                                <option value="7">Cameroon</option>
                                <option value="221">Canada</option>
                                <option value="106">Cayman Islands</option>
                                <option value="9">Central African Republic</option>
                                <option value="10">Chad</option>
                                <option value="176">Chile</option>
                                <option value="61">China, Peoples Republic of</option>
                                <option value="203">Christmas Island</option>
                                <option value="204">Cocos Keeling Islands</option>
                                <option value="177">Colombia</option>
                                <option value="11">Comoros</option>
                                <option value="13">Congo-Brazzaville</option>
                                <option value="12">Congo-Kinshasa</option>
                                <option value="205">Cook Islands</option>
                                <option value="178">Costa Rica</option>
                                <option value="14">Cote d'Ivoire</option>
                                <option value="107">Croatia</option>
                                <option value="179">Cuba</option>
                                <option value="276">Curacao</option>
                                <option value="108">Cyprus</option>
                                <option value="109">Czech Republic</option>
                                <option value="110">Denmark</option>
                                <option value="15">Djibouti</option>
                                <option value="180">Dominica</option>
                                <option value="181">Dominican Republic</option>
                                <option value="182">Ecuador</option>
                                <option value="16">Egypt</option>
                                <option value="183">El Salvador</option>
                                <option value="17">Equatorial Guinea</option>
                                <option value="18">Eritrea</option>
                                <option value="111">Estonia</option>
                                <option value="47">Eswatini</option>
                                <option value="19">Ethiopia</option>
                                <option value="112">Falkland Islands</option>
                                <option value="272">Faroe Islands</option>
                                <option value="209">Federated States of Micronesia</option>
                                <option value="206">Fiji</option>
                                <option value="113">Finland</option>
                                <option value="114">France</option>
                                <option value="115">French Guiana</option>
                                <option value="116">French Polynesia</option>
                                <option value="117">French Southern and Antarctic Lands</option>
                                <option value="20">Gabon</option>
                                <option value="261">Gaza Strip</option>
                                <option value="118">Georgia</option>
                                <option value="119">Germany</option>
                                <option value="22">Ghana</option>
                                <option value="120">Gibraltar</option>
                                <option value="121">Greece</option>
                                <option value="122">Greenland</option>
                                <option value="184">Grenada</option>
                                <option value="123">Guadeloupe</option>
                                <option value="280">Guam</option>
                                <option value="185">Guatemala</option>
                                <option value="293">Guernsey</option>
                                <option value="23">Guinea</option>
                                <option value="24">Guinea - Bissau</option>
                                <option value="186">Guyana</option>
                                <option value="187">Haiti</option>
                                <option value="188">Honduras</option>
                                <option value="64">Hong Kong S. A. R.</option>
                                <option value="288">Howland Island</option>
                                <option value="124">Hungary</option>
                                <option value="125">Iceland</option>
                                <option value="65">India</option>
                                <option value="66">Indonesia</option>
                                <option value="67">Iran</option>
                                <option value="68">Iraq</option>
                                <option value="126">Ireland</option>
                                <option value="294">Isle of Man</option>
                                <option value="69">Israel</option>
                                <option value="127">Italy</option>
                                <option value="189">Jamaica</option>
                                <option value="70">Japan</option>
                                <option value="295">Jersey</option>
                                <option value="286">Johnston Atoll</option>
                                <option value="71">Jordan</option>
                                <option value="128">Kazakhstan</option>
                                <option value="25">Kenya</option>
                                <option value="207">Kiribati</option>
                                <option value="79">Korea, North</option>
                                <option value="86">Korea, South</option>
                                <option value="265">Kosovo</option>
                                <option value="72">Kuwait</option>
                                <option value="129">Kyrgyzstan</option>
                                <option value="73">Laos</option>
                                <option value="130">Latvia</option>
                                <option value="74">Lebanon</option>
                                <option value="26">Lesotho</option>
                                <option value="27">Liberia</option>
                                <option value="28">Libya</option>
                                <option value="131">Liechtenstein</option>
                                <option value="132">Lithuania</option>
                                <option value="133">Luxembourg</option>
                                <option value="134">Macau</option>
                                <option value="29">Madagascar</option>
                                <option value="30">Malawi</option>
                                <option value="75">Malaysia</option>
                                <option value="76">Maldives</option>
                                <option value="31">Mali</option>
                                <option value="136">Malta</option>
                                <option value="208">Marshall Islands</option>
                                <option value="137">Martinique</option>
                                <option value="32">Mauritania</option>
                                <option value="33">Mauritius</option>
                                <option value="268">Mayotte</option>
                                <option value="190">Mexico</option>
                                <option value="281">Midway Islands</option>
                                <option value="138">Moldova</option>
                                <option value="139">Monaco</option>
                                <option value="77">Mongolia</option>
                                <option value="264">Montenegro</option>
                                <option value="140">Montserrat</option>
                                <option value="34">Morocco</option>
                                <option value="35">Mozambique</option>
                                <option value="36">Namibia</option>
                                <option value="210">Nauru</option>
                                <option value="78">Nepal</option>
                                <option value="141">Netherlands</option>
                                <option value="143">New Caledonia</option>
                                <option value="211">New Zealand</option>
                                <option value="191">Nicaragua</option>
                                <option value="37">Niger</option>
                                <option value="38">Nigeria</option>
                                <option value="212">Niue</option>
                                <option value="273">Norfolk Island</option>
                                <option value="135">North Macedonia</option>
                                <option value="144">Northern Ireland</option>
                                <option value="289">Northern Mariana Islands (USA)</option>
                                <option value="145">Norway</option>
                                <option value="80">Oman</option>
                                <option value="81">Pakistan</option>
                                <option value="213">Palau</option>
                                <option value="282">Palmyra Atoll</option>
                                <option value="192">Panama</option>
                                <option value="214">Papua New Guinea</option>
                                <option value="193">Paraguay</option>
                                <option value="194">Peru</option>
                                <option value="82">Philippines</option>
                                <option value="146">Pitcairn Islands</option>
                                <option value="147">Poland</option>
                                <option value="148">Portugal</option>
                                <option value="283">Puerto Rico</option>
                                <option value="83">Qatar</option>
                                <option value="149">Reunion</option>
                                <option value="150">Romania</option>
                                <option value="151">Russia</option>
                                <option value="39">Rwanda</option>
                                <option value="291">Saba</option>
                                <option value="275">Saint Martin</option>
                                <option value="215">Samoa</option>
                                <option value="152">San Marino</option>
                                <option value="40">Sao Tome and Principe</option>
                                <option value="84">Saudi Arabia</option>
                                <option value="41">Senegal</option>
                                <option value="263">Serbia</option>
                                <option value="42">Seychelles</option>
                                <option value="43">Sierra Leone</option>
                                <option value="85">Singapore</option>
                                <option value="277">Sint Maarten</option>
                                <option value="153">Slovakia</option>
                                <option value="154">Slovenia</option>
                                <option value="216">Solomon Islands</option>
                                <option value="44">Somalia</option>
                                <option value="45">South Africa</option>
                                <option value="270">South Georgia and the South Sandwich Island</option>
                                <option value="278">South Sudan</option>
                                <option value="155">Spain</option>
                                <option value="87">Sri Lanka</option>
                                <option value="274">St. Barthelemy</option>
                                <option value="292">St. Eustatius</option>
                                <option value="156">St. Helena</option>
                                <option value="195">St. Kitts and Nevis</option>
                                <option value="196">St. Lucia</option>
                                <option value="157">St. Pierre and Miquelon</option>
                                <option value="197">St. Vincent and the Grenadines</option>
                                <option value="46">Sudan</option>
                                <option value="198">Suriname</option>
                                <option value="269">Svalbard</option>
                                <option value="158">Sweden</option>
                                <option value="159">Switzerland</option>
                                <option value="88">Syria</option>
                                <option value="62">Taiwan</option>
                                <option value="160">Tajikistan</option>
                                <option value="48">Tanzania</option>
                                <option value="89">Thailand</option>
                                <option value="21">The Gambia</option>
                                <option value="63">Timor-Leste</option>
                                <option value="49">Togo</option>
                                <option value="271">Tokelau</option>
                                <option value="217">Tonga</option>
                                <option value="199">Trinidad and Tobago</option>
                                <option value="50">Tunisia</option>
                                <option value="161">Turkey</option>
                                <option value="162">Turkmenistan</option>
                                <option value="163">Turks And Caicos Islands</option>
                                <option value="218">Tuvalu</option>
                                <option value="51">Uganda</option>
                                <option value="164">Ukraine</option>
                                <option value="90">United Arab Emirates</option>
                                <option value="266">United Kingdom</option>
                                <option value="223">United States Of America</option>
                                <option value="200">Uruguay</option>
                                <option value="166">Uzbekistan</option>
                                <option value="219">Vanuatu</option>
                                <option value="167">Vatican City</option>
                                <option value="201">Venezuela</option>
                                <option value="91">Vietnam</option>
                                <option value="284">Virgin Islands (U.S.)</option>
                                <option value="285">Wake Island</option>
                                <option value="168">Wallis and Futuna</option>
                                <option value="262">West Bank</option>
                                <option value="169">Western Sahara</option>
                                <option value="92">Yemen</option>
                                <option value="52">Zambia</option>
                                <option value="53">Zimbabwe</option>

                              </select>
                            </div>

                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            8. Adresse postale (Mailing Address)
                          </div>
                          <div className="card-body">
                            {/* <!-- In Care Of --> */}
                            <div className="col-xs-12 col-sm-12 m5050">
                              a. Aux soins de (facultatif) / (In Care Of (optional))
                            </div>

                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Aux soins de (facultatif) / (In Care Of (optional))</label>
                              <input name="_ctl7:txtInCareOf" maxLength="30"
                                id="ContentPlaceHolder1_formApplicant__ctl7_txtInCareOf" className="form-control" type="text" />
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_txtInCareOf"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                            {/* <!-- Address Line 1 --> */}
                            <div className="col-xs-12 col-sm-12 m5050">
                              b. Adresse (Address)
                            </div>

                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Adresse (Address)</label>
                              <input name="_ctl7:txtAddress1" maxLength="30"
                                id="ContentPlaceHolder1_formApplicant__ctl7_txtAddress1" className="form-control" type="text" />
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_txtAddress1"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                            {/* <!-- Address Line 2 --> */}
                            {/* <div className="col-xs-12 col-sm-12 m5050">
                              c. Address Line 2 (optional)
                            </div> */}

                            {/* <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Address Line 2</label>
                              <input name="_ctl7:txtAddress2" type="text"
                                maxLength="30" id="ContentPlaceHolder1_formApplicant__ctl7_txtAddress2"
                                className="form-control" />
                            </div> */}
                            {/* <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_txtAddress2"
                                style={{ display: "none" }}></label>
                            </div> */}

                            {/* <div className="col-xs-12 col-sm-12">

                            </div> */}
                            {/* <!-- City/Town --> */}
                            <div className="col-xs-12 col-sm-12 m5050">
                              d. Ville (City/Town)
                            </div>

                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Ville (City/Town)</label>
                              <input name="_ctl7:txtCity" type="text" maxLength="50"
                                id="ContentPlaceHolder1_formApplicant__ctl7_txtCity" className="form-control" />
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_txtCity"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                            {/* <!-- District/County/Province/State --> */}
                            <div className="col-xs-12 col-sm-12 m5050">
                              e. Province (/District/County/Province/State)
                            </div>

                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Province (/District/County/Province/State)</label>
                              <input name="_ctl7:txtDistrict" type="text"
                                maxLength="50" id="ContentPlaceHolder1_formApplicant__ctl7_txtDistrict"
                                className="form-control" />
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_txtDistrict"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                            {/* <!-- Postal Code/Zip Code --> */}
                            <div className="col-xs-12 col-sm-12 m5050">
                              f. Code Postal (Postal Code/Zip Code)
                            </div>

                            <div className="col-xs-12 col-sm-8">
                              <div className="form-group m0050">
                                <label className="sr-only">Code Postal (Postal Code/Zip Code)</label>
                                <input name="_ctl7:txtZipCode" type="text"
                                  maxLength="25" id="ContentPlaceHolder1_formApplicant__ctl7_txtZipCode"
                                  className="form-control" />
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">
                              <div className="combo checkbox mt0 ml5">
                                <label>
                                  <span aria-label="No Postal Code/Zip Code"><input
                                    id="ContentPlaceHolder1_formApplicant__ctl7_cbxZipCode" type="checkbox"
                                    name="_ctl7:cbxZipCode" /></span>
                                  <small className="mt2"> Pas de Code Postal (No Postal Code / Zip Code)</small>
                                </label>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_txtZipCode"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                            {/* <!-- Country --> */}
                            <div className="col-xs-12 col-sm-12 m5050">
                              g. Pays (Country)
                            </div>

                            <div className="col-xs-12 col-sm-8">
                              <div className="form-group m0050">
                                <label className="sr-only" htmlFor="ContentPlaceHolder1_formApplicant__ctl7_drpMailingCountry"
                                  style={{ display: "none" }}>Country</label>
                                <select name="_ctl7:drpMailingCountry"
                                  id="ContentPlaceHolder1_formApplicant__ctl7_drpMailingCountry" className="form-control">
                                  <option value="0">Select A Country...</option>
                                  <option value="54">Afghanistan</option>
                                  <option value="93">Albania</option>
                                  <option value="1">Algeria</option>
                                  <option value="279">American Samoa</option>
                                  <option value="94">Andorra</option>
                                  <option value="2">Angola</option>
                                  <option value="95">Anguilla</option>
                                  <option value="170">Antigua and Barbuda</option>
                                  <option value="171">Argentina</option>
                                  <option value="96">Armenia</option>
                                  <option value="97">Aruba</option>
                                  <option value="202">Australia</option>
                                  <option value="98">Austria</option>
                                  <option value="99">Azerbaijan</option>
                                  <option value="220">Bahamas, The</option>
                                  <option value="55">Bahrain</option>
                                  <option value="287">Baker Island</option>
                                  <option value="56">Bangladesh</option>
                                  <option value="172">Barbados</option>
                                  <option value="100">Belarus</option>
                                  <option value="101">Belgium</option>
                                  <option value="173">Belize</option>
                                  <option value="3">Benin</option>
                                  <option value="102">Bermuda</option>
                                  <option value="57">Bhutan</option>
                                  <option value="174">Bolivia</option>
                                  <option value="290">Bonaire</option>
                                  <option value="103">Bosnia and Herzegovina</option>
                                  <option value="4">Botswana</option>
                                  <option value="175">Brazil</option>
                                  <option value="267">British Indian Ocean Territory</option>
                                  <option value="104">British Virgin Islands</option>
                                  <option value="58">Brunei</option>
                                  <option value="105">Bulgaria</option>
                                  <option value="5">Burkina Faso</option>
                                  <option value="59">Burma</option>
                                  <option value="6">Burundi</option>
                                  <option value="8">Cabo Verde</option>
                                  <option value="60">Cambodia</option>
                                  <option value="7">Cameroon</option>
                                  <option value="221">Canada</option>
                                  <option value="106">Cayman Islands</option>
                                  <option value="9">Central African Republic</option>
                                  <option value="10">Chad</option>
                                  <option value="176">Chile</option>
                                  <option value="61">China, Peoples Republic of</option>
                                  <option value="203">Christmas Island</option>
                                  <option value="204">Cocos Keeling Islands</option>
                                  <option value="177">Colombia</option>
                                  <option value="11">Comoros</option>
                                  <option value="13">Congo-Brazzaville</option>
                                  <option value="12">Congo-Kinshasa</option>
                                  <option value="205">Cook Islands</option>
                                  <option value="178">Costa Rica</option>
                                  <option value="14">Cote d'Ivoire</option>
                                  <option value="107">Croatia</option>
                                  <option value="179">Cuba</option>
                                  <option value="276">Curacao</option>
                                  <option value="108">Cyprus</option>
                                  <option value="109">Czech Republic</option>
                                  <option value="110">Denmark</option>
                                  <option value="15">Djibouti</option>
                                  <option value="180">Dominica</option>
                                  <option value="181">Dominican Republic</option>
                                  <option value="182">Ecuador</option>
                                  <option value="16">Egypt</option>
                                  <option value="183">El Salvador</option>
                                  <option value="17">Equatorial Guinea</option>
                                  <option value="18">Eritrea</option>
                                  <option value="111">Estonia</option>
                                  <option value="47">Eswatini</option>
                                  <option value="19">Ethiopia</option>
                                  <option value="112">Falkland Islands</option>
                                  <option value="272">Faroe Islands</option>
                                  <option value="209">Federated States of Micronesia</option>
                                  <option value="206">Fiji</option>
                                  <option value="113">Finland</option>
                                  <option value="114">France</option>
                                  <option value="115">French Guiana</option>
                                  <option value="116">French Polynesia</option>
                                  <option value="117">French Southern and Antarctic Lands</option>
                                  <option value="20">Gabon</option>
                                  <option value="261">Gaza Strip</option>
                                  <option value="118">Georgia</option>
                                  <option value="119">Germany</option>
                                  <option value="22">Ghana</option>
                                  <option value="120">Gibraltar</option>
                                  <option value="121">Greece</option>
                                  <option value="122">Greenland</option>
                                  <option value="184">Grenada</option>
                                  <option value="123">Guadeloupe</option>
                                  <option value="280">Guam</option>
                                  <option value="185">Guatemala</option>
                                  <option value="293">Guernsey</option>
                                  <option value="23">Guinea</option>
                                  <option value="24">Guinea - Bissau</option>
                                  <option value="186">Guyana</option>
                                  <option value="187">Haiti</option>
                                  <option value="188">Honduras</option>
                                  <option value="64">Hong Kong S. A. R.</option>
                                  <option value="288">Howland Island</option>
                                  <option value="124">Hungary</option>
                                  <option value="125">Iceland</option>
                                  <option value="65">India</option>
                                  <option value="66">Indonesia</option>
                                  <option value="67">Iran</option>
                                  <option value="68">Iraq</option>
                                  <option value="126">Ireland</option>
                                  <option value="294">Isle of Man</option>
                                  <option value="69">Israel</option>
                                  <option value="127">Italy</option>
                                  <option value="189">Jamaica</option>
                                  <option value="70">Japan</option>
                                  <option value="295">Jersey</option>
                                  <option value="286">Johnston Atoll</option>
                                  <option value="71">Jordan</option>
                                  <option value="128">Kazakhstan</option>
                                  <option value="25">Kenya</option>
                                  <option value="207">Kiribati</option>
                                  <option value="79">Korea, North</option>
                                  <option value="86">Korea, South</option>
                                  <option value="265">Kosovo</option>
                                  <option value="72">Kuwait</option>
                                  <option value="129">Kyrgyzstan</option>
                                  <option value="73">Laos</option>
                                  <option value="130">Latvia</option>
                                  <option value="74">Lebanon</option>
                                  <option value="26">Lesotho</option>
                                  <option value="27">Liberia</option>
                                  <option value="28">Libya</option>
                                  <option value="131">Liechtenstein</option>
                                  <option value="132">Lithuania</option>
                                  <option value="133">Luxembourg</option>
                                  <option value="134">Macau</option>
                                  <option value="29">Madagascar</option>
                                  <option value="30">Malawi</option>
                                  <option value="75">Malaysia</option>
                                  <option value="76">Maldives</option>
                                  <option value="31">Mali</option>
                                  <option value="136">Malta</option>
                                  <option value="208">Marshall Islands</option>
                                  <option value="137">Martinique</option>
                                  <option value="32">Mauritania</option>
                                  <option value="33">Mauritius</option>
                                  <option value="268">Mayotte</option>
                                  <option value="190">Mexico</option>
                                  <option value="281">Midway Islands</option>
                                  <option value="138">Moldova</option>
                                  <option value="139">Monaco</option>
                                  <option value="77">Mongolia</option>
                                  <option value="264">Montenegro</option>
                                  <option value="140">Montserrat</option>
                                  <option value="34">Morocco</option>
                                  <option value="35">Mozambique</option>
                                  <option value="36">Namibia</option>
                                  <option value="210">Nauru</option>
                                  <option value="78">Nepal</option>
                                  <option value="141">Netherlands</option>
                                  <option value="143">New Caledonia</option>
                                  <option value="211">New Zealand</option>
                                  <option value="191">Nicaragua</option>
                                  <option value="37">Niger</option>
                                  <option value="38">Nigeria</option>
                                  <option value="212">Niue</option>
                                  <option value="273">Norfolk Island</option>
                                  <option value="135">North Macedonia</option>
                                  <option value="144">Northern Ireland</option>
                                  <option value="289">Northern Mariana Islands (USA)</option>
                                  <option value="145">Norway</option>
                                  <option value="80">Oman</option>
                                  <option value="81">Pakistan</option>
                                  <option value="213">Palau</option>
                                  <option value="282">Palmyra Atoll</option>
                                  <option value="192">Panama</option>
                                  <option value="214">Papua New Guinea</option>
                                  <option value="193">Paraguay</option>
                                  <option value="194">Peru</option>
                                  <option value="82">Philippines</option>
                                  <option value="146">Pitcairn Islands</option>
                                  <option value="147">Poland</option>
                                  <option value="148">Portugal</option>
                                  <option value="283">Puerto Rico</option>
                                  <option value="83">Qatar</option>
                                  <option value="149">Reunion</option>
                                  <option value="150">Romania</option>
                                  <option value="151">Russia</option>
                                  <option value="39">Rwanda</option>
                                  <option value="291">Saba</option>
                                  <option value="275">Saint Martin</option>
                                  <option value="215">Samoa</option>
                                  <option value="152">San Marino</option>
                                  <option value="40">Sao Tome and Principe</option>
                                  <option value="84">Saudi Arabia</option>
                                  <option value="41">Senegal</option>
                                  <option value="263">Serbia</option>
                                  <option value="42">Seychelles</option>
                                  <option value="43">Sierra Leone</option>
                                  <option value="85">Singapore</option>
                                  <option value="277">Sint Maarten</option>
                                  <option value="153">Slovakia</option>
                                  <option value="154">Slovenia</option>
                                  <option value="216">Solomon Islands</option>
                                  <option value="44">Somalia</option>
                                  <option value="45">South Africa</option>
                                  <option value="270">South Georgia and the South Sandwich Island</option>
                                  <option value="278">South Sudan</option>
                                  <option value="155">Spain</option>
                                  <option value="87">Sri Lanka</option>
                                  <option value="274">St. Barthelemy</option>
                                  <option value="292">St. Eustatius</option>
                                  <option value="156">St. Helena</option>
                                  <option value="195">St. Kitts and Nevis</option>
                                  <option value="196">St. Lucia</option>
                                  <option value="157">St. Pierre and Miquelon</option>
                                  <option value="197">St. Vincent and the Grenadines</option>
                                  <option value="46">Sudan</option>
                                  <option value="198">Suriname</option>
                                  <option value="269">Svalbard</option>
                                  <option value="158">Sweden</option>
                                  <option value="159">Switzerland</option>
                                  <option value="88">Syria</option>
                                  <option value="62">Taiwan</option>
                                  <option value="160">Tajikistan</option>
                                  <option value="48">Tanzania</option>
                                  <option value="89">Thailand</option>
                                  <option value="21">The Gambia</option>
                                  <option value="63">Timor-Leste</option>
                                  <option value="49">Togo</option>
                                  <option value="271">Tokelau</option>
                                  <option value="217">Tonga</option>
                                  <option value="199">Trinidad and Tobago</option>
                                  <option value="50">Tunisia</option>
                                  <option value="161">Turkey</option>
                                  <option value="162">Turkmenistan</option>
                                  <option value="163">Turks And Caicos Islands</option>
                                  <option value="218">Tuvalu</option>
                                  <option value="51">Uganda</option>
                                  <option value="164">Ukraine</option>
                                  <option value="90">United Arab Emirates</option>
                                  <option value="266">United Kingdom</option>
                                  <option value="223">United States Of America</option>
                                  <option value="200">Uruguay</option>
                                  <option value="166">Uzbekistan</option>
                                  <option value="219">Vanuatu</option>
                                  <option value="167">Vatican City</option>
                                  <option value="201">Venezuela</option>
                                  <option value="91">Vietnam</option>
                                  <option value="284">Virgin Islands (U.S.)</option>
                                  <option value="285">Wake Island</option>
                                  <option value="168">Wallis and Futuna</option>
                                  <option value="262">West Bank</option>
                                  <option value="169">Western Sahara</option>
                                  <option value="92">Yemen</option>
                                  <option value="52">Zambia</option>
                                  <option value="53">Zimbabwe</option>

                                </select>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            9. Pays où vous vivez (Country Where You Live Today)
                          </div>
                          <div className="card-body">

                            <div className="col-xs-12 col-sm-8">
                              <div className="form-group m0050">
                                <label className="sr-only" htmlFor="ContentPlaceHolder1_formApplicant__ctl8_drpCountry">Pays où vous vivez (Country Where You Live Today)</label>
                                <select name="_ctl8:drpCountry"
                                  id="ContentPlaceHolder1_formApplicant__ctl8_drpCountry" className="form-control">
                                  <option value="0">Select A Country...</option>
                                  <option value="54">Afghanistan</option>
                                  <option value="93">Albania</option>
                                  <option value="1">Algeria</option>
                                  <option value="279">American Samoa</option>
                                  <option value="94">Andorra</option>
                                  <option value="2">Angola</option>
                                  <option value="95">Anguilla</option>
                                  <option value="170">Antigua and Barbuda</option>
                                  <option value="171">Argentina</option>
                                  <option value="96">Armenia</option>
                                  <option value="97">Aruba</option>
                                  <option value="202">Australia</option>
                                  <option value="98">Austria</option>
                                  <option value="99">Azerbaijan</option>
                                  <option value="220">Bahamas, The</option>
                                  <option value="55">Bahrain</option>
                                  <option value="287">Baker Island</option>
                                  <option value="56">Bangladesh</option>
                                  <option value="172">Barbados</option>
                                  <option value="100">Belarus</option>
                                  <option value="101">Belgium</option>
                                  <option value="173">Belize</option>
                                  <option value="3">Benin</option>
                                  <option value="102">Bermuda</option>
                                  <option value="57">Bhutan</option>
                                  <option value="174">Bolivia</option>
                                  <option value="290">Bonaire</option>
                                  <option value="103">Bosnia and Herzegovina</option>
                                  <option value="4">Botswana</option>
                                  <option value="175">Brazil</option>
                                  <option value="267">British Indian Ocean Territory</option>
                                  <option value="104">British Virgin Islands</option>
                                  <option value="58">Brunei</option>
                                  <option value="105">Bulgaria</option>
                                  <option value="5">Burkina Faso</option>
                                  <option value="59">Burma</option>
                                  <option value="6">Burundi</option>
                                  <option value="8">Cabo Verde</option>
                                  <option value="60">Cambodia</option>
                                  <option value="7">Cameroon</option>
                                  <option value="221">Canada</option>
                                  <option value="106">Cayman Islands</option>
                                  <option value="9">Central African Republic</option>
                                  <option value="10">Chad</option>
                                  <option value="176">Chile</option>
                                  <option value="61">China, Peoples Republic of</option>
                                  <option value="203">Christmas Island</option>
                                  <option value="204">Cocos Keeling Islands</option>
                                  <option value="177">Colombia</option>
                                  <option value="11">Comoros</option>
                                  <option value="13">Congo-Brazzaville</option>
                                  <option value="12">Congo-Kinshasa</option>
                                  <option value="205">Cook Islands</option>
                                  <option value="178">Costa Rica</option>
                                  <option value="14">Cote d'Ivoire</option>
                                  <option value="107">Croatia</option>
                                  <option value="179">Cuba</option>
                                  <option value="276">Curacao</option>
                                  <option value="108">Cyprus</option>
                                  <option value="109">Czech Republic</option>
                                  <option value="110">Denmark</option>
                                  <option value="15">Djibouti</option>
                                  <option value="180">Dominica</option>
                                  <option value="181">Dominican Republic</option>
                                  <option value="182">Ecuador</option>
                                  <option value="16">Egypt</option>
                                  <option value="183">El Salvador</option>
                                  <option value="17">Equatorial Guinea</option>
                                  <option value="18">Eritrea</option>
                                  <option value="111">Estonia</option>
                                  <option value="47">Eswatini</option>
                                  <option value="19">Ethiopia</option>
                                  <option value="112">Falkland Islands</option>
                                  <option value="272">Faroe Islands</option>
                                  <option value="209">Federated States of Micronesia</option>
                                  <option value="206">Fiji</option>
                                  <option value="113">Finland</option>
                                  <option value="114">France</option>
                                  <option value="115">French Guiana</option>
                                  <option value="116">French Polynesia</option>
                                  <option value="117">French Southern and Antarctic Lands</option>
                                  <option value="20">Gabon</option>
                                  <option value="261">Gaza Strip</option>
                                  <option value="118">Georgia</option>
                                  <option value="119">Germany</option>
                                  <option value="22">Ghana</option>
                                  <option value="120">Gibraltar</option>
                                  <option value="121">Greece</option>
                                  <option value="122">Greenland</option>
                                  <option value="184">Grenada</option>
                                  <option value="123">Guadeloupe</option>
                                  <option value="280">Guam</option>
                                  <option value="185">Guatemala</option>
                                  <option value="293">Guernsey</option>
                                  <option value="23">Guinea</option>
                                  <option value="24">Guinea - Bissau</option>
                                  <option value="186">Guyana</option>
                                  <option value="187">Haiti</option>
                                  <option value="188">Honduras</option>
                                  <option value="64">Hong Kong S. A. R.</option>
                                  <option value="288">Howland Island</option>
                                  <option value="124">Hungary</option>
                                  <option value="125">Iceland</option>
                                  <option value="65">India</option>
                                  <option value="66">Indonesia</option>
                                  <option value="67">Iran</option>
                                  <option value="68">Iraq</option>
                                  <option value="126">Ireland</option>
                                  <option value="294">Isle of Man</option>
                                  <option value="69">Israel</option>
                                  <option value="127">Italy</option>
                                  <option value="189">Jamaica</option>
                                  <option value="70">Japan</option>
                                  <option value="295">Jersey</option>
                                  <option value="286">Johnston Atoll</option>
                                  <option value="71">Jordan</option>
                                  <option value="128">Kazakhstan</option>
                                  <option value="25">Kenya</option>
                                  <option value="207">Kiribati</option>
                                  <option value="79">Korea, North</option>
                                  <option value="86">Korea, South</option>
                                  <option value="265">Kosovo</option>
                                  <option value="72">Kuwait</option>
                                  <option value="129">Kyrgyzstan</option>
                                  <option value="73">Laos</option>
                                  <option value="130">Latvia</option>
                                  <option value="74">Lebanon</option>
                                  <option value="26">Lesotho</option>
                                  <option value="27">Liberia</option>
                                  <option value="28">Libya</option>
                                  <option value="131">Liechtenstein</option>
                                  <option value="132">Lithuania</option>
                                  <option value="133">Luxembourg</option>
                                  <option value="134">Macau</option>
                                  <option value="29">Madagascar</option>
                                  <option value="30">Malawi</option>
                                  <option value="75">Malaysia</option>
                                  <option value="76">Maldives</option>
                                  <option value="31">Mali</option>
                                  <option value="136">Malta</option>
                                  <option value="208">Marshall Islands</option>
                                  <option value="137">Martinique</option>
                                  <option value="32">Mauritania</option>
                                  <option value="33">Mauritius</option>
                                  <option value="268">Mayotte</option>
                                  <option value="190">Mexico</option>
                                  <option value="281">Midway Islands</option>
                                  <option value="138">Moldova</option>
                                  <option value="139">Monaco</option>
                                  <option value="77">Mongolia</option>
                                  <option value="264">Montenegro</option>
                                  <option value="140">Montserrat</option>
                                  <option value="34">Morocco</option>
                                  <option value="35">Mozambique</option>
                                  <option value="36">Namibia</option>
                                  <option value="210">Nauru</option>
                                  <option value="78">Nepal</option>
                                  <option value="141">Netherlands</option>
                                  <option value="143">New Caledonia</option>
                                  <option value="211">New Zealand</option>
                                  <option value="191">Nicaragua</option>
                                  <option value="37">Niger</option>
                                  <option value="38">Nigeria</option>
                                  <option value="212">Niue</option>
                                  <option value="273">Norfolk Island</option>
                                  <option value="135">North Macedonia</option>
                                  <option value="144">Northern Ireland</option>
                                  <option value="289">Northern Mariana Islands (USA)</option>
                                  <option value="145">Norway</option>
                                  <option value="80">Oman</option>
                                  <option value="81">Pakistan</option>
                                  <option value="213">Palau</option>
                                  <option value="282">Palmyra Atoll</option>
                                  <option value="192">Panama</option>
                                  <option value="214">Papua New Guinea</option>
                                  <option value="193">Paraguay</option>
                                  <option value="194">Peru</option>
                                  <option value="82">Philippines</option>
                                  <option value="146">Pitcairn Islands</option>
                                  <option value="147">Poland</option>
                                  <option value="148">Portugal</option>
                                  <option value="283">Puerto Rico</option>
                                  <option value="83">Qatar</option>
                                  <option value="149">Reunion</option>
                                  <option value="150">Romania</option>
                                  <option value="151">Russia</option>
                                  <option value="39">Rwanda</option>
                                  <option value="291">Saba</option>
                                  <option value="275">Saint Martin</option>
                                  <option value="215">Samoa</option>
                                  <option value="152">San Marino</option>
                                  <option value="40">Sao Tome and Principe</option>
                                  <option value="84">Saudi Arabia</option>
                                  <option value="41">Senegal</option>
                                  <option value="263">Serbia</option>
                                  <option value="42">Seychelles</option>
                                  <option value="43">Sierra Leone</option>
                                  <option value="85">Singapore</option>
                                  <option value="277">Sint Maarten</option>
                                  <option value="153">Slovakia</option>
                                  <option value="154">Slovenia</option>
                                  <option value="216">Solomon Islands</option>
                                  <option value="44">Somalia</option>
                                  <option value="45">South Africa</option>
                                  <option value="270">South Georgia and the South Sandwich Island</option>
                                  <option value="278">South Sudan</option>
                                  <option value="155">Spain</option>
                                  <option value="87">Sri Lanka</option>
                                  <option value="274">St. Barthelemy</option>
                                  <option value="292">St. Eustatius</option>
                                  <option value="156">St. Helena</option>
                                  <option value="195">St. Kitts and Nevis</option>
                                  <option value="196">St. Lucia</option>
                                  <option value="157">St. Pierre and Miquelon</option>
                                  <option value="197">St. Vincent and the Grenadines</option>
                                  <option value="46">Sudan</option>
                                  <option value="198">Suriname</option>
                                  <option value="269">Svalbard</option>
                                  <option value="158">Sweden</option>
                                  <option value="159">Switzerland</option>
                                  <option value="88">Syria</option>
                                  <option value="62">Taiwan</option>
                                  <option value="160">Tajikistan</option>
                                  <option value="48">Tanzania</option>
                                  <option value="89">Thailand</option>
                                  <option value="21">The Gambia</option>
                                  <option value="63">Timor-Leste</option>
                                  <option value="49">Togo</option>
                                  <option value="271">Tokelau</option>
                                  <option value="217">Tonga</option>
                                  <option value="199">Trinidad and Tobago</option>
                                  <option value="50">Tunisia</option>
                                  <option value="161">Turkey</option>
                                  <option value="162">Turkmenistan</option>
                                  <option value="163">Turks And Caicos Islands</option>
                                  <option value="218">Tuvalu</option>
                                  <option value="51">Uganda</option>
                                  <option value="164">Ukraine</option>
                                  <option value="90">United Arab Emirates</option>
                                  <option value="266">United Kingdom</option>
                                  <option value="223">United States Of America</option>
                                  <option value="200">Uruguay</option>
                                  <option value="166">Uzbekistan</option>
                                  <option value="219">Vanuatu</option>
                                  <option value="167">Vatican City</option>
                                  <option value="201">Venezuela</option>
                                  <option value="91">Vietnam</option>
                                  <option value="284">Virgin Islands (U.S.)</option>
                                  <option value="285">Wake Island</option>
                                  <option value="168">Wallis and Futuna</option>
                                  <option value="262">West Bank</option>
                                  <option value="169">Western Sahara</option>
                                  <option value="92">Yemen</option>
                                  <option value="52">Zambia</option>
                                  <option value="53">Zimbabwe</option>

                                </select>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                            </div>


                            <div className="col-xs-12 col-sm-12">

                            </div>

                          </div>
                        </div>

                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            10. Numéro de téléphone (Phone Number)
                          </div>
                          <div className="card-body">

                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Numéro de téléphone (Phone Number)</label>
                              <input name="_ctl9:txtPhoneNumber" type="text"
                                maxLength="50" id="ContentPlaceHolder1_formApplicant__ctl9_txtPhoneNumber"
                                className="form-control" />
                            </div>
                            <div className="col-xs-12 col-sm-12">
                              <small>(optional)</small>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl9_txtPhoneNumber"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            11. E-mail
                          </div>
                          <div className="card-body">

                            <div className="col-xs-12 col-sm-12 m5050">
                              a. E-Mail <small>(ex: johndoe@example.com)</small>
                            </div>
                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">E-Mail</label>
                              <input name="_ctl10:txtEmailAddress" type="text"
                                maxLength="50" id="ContentPlaceHolder1_formApplicant__ctl10_txtEmailAddress"
                                className="form-control" onCopy={() => { return false }} onPaste={() => { return false }} onCut={() => { return false }} />
                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl10_txtEmailAddress"
                                style={{ display: "none" }}></label>
                            </div>
                            <div className="col-xs-12 col-sm-12 m5050">
                              b. Confirm E-Mail
                            </div>
                            <div className="col-xs-12 col-sm-8">
                              <label className="sr-only">Confirm E-Mail</label>
                              <input name="_ctl10:txtConfEmailAddress" type="text"
                                maxLength="50" id="ContentPlaceHolder1_formApplicant__ctl10_txtConfEmailAddress"
                                className="form-control" onCopy={() => { return false }} onPaste={() => { return false }} onCut={() => { return false }} />
                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl10_txtConfEmailAddress"
                                style={{ display: "none" }}></label>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                            </div>

                            <div className="col-xs-12 col-sm-12">

                            </div>
                            <div className="col-xs-12 col-sm-12">
                              <small>REMARQUE : Cette adresse e-mail sera utilisée pour vous fournir
                                des informations supplémentaires SI vous êtes sélectionné. <br /> (NOTE: This e-mail address will be used to provide you
                                with additional information if you are selected.)
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            12. Quel est le niveau d'études le plus élevé que vous ayez atteint à ce jour ? (What is the highest level of education you have achieved, as of today?)
                          </div>
                          <div className="card-body">
                            <div className="col-xs-12 col-sm-12">
                              <div className="table-responsive">
                                <table id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation" className="table radlist">
                                  <tbody>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_0"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="1" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_0">
                                          Ecole primaire seulement (Primary school only)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_1"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="2" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_1">Lycée, pas de diplôme (High School, no degree)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_2"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="3" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_2">Diplôme d'études secondaires (High School degree)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_3"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="4" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_3">école professionnelle (Vocational School)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_4"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="5" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_4">Certains cours universitaires (Some University Courses)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_5"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="6" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_5">Diplôme universitaire (University Degree)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_6"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="7" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_6">Certains cours de niveau supérieur (Some Graduate Level Courses)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_7"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="8" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_7">Une maîtrise (Master's Degree)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_8"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="9" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_8">Certains cours de niveau doctorat (Some Doctorate Level Courses)</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_9"
                                        type="radio"
                                        name="_ctl11:rblEducation"
                                        value="10" /><label
                                          htmlFor="ContentPlaceHolder1_formApplicant__ctl11_rblEducation_9">Doctorat (Doctorate Degree)</label></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">


                            </div>
                            <div className="col-xs-12 col-sm-12">
                              <p>
                                Vous devez avoir au moins un diplôme d'études secondaires reflétant le
                                l'achèvement d'un cycle d'études complet (les écoles professionnelles ou les diplômes d'équivalence sont
                                pas acceptable) ou être un travailleur qualifié dans une profession qui nécessite au moins deux ans
                                de formation ou d'expérience pour se qualifier pour un visa de diversité.
                                <br />
                                You must have a minimum of a high school diploma reflecting the
                                completion of a full course of study (vocation schools or equivalency degrees are
                                not acceptable) or be a skilled worker in an occupation that requires at least two years
                                of training or experience to qualify for a Diversity Visa.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            13. Quel est votre état civil actuel ? (What is your current marital status?)
                          </div>
                          <div className="card-body">
                            <div className="col-xs-12 col-sm-12">
                              <div className="table-responsive">
                                <table id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried"
                                  className="table radlist tableradlist" name="rblMarried" selectedindexchanged="Callfunc">
                                  <tbody>
                                    <tr>
                                      <td><input id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_0"
                                        type="radio"
                                        name="_ctl12:rblMarried"
                                        value="1" /><label
                                          htmlFor="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_0">Célibataire (Unmarried)</label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><input id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_1"
                                        type="radio"
                                        name="_ctl12:rblMarried"
                                        value="6" /><label
                                          htmlFor="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_1">
                                          Marié et mon conjoint n'est PAS un citoyen américain ou un résident permanent légal des États-Unis (Married and my spouse is NOT a U.S.citizen or U.S. Lawful Permanent Resident (LPR))
                                        </label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_2"
                                        type="radio"
                                        name="_ctl12:rblMarried"
                                        value="2" /><label
                                          htmlFor="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_2">
                                          Marié et mon conjoint EST un citoyen américain ou un résident permanent légal des États-Unis (Married and my spouse IS a U.S.citizen or U.S. Lawful Permanent Resident (LPR))</label></td>
                                    </tr>
                                    <tr>
                                      <td><input id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_3"
                                        type="radio"
                                        name="_ctl12:rblMarried"
                                        value="3" /><label
                                          htmlFor="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_3">Divorcé(e) (Divorced)</label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><input id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_4"
                                        type="radio"
                                        name="_ctl12:rblMarried"
                                        value="4" /><label
                                          htmlFor="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_4">Veuf/Veuve (Widower/Widowed)</label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><input id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_5"
                                        type="radio"
                                        name="_ctl12:rblMarried"
                                        value="5" /><label
                                          htmlFor="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_5">Séparés légalement (Legally Separated)</label></td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <div id="_ctl0_ContentPlaceHolder1_formApplicant__ctl12_marriedUpdatePanel">

                                  <div className="checkbox mt0 ml5">
                                    <label id="ContentPlaceHolder1_formApplicant__ctl12_lblMarried"
                                      style={{ marginLeft: "25px" }}>
                                      <span className="aspNetDisabled" name="cbxMarried"
                                        aria-label="Enter Spouse Information"><input
                                          id="ContentPlaceHolder1_formApplicant__ctl12_cbxMarried" type="checkbox"
                                          name="_ctl12:cbxMarried"
                                          disabled="disabled" /></span>
                                      <small>(Entrer les informations sur le conjoint) Enter Spouse Information</small>
                                    </label>
                                  </div>

                                </div> */}
                                <input type="hidden" name="_ctl12:hidMarried"
                                  id="ContentPlaceHolder1_formApplicant__ctl12_hidMarried" />
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">


                            </div>
                            {/* <div className="col-xs-12 col-sm-12">
                              <p>
                                Legal separation is an arrangement when a couple remain married but live apart,
                                following a court order. If you and your spouse are legally separated, your spouse
                                will not be able to immigrate with you through the Diversity Visa program. You will
                                not be penalized if you choose to enter the name of a spouse from whom you are
                                legally separated.
                              </p>
                              <p>
                                If you are not legally separated by a court order, you must include your spouse even
                                if you plan to be divorced before you apply for the Diversity Visa. Failure to list
                                your eligible spouse is grounds for disqualification.
                              </p>
                              <p>
                                If your spouse is a U.S. citizen or Lawful Permanent Resident, do not list him/her
                                in your entry.
                              </p>
                            </div> */}
                          </div>
                        </div>
                        <div className="card panel-default" style={{ margin: '10px 4px' }}>
                          <div className="card-header">
                            14. Nombre d'enfants (Number of Children)
                          </div>
                          <div className="card-body">

                            <div className="col-xs-6 col-sm-3">
                              <div className="form-group">
                                <input name="_ctl13:txtNumChildren" maxLength="2"
                                  id="ContentPlaceHolder1_formApplicant__ctl13_txtNumChildren" className="form-control"
                                  type="text" />
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12">

                              <label className="errortext" htmlFor="ContentPlaceHolder1_formApplicant__ctl13_txtNumChildren"
                                style={{ display: "none" }}></label>
                            </div>

                            <div className="col-xs-12 col-sm-12">

                              <p>
                                Les enfants comprennent tous les enfants biologiques, les enfants légalement adoptés et les beaux-enfants célibataires et âgés de moins de 21 ans à la date à laquelle vous soumettez votre candidature. Vous devez inclure tous les enfants éligibles, même s'ils ne vivent pas avec vous ou s'ils n'ont pas l'intention de demander un visa de diversité comme dérivé. Le fait de ne pas répertorier tous les enfants éligibles est un motif de disqualification. Si votre enfant est un citoyen américain ou un résident permanent légal, ne l'inscrivez pas dans votre inscription.
                                <br />
                                <br />
                                <br />
                                Children include all biological children, legally adopted children, and stepchildren who are
                                unmarried and under the age of 21 on the date you submit your entry. You must include all
                                eligible children, even if they do not live with you or if they do not intend to apply for a
                                Diversity Visa as your derivative. Failure to list all eligible children is grounds for
                                disqualification. If your child is a U.S. citizen or Lawful Permanent Resident, do not list
                                him/her in your entry.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                          <button className='danger-btn' style={{ fontSize: '0.75rem', margin: '7px 15px' }} type="button" onClick={() => setshowdetails(false)}>Retour</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12 d-flex justify-content-center">
                  <div className="col-12 d-flex flex-column justify-content-center">

                    <div className="card panel-default col-12 d-flex justify-content-center" style={{ margin: '10px 4px' }}>
                      <div className="card-header">
                        - Supported Case Type -
                      </div>
                      <div className="col-10 d-flex justify-content-end flex-row p15" style={{ margin: '10px 4px' }}>
                        {showNewType ? (
                          <div className="col-12 d-flex flex-row justify-content-end mx-auto" style={{ margin: '10px 4px', alignItems: 'baseline' }}>
                            <div className="input-group input-group-sm mb-3" style={{ width: '50%' }}>
                              <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Name:</span>
                              </div>
                              <input type="text" className="form-control" aria-label="Small" value={newTypeName} onChange={(e) => setnewTypeName(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            
                            <div className="form-check col-2" style={{ margin: '0px 10px' }} >
                              <input className="form-check-input" type="checkbox" checked={allowMultipleFiles} onChange={(e) => setallowMultipleFiles(e.target.checked)} id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                Allow Multiple Files
                                </label>
                            </div>
                            <button type="button" className="btn btn-secondary btn-sm col-2" style={{ height: '37px', margin: '0px 15px' }} onClick={saveNewCaseType}>Save</button>
                            <button type="button" className="btn btn-danger btn-sm col-2" style={{ height: '37px', margin: '0px 15px' }} onClick={() => setshowNewType(false)}>Cancel</button>
                          </div>
                        ) : (
                          <button type="button" className="btn btn-secondary btn-sm col-md-2 col-sm-6 justify-content-end" style={{ height: '37px' }} onClick={addNewCaseType}>Add New Case Type</button>
                        )}
                      </div>

                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Permettre Plusieur Fichier</th>
                            <th scope="col">Editer</th>
                            <th scope="col">Desactiver</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filesCats.map((cat, i) => {
                            return (
                              <tr key={'cat-' + cat.catId}>
                                <th scope="row">
                                  {cat.catName}
                                </th>
                                <td>
                                  {cat.allowMultipleFiles ? 'Yes' : 'No'}
                                </td>
                                <td>
                                  <div style={{ fontSize: '0.95rem', margin: '7px 15px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setselectedCat(cat); setshowdetails(true) }}>Edit</div>
                                </td>
                                <td>
                                  <div style={{ fontSize: '0.95rem', margin: '7px 15px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { desactivateCat(cat) }}>Desactiver</div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>

                    </div>

                    <div className="card panel-default col-12 d-flex justify-content-center" style={{ margin: '10px 4px' }}>
                      <div className="card-header">
                        - List des applications -
                      </div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col"># OTP</th>
                            <th scope="col">Client</th>
                            <th scope="col">Date de soumission</th>
                            <th scope="col">Derniere Mise a jour</th>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                          </tr>
                        </thead>

                        <tbody>
                          {userApplications.map((app, i) => {
                            return (
                              <tr key={'app-' + i}>
                                <th scope="row">{app.otp}</th>
                                <td>{app.data['_ctl0:txtFirstName'] + " " + app.data['_ctl0:txtMiddleName'] + " " + app.data['_ctl0:txtLastName']}</td>
                                <td>{new Date(app.submission_date).toDateString()}</td>
                                <td>{new Date(app.update_date).toDateString()}</td>
                                <td>
                                  <div className="col-xs-12 col-sm-8">
                                    <select value={app.status} onChange={(e) => handleStatusChange(e, app, i)} className="form-control">
                                      <option value="Reçue Par Zunungo">Reçue Par Zunungo</option>
                                      <option value="Resoumis">Resoumis</option>
                                      <option value="En cour de traitement">En cour de traitement</option>
                                      <option value="Incomplète">Incomplète</option>
                                      <option value="Complété">Complété</option>
                                    </select>
                                  </div>
                                </td>
                                <td>
                                  <div style={{ fontSize: '0.95rem', margin: '7px 15px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setshowdetails(true); setTimeout(() => { setInputs(app) }, 1500) }}>Details</div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>)}
    </section>
  )
}
