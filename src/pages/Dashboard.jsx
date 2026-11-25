
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const customers = useSelector(
    state => state.customers.customerList
  );

  const bills = useSelector(
    state => state.billing.billList
  );

  const formatCurrency = amount =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  // Dashboard statistics
  const totalCustomers = customers.length;
  const totalBills = bills.length;

  const totalRevenue = bills.reduce(
    (total, bill) => total + Number(bill.totalAmount || 0), 0
  );

  const totalReceived = bills.reduce(
    (total, bill) => total + Number(bill.received || 0), 0
  );

  const totalPending = bills.reduce(
    (total, bill) => total + Number(bill.pending || 0), 0
  );

  // Current month revenue
  const currentMonthRevenue = bills.reduce((total, bill) => {
    const billDate = new Date(bill.date);
    const today = new Date();

    const isCurrentMonth =
      !Number.isNaN(billDate.getTime()) &&
      billDate.getMonth() === today.getMonth() &&
      billDate.getFullYear() === today.getFullYear();

    return isCurrentMonth
      ? total + Number(bill.totalAmount || 0)
      : total;
  }, 0);

  // Recent bills
  const recentBills = useMemo(() => {
    return [...bills]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [bills]);

  // Weekly billing
  const weeklyData = useMemo(() => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

      const amount = bills.reduce((total, bill) => {
        const billDate = new Date(bill.date);

        if (
          !Number.isNaN(billDate.getTime()) &&
          billDate.toDateString() === date.toDateString()
        ) {
          return total + Number(bill.totalAmount || 0);
        }

        return total;
      }, 0);

      return {
        day: date.toLocaleDateString("en-IN", {
          weekday: "short"
        }),
        amount
      };
    });
  }, [bills]);

  const maxWeeklyAmount = Math.max(
    ...weeklyData.map(item => item.amount),
    1
  );

  const receivedPercentage = totalRevenue > 0
    ? Math.min((totalReceived / totalRevenue) * 100, 100)
    : 0;

  const pendingPercentage = totalRevenue > 0
    ? Math.min((totalPending / totalRevenue) * 100, 100)
    : 0;

  // Reusable stat card
  const StatCard = ({ title, value, icon, description, action, onClick }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-black transition-all">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h2 className="text-xl sm:text-2xl font-bold text-black mt-2 break-words">
            {value}
          </h2>
        </div>

        <div className="w-11 h-11 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
          <i className={`${icon} text-2xl text-black`}></i>
        </div>
      </div>

      {action ? (
        <button
          onClick={onClick}
          className="text-sm text-black font-semibold mt-4 hover:underline"
        >
          {action} →
        </button>
      ) : (
        <p className="text-xs text-gray-400 mt-4">{description}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-7">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 sm:mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's what's happening in your shop.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 w-fit">
          <i className="ri-calendar-line text-black"></i>

          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </span>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-6">

        <StatCard
          title="Total Customers"
          value={totalCustomers}
          icon="ri-user-3-line"
          action="View Customers"
          onClick={() => navigate("/customer")}
        />

        <StatCard
          title="Total Bills"
          value={totalBills}
          icon="ri-file-list-3-line"
          action="View Bills"
          onClick={() => navigate("/bills")}
        />

        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon="ri-wallet-3-line"
          description="Total value of all bills"
        />

        <StatCard
          title="Pending Payments"
          value={formatCurrency(totalPending)}
          icon="ri-time-line"
          action="Check Pending"
          onClick={() => navigate("/bills")}
        />

      </div>

      {/* Chart and Payment Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5 mb-6">

        {/* Weekly Billing */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-6 min-w-0">

          <div className="flex justify-between items-center gap-3 mb-7">
            <div>
              <h2 className="font-bold text-black text-lg">
                Weekly Billing
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Last 7 days billing performance
              </p>
            </div>

            <i className="ri-bar-chart-box-line text-2xl text-black"></i>
          </div>

          <div className="h-56 flex items-end justify-around gap-2 sm:gap-4 border-b border-gray-200 pb-2">

            {weeklyData.map((item, index) => {
              const barHeight = item.amount > 0
                ? Math.max((item.amount / maxWeeklyAmount) * 100, 5)
                : 0;

              return (
                <div
                  key={index}
                  className="flex-1 min-w-0 h-full flex flex-col justify-end items-center gap-2"
                >
                  <span className="text-[10px] sm:text-xs text-gray-500 truncate max-w-full">
                    {item.amount > 0
                      ? formatCurrency(item.amount)
                      : "—"}
                  </span>

                  <div
                    className="w-full max-w-12 bg-black hover:bg-gray-700 rounded-t-md transition-all"
                    style={{ height: `${barHeight}%` }}
                    title={formatCurrency(item.amount)}
                  />

                  <span className="text-xs text-gray-500">
                    {item.day}
                  </span>
                </div>
              );
            })}

          </div>

        </div>

        {/* Payment Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 min-w-0">

          <h2 className="font-bold text-black text-lg">
            Payment Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Overall collection status
          </p>

          <div className="space-y-6">

            <div>
              <div className="flex justify-between gap-2 text-sm mb-2">
                <span className="text-gray-500">Received</span>
                <span className="font-semibold text-black">
                  {formatCurrency(totalReceived)}
                </span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${receivedPercentage}%` }}
                />
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {receivedPercentage.toFixed(1)}% collected
              </p>
            </div>

            <div>
              <div className="flex justify-between gap-2 text-sm mb-2">
                <span className="text-gray-500">Pending</span>
                <span className="font-semibold text-black">
                  {formatCurrency(totalPending)}
                </span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-400 rounded-full"
                  style={{ width: `${pendingPercentage}%` }}
                />
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {pendingPercentage.toFixed(1)}% pending
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                This Month's Revenue
              </p>

              <h2 className="text-2xl font-bold text-black mt-2">
                {formatCurrency(currentMonthRevenue)}
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Bills */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 sm:p-5">

          <div>
            <h2 className="font-bold text-black text-lg">
              Recent Bills
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest customer invoices
            </p>
          </div>

          <button
            onClick={() => navigate("/bills")}
            className="text-sm text-black font-semibold hover:underline w-fit"
          >
            View All →
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left min-w-[700px]">

            <thead className="bg-black">
              <tr>
                {[
                  "Invoice No",
                  "Customer",
                  "Date",
                  "Total",
                  "Received",
                  "Pending",
                  "Status"
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 sm:px-5 py-3 text-white text-xs sm:text-sm font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {recentBills.length > 0 ? (
                recentBills.map(bill => (
                  <tr
                    key={bill._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="px-4 sm:px-5 py-4 text-sm font-semibold text-black">
                      {bill.invoiceNo}
                    </td>

                    <td className="px-4 sm:px-5 py-4 text-sm text-gray-700">
                      {bill.customer?.customerName || "Unknown"}
                    </td>

                    <td className="px-4 sm:px-5 py-4 text-sm text-gray-500">
                      {bill.date}
                    </td>

                    <td className="px-4 sm:px-5 py-4 text-sm font-semibold text-black">
                      {formatCurrency(bill.totalAmount)}
                    </td>

                    <td className="px-4 sm:px-5 py-4 text-sm text-gray-700">
                      {formatCurrency(bill.received)}
                    </td>

                    <td className="px-4 sm:px-5 py-4 text-sm text-gray-700">
                      {formatCurrency(bill.pending)}
                    </td>

                    <td className="px-4 sm:px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        bill.pending === 0
                          ? "bg-gray-100 text-black border-gray-300"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}>
                        {bill.pending === 0 ? "PAID" : "PENDING"}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12">

                    <i className="ri-file-list-3-line text-4xl text-gray-300"></i>

                    <p className="text-gray-600 mt-2 font-medium">
                      No bills available
                    </p>

                    <button
                      onClick={() => navigate("/bills")}
                      className="text-black text-sm font-semibold mt-2 hover:underline"
                    >
                      Create your first bill
                    </button>

                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8">

        <h2 className="font-bold text-black text-lg mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">

          <button
            onClick={() => navigate("/customer")}
            className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl flex items-center gap-4 text-left hover:border-black transition"
          >
            <div className="w-11 h-11 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
              <i className="ri-user-add-line text-2xl text-black"></i>
            </div>

            <div>
              <p className="font-semibold text-black">
                Add Customer
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Register a new customer
              </p>
            </div>

            <i className="ri-arrow-right-line ml-auto text-gray-400"></i>
          </button>

          <button
            onClick={() => navigate("/bills")}
            className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl flex items-center gap-4 text-left hover:border-black transition"
          >
            <div className="w-11 h-11 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
              <i className="ri-bill-line text-2xl text-black"></i>
            </div>

            <div>
              <p className="font-semibold text-black">
                Create Bill
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Generate a customer invoice
              </p>
            </div>

            <i className="ri-arrow-right-line ml-auto text-gray-400"></i>
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl flex items-center gap-4 text-left hover:border-black transition"
          >
            <div className="w-11 h-11 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
              <i className="ri-shopping-bag-3-line text-2xl text-black"></i>
            </div>

            <div>
              <p className="font-semibold text-black">
                View Orders
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Manage customer orders
              </p>
            </div>

            <i className="ri-arrow-right-line ml-auto text-gray-400"></i>
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
