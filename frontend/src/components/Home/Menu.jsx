import React from 'react';

const OurMenu = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="our-menu-page">
      <div className="header-top bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <ul className="d-sm-flex header-w3_pvt">
                <li>
                  <span className="fa fa-phone"></span>
                  <p className="d-inline text-white">+256-200-903880</p>
                </li>
                <li>
                  <span className="fa fa-phone"></span>
                  <p className="d-inline text-white">+256-788-530177</p>
                </li>
                <li>
                  <span className="fa fa-phone"></span>
                  <p className="d-inline text-white">+256-709-702833</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="nav-logo">
            <a className="navbar-brand" href="/" data-aos="zoom-in">
              <img src="j-uploads/brand/BOB-indx.png" alt="Bight of Benin" />
            </a>
          </div>
          <button className="navbar-toggler ml-md-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-lg-auto text-center">
              <li className="nav-item mr-lg-3 mt-lg-0 mt-3" data-aos="zoom-in">
                <a className="nav-link" href="/">HOME</a>
              </li>
              <li className="nav-item mr-lg-3 mt-lg-0 mt-3" data-aos="zoom-in">
                <a className="nav-link scroll" href="/about-us">ABOUT US</a>
              </li>
              <li className="nav-item active mr-lg-3 mt-lg-0 mt-3" data-aos="zoom-in">
                <a className="nav-link scroll" href="/our-menu">OUR MENU</a>
              </li>
              <li className="nav-item mr-lg-3 mt-lg-0 mt-3" data-aos="zoom-in">
                <a className="nav-link scroll" href="/gallery">GALLERY</a>
              </li>
              <li className="nav-item mr-lg-3 mt-lg-0 mt-3" data-aos="zoom-in">
                <a className="nav-link scroll" href="/events">EVENTS</a>
              </li>
              <li className="nav-item mt-lg-0 mt-3" data-aos="zoom-in">
                <a className="nav-link scroll" href="/contacts">CONTACTS</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="bdy-theme-10">
        <div className="bght-content py-md-5" id="about">
          <div className="container py-sm-5 py-4">
            <div className="title-section pb-4" data-aos="fade-up">
              <h3 className="main-title-w3_pvt">OUR MENU</h3>
              <span className="title-line"></span>
              
              <div className="ftco-section bdy-platform-1">
                <div className="container">
                  {/* Food Menu Images */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
                    <div key={`food-${num}`} className="row">
                      <div className="col-lg-6 slide-bg">
                        <img 
                          className="cover" 
                          src={`j-uploads/menu/2025/05-Food/Bight-Food-Menu---May-2025-${num}.jpg`} 
                          alt={`Food Menu Page ${num}`}
                        />
                      </div>
                      {num % 2 === 1 && num < 16 && (
                        <div className="col-lg-6 slide-bg">
                          <img 
                            className="cover" 
                            src={`j-uploads/menu/2025/05-Food/Bight-Food-Menu---May-2025-${num + 1}.jpg`} 
                            alt={`Food Menu Page ${num + 1}`}
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Drinks Menu Images */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <div key={`drink-${num}`} className="row">
                      <div className="col-lg-6 slide-bg">
                        <img 
                          className="cover" 
                          src={`j-uploads/menu/2025/05-Drinks/Bight-Drinks-Menu---May-2025-${num}.jpg`} 
                          alt={`Drinks Menu Page ${num}`}
                        />
                      </div>
                      {num % 2 === 1 && num < 12 && (
                        <div className="col-lg-6 slide-bg">
                          <img 
                            className="cover" 
                            src={`j-uploads/menu/2025/05-Drinks/Bight-Drinks-Menu---May-2025-${num + 1}.jpg`} 
                            alt={`Drinks Menu Page ${num + 1}`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footerv4-w3ls" id="footer">
        <div className="footerv4-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-sm-6 footv4-left" data-aos="fade-up">
                <h2>
                  <a href="/">BIGHT OF BENIN</a>
                </h2>
                <p className="text-white">A restaurant serving fine West African Cuisine</p>
              </div>
              <div className="col-lg-2 col-sm-6 footv4-content mt-sm-0 mt-4" data-aos="fade-up">
                <h3>Navigation</h3>
                <ul className="v4-content">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about-us" className="scroll">About Us</a></li>
                  <li><a href="/gallery" className="scroll">Gallery</a></li>
                  <li><a href="/our-menu" className="scroll">Our Menu</a></li>
                  <li><a href="/contacts" className="scroll">Contacts</a></li>
                </ul>
              </div>
              <div className="col-lg-3 col-sm-6 footv4-left fv4-g3 my-lg-0 mt-4" data-aos="fade-up">
                <div className="footerv4-social">
                  <h3>stay connected</h3>
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/bight.benin.1">
                        <span className="fa fa-facebook-f icon_facebook"></span>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/BightOfBeninRes">
                        <span className="fa fa-twitter icon_twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/BightOfBeninRestaurant/">
                        <span className="fa fa-instagram icon_instagram"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 footv4-left my-lg-0 my-4" data-aos="fade-up">
                <h3>contact</h3>
                <ul className="d-flex header-agile pt-0 flex-column">
                  <li className="mt-3">
                    <span className="fa fa-phone"></span>
                    <p className="d-inline text-white">+256-200-903880</p>
                  </li>
                  <li className="mt-3">
                    <span className="fa fa-phone"></span>
                    <p className="d-inline text-white">+256-709-702833</p>
                  </li>
                  <li className="mt-3">
                    <span className="fa fa-phone"></span>
                    <p className="d-inline text-white">+256-788-530177</p>
                  </li>
                  <li className="mt-3">
                    <span className="fa fa-star"></span>
                    <p className="d-inline text-white">
                      <a href="mailto:ask@bightofbeninrestaurant.com">Email us any Inquiries</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="cpy-right bg-theme">
          <p>© {currentYear} Bight of Benin Restaurant. All rights reserved | By 
            <a href="http://www.lumjo.com"> Lumjo Consultants.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;