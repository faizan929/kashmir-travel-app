function Login(){
    return(
        <div className="login-container">
            <h2>Login to SafarKasheer</h2>
            <form>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <button type="submit">Login</button>
            </form>

            <p>Don't have an account? Sign up</p>
            
        </div>
        
      
    );

        
}

export default Login;