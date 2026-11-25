
import AddCustomerPop from "../components/AddCustomerPop.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [showPop, setShowPop] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const customerList = useSelector(
    state => state.customers.customerList
  );

  // Search customers
  const filteredCustomers = customerList.filter(customer =>
    customer.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    customer.mobileNumber?.includes(search)
  );

  return (
    <div className="relative min-h-screen w-full bg-gray-50 p-3 sm:p-5 lg:p-7">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Customers
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your customer information
          </p>
        </div>

        {/* Total Customers */}
        <div className="bg-white border border-gray-200 px-5 py-3 rounded-xl w-fit">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <h2 className="text-2xl font-bold text-black">
            {customerList.length}
          </h2>
        </div>

      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div className="relative w-full sm:max-w-md">

          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or mobile..."
            className="
              w-full pl-11 pr-4 py-3
              border border-gray-200
              rounded-xl outline-none
              bg-white text-sm text-black
              placeholder:text-gray-400
              focus:border-black
              focus:ring-2 focus:ring-gray-200
              transition
            "
          />

        </div>

        <p className="text-sm text-gray-500">
          Showing {filteredCustomers.length} of {customerList.length} customers
        </p>

      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px] border-collapse text-left">

            <thead className="bg-black">
              <tr>
                <th className="px-5 py-4 text-white text-sm font-semibold">
                  ID
                </th>

                <th className="px-5 py-4 text-white text-sm font-semibold">
                  Customer Name
                </th>

                <th className="px-5 py-4 text-white text-sm font-semibold">
                  Mobile
                </th>

                <th className="px-5 py-4 text-white text-sm font-semibold">
                  Customer Type
                </th>

                <th className="px-5 py-4 text-white text-sm font-semibold">
                  Gender
                </th>

                <th className="px-5 py-4 text-white text-sm font-semibold">
                  Address
                </th>

                <th className="px-5 py-4 text-white text-sm font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer, index) => (

                  <tr
                    key={customer._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-black">
                      {customer.customerName}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {customer.mobileNumber}
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-black border border-gray-200">
                        {customer.customerType}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {customer.gender}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600 max-w-48 truncate">
                      {customer.address}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-center items-center gap-3">

                        {/* View */}
                        <button
                          onClick={() =>
                            navigate(`/customer/${customer._id}`)
                          }
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition"
                          title="View Customer"
                        >
                          <i className="ri-eye-line text-xl"></i>
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => {
                            console.log("Edit:", customer._id);
                          }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition"
                          title="Edit Customer"
                        >
                          <i className="ri-edit-line text-xl"></i>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            console.log("Delete:", customer._id);
                          }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition"
                          title="Delete Customer"
                        >
                          <i className="ri-delete-bin-line text-xl"></i>
                        </button>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">

                    <i className="ri-user-search-line text-4xl text-gray-300"></i>

                    <p className="mt-3 font-semibold text-gray-700">
                      No customers found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {search
                        ? "Try searching with a different name or mobile number."
                        : "Add your first customer to get started."}
                    </p>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add Customer Button */}
      <button
        onClick={() => setShowPop(true)}
        className="
          fixed bottom-5 right-5 sm:bottom-8 sm:right-8
          w-12 h-12 sm:w-14 sm:h-14
          bg-black text-white
          text-3xl rounded-full
          shadow-lg
          flex items-center justify-center
          hover:bg-gray-800 hover:scale-105
          active:scale-95
          transition-all duration-200
          z-40
        "
        title="Add Customer"
      >
        +
      </button>

      {/* Add Customer Popup */}
      {showPop && (
        <AddCustomerPop
          onClose={() => setShowPop(false)}
        />
      )}

    </div>
  );
}

export default Customers;
