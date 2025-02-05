import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate();

  const {backendUrl,token,setToken}=useContext(AppContext);

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const findTodo = () => {
    {
      setName("");
      setEmail("");
      setPassword("");
      state === "login" ? setState("Sign Up") : setState("login");
    }
  };

  const defaultPrevention = async (event) => {
    event.preventDefault();
    try{
      if(state==="Sign Up"){
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token)
          setName("")
          setPassword("")
          setEmail("")
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token)
          setEmail("")
          setPassword("")
        }
        else{
          toast.error(data.message)
        }
      }
    }
    catch(error){
      toast.error(error.message)
    }

  };
  
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={defaultPrevention}
      className="w-full h-[80vh] flex justify-center items-center"
    >
      <div className="w-[350px] shadow-3xl p-10 rounded-xl text-textColor">
        <h4 className="text-2xl font-semibold text-textColor">
          {state === "login" ? "Login" : "Create Account"}
        </h4>
        <p className="text-sm my-4">
          Please {state === "login" ? "Login" : "Sign Up"} to book appointment
        </p>
        {state === "Sign Up" ? (
          <div className="w-full">
            <p className="text-sm">Full Name</p>
            <input
              className="border border-gray-300 rounded-md mb-3 w-full h-9 pl-1.5"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        ) : (
          ""
        )}
        <div className="w-full">
          <p className="text-sm mb-0.5">Email</p>
          <input
            className="border border-gray-300 rounded-md mb-3 w-full h-9 pl-1.5"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p className="text-sm mb-0.5">Password</p>
          <input
            className="border border-gray-300 rounded-md mb-6 w-full h-9 pl-1.5"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button className="w-full bg-primary text-white rounded-md py-2 cursor-pointer hover:bg-blue-800 transition-all ease-in-out duration-500 mb-5">
          {state === "login" ? "Login" : "Sign Up"}
        </button>
        <div className="text-sm flex gap-2">
          <p>
            {state === "login"
              ? "Create a new account?"
              : "Already have an account?"}
          </p>
          <button
            type="submit"
            onClick={() => findTodo()}
            className="text-primary underline hover:text-yellow-500 transition-all ease-in-out duration-400"
          >
            {state === "login" ? "Sign Up" : "login"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
