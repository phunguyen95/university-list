import React from 'react'
import isAuthenticated from "../../helper/isAuthenticated";
export default function UniversityTableHeading() {
    return (
        <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Country</th>
          <th>Website</th>
          {isAuthenticated() && <th>Action</th>}
        </tr>
      </thead>
    )
}
