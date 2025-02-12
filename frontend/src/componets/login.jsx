import '../styles/sign-in.css'
import { LoginUser } from './Auth'
import { ToastContainer } from 'react-toastify'
function Login(){
    return(<>
    
    <div className="sign-in">
        <div className="flex-sect">
        <div className="left-section">
        <h2>Login Here</h2>
        <h3>For Order And Get More Access In This Website</h3>
        <h4>You Must Be Login Here! Into Account</h4>
        <p>Thanks For Visiting (From Ekidame)</p>
        </div>
        <div className="input-section">
                <input type="email" id='email'placeholder='Email' /><br/>
                <input type="password" id='password'placeholder='Password' /><br/>
                <input type="tel" id='phone' placeholder='Phone No '/><br/>
                <button onClick={LoginUser}>LogIn</button><br/><br/>
                <label>I don't Have Account <a href='/sign-up'>Sign Up</a></label>
        </div>
        </div>
    </div>

    <ToastContainer></ToastContainer>
    
    </>)
}

export default Login