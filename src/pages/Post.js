import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import * as XLSX from "xlsx";


function Post({ setSelect }) {
  const [propertyList, setPropertyList] = useState([]);
  const [post, setPost] = useState({})
  const [postTab, setPostTab] = useState(false)
  const [postId, setPostId] = useState("")


  const moneyFormat = ((money)=>{

    // return (money).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return (Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)).slice(0,-1)
  })
  useEffect(() => {
    setSelect("postList");
  }, []);
  useEffect(() => {
    var set = true

    if(postId !==""){
        fetch(`https://lvtn2022real.herokuapp.com/property/find?id=${postId}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong");
      })
      .then((result) => {
        if (result.success && set) { 

            setPost(result.property)
            console.log(result.property)
        }
      });
    }


    return (()=>{
        set = false
    })
  }, [postId]);

  //pagination
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  


  useEffect(() => {
    fetch(`https://lvtn2022real.herokuapp.com/property?page=${page}`, {
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
            result.propertyList[0].uList.length > 0
              ? result.propertyList[0].count[0]["count"]
              : 0
          );
          setPropertyList(
            result.propertyList[0].uList.length > 0 ? result.propertyList[0].uList : []
          );
          setMaxPage(
            result.propertyList[0].uList.length > 0
              ? Math.ceil(result.propertyList[0].count[0]["count"] / 10)
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
        Tin đăng
      </h2>

      {propertyList &&
        propertyList.map((ele, index) => {
          return (
            <div key = {index} className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1dg90v7">
              <div className="css-idc0u3">
                <span className="css-8g3mcy">
                  <div className="css-u4p24i">
                    <span className="css-zkfegi">
                      <span className="MuiBadge-root BaseBadge-root css-5lanty">
                        <div className="MuiAvatar-root MuiAvatar-circular css-1oj7qn1">
                          {ele.img.length>0? (
                            <img
                              alt="House"
                              src={ele.img[0] ?? ""}
                              className="MuiAvatar-img css-1hy9t21"
                            />
                          ) : <Icon icon="material-symbols:house" />}
                        </div>
                      </span>
                    </span>
                    <span className="css-zkfegi">
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {ele.title ==="" ? "Chưa có tiêu đề" : ele.title}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        {ele.ownerInfo[0] ? (ele.ownerInfo[0].email??"") :""}
                      </p>
                    </span>
                  </div>
                </span>
                <span className="css-dyqsm1"></span>
                <span className="css-1jbsagp">
                  <div className="css-1wydmn0">
                    <span className="css-zkfegi" style={{width : "100px"}}>
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {ele.bussinessType === 1 ? "Cho thuê" : "Bán"}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        Loại
                      </p>
                    </span>
                    <span className="css-zkfegi" style={{width : "200px"}}>
                      <h6 className="MuiTypography-root MuiTypography-h6 css-cvhosu">
                        {`${moneyFormat(ele.price ?? 0)} đ`}
                      </h6>
                      <p className="MuiTypography-root MuiTypography-body1 css-hxfal">
                        Giá
                      </p>
                    </span>
                    
        
<button
  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation css-1a96ihp"
  tabindex="0"
  type="button"
  onClick={(e)=>{
      e.preventDefault()
      setPostId(ele._id)
      setPostTab(true)
  }}
>
  Xem tin<span className="MuiTouchRipple-root css-w0pj6f"></span>
</button>
<button
  className= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation css-e59j3u "
  tabindex="0"
  type="button"
  style={{marginLeft : "20px"}}
  onClick={(e)=>{
      e.preventDefault()
      if(window.confirm("Bạn muốn xóa tin đăng này?")){
        fetch(`https://lvtn2022real.herokuapp.com/property/deletepadmin?id=${ele._id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong");
      })
      .then((result) => {
        if (result.success) {
            alert('Đã xóa bài đăng thành công')
            window.location.reload(false)
        } else {
          alert('Có lỗi xảy ra')
        }
      });
      }
  }}
>
  Xóa tin<span className="MuiTouchRipple-root css-w0pj6f"></span>
</button>
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
      {postTab && 
      <div
        className="toggleTab"
        onClick={(e) => {
          setPostTab(false);
        }}
      >
        <div
          className="childTab"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div>
            <h3 className="vodal-title ">Tin đăng</h3>

            <div>
              <div className=" px-0 mgt20 inline">
                <div>
                  <label className="label-input-group">Tiêu đề: </label>
                  <label className="ml20">{`${post.title !== "" ? post.title : "Chưa có tiêu đề"}`}</label>
                </div>
              </div>
              <div className=" px-0 mgt20 inline ml20">
                <div>
                  <label className="label-input-group">Hình thức: </label>
                  <label className="ml20">{`${post.bussinessType === 1 ? "Bán" : "Cho thuê"}`}</label>
                </div>
              </div>
              <div>

                <div className=" px-0 mgt20 inline">
                    <div>
                    <label className="label-input-group">Diện tích: </label>
                    <label className="ml20">{`${post.area} m2`}</label>
                    </div>
                </div>

                <div className=" px-0 mgt20 inline ml20">
                    <div>
                    <label className="label-input-group">Loại nhà: </label>
                    <label className="ml20">{`${post.propertyType}`}</label>
                    </div>
                </div>
              </div>
              <div className=" px-0 mgt20">
                <div>
                  <label className="label-input-group">Giá: </label>
                  <label className="ml20">{`${moneyFormat(post.price)} đ`}</label>
                </div>
              </div>
              <div className=" px-0 mgt20">
                <div>
                  <label className="label-input-group">Địa chỉ: </label>
                  <label className="ml20">{`${post.address}, ${post.ward} ${post.district} ${post.city}`}</label>
                </div>
              </div>
              <div className=" px-0 mgt20">
                <div>
                  <label className="label-input-group">Hình ảnh: </label>
                </div>
                {post.img && post.img.length > 0 && post.img.map((ele1, index1)=>{
                    return (
                        <img className="smallImg" key = {index1} alt = "img" src = {ele1}/>
                    )
                }) }
              </div>
              
            </div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default Post;
