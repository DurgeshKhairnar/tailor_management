
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddBillingPop from "../components/AddBillingPop";
import {
  addBill,
  deleteBill
} from "../redux/slicers/billsSlicer.js";

function Bills() {
  const dispatch = useDispatch();

  const [showPop, setShowPop] = useState(false);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [balanceFilter, setBalanceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");

  const customers = useSelector(
    state => state.customers.customerList
  );

  const billList = useSelector(
    state => state.billing.billList
  );

  // Currency format
  const formatCurrency = amount =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  // Add bill
  const handleSaveBill = billData => {
    dispatch(addBill(billData));
    setShowPop(false);
  };

  // Delete bill
  const handleDeleteBill = id => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );

    if (confirmDelete) {
      dispatch(deleteBill(id));
    }
  };

  // Print bill
  const handlePrint = () => {
    window.print();
  };

  // Date filter
  const filterByDate = billDate => {
    if (dateFilter === "All Time") return true;

    const date = new Date(billDate);
    const today = new Date();

    if (Number.isNaN(date.getTime())) return false;

    if (dateFilter === "Today") {
      return date.toDateString() === today.toDateString();
    }

    if (dateFilter === "This Month") {
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }

    return true;
  };

  // Search and filters
  const filteredBills = billList.filter(bill => {
    const customerName = bill.customer?.customerName || "";
    const mobileNumber = bill.customer?.mobileNumber || "";

    const searchText = search.toLowerCase();

    const matchesSearch =
      bill.invoiceNo?.toLowerCase().includes(searchText) ||
      customerName.toLowerCase().includes(searchText) ||
      mobileNumber.includes(searchText);

    const customerGender = bill.customer?.gender || "";

    const matchesGender =
      genderFilter === "All" ||
      customerGender === genderFilter;

    const matchesBalance =
      balanceFilter === "All" ||
      (balanceFilter === "Paid" && bill.pending === 0) ||
      (balanceFilter === "Pending" && bill.pending > 0);

    const matchesDate = filterByDate(bill.date);

    return (
      matchesSearch &&
      matchesGender &&
      matchesBalance &&
      matchesDate
    );
  });

  // Summary
  const totalBills = billList.length;

  const totalAmount = billList.reduce(
    (total, bill) => total + Number(bill.totalAmount || 0),
    0
  );

  const totalReceived = billList.reduce(
    (total, bill) => total + Number(bill.received || 0),
    0
  );

  const totalPending = billList.reduce(
    (total, bill) => total + Number(bill.pending || 0),
    0
  );

  // Reusable summary card
  const SummaryCard = ({ title, value, icon }) => (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center gap-3">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <i className={`${icon} text-xl text-black`}></i>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-black mt-3 break-words">
        {value}
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-7">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Bills
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage customer invoices and payments
          </p>
        </div>

        <button
          onClick={() => setShowPop(true)}
          className="
            bg-black hover:bg-gray-800
            text-white px-5 py-3
            rounded-lg flex items-center justify-center
            gap-2 shadow-sm transition
            w-full sm:w-auto
          "
        >
          <i className="ri-add-line text-lg"></i>
          Add Billing
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">

        <SummaryCard
          title="Total Bills"
          value={totalBills}
          icon="ri-file-list-3-line"
        />

        <SummaryCard
          title="Total Amount"
          value={formatCurrency(totalAmount)}
          icon="ri-wallet-3-line"
        />

        <SummaryCard
          title="Received Amount"
          value={formatCurrency(totalReceived)}
          icon="ri-money-rupee-circle-line"
        />

        <SummaryCard
          title="Pending Amount"
          value={formatCurrency(totalPending)}
          icon="ri-time-line"
        />

      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl mb-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

          {/* Search */}
          <div className="relative">

            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search invoice, name or mobile..."
              className="
                w-full pl-10 pr-4 py-3
                border border-gray-200
                rounded-lg outline-none
                focus:border-black focus:ring-2 focus:ring-gray-200
                text-sm bg-white
              "
            />

          </div>

          {/* Gender */}
          <select
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
            className="
              border border-gray-200 rounded-lg
              px-3 py-3 outline-none
              focus:border-black text-sm bg-white
            "
          >
            <option value="All">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Balance */}
          <select
            value={balanceFilter}
            onChange={e => setBalanceFilter(e.target.value)}
            className="
              border border-gray-200 rounded-lg
              px-3 py-3 outline-none
              focus:border-black text-sm bg-white
            "
          >
            <option value="All">Balance: All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Date */}
          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="
              border border-gray-200 rounded-lg
              px-3 py-3 outline-none
              focus:border-black text-sm bg-white
            "
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="This Month">This Month</option>
          </select>

        </div>

      </div>

      {/* Billing Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px] text-left">

            <thead className="bg-black">
              <tr>
                {[
                  "Sr.No.",
                  "Inv No",
                  "Date",
                  "Customer",
                  "Items",
                  "Total Bills",
                  "Received",
                  "Pending",
                  "Status",
                  "Action"
                ].map(heading => (
                  <th
                    key={heading}
                    className="px-4 py-4 text-white text-sm font-semibold whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {filteredBills.length > 0 ? (

                filteredBills.map((bill, index) => (

                  <tr
                    key={bill._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="px-4 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-black">
                      {bill.invoiceNo}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {bill.date}
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-black">
                        {bill.customer?.customerName || "Unknown"}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {bill.customer?.mobileNumber || "-"}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-40">
                        {bill.items?.map((item, itemIndex) => (
                          <span
                            key={itemIndex}
                            className="bg-gray-100 border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {item.itemName}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-black">
                      {formatCurrency(bill.totalAmount)}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-black">
                      {formatCurrency(bill.received)}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-black">
                      {formatCurrency(bill.pending)}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                          bill.pending === 0
                            ? "bg-gray-100 text-black border-gray-300"
                            : "bg-white text-gray-600 border-gray-300"
                        }`}
                      >
                        {bill.pending === 0 ? "PAID" : "PENDING"}
                      </span>

                      <p className="text-xs text-gray-500 mt-2">
                        <i className="ri-wallet-line mr-1"></i>
                        {bill.paymentMethod || "Cash"}
                      </p>

                    </td>

                    <td className="px-4 py-4">

                      <div className="flex justify-center items-center gap-2">

                        <button
                          onClick={handlePrint}
                          title="Print Bill"
                          className="
                            w-9 h-9 rounded-lg
                            bg-gray-100 text-black
                            hover:bg-gray-200 transition
                          "
                        >
                          <i className="ri-printer-line"></i>
                        </button>

                        <button
                          onClick={() => handleDeleteBill(bill._id)}
                          title="Delete Bill"
                          className="
                            w-9 h-9 rounded-lg
                            bg-gray-100 text-black
                            hover:bg-gray-200 transition
                          "
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="10" className="py-16 px-5 text-center">

                    <i className="ri-file-search-line text-5xl text-gray-300"></i>

                    <h3 className="text-gray-700 font-semibold mt-3">
                      No Bills Found
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      Try changing your search or add a new bill.
                    </p>

                    <button
                      onClick={() => setShowPop(true)}
                      className="
                        mt-4 bg-black text-white
                        px-4 py-2.5 rounded-lg text-sm
                        hover:bg-gray-800 transition
                      "
                    >
                      Add New Bill
                    </button>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

          <p className="text-sm text-gray-500">
            Showing {filteredBills.length} of {billList.length} Entries
          </p>

          <span className="bg-black text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
            1
          </span>

        </div>

      </div>

      {/* Add Billing Popup */}
      {showPop && (
        <AddBillingPop
          customers={customers}
          onClose={() => setShowPop(false)}
          onSave={handleSaveBill}
        />
      )}

    </div>
  );
}

export default Bills;
