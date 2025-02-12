import '../styles/sign-in.css'
import { RigiseterUser } from './Auth'
import { ToastContainer } from 'react-toastify'
function SignIn(){
    return(<>
    
    <div className="sign-in">
        <div className="flex-sect">
        <div className="left-section">
        <h2>Sign Up Here</h2>
        <h3>For Order And Get More Access In This Website</h3>
        <h4>You Must Be Create Account Here!</h4>
        <p>Thanks For Visiting (From Ekidame)</p>
        </div>
        <div className="input-section">
                <input type="text" id='f-name' placeholder='First Name' /><br/>
                <input type="text" id='s-name' placeholder='Second Name' /><br/>
                <input type="text" id='l-name' placeholder='Last Name' /><br/>
                <input type="email" id='email'placeholder='Email' /><br/>
                <input type="password" id='password1'placeholder='Password' /><br/>
                <input type="password" id='password2'placeholder='Comfirm' /><br/>
                <input type="tel" id='phone' placeholder='Phone No '/><br/>
                <button onClick={RigiseterUser}>Sign In</button><br/>   
                <label htmlFor="">Alreary I Have Account <a href="/login">Login</a></label>
        </div>
        </div>
    </div>

    <ToastContainer></ToastContainer>
    
    </>)
}

export default SignIn