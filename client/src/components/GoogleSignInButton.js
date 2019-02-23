import React from "react";
import GoogleSignIn from "../images/btn_google_signin_light_normal_web.png";

export default function GoogleSignInButton(props){
    return(
        // Must use anchor tag to access Google log in (does not work with axios)
        <a href="/auth/login"> 
            <img src={ GoogleSignIn } width={ props.width } height="auto" alt="Sign in with Google" />
        </a>
    );
}