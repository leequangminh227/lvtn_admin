import React, { useEffect, useState, useRef } from "react";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if(email === '' || password === ''){
            alert('Không được để trống')
            return
        }
        fetch( 'https://lvtn2022real.herokuapp.com/employee/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({
              email,
              password : password
            })
          })
            .then((res) => {
              if (res.ok) return res.json();
              throw new Error("Something went wrong");
            })
            .then((result) => { 
                if (result.success) {
                    localStorage &&
                    localStorage.setItem("realLVTN", result.token);
                    window.location.reload(false)
                } else {
                    alert(result.mes)
                } 
            });
    }

  return (
    <React.Fragment>
      <div
        className="toggleTab"
      >
        <div
          className="childTab"
        >
          <form onSubmit={(e)=> {
            e.preventDefault()
            handleLogin()
          }}> 
          <div>
            <h3 className="text-center">Đăng nhập</h3>

            <div>
              <div className=" px-0 mgt20">
                <div>
                  <label className="label-input-group">Email </label>
                  
                <div className="buttonDiv">
                  <input
                    className="next-input numInput"
                    value = {email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                  />
                </div>
                </div>
              </div>
              <div className="px-0 mgt20">
                <label className="label-input-group">
                  Mật khẩu
                </label>
                
                <div className="buttonDiv">
                  <input
                    type = "password"
                    className="next-input numInput"
                    value = { password }
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                  />
                </div>

              </div>
              
            </div>
            <div className="text-center mgt20">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin()
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
