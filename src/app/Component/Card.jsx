// pages/index.js

import Image from 'next/image';

const Card = () => {
  return (
   <div className="p-5 mt-15">
      <h2 className="text-2xl font-semibold mb-6">Our extra services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
        {/* Service 1 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image className="w-full h-30 object-cover" src="/assets/assets/Image/backgrounds/ware-house.png" alt="Source from Industry Hubs" width={150} height={150} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Source from Industry Hubs</h3>
        </div>

        {/* Service 2 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image className="w-full h-30 object-cover" src="/assets/assets/Image/backgrounds/customize-prodect.png" alt="Customize Your Products" width={150} height={150} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Customize Your Products</h3>
        </div>

        {/* Service 3 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image className="w-full h-30 object-cover" src="/assets/assets/Image/backgrounds/air-plane.png" alt="Fast, reliable shipping" width={150} height={150} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Fast, reliable shipping by ocean or air</h3>
        </div>

        {/* Service 4 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image className="w-full h-30 object-cover" src="/assets/assets/Image/backgrounds/product-monitoring.png" alt="Product monitoring and inspection" width={150} height={150} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Product monitoring and inspection</h3>
        </div>
      </div>
    </div>
  );
};
export default Card;
