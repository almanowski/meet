import React from "react"; 
import './WelcomeScreen.css'; 
 
function WelcomeScreen(props) { 
  return props.showWelcomeScreen ? ( 
    <div className="WelcomeScreen">
      <img src={process.env.PUBLIC_URL + "/leme-app-192.png"} alt="Logo" className="logo"></img>
      <h1>Welcome to the <span className="leme">MEET</span> app</h1> 
      <h4> 
      Where you can learn new skills and meet new people
      </h4> 
      <div className="button_cont" align="center"> 
        <div className="google-btn"> 
          <div className="google-icon-wrapper"> 
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google sign-in" 
            /> 
          </div> 
          <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" className="btn-text"> 
            <b>Sign in with google</b> 
          </button>
        </div> 
      </div> 
      <a href="https://almanowski.github.io/meet/privacy.html" rel="nofollow noopener" className="privacy"> 
        Privacy policy 
      </a> 
    </div> 
  ) : null 
} 
 
export default WelcomeScreen; 