import { useState } from "react"
import { toast } from "react-toastify"
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import Oauth from "../components/Oauth"
import BsPersonFill from "./PersonIcon"
import RiLockPasswordFill from "./PassWord"


function SignIn() {
  const [showPassword, setShowpassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

 
  const onSubmit = async(e) => {
    e.preventDefault()

    try{
        const auth = getAuth()

        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        if(userCredential.user){
          toast.success('Welcome Back')
          navigate('/')
         }
    }catch(error){
      toast.error('Bad User Credentials !, Maybe you should Sign-Up instead')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <div>
          <header>
            <p className="pageHeader">Welcome Back!</p>
          </header>
          <form onSubmit={onSubmit}>
            <input type="email"
              className="emailInputIn"
              value={email}
              id="email"
              placeholder="Email"
              onChange={onChange} />
              <BsPersonFill className="emailperson"/>
      
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                onChange={onChange}
                value={password}
                className="passwordInputIn" />
                <RiLockPasswordFill className="password"/>
              <img src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowpassword(prevState => !prevState)} />
            </div>
            <Link to='/forgot-password' className="forgotPasswordLink">
              <p>Forgot Password</p>
            </Link>
            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon width={34} height={34} fill="#fff" />
              </button>
            </div>
          </form>
          <Oauth />
          <Link to='/sign-up' className="registerLink">
            <p>Sign Up</p>
          </Link>
        </div> 
      </div>
    </>
    
  )
}

export default SignIn