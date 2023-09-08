import React, { useEffect, useState } from 'react';

export default function BookingInfo({ formData, setFormData }) {
  const [withFood, setWithFood] = useState(false);
  const [sharingtype, setSharingType] = useState('');
  const [price, setPrice] = useState(0);

  const calculatePrice = (sharingType, foodStatus) => {
    let basePrice = 0;
    switch (sharingType) {
        case 'Select Room':
          basePrice = 0;
      case 'Single room':
        basePrice = 5000;
        break;
      case '2 Sharing':
        basePrice = 4000;
        break;
      case '3 Sharing':
        basePrice = 3000;
        break;
      case '4 Sharing':
        basePrice = 2000;
        break;
      default:
        basePrice = 0;
    }

    // Add 2000 to the base price if "with food" is selected, otherwise return the base price only
    return foodStatus ? basePrice + 2000 : basePrice;
  };

  useEffect(() => {
    const calculatedPrice = calculatePrice(sharingtype, withFood);
    setPrice(calculatedPrice);
  }, [sharingtype, withFood]);

  return (
    <div>
      <div className="justify-center items-center flex mt-8">
        <div className="border shadow-sm my-6 w-full ">
          <div className="grid sm:grid-cols-2 w-full md:grid-cols-3 gap-6 mx-2 rounded-md my-6px-2 py-4 md:px-16 md:py-16">
            <div>
              <label>Checkin Date</label>
              <input
                className="input"
                placeholder="Email"
                type="date"
                value={formData.checkindate}
                onChange={(e) => {
                  setFormData({ ...formData, checkindate: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Checkout Date</label>
              <input
                className="input"
                type="date"
                value={formData.checkoutdate}
                onChange={(e) => {
                  setFormData({ ...formData, checkoutdate: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Room</label>
              <select
                className="w-full py-[10px] mt-[6px] outline-none bg-[#f1f1f1] rounded-[8px] border-none px-3"
                value={formData.sharingtype}
                onChange={(e) => {
                  setFormData({ ...formData, sharingtype: e.target.value });
                  setSharingType(e.target.value); // Update sharingtype
                }}
              >
                <option  value="Select Room">
                  Select Room Type
                </option>
                <option value="Single room">Single room (5000)</option>
                <option value="2 Sharing">2 Sharing (4000)</option>
                <option value="3 Sharing">3 Sharing (3000)</option>
                <option value="4 Sharing">4 Sharing (2000)</option>
              </select>
            </div>
            <div className='mx-3'>
              <label>With Food</label>
              <input
              className='mx-3'
                type="checkbox"
                checked={withFood}
                onChange={() => {
                  setWithFood(!withFood); // Toggle withFood state
                }}
              />
            </div>
            <div>
              <label>Additional Information</label>
              <textarea
                className="input"
                placeholder="Extra info about you"
                type="text"
                rows={4}
                value={formData.additionalinfo}
                onChange={(e) => {
                  setFormData({ ...formData, additionalinfo: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
          <div className='flex items-center'>
                <span className='text-gray-800 text-xl '>Room Sharing :</span>
                <span className='text-slate-800 font-extrabold'>{sharingtype}</span>
            </div>
            <div className='flex items-center'>
                <span className='text-gray-800 text-xl '> Food Status :</span>
                <span className='text-slate-800 font-extrabold'> {withFood ? 'With Food (+2000)' : 'Without Food'}</span>
            </div>
            <div className='flex items-center'>
                <span className='text-gray-800 text-xl '>Total Amount to be paid:</span>
                <span className='text-slate-800 font-extrabold text-xl underline mx-3'> Ksh {price} / per head</span>
                <input
                className="hidden"
                placeholder="Room Price"
                type="text"
                 disabled
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                }}
              />
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
