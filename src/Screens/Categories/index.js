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

export default function Categories(props) {
    const [toggle, setToggle] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({
        name: '',
        color : ''
    });
    const [keyword, setKeyword] = useState('');
    const [action, setAction] = useState('list');
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
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
        getApi('/Category/list').then(data => {
            if (data) {
                setCategoryList(data || []);
                toast.success('Category list retrieve successfully.');
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
                color : ''
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
            name: 'Entries',
            selector: row => row.name,
            width: "50%",
            sortable: true,

        },
        {
            name: 'Color',
            selector: row => <div style={{ width: 30, height: 30, borderRadius: 30, backgroundColor: row.color, borderWidth: 1, borderColor: 'lightgrey' }}></div>,
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
        setSelectedItem({
            ...selectedItem,
            [e.target.name] : e.target.value
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
                    <div className='col-12 my-5 px-5'>
                        <div className="card">
                            <div className="card-body">
                                <Table
                                    columns={columns}
                                    data={categoryList}
                                    keyword={keyword}
                                    onKeywordChange={(e) => setKeyword(e.prevent.default)}
                                    onSearch={() => onSearch()}
                                    addButtonAction={() => onButtonAction({ action: 'add' })}
                                    addButtonTitle={'Category'}
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
                            <h4 className='mb-4 mt-3'>{capitalizeFirstLetter(action)} Category</h4>
                            <div className='row'>
                                <div className='col-8'>
                                    <div class="form-group row">
                                        <label for="name" class="col-sm-2 col-form-label">Name</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control " id="name" name="name" placeholder="Name" value={selectedItem.name} onChange={onChangeInput}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4'></div>
                                <div className='col-12 mt-3 mb-3'>
                                    <div className='ml-5 my-3 row'>
                                        {
                                            colorList.map((color, idx) => {
                                                return (
                                                    <div style={{ width: 80, height: 80, backgroundColor: color?.name, cursor: 'pointer', position : 'relative' }} className='d-flex mx-2 align-items-center justify-content-center' onClick={() => selectColor(color?.name)} key={idx}>
                                                        {
                                                            color?.selected &&
                                                            <div style={{position :' absolute'}} >
                                                                <IoCheckmarkOutline  color={'#FFFFFF'} size={36} style={{fontWeight : 700}}/>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
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
