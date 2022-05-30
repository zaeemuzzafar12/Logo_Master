import React, { useState, useEffect ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { toggleFooter } from "../store/action/webSettingAction";
import Colors from "./Colors";
import CompanyData from "./CompanyData";
import LogoCustomization from "./LogoCustomization";
import {
  customelogofirst,
  customelogosecond,
  customelogothird,
  customelogofourth,
  customelogofifth,
  customelogosixth,
  customelogoseventh,
  customelogoeight,
  customelogonine,
  customelogoten,
  customelogoeleven,
  customelogotwelwve,
  customelogothirteen,
  customelogofourteen,
  customelogofifteen,
} from "../images";

const animatedComponents = makeAnimated();

let images = [
  customelogofirst,
  customelogosecond,
  customelogothird,
  customelogofourth,
  customelogofifth,
  customelogosixth,
  customelogoseventh,
  customelogoeight,
  customelogonine,
  customelogoten,
  customelogoeleven,
  customelogotwelwve,
  customelogothirteen,
  customelogofourteen,
  customelogofifteen,
];
function Editor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Active, Setactive] = useState(0);
  const [logoimages, Setlogoimages] = useState([]);
  const [styles, Setstyles] = useState("");
  const [currentWidth, setCurrentWidth] = useState(20);
  const [Companyname, Setcompanyname] = useState("");
  const [Slogan, Setslogan] = useState("");
  const [Categories, Setcategories] = useState([]);
  const [Selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [select, SetSelect] = useState([]);
  const [checked, Setchecked] = useState(false);
  console.log("uuuuu",checked)
  
 
 
  const CategoryApi = async () => {
    const url = await fetch (`http://devv74.myprojectstaging.com/logo-master/public/api/categories`);
    const data = await url.json();
    const options =  data?.categories?.map((dat) => (
      {
        label: dat?.name,
        value: dat?.id
      }))
      Setcategories(options)
  }
  
  const handlechange = (Selected) => {
    console.log(Selected)
    return setSelected(Selected)
  }

  const CategoriesByLogo = async (Selected) => {
    let item = Selected?.value;
    let url = await fetch(`https://devv74.myprojectstaging.com/logo-master/public/api/logos-by-category/${item}`)
    let data = await url.json();
    Setlogoimages(data?.data)
    setIsLoading(false)
  }
  const colorIntgration = async () => {
    const url = await fetch(`https://devv74.myprojectstaging.com/logo-master/public/api/colors`);
    const data = await url.json();
    SetSelect(data?.colors);
    setIsLoading(false)
  
  }
  
 
  const handleNext = () => {
    let getCurrentWidth = currentWidth;   
    if (getCurrentWidth <= 100) {
      setCurrentWidth(getCurrentWidth + 20);
      if (Active === 4) {
        navigate("/logopanel", { state: { Companyname, Slogan } });
      } else {
        Setactive(Active + 1);
      }
    }
  };
  const handlePrevious = () => {
    let getCurrentWidth = currentWidth;
    if (getCurrentWidth > 20) {
      setCurrentWidth(getCurrentWidth - 20);
      Setactive(Active - 1);
    }
  };
   const handleimage = (e, dat) => {
    //  e.preventDefault();
     console.log("sssq",dat)
     Setstyles(dat);
    
    
  };
  const handleColorChange = (e,data) => {
    // e.preventDefault();
    console.log("fffff",checked)
    Setchecked(data)
  }

 
 

  const DataByCategory = (Selected , styles ,checked ) => {
    let CategoryId = Selected?.value  
    let LogoId = styles?.id
    let datas = checked?.id
 
    console.log("checkeded",datas)
    console.log("CategoryId", CategoryId)
    console.log("LogoIds",LogoId ) 
  }




  const StepsContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="create-text-1">
              <p className="heading title-font">
                Choose Your <span>Business Space</span>
              </p>
              <p>This helps us create better designs</p>
            </div>
            <form class="logo-maker-form">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="multiSelect-box">
                    <div class="form-group">
                    
                   
                      <Select
                        className="select2-hidden-accessible custom-select"
                        placeholder="Select Business Category"
                        components={animatedComponents}
                        value={Selected}
                        options={Categories}
                        onChange={(Selected) => {
                          handlechange(Selected);  
                          CategoriesByLogo(Selected);
                          DataByCategory(Selected);
                        }}
                      />
                    
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <div className="create-text-1">
              <p className="heading title-font">Pick some logos</p>
              <p>We'll use these as inspiration.</p>
            </div>
            <form className="logo-maker-form">
              <div className="catgImgWrap">
                <div className="catgImg">
                { !isLoading ?
                  (
                    logoimages &&
                    logoimages?.length > 0 &&
                    logoimages?.map((data) => {
                        return(
                          <>
                          {
                            data?.logos &&
                            data?.logos.length > 0 &&
                            data?.logos.map((dat,ind) => {
                              return(
                                <> 
                                   <img 
                                      src={dat?.image}
                                      key={ind}
                                      width={200}
                                      height={200}
                                      alt={"img.jpg"}
                                      onClick={(e) =>{ 
                                        handleimage(e, dat);
                                        DataByCategory(e, dat);
                                      }
                                      }
                                      className={
                                        styles === dat ? 'imageactive' : 'imagenonactive'
                                      }
                                      />
                                </>
                              )
                            })
                          }
                          </>
                        )
                    })
                  ) : (
                     <div className="spinner-container">
                       <div className="loading-spinner">

                        </div>
                      </div>
                  ) }

                  {/* {images &&
                    images.length > 0 &&
                    images.map((data, index) => {
                      return (
                        <>
                          <img
                            key={index}
                            src={data}
                            width={200}
                            height={200}
                            alt={"img.jpg"}
                            onClick={(e) => handleimage(e, data)}
                            className={
                              styles === data ? "imageactive" : "imagenonactive"
                            }
                          />
                        </>
                      );
                    })} */}
                </div>
              </div>
            </form>
          </>
        );
      case 2:
        return (
          <>
            {/* <Colors 
              select={select}
              SetSelect={SetSelect}
              checked={checked}
              Setchecked={Setchecked}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              
            /> */}


                        <div class="create-text-1">
                    <p class="heading title-font">
                      Pick Some Colors <span>You Like</span>
                    </p>
                    <p>Colors help convey emotion in your logo</p>
                  </div>
                  {console.log("********",checked)}
                  <form className="logo-maker-form">
                      <div className="color-selection-wrap">
                        {
                          !isLoading ? (
                            select &&
                            select.length > 0 &&
                            select.map((data , index) => (
                              <div key={index} className="color-item">
                                <input  
                                  type="checkbox" 
                                  value={checked} 
                                  onChange={(e) => { 
                                    handleColorChange(e, data);
                                    DataByCategory(data);
                                   }
                                    }
                                />
                                <span className={data?.name}>
                                  <p>{data?.name}</p>
                                  <p className="color-detail">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                  </p>
                                </span>
                              </div>
                            ))

                          ) : (
                            <>
                              <div className="spinner-container">
                                <div className="loading-spinner">

                                    </div>
                                </div>
                             </>
                                )
                              }
                            
                          </div>
                        </form>

          </>
        );
      case 3:
        return (
          <>
            <CompanyData
              name={Companyname}
              slogan={Slogan}
              setName={Setcompanyname}
              setCompanySlogan={Setslogan}
            />
          </>
        );
      case 4:
        return (
          <>
            <LogoCustomization 
              name={Companyname} 
              slogan={Slogan}
              active={Active}
              setactive={Setactive}
              
              />
          </>
        );
      default:
        return (
          <>
            <Typography>No Value Found</Typography>
          </>
        );
    }
  };
  useEffect(() => {

    
     CategoryApi();
      CategoriesByLogo();
      colorIntgration();

   

    dispatch(toggleFooter());
    return () => {
      dispatch(toggleFooter());
    };

   
  }, []);

  return (
    <section class="editor-sec-1">
      <div class="container">
        <div class="logo-maker-box logo-maker-box-1">
          {StepsContent(Active)}
        </div>
        <div
          className="editorSec-bottomBar"
          style={{
            justifyContent: currentWidth > 20 ? "space-between" : "flex-end",
          }}
        >
          {currentWidth > 20 && (
            <button
              class="form-button logo-stepPre-4-btn"
              onClick={() => handlePrevious()}
            >
              Previous
            </button>
          )}
          <button
            class="form-button logo-step-1-btn"
            onClick={() => handleNext()}
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
      {/* <!-- STEPS BAR START --> */}
      <div class="StepBar-wrapper">
        <div id="progressbar_div">
          <div id="progressbar_wrapper">
            <div id="progressbar" style={{ width: `${currentWidth}%` }}></div>
          </div>
        </div>
      </div>
      {/* <!-- STEPS BAR END --> */}
    </section>
  );
}

export default Editor;
