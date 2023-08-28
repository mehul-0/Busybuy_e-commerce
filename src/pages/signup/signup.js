import { useState } from "react"
// importing createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword firebase/auth
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
// importing  auth from the firebase
import { auth } from "../../firebaseinit"
import { useDispatch } from "react-redux"
// importing action from signupReducer
import { action } from "../../redux/signupReducer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./signup.css"

export default function Signup({setLoading}) {
    // setting up all the initial state required for the authentication 
    const [first,setFirst]=useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // function to signin the user with email, password
    function signInUser(e) {
        e.preventDefault()
        // setloading to true as user is signing in
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // if user credentials matches in the firebase dispatch login action from the signupReducer
                dispatch(
                    action.login({
                        email: userCredential.user.email,
                        displayName: userCredential.user.displayName,
                        uid: userCredential.user.uid                   
                    })
                );
                setLoading(false)
                // notification of logged in success
                toast.success("Logged in successfully")
            })
            // handling any error occured
            .catch((err) => {
                alert(err);
                setLoading(false)
                navigate("/")
            });
            
    };
// Function to handle the user registration
    async function registerUser() {
        // Form validation
        if (!name) {
            return alert("Please enter a name")
        }
        if(password.length <6){
            return alert("Please enter a password greater than 6")
        }
        if(email.length < 5){
            return alert("Enter a valid email address")
        }
//  Creating a new user account
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: name,
            })
            // dispatching login action when new user is created.
                .then(dispatch(action.login({
                    email: userCredential.user.email,
                    displayName: name,
                    uid: userCredential.user.uid
                })))
                .catch((error) => {
                    console.log(error, "User can not be updated")
                })
                // error handling if any error occured
                .catch((error) => {
                    alert(error)
                    navigate("/")
                });
            navigate("/")
        })
        
    }
    return (
        <>
        
            <div className="form-container">
                <div className="box">
                <div className="heading">Welcome to BuyBusy E-commerce. {first?"Sign Up":"Log In"} here.</div>
                <form className="register-signin-form">
                    <div className="input-feilds-container">
                        {first && <input type="text"
                            placeholder="Display Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-field"
                        />}
                        <input type="email"
                            placeholder="Email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="btn-container">
                        {/* button handles signin of user */}
                        {!first?<button className="signin-btn" type="submit" onClick={(e) => signInUser(e)}>Log in</button>:null}
                        {first?<button className="register-btn" onClick={registerUser}>Register</button>:null}
                    </div>
                </form>
                
                <p onClick={(e)=> {
                    e.preventDefault();
                    setFirst(!first);
                }}>{!first?"Not a user?":"Already have an account?"}</p>
            </div>
            </div>
        </>
    )
}