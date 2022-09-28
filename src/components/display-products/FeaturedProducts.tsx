import React from 'react'

function FeaturedProducts(props: any) {  
  
    if(props.admin){
    return (
    
    <div>FeaturedProducts</div>
  )}else{
    return(<></>)
  }
}

export default FeaturedProducts