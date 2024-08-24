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
    getApi('/Discount/list').then(data => {
      if (data) {
        console.log('Discount list ----', data)
        // setCategoryList(data || []);
        setCategoryList([{
            "uuid": "36770962-a176-4015-bacc-e2502ae1c3b6",
            "name": "Diwali",
            "type": 1,
            "value": 45
        }])
        toast.success('Discount list retrieve successfully.');
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
      selector: row => row.name,
      sortable: true,

    },
    {
      name: 'Value',
      selector: row => row.type ? row.value : `${row.value}%`,
      sortable: true,

    },
    {
      name: 'Modified Date',
      selector: (row) => new Date().toDateString(),
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => row.year,
      width: '25%',
      cell: (row) =>
        <div className="text-center">
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
                <li class="breadcrumb-item active" aria-current="page">Discount List</li>
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
                  addButtonTitle={'Discount'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PosModal
        show={open && (action === 'edit' || action === 'add')}
        onChange={(val) => setOpen(val)}
        size={'md'}
      >
        <div className='row'>
          <div className='col-12 my-3 px-5'>
            <div className="card-body">
              <h4 className='mb-4 mt-3'>{capitalizeFirstLetter(action)} Discount</h4>

              <div className='row'>
               
                
                  <div class="mb-2">
                    <label for="name" class="form-label"><span className='text-danger'>*</span> Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" />
                    <div id="nameHelp" class="form-text"></div>
                  </div>

                  <div class="mb-2 my-1">
                    <label for="type" class="form-label"><span className='text-danger'>*</span> Type</label>
                    {/* <input type="text" class="form-control" id="name" aria-describedby="nameHelp" /> */}
                    <input type="radio" name="type" className='form-check-input mx-2'  id="type" aria-describedby="typeHelp" />
                    Percentage
                    <input type="radio" name="type" className='form-check-input mx-2' id="type" aria-describedby="typeHelp" />
                    Amount
                    <div id="typeHelp" class="form-text"></div>
                  </div>
              

             
                  <div class="mb-2">
                    <label for="percentage" class="form-label">Percentage</label>
                    <input type="number" class="form-control" id="percentage" aria-describedby="percentageHelp" />
                    <div id="percentageHelp" class="form-text"></div>
                  </div>
                

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
