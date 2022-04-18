import React from 'react'

const winner = ({props}) => {
  console.log(props);



  return (
    <>{ props
      && 
    <div>
        1. {props[0]} <br/>
        2. {props[1]} <br/>
        3. {props[2]} <br/>
        4. {props[3]} <br/>
        5. {props[4]} <br/>
        6. {props[5]} <br/>
        7. {props[6]} <br/>
        8. {props[7]} <br/>
        9. {props[8]} <br/>
        10. {props[9]} <br/>
      </div>}
    
    </>
  )
}

export default winner