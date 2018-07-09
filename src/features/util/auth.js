import axios from "axios"

RESET_PASSWORD_REQUEST
LOGIN_ERROR
AUTH_USER
REGISTER_ERROR
UNAUTH_USER
FORGOT_PASSWORD_REQUEST


export var Auth_methods = class CRUD {

    constructor(payload){

        var { operation, email, password, fname , lname, grad } = payload
        
        this.email = email
        this.password = password
        this.fname = fname
        this.lname = lname
        this.grad = grad


        switch(operation){
            case "login":

                this.loginGrad()

                break

            case "logout":

                this.logoutGrad()
                
                break

            case "register":

                this.registerGrad()

                break

            case "authenticate":

                this.authenticateGrad()

                break

            case "get_password_reset":

                this.getForgotPasswordToken()

                break
            
            case "reset_password":

                this.resetPassword()

                break
        }

    }

    loginGrad() {

        const { email, password } = this

        axios
            .post(`${API_URL}/grads/login`, { email, password })
            .then(response => {
        
                cookies.set("token", response.data.token, { path: "/" });
                cookies.set("user", response.data.user, { path: "/" });
                dispatch({ type: AUTH_USER, payload: response.data.user });
            
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: "invalid email or password"
                });
            });
        
    }

    registerGrad() {

        const { email, fname, lname, password } = this

        axios
            .post(`${API_URL}/grads/register`, {
                email,
                fname,
                lname,
                password
            })
            .then(response => {
                cookies.set("token", response.data.token, { path: "/" });
                cookies.set("grad", response.data, { path: "/" });
                dispatch({ type: AUTH_USER, payload: response.data.grad });

            })
            .catch(error => {
                dispatch({
                    type: REGISTER_ERROR,
                    payload: "unable to create account"
                });
            });
        
    }

    logoutGrad(error) {

        var shelterCookie = cookies.get("currentShelter");
        dispatch({
            type: UNAUTH_USER,
            payload: error
        });
        
        cookies.remove("token", { path: "/" });
        cookies.remove("grad", { path: "/" });
        
    }

    getForgotPasswordToken({ email }) {
        
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
            payload: {
                stateOfSend: "sending email",
                sending: true,
                sendSuccessful: false
            }
        });

        axios
            .post(`${API_URL}/auth/forgot-password`, { email })
            .then(response => {
                dispatch({
                    type: FORGOT_PASSWORD_REQUEST,
                    payload: {
                        stateOfSend: "email sent",
                        sending: false,
                        sendSuccessful: true
                    }
                });
            })
            .catch(error => {
              
                dispatch({
                    type: FORGOT_PASSWORD_REQUEST,
                    payload: {
                        stateOfSend: error.response.data.error,
                        sending: false,
                        sendSuccessful: false
                    }
                });
            });
        
    }

    resetPassword(token, { password }) {

        axios
            .post(`${API_URL}/auth/reset-password/${token}`, { password })
            .then(response => {
                dispatch({
                    type: RESET_PASSWORD_REQUEST,
                    payload: {
                        message: response.data.message,
                        didReset: response.data.didReset
                    }
                });
                // Redirect to login page on successful password reset
                //browserHistory.push('/login');
            })
            .catch(error => {
                dispatch({
                    type: RESET_PASSWORD_REQUEST,
                    payload: {
                        message: error.response.data.error,
                        didReset: false
                    }
                });
            });
    }

    authenticateGrad() {
        const { grad } = this
		axios
			.get(`${API_URL}/grad/authenticate/${grad._id}`, {
				headers: { Authorization: cookies.get("token") }
			})
			.then(response => {
				if (response.data) {
					dispatch({
						type: AUTH_USER,
						payload: response.data
					});
				}
			})
			.catch(error => {});
	};
}


