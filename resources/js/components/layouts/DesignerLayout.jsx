import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faBars, faHouseChimney, faQuestionCircle, faSpaceShuttle, faTriangleCircleSquare, faWrench } from "@fortawesome/free-solid-svg-icons";
import { faShuttleSpace } from "@fortawesome/free-solid-svg-icons/faShuttleSpace";
import { useStateContext } from "../Providers/ContextProvider";
import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import LogoutModal from "../Notifications/LogoutModal";
export default function DesignerLayout() {
    const {setUser} = useStateContext();
    const [logout,setLogout ] = useState(false);

    useEffect(() => {
        apiService.get("/user")
            .then((response) => setUser(response.data))
            .catch(error => console.log(error));
    },[]);
    
    const user = {name:""};
    const emailBody = encodeURIComponent(
        `Hello,\n\nI would like to ask about your services and get more information on...\n\nBest regards,\n${user.name}`
    );

    return (

        <section className="section designer-section" >
            <div className="designer-left">
                <div className="designer-title">
                    <img src="/Images/logo.png" alt="tag-logo" />
                    <div >
                        <span>TAG Global Management</span>
                        <span>Corporation</span>
                    </div>
                </div>
                <nav className="designer-nav-con">
                    <Link className="designer-nav" to={'/designer/requests'} >
                        <FontAwesomeIcon icon={faHouseChimney} className="designer-nav-icon" />
                        Pattern Aprroval
                    </Link>
                    <Link className="designer-nav" to={'/designer/records-data'} >
                        <FontAwesomeIcon icon={faTriangleCircleSquare} className="designer-nav-icon" />
                        Pattern Records
                    </Link>
                    <Link className="designer-nav" to={"/designer/dashboard"}>
                        <FontAwesomeIcon icon={faBarChart} className="designer-nav-icon" />
                        Dashboard
                    </Link>
                    <Link to={'/designer/reports'} className="designer-nav">
                        <FontAwesomeIcon icon={faWrench} className="designer-nav-icon" />
                        Reports

                    </Link>
                    <Link className="designer-nav"  onClick={() => setLogout(true)}>
                        <FontAwesomeIcon icon={faShuttleSpace} className="designer-nav-icon" />
                        Log out
                    </Link>
                </nav>
                <div className="designer-help-box">
                    <div >
                        <FontAwesomeIcon icon={faQuestionCircle} className="designer-help-logo" />
                    </div>
                    <div className="designer-help-text">
                        <span>Need help?</span>
                        <span>Contact Us</span>
                    </div>
                    <button className="designer-contact-btn">
                        <a
                            href={`mailto:yellyhaze000@gmail.com?subject=Message&body=${emailBody}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact Us
                        </a>
                    </button>

                </div>
            </div>

            <main className="disgner-page">
                <Outlet />
            </main>
            {logout && <LogoutModal setLogout={setLogout}/>}
        </section>

    );
}