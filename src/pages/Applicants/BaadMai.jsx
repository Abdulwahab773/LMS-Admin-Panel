import React from 'react'
import { useParams } from 'react-router-dom';

function BaadMai() {
  const { uid } = useParams();
    return (
    <div>
      This is the applicant page of {uid}
    </div>
  )
}

export default BaadMai
