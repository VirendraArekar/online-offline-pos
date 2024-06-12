import React from 'react'
import { BsUpcScan, BsSearch } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

export default function index(props) {
  const {name, action} = props;
  return (
    <>
      {
        name === 'assign customer' &&
        <nav
        className="navbar navbar-expand-lg bsb-navbar bsb-navbar-hover bsb-navbar-caret text-light"
        style={{ backgroundColor: '#4CAF50' }}
            >
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 24, fontWeight: "500" }}
            >
                <BiArrowBack size={24} />
            </a>
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 20, fontWeight: "500" }}
            >
                Add customer to Bill
            </a>
           
            <div
                className="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
            >
                <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    Menu
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                </div>
                <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 mx-2">
                    <li className="nav-item">
                    <a
                          className="nav-link active"
                          aria-current="page"
                          href="#!"
                        >
                          <BsUpcScan size={24} color="#ffffff" />
                    </a>
                    </li>
                    <li className="nav-item">
                    <a
                          className="nav-link active"
                          aria-current="page"
                          href="#!"
                        >
                          <BsSearch size={24} color="#ffffff" />
                     </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
      }
      {
        name === 'open ticket' &&
        <nav
        className="navbar navbar-expand-lg bsb-navbar bsb-navbar-hover bsb-navbar-caret text-light"
        style={{ backgroundColor: '#4CAF50' }}
            >
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 24, fontWeight: "500" }}
            >
                <BiArrowBack size={24} />
            </a>
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 20, fontWeight: "500" }}
            >
                Open Tickets
            </a>
           
        </nav>
      }
      {
        name === 'product' &&
        <nav
        className="navbar navbar-expand-lg bsb-navbar bsb-navbar-hover bsb-navbar-caret text-light"
        style={{ backgroundColor: '#4CAF50' }}
            >
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 24, fontWeight: "500" }}
            >
                <BiArrowBack size={24} />
            </a>
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 20, fontWeight: "500" }}
            >
                {action} Product
            </a>
           
            <div
                className="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
            >
                <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    Menu
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                </div>
                <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 mx-2">
                    <li className="nav-item">
                    <a
                          className="nav-link active text-light"
                          aria-current="page"
                          href="#!"
                        >
                          Save
                    </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
      }

      {
        name === 'customer profile' &&
        <nav
        className="navbar navbar-expand-lg bsb-navbar bsb-navbar-hover bsb-navbar-caret text-light"
        style={{ backgroundColor: '#4CAF50' }}
            >
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 24, fontWeight: "500" }}
            >
                <BiArrowBack size={24} />
            </a>
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 20, fontWeight: "500" }}
            >
                {action} Customer Profile
            </a>
           
            <div
                className="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
            >
                <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    Menu
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                </div>
                <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 mx-2">
                    <li className="nav-item">
                    <a
                          className="nav-link active text-light"
                          aria-current="page"
                          href="#!"
                        >
                          Add To Bill
                    </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
      }

      {
        name === 'edit customer' &&
        <nav
        className="navbar navbar-expand-lg bsb-navbar bsb-navbar-hover bsb-navbar-caret text-light"
        style={{ backgroundColor: '#4CAF50' }}
            >
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 24, fontWeight: "500" }}
            >
                <BiArrowBack size={24} />
            </a>
            <a
                className="nav-link active mx-2"
                aria-current="page"
                href="#!"
                style={{ fontSize: 20, fontWeight: "500" }}
            >
                Edit Customer
            </a>
           
            <div
                className="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
            >
                <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    Menu
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                </div>
                <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 mx-2">
                    <li className="nav-item">
                    <a
                          className="nav-link active text-light"
                          aria-current="page"
                          href="#!"
                        >
                          UPDATE
                    </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
      }
    </>
  )
}
