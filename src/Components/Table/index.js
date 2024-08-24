import DataTable from 'react-data-table-component';
import { FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";


export default function Table(props) {
    const {columns = [], data = [], keyword = '', onSearch, addButtonTitle, addButtonAction = () => {}} = props
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    const sortIcon = <FaAngleDown />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    
    const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
                fontSize: '14px'
                // innerHeight: '40px' // override the row height
            },
        },
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '600',
                paddingLeft: '8px', 
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingTop: '18px',
                paddingBottom: '18px',
            },
        },
        pagination: {
            style: {
                fontSize: '16px'
            }
        }
    };
    return (
        <DataTable
            title={addButtonTitle + ' List'}
            pagination
            columns={columns}
            data={data}
            selectableRows
            expandableRowsComponent={ExpandedComponent}
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            customStyles={customStyles}
            defaultSortField="id"
            defaultSortAsc={true}
            highlightOnHover
            dense
            subHeader
            subHeaderComponent={
                <div className='d-flex justify-content-between w-100'>
                    <div className=''>
                    <button type='button' className='btn btn-success' onClick={addButtonAction}><IoIosAdd/> Add {addButtonTitle}</button>
                    </div>
                    <div className='row'>
                        <div className='w-75'>
                        <input type='text' className='form-control w-100' placeholder='Search ...' />
                        </div>
                        <div className='col'>
                        <button type='button' className='btn btn-success' onClick={() => onSearch()}><IoSearch/></button>
                        </div>
                    </div>
                </div>
            }
        />
    )
}