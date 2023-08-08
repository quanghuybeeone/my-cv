import React from 'react'
import RenderInfo from '../components/RenderInfo'
import ListTarget from '../components/ListTarget'
import ListEducation from '../components/ListEducation'
import ListSkill from '../components/ListSkill'
import ListProject from '../components/ListProject'
import ListInfomation from '../components/ListInfomation'
import ListCertificate from '../components/ListCertificate'
import "./style.css"
// import ExampleComponent from '../components/ExampleComponent'
// import ModalAddComponent from '../components/ModalAddComponent'

const Home: React.FC = () => {
    return (
        <>
        {/* <ExampleComponent inputFields={['name', 'email', 'phone']} url="http://localhost:3000/api/infos/" method="post" id={'1'}/> */}
        
            <section className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mb-4 mb-sm-5">
                            <div className="card card-style1 border-0">
                                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 mb-4 mb-lg-0">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                alt="..."
                                            />
                                        </div>
                                        <RenderInfo />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ListTarget />

                        <ListEducation />

                        <ListSkill />
                        
                        <ListProject />

                        <ListInfomation />

                        <ListCertificate />
                        {/* <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-12 mb-4 mb-sm-5">
                                    <div className="mb-4 mb-sm-5">
                                        <span className="section-title text-primary mb-3 mb-sm-4">
                                            Skill
                                        </span>
                                        <div className="progress-text">
                                            <div className="row">
                                                <div className="col-6">Driving range</div>
                                                <div className="col-6 text-end">80%</div>
                                            </div>
                                        </div>
                                        <div
                                            className="custom-progress progress progress-medium mb-3"
                                            style={{ height: 4 }}
                                        >
                                            <div
                                                className="animated custom-bar progress-bar slideInLeft bg-secondary"
                                                style={{ width: "80%" }}
                                                aria-valuemax={100}
                                                aria-valuemin={0}
                                                aria-valuenow={10}
                                                role="progressbar"
                                            />
                                        </div>
                                        <div className="progress-text">
                                            <div className="row">
                                                <div className="col-6">Short Game</div>
                                                <div className="col-6 text-end">90%</div>
                                            </div>
                                        </div>
                                        <div
                                            className="custom-progress progress progress-medium mb-3"
                                            style={{ height: 4 }}
                                        >
                                            <div
                                                className="animated custom-bar progress-bar slideInLeft bg-secondary"
                                                style={{ width: "90%" }}
                                                aria-valuemax={100}
                                                aria-valuemin={0}
                                                aria-valuenow={70}
                                                role="progressbar"
                                            />
                                        </div>
                                        <div className="progress-text">
                                            <div className="row">
                                                <div className="col-6">Side Bets</div>
                                                <div className="col-6 text-end">50%</div>
                                            </div>
                                        </div>
                                        <div
                                            className="custom-progress progress progress-medium mb-3"
                                            style={{ height: 4 }}
                                        >
                                            <div
                                                className="animated custom-bar progress-bar slideInLeft bg-secondary"
                                                style={{ width: "50%" }}
                                                aria-valuemax={100}
                                                aria-valuemin={0}
                                                aria-valuenow={70}
                                                role="progressbar"
                                            />
                                        </div>
                                        <div className="progress-text">
                                            <div className="row">
                                                <div className="col-6">Putting</div>
                                                <div className="col-6 text-end">60%</div>
                                            </div>
                                        </div>
                                        <div
                                            className="custom-progress progress progress-medium"
                                            style={{ height: 4 }}
                                        >
                                            <div
                                                className="animated custom-bar progress-bar slideInLeft bg-secondary"
                                                style={{ width: "60%" }}
                                                aria-valuemax={100}
                                                aria-valuemin={0}
                                                aria-valuenow={70}
                                                role="progressbar"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="section-title text-primary mb-3 mb-sm-4">
                                            Education
                                        </span>
                                        <p>
                                            Many desktop publishing packages and web page editors now use
                                            Lorem Ipsum as their default model text, and a search for 'lorem
                                            ipsum' will uncover many web sites still in their infancy.
                                        </p>
                                        <p className="mb-1-9">
                                            There are many variations of passages of Lorem Ipsum available,
                                            but the majority have suffered alteration in some form, by
                                            injected humour.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

        </>

    )
}

export default Home