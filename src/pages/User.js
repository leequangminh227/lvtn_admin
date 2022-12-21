import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import * as XLSX from "xlsx";
import {moneyFormat, dateFormat} from '../helper'


function User({ setSelect }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setSelect("userList");
  }, []);

  //pagination
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  
  
  const exportTable = (arr) => {
    var colLength = [
      { wch: 30 },
      { wch: 30 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
    ];
    var wb = XLSX.utils.book_new(),
      // ws = XLSX.utils.json_to_sheet(productTable) //array of object
      ws = XLSX.utils.aoa_to_sheet(arr); //array of array

    XLSX.utils.book_append_sheet(wb, ws, "Users");
    ws["!cols"] = colLength;
    XLSX.writeFile(wb, "Users.xlsx");
  };
  
  const exportTableRevenue = (arr) => {
    var colLength = [
      { wch: 30 },
      { wch: 30 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
    ];
    var wb = XLSX.utils.book_new(),
      // ws = XLSX.utils.json_to_sheet(productTable) //array of object
      ws = XLSX.utils.aoa_to_sheet(arr); //array of array

    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    ws["!cols"] = colLength;
    XLSX.writeFile(wb, "Transactions.xlsx");
  };

  const exportFile = async () => {
    fetch(`https://lvtn2022real.herokuapp.com/user?page=${page}&export=1`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong");
      })
      .then((result) => {
        if (result.success) {
          var arr = result.userList[0].uList.length > 0 ? result.userList[0].uList : []

          if(arr.length > 0){
            var total = 0
            var data = [["Tên","Email","Số điện thoại","Địa chỉ","Tổng tin đăng","Tổng doanh thu tích lũy"]]
            arr.map((ele,index)=>{
                total += ele.balance ?? 0
                data.push([ele.lastName??"", ele.email??"", ele.phone??"", ele.address??"", (ele.properties??[]).length, ele.balance??0])
            })
            data.push([])
            data.push(["Tổng",`${arr.length} người dùng`])
            exportTable(data)
          }
        }
      });
  }

  const exportFileRevenue = async () => {
    fetch(`https://lvtn2022real.herokuapp.com/transaction?export=1`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong");
      })
      .then((result) => {
        if (result.success) {
          var arr = result.transactionList[0].uList.length > 0 ? result.transactionList[0].uList : []

          if(arr.length > 0){
            var total = 0
            var data = [["Người thực hiện","Thời gian","Giá trị","Điện thoại","Mã giao dịch"]]
            arr.map((ele,index)=>{
                total += ele.balance ?? 0
                data.push([ele.ownerInfo[0]?(ele.ownerInfo[0].lastName):"", dateFormat(ele.dateSuccess), moneyFormat(ele.value??0), ele.ownerInfo[0]?(ele.ownerInfo[0].phone):"", ele._id])
            })
            data.push([])
            data.push(["Tổng",`${arr.length} giao dịch`])
            data.push(["Tổng doanh thu",`${result.transactionList[0].uList.length > 0
              ? result.transactionList[0].count2[0]["totalAmount"]
              : 0} VND`])
            exportTableRevenue(data)
          }
        }
      });
  }

  useEffect(() => {
    fetch(`https://lvtn2022real.herokuapp.com/user?page=${page}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong");
      })
      .then((result) => {
        if (result.success) {
          console.log(result);
          setTotalCount(
            result.userList[0].uList.length > 0
              ? result.userList[0].count[0]["count"]
              : 0
          );
          setUserList(
            result.userList[0].uList.length > 0 ? result.userList[0].uList : []
          );
          setMaxPage(
            result.userList[0].uList.length > 0
              ? Math.ceil(result.userList[0].count[0]["count"] / 10)
              : 0
          );
        } else {
          console.log("abc");
        }
      });
  }, [page, trigger]);

  return (
    <React.Fragment>
      <h2 className="MuiTypography-root MuiTypography-h2 css-dip02n">
        Người dùng
      </h2>
        <span className="css-1f0mdg1 mgb20 inline">

      <button
        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation css-1a96ihp"
        tabindex="0"
        type="button"
        onClick={(e)=>{
            e.preventDefault()
            exportFile()
        }}
      >
        Xuất file người dùng<span className="MuiTouchRipple-root css-w0pj6f"></span>
      </button>
      
      <button
        className=" ml20 MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation css-1a96ihp"
        tabindex="0"
        type="button"
        onClick={(e)=>{
            e.preventDefault()
            exportFileRevenue()
        }}
        style = {{marginLeft : "20px"}}
      >
        Xuất file doanh thu<span className="MuiTouchRipple-root css-w0pj6f"></span>
      </button>
        </span>

      {userList &&
        userList.map((ele, index) => {
          return (
            <div key = {index} className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1dg90v7">
              <div className="css-idc0u3">
                <span className="css-8g3mcy">
                  <div className="css-u4p24i">
                    <span className="css-zkfegi">
                      <span className="MuiBadge-root BaseBadge-root css-5lanty">
                        <div className="MuiAvatar-root MuiAvatar-circular css-1oj7qn1">
                          {ele.avatar !== "" ? (
                            <img
                              alt="Jannie 
                                    Thompson"
                              src={ele.avatar ?? ""}
                              className="MuiAvatar-img css-1hy9t21"
                            />
                          ) : (
                            (ele.lastName[0] ?? "").toUpperCase()
                          )}
                        </div>
                      </span>
                    </span>
                    <span className="css-zkfegi">
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {ele.lastName ?? ""}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        {ele.email ?? ""}
                      </p>
                    </span>
                  </div>
                </span>
                <span className="css-dyqsm1"></span>
                <span className="css-1jbsagp">
                  <div className="css-1wydmn0">
                    <span className="css-zkfegi">
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {(ele.properties ?? []).length}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        Tin đăng
                      </p>
                    </span>
                    <span className="css-zkfegi">
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {`${ele.balance ?? 0} đ`}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        Doanh thu
                      </p>
                    </span>
                    <span className="css-zkfegi">
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {`${ele.phone ?? ""}`}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        Điện thoại
                      </p>
                    </span>
                  </div>
                </span>
              </div>
            </div>
          );
        })}
      <div>
        <div className="row no-gutters justify-content-between paginate">
          <div className="col-auto "></div>
          <div className="col-auto ">
            <div className="row no-gutters align-items-center">
              <div className="col-auto mr-3">
                <span
                  style={{ color: "rgb(128, 128, 128)" }}
                >{`Tổng: ${totalCount}`}</span>
              </div>
              <div className="col">
                <ul className="pagination pagination-lg justify-content-center">
                  {page > 2 && (
                    <li
                      className="page-item hidden-mobile"
                      onClick={(e) => setPage(1)}
                    >
                      <div className="page-link">
                        <Icon icon="material-symbols:first-page" />
                      </div>
                    </li>
                  )}
                  {page > 1 && (
                    <li
                      className="page-item hidden-mobile"
                      onClick={(e) =>
                        setPage((prev) => {
                          return prev - 1;
                        })
                      }
                    >
                      <div className="page-link">{page - 1}</div>
                    </li>
                  )}
                  <li className="page-item hidden-mobile active">
                    <div className="page-link">{page}</div>
                  </li>
                  {page < maxPage && (
                    <li
                      className="page-item hidden-mobile"
                      onClick={(e) =>
                        setPage((prev) => {
                          return prev + 1;
                        })
                      }
                    >
                      <div className="page-link">{page + 1}</div>
                    </li>
                  )}
                  {page < maxPage - 1 && (
                    <li
                      className="page-item hidden-mobile"
                      onClick={(e) => setPage(maxPage)}
                    >
                      <div className="page-link">
                        <Icon icon="material-symbols:last-page" />
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default User;
