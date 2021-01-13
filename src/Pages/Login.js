import React from 'react'

function Login() {
    return (
        <div className="login_container">
            <div className="login_wrapper">
                <div className="logo_container">
                    <h2>Hacker Cafe</h2>
                </div>
                <form className="form_container">
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button className="login_btn">Login</button>
                </form>
                <p>Don't have an account?</p>
        </div>
        </div>
    )
}

export default Login
