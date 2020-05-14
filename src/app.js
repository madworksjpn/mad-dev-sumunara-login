import Amplify, { Auth }  from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
if(document.getElementById("registerBtn") != null) {
	document.getElementById("registerBtn").addEventListener("click", e => {
		e.preventDefault();
	
		var input_username = document.getElementById("inputUserName").value;
		var input_password = document.getElementById("inputConfirmPassword").value;
		var input_email = document.getElementById("inputEmail").value;
	
		signUp(input_username, input_password, input_email, '');
	});
} else if(document.getElementById("loginBtn") != null) {
	document.getElementById("loginBtn").addEventListener("click", e => {
		e.preventDefault();

		var input_username = document.getElementById("inputUserName").value;
		var input_password = document.getElementById("inputPassword").value;

		SignIn(input_username, input_password);
	});
} else {
	document.getElementById("sendBtn").addEventListener("click", e => {
		e.preventDefault();

		var input_username = document.getElementById("inputUserName").value;
		var input_verify_code = document.getElementById("inputVerifyCode").value;

		confirmSignUp(input_username, input_verify_code);
	});
}

async function signUp(username, password, email, phone_number) {
    try {
        const user = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
		console.log({ user });
		location.href = `./newpass.html`;
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function SignIn(username, password) {
    try {
		const user = await Auth.signIn(username, password);
		location.href = `https://sumunara-app.herokuapp.com/sumunara_apps/address_form/`;
    } catch (error) {
        console.log('error signing in', error);
	}
	
}

async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
	}
	location.href = `./index.html`;
}