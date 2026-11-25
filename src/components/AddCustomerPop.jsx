
import { useState } from 'react';
import { addCustomer } from '../redux/slicers/customerSlicer.js';
import { useDispatch } from 'react-redux';

function AddCustomerPop({ onClose }) {

    const dispatch = useDispatch();

    const [customerInformation, setInformation] = useState({
        customerName: '',
        mobileNumber: '',
        gender: '',
        customerType: '',
        address: '',
    });

    function handleValues(e) {
        const { name, value } = e.target;

        setInformation(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function submitForm(e) {
        e.preventDefault();

        if (!/^\d{10}$/.test(customerInformation.mobileNumber)) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }

        dispatch(addCustomer(customerInformation));

        console.log('Customer Added:', customerInformation);

        setInformation({
            customerName: '',
            mobileNumber: '',
            gender: '',
            customerType: '',
            address: '',
        });

        onClose?.();
    }

    const inputClass =
        "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5">

            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden max-h-[95vh] overflow-y-auto">

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-4 sticky top-0 z-10">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                            <i className="ri-user-add-line text-xl"></i>
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-black">
                                Add New Customer
                            </h1>

                            <p className="text-xs text-gray-500 mt-1">
                                Enter customer details to save
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 hover:text-black transition"
                    >
                        <i className="ri-close-line text-xl"></i>
                    </button>

                </div>

                {/* Form Body */}
                <form onSubmit={submitForm} className="p-4 sm:p-6 space-y-5">

                    {/* Customer Name */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Customer Name
                            <span className="text-black ml-1">*</span>
                        </label>

                        <div className="relative">

                            <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                            <input
                                required
                                name="customerName"
                                value={customerInformation.customerName}
                                onChange={handleValues}
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                className={`${inputClass} pl-11`}
                            />

                        </div>

                    </div>

                    {/* Mobile Number */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mobile Number
                            <span className="text-black ml-1">*</span>
                        </label>

                        <div className="relative">

                            <i className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                            <input
                                required
                                name="mobileNumber"
                                value={customerInformation.mobileNumber}
                                onChange={handleValues}
                                type="tel"
                                inputMode="numeric"
                                maxLength="10"
                                pattern="[0-9]{10}"
                                placeholder="10-digit mobile number"
                                className={`${inputClass} pl-11`}
                            />

                        </div>

                        <p className="text-xs text-gray-400 mt-1">
                            Enter a valid 10-digit mobile number
                        </p>

                    </div>

                    {/* Gender & Customer Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={customerInformation.gender}
                                onChange={handleValues}
                                className={inputClass}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Customer Type
                            </label>

                            <select
                                name="customerType"
                                value={customerInformation.customerType}
                                onChange={handleValues}
                                className={inputClass}
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

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                        </label>

                        <div className="relative">

                            <i className="ri-map-pin-line absolute left-4 top-3.5 text-gray-400"></i>

                            <textarea
                                name="address"
                                value={customerInformation.address}
                                onChange={handleValues}
                                rows="3"
                                placeholder="Enter full street address, city and pin code..."
                                className={`${inputClass} pl-11 resize-none`}
                            />

                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full sm:w-auto rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition flex items-center justify-center gap-2"
                        >
                            <i className="ri-save-line"></i>
                            Save Customer
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCustomerPop;
