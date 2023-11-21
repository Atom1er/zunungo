import React from 'react'

export default function Home(props) {
    return (
        <>

            {/* <!-- ***** Main Banner Area Start ***** --> */}
            <section className="section main-banner" id="top" data-section="section1">
                <video autoPlay muted loop id="bg-video">
                    <source src="assets/images/course-video.mp4" type="video/mp4" />
                </video>


                <div className="video-overlay header-text">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="caption">
                                    <h6>Welcome to zunungo Group LLC</h6>
                                    <h2>THE LEGAL EXPERTISE YOU CAN RELY ON</h2>
                                    <div>
                                        <ul>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-1s"> <i
                                                className="fa fa-plane" aria-hidden="true" style={{marginRight: "4px"}}></i>Visa
                                            </li>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-2s"> <i
                                                className="fa-solid fa-id-card-clip" style={{marginRight: "4px"}}></i> Green
                                                Card</li>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-2s"> <i
                                                className="fa-solid fa-suitcase" style={{marginRight: "4px"}}></i> Travel
                                                Document</li>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-3s"> <i
                                                className="fa-solid fa-home" style={{marginRight: "4px"}}></i> Asylum</li>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-3s"> <i
                                                className="fa-solid fa-id-card" style={{marginRight: "4px"}}></i> Work Permit
                                            </li>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-4s"> <i
                                                className="fa-solid fa-id-language" style={{marginRight: "4px"}}></i> Traduction
                                            </li>
                                            <li className="topservices animate__animated animate__backInRight animate__delay-4s"> <i
                                                className="fa-solid fa-usd" style={{marginRight: "4px"}}></i> Tax Services</li>
                                        </ul>
                                    </div>
                                    <div className="main-button-red animate__animated animate__zoomInDown animate__delay-5s">
                                        <div className="scroll-to-section"><a href="#contact">GET A FREE CONSULTATION!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ***** Main Banner Area End ***** --> */}

            <section className="services">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="owl-service-item owl-carousel">

                                <div className="item">
                                    <div className="icon">
                                        <i className="fa fa-plane" aria-hidden="true" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Visa</h4>
                                        {/* <!-- <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p> --> */}
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="icon">
                                        {/* <!-- <i className="fa fa-address-card" aria-hidden="true" style={{fontSize: "50px"}}></i> --> */}
                                        <i className="fa-solid fa-id-card-clip" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Green Card</h4>
                                        <p></p>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="icon">
                                        <i className="fa fa-suitcase" aria-hidden="true" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Travel Document</h4>
                                        {/* <!-- <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p> --> */}
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="icon">
                                        <i className="fa fa-id-card" aria-hidden="true" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Work Permit</h4>
                                        {/* <!-- <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p> --> */}
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="icon">
                                        <i className="fa fa-home" aria-hidden="true" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Asylum</h4>
                                        {/* <!-- <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p> --> */}
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="icon">
                                        <i className="fa fa-language" aria-hidden="true" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Traduction</h4>
                                        {/* <!-- <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p> --> */}
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="icon">
                                        <i className="fa fa-usd" aria-hidden="true" style={{fontSize: "50px"}}></i>
                                    </div>
                                    <div className="down-content">
                                        <h4>Tax Services</h4>
                                        {/* <!-- <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p> --> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="upcoming-meetings" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>About Us</h2>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="categories">
                                <h4>A Focus on Results</h4>
                                <hr />
                                <h6>English</h6>
                                <p>The first step is for us to work with you and come up with a plan to get the results you need. Through
                                    our understanding of the law and your understanding of the circumstances, we will craft a path to success.
                                </p>
                                <hr />
                                <h6 style={{marginTop: "15px"}}>French</h6>
                                <p>La première étape consiste pour nous à travailler avec vous et à élaborer un plan pour obtenir les
                                    résultats dont vous avez besoin. Grâce à notre compréhension de la loi et à votre compréhension des
                                    circonstances, nous tracerons la voie du succès.</p>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="categories">
                                <h4>Law You Can Understand</h4>
                                <hr />
                                <h6>English</h6>
                                <p>We know that legal action can sometimes be overwhelming. We are dedicated to providing you help in
                                    language that you can understand. If you don't feel like you understand your options, just ask, and we
                                    will work to find an explanation that works for you.</p>
                                <hr />
                                <h6 style={{marginTop: "15px"}}>French</h6>
                                <p>Nous savons que les poursuites judiciaires peuvent parfois être accablantes. Nous nous engageons à vous
                                    fournir une aide dans un langage que vous pouvez comprendre. Si vous n'avez pas l'impression de comprendre
                                    vos options, demandez simplement et nous travaillerons pour trouver une explication qui vous convienne.
                                </p>
                                {/* <!-- <div className="main-button-red">
                                    <a href="meetings.html">All Upcoming Meetings</a>
                                </div> --> */}
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="categories">
                                <h4>Get Started Today</h4>
                                <hr />
                                <h6>English</h6>
                                <p>Don't wait! Contact us for a free phone consultation. Let us help you figure out your best next steps
                                    are. The sooner you have a plan of action, the better your chances of taking the correct steps to get the
                                    results you want.</p>
                                <hr />
                                <h6 style={{marginTop: "15px"}}>French</h6>
                                <p>N'attendez pas ! Contactez-nous pour une consultation téléphonique gratuite. Laissez-nous vous aider à
                                    déterminer vos meilleures prochaines étapes. Plus tôt vous aurez un plan d'action, meilleures seront vos
                                    chances de prendre les bonnes mesures pour obtenir les résultats souhaités.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{display: 'flex', justifyContent: "center"}}>
                        <div className="main-button-yellow" style={{margin: 'auto', width: 'fit-content', marginTop: '15px'}}>
                            <a href="#contact">Get Started</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="apply-now" id="apply">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item">
                                        <h3>LEGAL DISCLAIMER</h3>
                                        <p> The information on this website is for general information purposes only. Nothing on this site
                                            should be taken as legal advice for any individual case or situation. </p>
                                        <hr />
                                        <p> Les informations sur ce site Web sont uniquement à des fins d'information générale. Rien sur ce site
                                            ne doit être considéré comme un avis juridique pour un cas ou une situation individuelle.</p>
                                        <div className="main-button-red">
                                            <div className="scroll-to-section d-none d-md-block"><a href="#disclaimer-more">Learn More <i
                                                className="fa fa-long-arrow-right" aria-hidden="true" style={{marginLeft: "10px"}}></i></a></div>
                                            <div className="scroll-to-section d-block d-md-none"><a href="#disclaimer-more">Learn More <i
                                                className="fa fa-long-arrow-down" aria-hidden="true" style={{marginLeft: "10px"}}></i></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="accordions is-first-expanded">
                                <article className="accordion">
                                    <div className="accordion-head">
                                        <span id="disclaimer-more">Relationship</span>
                                        <span className="icon">
                                            <i className="icon fa fa-chevron-right"></i>
                                        </span>
                                    </div>
                                    <div className="accordion-body">
                                        <div className="content">
                                            <p>The information offered on this website or during our case evaluation does not create an
                                                attorney-client relationship. There is no attorney-client relationship between us, we are providing
                                                legal advice in order to help your case.
                                                <br />
                                                Therefore, we are not responsible for any harm or losses resulting from reliance on the information
                                                contained on this website. All information on this website may not apply to your specific case. You
                                                should always consult with an attorney about your specific legal question or issue before taking
                                                action.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                                <article className="accordion">
                                    <div className="accordion-head">
                                        <span>Results</span>
                                        <span className="icon">
                                            <i className="icon fa fa-chevron-right"></i>
                                        </span>
                                    </div>
                                    <div className="accordion-body">
                                        <div className="content">
                                            <p>Past results are not a guarantee of future results, and the outcome of your particular case or
                                                matter cannot be predicted using a lawyer's or law firm's past results. Every case is unique and
                                                different and should be evaluated on its own merits, without comparison to other cases that may have
                                                had different facts and circumstances. </p>
                                        </div>
                                    </div>
                                </article>
                                <article className="accordion">
                                    <div className="accordion-head">
                                        <span>Limitation of Liability</span>
                                        <span className="icon">
                                            <i className="icon fa fa-chevron-right"></i>
                                        </span>
                                    </div>
                                    <div className="accordion-body">
                                        <div className="content">
                                            <p> The use of this website is at the user's own risk and ZUNUNGO Group LLC expressly disclaims all
                                                liability with respect to actions taken or not taken based on any contents of this website. The
                                                contents of the website may contain general information and may not reflect the most current legal
                                                developments, verdicts, or settlements and neither the authors nor ZUNUNGO Group LLC makes any
                                                claims, promises, or guarantees about the accuracy, completeness, currency, or adequacy of the
                                                contents or information contained or linked to herein. The materials on this website may be changed,
                                                improved, or updated without notice. ZUNUNGO Group LLC is not responsible for any errors or
                                                omissions in the content of this website or for damages arising from the use or performance of this
                                                website under any circumstances. </p>
                                        </div>
                                    </div>
                                </article>
                                <article className="accordion last-accordion">
                                    <div className="accordion-head">
                                        <span>No Solicitation</span>
                                        <span className="icon">
                                            <i className="icon fa fa-chevron-right"></i>
                                        </span>
                                    </div>
                                    <div className="accordion-body">
                                        <div className="content">
                                            <p>We request that you do not use any of the information on this website, including without
                                                limitation, the e-mail addresses that are posted here, to transmit, distribute or facilitate the
                                                distribution of unsolicited bulk e-mail or other advertisements to ZUNUNGO Group LLC or any of its
                                                employees, and any such use of the information on this website is a violation of the terms of use of
                                                this website.</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-us" id="contact">
                <div className="container">
                    <div className="row" style={{alignItems: "center"}}>
                        <div className="col-lg-5">
                            <div className="right-info">
                                <ul>
                                    <li>
                                        <h6>Phone Number</h6>
                                        <span><a href="tel:+13478843554">+1 (347) 884 3554</a></span>
                                    </li>
                                    <li>
                                        <h6>Email Address</h6>
                                        <span><a href="mailto:zunungogroup@gmail.com">zunungogroup@gmail.com</a></span>
                                    </li>
                                    <li>
                                        <h6>Address</h6>
                                        <span><a href="http://maps.google.com/?q=845 3rd avenue, New York, NY 10022">4346 katonah avenue,
                                            Bronx, NY 10470</a></span>
                                    </li>
                                    {/* <li>
                                        <h6>Website URL</h6>
                                        <span><a href="#">www.zunungo-group.com</a></span>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7 align-self-center">
                            <div className="row">
                                <img src="assets/images/zunugo.png" height="100%" alt="zunungo group logo" />
                                {/* <!-- <div className="col-lg-12">
                                    <form id="contact" action="" method="post">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2>Let's get in touch</h2>
                                            </div>
                                            <div className="col-lg-4">
                                                <fieldset>
                                                    <input name="name" type="text" id="name" placeholder="YOURNAME...*" required="" />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-4">
                                                <fieldset>
                                                    <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="YOUR EMAIL..." required="" />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-4">
                                                <fieldset>
                                                    <input name="subject" type="text" id="subject" placeholder="SUBJECT...*" required="">
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <textarea name="message" type="text" className="form-control" id="message" placeholder="YOUR MESSAGE..." required=""></textarea>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <button type="submit" id="form-submit" className="button">SEND MESSAGE NOW</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div> --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
