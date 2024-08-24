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

export default function Modifier(props) {
  const [toggle, setToggle] = useState(true);
  const [modifierList, setModilfierList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    name: '',
    item: [
      {
        name: '',
        price: ''
      }
    ]
  });
  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState('list');
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false)
  const doCompress = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    getModifierList();
  }, [])

  const getModifierList = () => {
    getApi('/Modifier/list').then(data => {
      if (data) {
        setModilfierList(data || []);
        toast.success('Modifiers list retrieve successfully.');
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
    getModifierList();
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
        item: [
          {
            name: '',
            price: ''
          }
        ]
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
      width: "5%",
    },
    {
      name: 'Name',
      selector: row => row.name,
      width: "60%",
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
      sortable: true,
      cell: (row) =>
        <div className="text-center">
          <button type="button" className="btn btn-outline-success" onClick={() => onButtonAction({ ...row, action: 'edit' })}><PiPencilSimpleLight />&nbsp;Edit</button>&nbsp;
          <button type="button" className="btn btn-outline-danger" onClick={() => setShow(true)}><PiTrashSimpleLight />&nbsp;Delete</button>
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
    let key = e.target.name;
    let val = e.target.value;
    let copyObj = selectedItem;
    let items = copyObj.item;
    let newItems = [];
    for (let i = 0; i < items.length; i++) {
      if (i === index) {
        let obj = {
          ...items[i],
          [key]: val
        }
        newItems.push(obj)
      }
      else {
        newItems.push(items[i])
      }
    }
    copyObj = {
      ...copyObj,
      item: newItems
    }
    setSelectedItem(copyObj)
  }

  return (
    <Layout doCompress={doCompress}>
      <Navbar screen="dashboard" toggle={toggle} />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 my-5 px-5'>
            <div className="card">
              <div className="card-body">
                <Table
                  addButtonTitle={'Modifier'}
                  columns={columns}
                  data={modifierList}
                  keyword={keyword}
                  onKeywordChange={(e) => setKeyword(e.prevent.default)}
                  onSearch={() => onSearch()}
                  addButtonAction={() => onButtonAction({action : 'add'})}
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
              <h4 className='mb-4 mt-3'>{capitalizeFirstLetter(action)} Modifier</h4>
              <div className='row'>
                <div className='col-8'>
                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control " id="name" placeholder="Name" value={selectedItem.name} />
                    </div>
                  </div>
                </div>
                <div className='col-4'></div>
                <div className='col-8 mt-3 mb-2'>
                  <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-10 pl-2'>
                      <label className="col-sm-2">Name</label>
                    </div>
                  </div>
                </div>
                <div className='col-4 mt-3 mb-2'>
                  <div className='pl-2'>
                    <label className="col-sm-2">Price</label>
                  </div>
                </div>
                {
                  selectedItem?.item?.map((itm, key) => {
                    return (
                      <div key={key} className='row'>
                        <div className={`col-8 ${key != 0 ? 'mt-3' : ''}`}>
                          <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Items</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" id="name" placeholder="Name" name="name" value={itm?.name} onChange={(e) => onChangeInput(e, key)} />
                            </div>
                          </div>
                        </div>
                        <div className={`col-4 ${key != 0 ? 'mt-3' : ''}`}>
                          <div className='row'>
                            <div className='col-9'>
                              <input type="number" class="form-control" id="price" placeholder="Price" name="price" value={itm?.price} onChange={(e) => onChangeInput(e, key)} />
                            </div>
                            <div className='col-3'>
                              <button className='btn btn-danger' onClick={() => deleteRow(key)}>
                                <PiTrashSimpleLight />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <div className='col-12 my-4'>
                  <button className='btn btn-outline-danger' onClick={() => addItem()}>
                    <FaPlus /> &nbsp;
                    Add Item
                  </button>
                </div>

                <div className='col-12 mb-3'>
                  <button className='btn btn-outline-success btn-lg' onClick={() => addItem()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PosModal>
      <DeleteModal show={show} onChange={(val) => setShow(val)} size={'md'} setConfirm={() => { }} />
    </Layout>
  )
}
