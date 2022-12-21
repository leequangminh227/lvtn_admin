import { Route, Routes } from "react-router-dom";
import "swiper/css/bundle";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Login from "../pages/Login/Login";
import User from "../pages/User";
import Post from "../pages/Post";

function RoutePath() {
  const [select, setSelect] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [userMenu, setUserMenu] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    let signal = true;
    fetch("https://lvtn2022real.herokuapp.com/employee/loginCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.realLVTN 
            ? localStorage.realLVTN 
            : "",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong");
      })
      .then((result) => {
        if (signal) {
          if (result.success) {
            localStorage &&
              localStorage.setItem(
                "lvtnAdminInfo",
                JSON.stringify(result.decoded)
              );
            // console.log(result.decoded)
            setUser(result.decoded);
            setIsLogin(true);
          } else {
            setIsLogin(false);
          }
        }
      });
    return () => {
      signal = false;
    };
  }, []);
  return (
    <React.Fragment>
      {!isLogin && <Login />}
      
      {isLogin && (
        <div
          className="AdminAllCss"
          onClick={(e) => {
            setUserMenu(false);
          }}
        >
          <div className="wrapperAdmin">
            <div className="sidebarAdmin">
              <div className="sidebarContainer">
                <div className="sidebarFormat">
                  <div className="sidebarTitle">PSM</div>
                  <div className="sidebarContent">
                    <div className="sidebarListWrapper">
                      <ul className="sidebarList">
                        <li className="sidebarAdminGroup">Người dùng</li>
                        <li
                          className={
                            select === "userList"
                              ? "sidebarAdminElement active"
                              : "sidebarAdminElement"
                          }
                        >
                          <a href="/users" className="sidebarLink">
                            <div className="sidebarEleIcon">
                              <Icon icon="mdi:user" />
                            </div>
                            <div className="sidebarEleText">
                              <span>Danh sách người dùng</span>
                            </div>
                          </a>
                        </li>
                        <li className="sidebarAdminGroup">Tin đăng</li>
                        <li
                          className={
                            select === "postList"
                              ? "sidebarAdminElement active"
                              : "sidebarAdminElement"
                          }
                        >
                          <a href="/posts" className="sidebarLink">
                            <div className="sidebarEleIcon">
                              <Icon icon="mdi:post-it-note-edit-outline" />
                            </div>
                            <div className="sidebarEleText">
                              <span>Danh sách tin đăng</span>
                            </div>
                          </a>
                        </li>
                        <li className="sidebarAdminGroup">Cá nhân</li>
                        <li
                          className={
                            select === "transactions"
                              ? "sidebarAdminElement active"
                              : "sidebarAdminElement"
                          }
                        >
                          <a onClick={(e)=>{
                            e.preventDefault()
                            localStorage.removeItem("realLVTN")
                            window.location.reload(false)
                          }} className="sidebarLink">
                            <div className="sidebarEleIcon">
                                  <Icon icon="material-symbols:logout" />
                            </div>
                            <div className="sidebarEleText">
                              <span>Đăng xuất</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                      <div style={{ minHeight: "30px" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mainPageAdmin">
              <header className="mainPageAdminHeader">
                <div className="css-8g4m5a">
                  <div
                    className="css-10uvzj5"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span
                      className="headerSpan relative"
                      onClick={(e) => {
                        setUserMenu(prev=>{return !prev});
                      }}
                    >
                      <div className="MuiAvatar-root MuiAvatar-circular css-12kqh4d">
                        <Icon icon="mdi:user" />
                      </div>
                    </span>
                    {userMenu && (
                      <div
                        onClick={(e) => {
                          setUserMenu(false);
                        }}
                        className="userMenu"
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="infoAdminArea css-rt80a4">
                            <h5 className="MuiTypography-root MuiTypography-h5 css-55ijvw">
                              {user.name??""}
                            </h5>
                            <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                              {user.email??""}
                            </p>
                          </div>
                          <hr className="MuiDivider-root MuiDivider-fullWidth css-6gnggm"></hr>
                          <nav>
                            <ul className="css-1h8lf8h" onClick={()=>{
                              localStorage.removeItem("realLVTN")
                              window.location.reload(false)
                            }}>
                              <div className="css-ey7g9c">
                                <div className="css-mvy2gl">
                                  <Icon icon="material-symbols:logout" />
                                </div>
                                <div className="css-c9erkg">
                                  <span className="css-1xeobr1">Đăng xuất</span>
                                </div>
                              </div>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>
              <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-xly39e"></div>
              <div className="CmtLayout-content css-m7fmz7">
                <Routes>
                  <Route
                      path="/users"
                      element={
                        <React.Fragment>
                          {" "}
                          <User setSelect={setSelect} />{" "}
                        </React.Fragment>
                      }
                    />
                    <Route
                        path="/posts"
                        element={
                          <React.Fragment>
                            {" "}
                            <Post setSelect={setSelect} />{" "}
                          </React.Fragment>
                        }
                      />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default RoutePath;
