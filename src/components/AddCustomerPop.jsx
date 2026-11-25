import { useState } from 'react';
import { addCustomer, getCustomer } from '../redux/slicers/customerSlicer.js';
import { useDispatch, useSelector } from 'react-redux';

function AddCustomerPop({ onClose }) {
  const [customerInformation, setInformation] = useState({
    customerName: '',
    mobileNumber: '',
    gender: '',
    customerType: '',
    address: '',
  });

  const [myList, setMyList] = useState([]);

  const dispatch = useDispatch();

  function handleValues(e) {
    const { name, value } = e.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm(e) {
    e.preventDefault();
    const updatedList = [...myList, customerInformation];
    dispatch(addCustomer(customerInformation))
    console.log('Total Customers:', updatedList.length, updatedList);
    

    setInformation({
      customerName: '',
      mobileNumber: '',
      gender: '',
      customerType: '',
      address: '',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Add New Customer</h1>
            <p className="text-xs text-slate-500">Enter customer details to save to your directory</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={submitForm} className="p-6 space-y-4">
          
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="customerName"
              value={customerInformation.customerName}
              onChange={handleValues}
              type="text"
              placeholder="e.g., Rahul Sharma"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="mobileNumber"
              value={customerInformation.mobileNumber}
              onChange={handleValues}
              type="tel"
              maxLength="10"
              placeholder="10-digit Mobile Number"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Gender & Customer Type (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={customerInformation.gender}
                onChange={handleValues}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Customer Type
              </label>
              <select
                name="customerType"
                value={customerInformation.customerType}
                onChange={handleValues}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Select Type</option>
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={customerInformation.address}
              onChange={handleValues}
              rows="3"
              placeholder="Enter full street address, city, and pin code..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-[0.98] transition-all"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerPop;