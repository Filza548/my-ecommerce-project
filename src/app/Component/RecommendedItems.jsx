// pages/index.js

import Image from 'next/image';

const RecommendedItems = () => {
  return (
    <div className="p-5 mt-15">
      <h1 className="text-2xl font-semibold mb-6">Recommended items</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
        {/* Item 1 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-50 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/t-shirt.png" alt="T-shirt" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">T-shirts with multiple colors, for men</p>
          <p className="font-semibold text-gray-900">$10.30</p>
        </div>
        
        {/* Item 2 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-50 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/short.png" alt="Jeans shorts" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Jeans shorts for men blue color</p>
          <p className="font-semibold text-gray-900">$10.30</p>
        </div>

        {/* Item 3 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-50 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/coat.png" alt="Brown winter coat" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Brown winter coat medium size</p>
          <p className="font-semibold text-gray-900">$12.50</p>
        </div>

        {/* Item 4 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-50 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/bag.png" alt="Jeans bag for travel" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Jeans bag for travel for men</p>
          <p className="font-semibold text-gray-900">$34.00</p>
        </div>

        {/* Item 5 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-50 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/wallet.png" alt="Leather wallet" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Leather wallet</p>
          <p className="font-semibold text-gray-900">$99.00</p>
        </div>

        {/* Item 6 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-40 object-cover" src="/assets/assets/Layout/alibaba/Image/tech/kattle.png" alt="Canon camera" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Canon camera black, 100x zoom</p>
          <p className="font-semibold text-gray-900">$9.99</p>
        </div>

        {/* Item 7 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-40 object-cover" src="/assets/assets/Layout/alibaba/Image/tech/headphone.png" alt="Headset for gaming" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Headset for gaming with mic</p>
          <p className="font-semibold text-gray-900">$8.99</p>
        </div>

        {/* Item 8 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-40 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/jacket.png" alt="Smartwatch" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Smartwatch silver color modern</p>
          <p className="font-semibold text-gray-900">$10.30</p>
        </div>

        {/* Item 9 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-40 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/wallet.png" alt="Blue wallet" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Blue wallet for men leather metafiral</p>
          <p className="font-semibold text-gray-900">$10.30</p>
        </div>

        {/* Item 10 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <Image className="w-full h-40 object-cover" src="/assets/assets/Layout/alibaba/Image/cloth/bag.png" alt="Jeans bag for travel" width={200} height={200} />
          </div>
          <p className="text-sm text-gray-500">Jeans bag for travel for men</p>
          <p className="font-semibold text-gray-900">$80.95</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItems;
