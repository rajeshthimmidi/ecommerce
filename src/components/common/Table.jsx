import React from 'react'
import './Table.css'

const Table = ({ headings ,children}) => {

  return (
    <table className="common-table">
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      {children}
      {/* <tbody>
        {children}
      </tbody> */}
        </table>
  )
}

export default Table