import Image from 'next/image'
import React from 'react'


const FlagComponent = () => {
  return (
    <>

    <div className="grid grid-cols-1 font-bold text-2xl ml-4 mt-15">
        Suppliers By Region
    </div>
      
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5 p-4">

{/* Flag 1 */}

<div className="flex ml-4 w-50 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/AE.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Arabic Emirates</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>

{/* Flag 2 */}

<div className="flex ml-4  w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/CN.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> China</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 3 */}

<div className="flex ml-4  w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/DE.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Denmark</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 4 */}

<div className="flex ml-4  w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/DK.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Russia </h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 5 */}

<div className="flex ml-4  h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/FR.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Italy</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 1 */}

<div className="flex ml-4 w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/GB.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> US</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>

{/* Flag 2 */}

<div className="flex ml-4  w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/icon.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> China</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 3 */}

<div className="flex ml-4  w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/IT.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Denmark</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 4 */}

<div className="flex ml-4  w-40 h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/RU.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Russia </h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


{/* Flag 5 */}

<div className="flex ml-4  h-10 ">
    
    <Image
    src= "/assets/assets/Layout1/Image/flags/US.png"
    alt="flag"
    width={60}
    height={30}
/>
    <div className="ml-3">
       <h3  className='text-1xl font-semibold text-black-400 '> Italy</h3>
        <p className='text-gray-500'>shopname.ae</p>
    </div>
</div>


</div>


    </>
  )
}

export default FlagComponent
