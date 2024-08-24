import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import useDocumentTitle from '../../Hooks/useDocumentTitle';
import Navbar from '../../Components/Navbar';
import './detail.css'
import { useParams } from 'react-router-dom';
import { getApi } from '../../Services/apiService';
import { toast } from 'react-toastify';
import { getDate, printData } from '../../utils/helper';
import Footer from '../../Components/Footer';

export default function Detail() {
    useDocumentTitle('POS - Customer Detail');
    const { uuid } = useParams()
    const [toggle, setToggle] = useState(true);
    const [customer, setCustomer] = useState({});

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

    const doCompress = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        getCustomerDetail()
    },[])

    const getCustomerDetail = () =>{
        getApi(`/Customer/get/${uuid}`).then(data => {
            if (data) {
              console.log('Customer list ----', data)
                setCustomer(data || []);
                toast.success('Customer detail retrieve successfully.');
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
  return (
    <Layout doCompress={doCompress}>
       <Navbar screen="dashboard" toggle={toggle} />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 my-5 px-5'>
                        <div className="card">
                            <div className="card-body">
                              <div className='row'>
                                 <div className='col-6'>
                                    <h5 className='text-success'>Basic Details</h5>
                                    <table className='table table-responsive table-bordered table-hover'>
                                       <tbody>
                                         <tr>
                                            <td>Name</td>
                                            <td>{printData(customer?.displayName)}</td>
                                         </tr>
                                         <tr>
                                            <td>Code</td>
                                            <td>{printData(customer?.code)}</td>
                                         </tr>
                                         <tr>
                                            <td>Mobile Number</td>
                                            <td>{customer?.mobileNumber ? printData(`+${customer?.mobileNumberCountryCode}${customer?.mobileNumber}`) : '-'}</td>
                                         </tr>
                                         <tr>
                                            <td>Gender</td>
                                            <td>{printData(customer?.gender ? "Male" : 'Female')}</td>
                                         </tr>
                                         <tr>
                                            <td>Email</td>
                                            <td>{printData(customer?.email)}</td>
                                         </tr>
                                         <tr>
                                            <td>Date Of Birth</td>
                                            <td>{printData(customer?.dob)}</td>
                                         </tr>
                                         <tr>
                                            <td>Note</td>
                                            <td>{printData(customer?.note)}</td>
                                         </tr>
                                         <tr>
                                            <td>Created Date</td>
                                            <td>{getDate((new Date()).toString())}</td>
                                         </tr>
                                         <tr>
                                            <td>Modified Date</td>
                                            <td>{printData((new Date()).toString())}</td>
                                         </tr>
                                       </tbody>
                                    </table>
                                 </div>
                                 <div className='col-6'>
                                 <h5 className='text-success'>Credit & Balance</h5>
                                    <table className='table table-responsive table-bordered table-hover'>
                                       <tbody>
                                         <tr>
                                            <td>Credit Limit Enabled</td>
                                            <td>{customer?.enableCreditLimit ? 'Yes' : 'No'}</td>
                                         </tr>
                                         <tr>
                                            <td>Credit Limit</td>
                                            <td>{customer?.creditLimit ?? '-'}</td>
                                         </tr>
                                         <tr>
                                            <td>Total Customer Balance</td>
                                            <td className='text-danger h4'>{customer?.balance ?? '0'}</td>
                                         </tr>
                                       </tbody>
                                    </table>


                                    <h5 className='text-success'>Address</h5>
                                    <table className='table table-responsive table-bordered table-hover'>
                                       <tbody>
                                         <tr>
                                            <td>Address</td>
                                            <td>{printData(customer?.address)}</td>
                                         </tr>
                                         <tr>
                                            <td>GST OR Vat Number</td>
                                            <td>{printData(customer?.vatNumber)}</td>
                                         </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
    </Layout>
  )
}
