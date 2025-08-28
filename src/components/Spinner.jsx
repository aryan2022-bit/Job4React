import React from 'react'
import { RingLoader } from 'react-spinners'

const override = {
    display: 'block',
    margin: '100px auto'
}
const Spinner = ({ loading }) => {
  return (
    <RingLoader
        color='#4338ca'
        loading={loading}
        cssOverride={override}
        size={150}
    />
  )
}

export default Spinner
