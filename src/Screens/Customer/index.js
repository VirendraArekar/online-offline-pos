import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Navbar';
import Table from '../../Components/Table';
import { getApi } from '../../Services/apiService';
import { toast } from 'react-toastify';
import { PiPencilSimpleLight, PiTrashSimpleLight } from "react-icons/pi";
import PosModal from '../../Components/PosModal';
import { FaPlus } from "react-icons/fa6";
import DeleteModal from '../../Components/DeleteModal';
import { capitalizeFirstLetter } from '../../utils/helper';
import { IoCheckmarkOutline } from "react-icons/io5";
import useDocumentTitle from '../../Hooks/useDocumentTitle';
import { color } from '../../utils/cssConstant';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import './style.css'
import ToggleButton from '../../Components/Toggle';

export default function Customer(props) {
  useDocumentTitle('POS - Customer List')
  const [toggle, setToggle] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    uuid: "",
    code: "",
    displayName: "",
    gender: 0,
    dob: "",
    email: "",
    mobileNumberCountryCode: "",
    mobileNumber: "",
    address: "",
    enableCreditLimit: false,
    creditLimit: "",
    vatNumber: "",
    note: "",
    codeError: "",
    displayNameError: "",
    genderError: "",
    dobError: "",
    emailError: "",
    mobileNumberCountryCodeError: "",
    mobileNumberError: "",
    addressError: "",
    enableCreditLimitError: '',
    creditLimitError: '',
    vatNumberError: "",
    noteError: "",
  });
  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState('list');
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [colorList, setColorList] = useState([
    {
      name: 'grey',
      selected: false
    },
    {
      name: 'red',
      selected: false
    },
    {
      name: 'pink',
      selected: false
    },
    {
      name: 'orange',
      selected: false
    },
    {
      name: 'yellow',
      selected: false
    },
    {
      name: 'green',
      selected: false
    },
    {
      name: 'blue',
      selected: false
    },
    {
      name: 'purple',
      selected: false
    }
  ])
  const doCompress = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = () => {
    getApi('/Customer/list').then(data => {
      if (data) {
        console.log('Customer list ----', data)
        setCategoryList(data || []);
        toast.success('Customer list retrieve successfully.');
      }
      else {
        toast.warning('Something went wrong!');
      }
    }).catch(err => {
      if (err) {
        toast.error(err);
      }
    })
  }

  const onSearch = () => {
    getCategoryList();
  }

  const onButtonAction = (modifier) => {
    setAction(modifier.action || 'list')
    if (modifier?.action === 'edit') {

      delete modifier.action;
      setSelectedItem(modifier);
    }
    else {
      setSelectedItem({
        name: '',
        color: ''
      });
    }
    setOpen(true);
  }

  const addItem = () => {
    let copyObj = selectedItem;
    let arr = copyObj.item;
    arr.push({
      uuid: '123',
      name: 'name',
      price: 'price'
    })

    copyObj = {
      ...copyObj,
      item: arr
    }
    setSelectedItem(copyObj)
    setOpen(true)
  }

  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Name',
      selector: row => row.displayName,
      sortable: true,

    },
    {
      name: 'Contacts',
      selector: row =>
        <div style={{}}>
          <span>{row.email}</span>
          <span>{row.mobileNumber}</span>
        </div>,
      sortable: true,

    },
    {
      name: 'Balance',
      selector: row => <div style={{ color: row.totalBalance >= 0 ? 'green' : 'red', textAlign: 'center' }}>{row.totalBalance}</div>,
      sortable: true,

    },
    {
      name: 'Modified Date',
      selector: (row) => new Date(row.createdDate).toDateString(),
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => row.year,
      width: '25%',
      cell: (row) =>
        <div className="text-center">
          <Link to={`/customer/detail/${row.uuid}`} type="button" className="btn btn-info text-light btn-sm" onClick={() => onButtonAction({ ...row, action: 'edit' })}>&nbsp;Detail</Link>&nbsp;
          <button type="button" className="btn btn-outline-success btn-sm" onClick={() => onButtonAction({ ...row, action: 'edit' })}><PiPencilSimpleLight />&nbsp;Edit</button>&nbsp;
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setShow(true)}><PiTrashSimpleLight />&nbsp;Delete</button>
        </div>
    },
  ]

  const deleteRow = (index) => {
    let copyObj = selectedItem;
    let arr = copyObj?.item?.filter((obj, idx) => idx != index);
    copyObj = {
      ...copyObj,
      item: arr
    }
    setSelectedItem(copyObj)
  }

  const onChangeInput = (e, index) => {
    setSelectedItem({
      ...selectedItem,
      [e.target.name]: e.target.value
    })
  }

  const selectColor = (selectedColor) => {
    let newColorList = colorList.map((color) => {
      let obj = color;
      if (color.name == selectedColor) {
        obj = {
          ...obj,
          selected: true
        }
      }
      else {
        obj = {
          ...obj,
          selected: false
        }
      }
      return obj
    })
    setSelectedItem({
      ...selectedItem,
      color: selectColor
    })
    setColorList(newColorList);
  }

  return (
    <Layout doCompress={doCompress}>
      <Navbar screen="dashboard" toggle={toggle} />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 my-4 px-5'>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item link-secondary"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">List</li>
              </ol>
            </nav>
            <div className="card">
              <div className="card-body">
                <Table
                  columns={columns}
                  data={categoryList}
                  keyword={keyword}
                  onKeywordChange={(e) => setKeyword(e.prevent.default)}
                  onSearch={() => onSearch()}
                  addButtonAction={() => onButtonAction({ action: 'add' })}
                  addButtonTitle={'Customer'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PosModal
        show={open && (action === 'edit' || action === 'add')}
        onChange={(val) => setOpen(val)}
        size={'xl'}
      >
        <div className='row'>
          <div className='col-12 my-3 px-5'>
            <div className="card-body">
              <h4 className='mb-4 mt-3'>{capitalizeFirstLetter(action)} Customer</h4>

              <div className='row'>
                <h5 className='text-success'>Basic Detail</h5>
                <hr className='hr' />
                <div className='col-4'>
                  <div class="mb-2">
                    <label for="name" class="form-label"><span className='text-danger'>*</span> Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" />
                    <div id="nameHelp" class="form-text"></div>
                  </div>
                </div>

                <div className='col-4'>

                  <div class="mb-2">
                    <label for="mobile" class="form-label"><span className='text-danger'>*</span> Mobile Number</label>

                    {/* <PhoneInput
                                        country={"eg"}
                                        enableSearch={true}
                                        value={phone}
                                        id="mobile"
                                        onChange={(phone) => setPhone(phone)}
                                        style={{ border: '0px', Outlet: '0px', height : '40px !important', padding : 0 }}
                                        containerStyle={{ border: '0px', Outlet: '0px', width: '100%', height : '40px !important', padding : 0  }}
                                        containerclassName="phone-input form-control w-100 form-control-sm"
                                        inputclassName="phone-input"
                                      /> */}
                    <div id="emailHelp" class="form-text"></div>
                  </div>


                </div>

                <div className='col-4'>
                  <div class="mb-2">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text"></div>
                  </div>
                </div>

                <div className='col-4'>
                  <div class="mb-2">
                    <label for="gender" class="form-label">Gender</label>
                    <select id="gender" className='form-select'>
                      <option value={''}>None</option>
                      <option value={1}>Male</option>
                      <option value={2}>None</option>
                    </select>
                  </div>
                </div>


                <div className='col-4'>
                  <div class="mb-2">
                    <label for="dob" class="form-label">Date Of Birth</label>
                    <input type="date" data-date-format="DD MMMM YYYY" class="form-control" id="dob" aria-describedby="dobHelp" placeholder='dd/mm/yyyy' />
                    <div id="dobHelp" class="form-text"></div>
                  </div>
                </div>

                <div className='col-4'>
                  <div class="mb-2">
                    <label for="address" class="form-label">Address</label>

                    <textarea class="form-control" id="address" aria-describedby="addressHelp" placeholder='Address' rows={3}>

                    </textarea>
                    <div id="addressHelp" class="form-text"></div>
                  </div>
                </div>

                <h5 className='text-success'>Customer Credit Limit</h5>
                <hr className='hr' />

                <div className='col-3'>
                  <div class="mb-2">
                    <label for="email" class="form-label">Enable Credit Limit </label> <br></br>
                    <ToggleButton name="" onChange={(va) => { }} value={true} />
                  </div>
                </div>

                <div className='col-4'>
                  <div class="mb-2">
                    <label for="creditLimit" class="form-label"><span className='text-danger'>*</span> Credit Limit</label>
                    <input type="number" class="form-control" id="creditLimit" aria-describedby="creditLimitHelp" />
                    <div id="creditLimitHelp" class="form-text"></div>
                  </div>
                </div>

                <div className='col-5'></div>

                <h5 className='text-success'>Other Details</h5>
                <hr className='hr' />

                <div className='col-4'>
                  <div class="mb-2">
                    <label for="vatNumber" class="form-label">GST Or VAT Number</label>
                    <input type="number" class="form-control" id="vatNumber" aria-describedby="vatHelp" placeholder='GST Or VAT Number' />
                    <div id="vatHelp" class="form-text"></div>
                  </div>
                </div>

                <div className='col-4'>
                  <div class="mb-2">
                    <label for="note" class="form-label">Note</label>
                    <textarea className='form-control' id="note" placeholder='Add a note' rows={3}>

                    </textarea>
                    <div id="noteHelp" class="form-text"></div>
                  </div>
                </div>

                <div className='col-4'></div>

                <div className='col-12 mb-3'>
                  <button className='btn btn-success' onClick={() => addItem()}>
                    Submit
                  </button>
                  <button className='btn btn-secondary ms-2' onClick={() => setOpen(false)}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PosModal>
      <DeleteModal show={show} onChange={(val) => setShow(val)} size={'md'} setConfirm={() => { }} />
      <Footer />
    </Layout>
  )
}
