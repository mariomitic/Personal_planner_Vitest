import React from 'react'

function InfoPage(props) {
  return (
    <div className='displayInfo' style={{ textAlign: "center"}}>
      App info:
      <br></br>
      <hr></hr>
      <div style={{ display: "block", textAlign: "left", width: "100%" }}>
     <li>Create/Search for recipe.</li>
     <li>Search/Add ingredients.</li>
     <li>Save recipes.</li>
     <li>Use recipes in daily diary.</li>
     
     </div>
     <br></br>
     <hr></hr>
     <button className='info' style={{width: "20%" }} onClick={() => props.setseeInfo(false)}>Close</button>
    </div>
  )
}

export default InfoPage
