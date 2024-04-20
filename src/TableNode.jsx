/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { memo } from 'react'
import './tablenode.css'
import { Handle, Position } from 'reactflow';

function TableNode({ id, data }) {
    const tableName = Object.keys(data)[0]; // Assuming the first key is the table name
    const tableData = data[tableName];
    console.log({ id, data, tableName, tableData })
    return (
        <>
            <div className='custom-table'>
                <div className="custom-table__title">
                    <h3>{tableName}</h3>
                    {
                        data.records ?
                            <p>{data.records} records</p>
                            : null
                    }
                </div>
                <div className="custom-table__data">
                    <button>Fields({tableData.length})</button>
                    {
                        tableData.map((item) => {
                            console.log(item);
                            return (
                                <div key={item.slug}>
                                    <p>{item.title}{item.slug} {item.type}</p>
                                    <Handle type="source" position={Position.Right} id={item.slug} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default memo(TableNode);