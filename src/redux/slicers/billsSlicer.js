
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  billList: []
};

const billingSlice = createSlice({
  name: "billing",
  initialState,

  reducers: {

    // 1. Add new bill
    addBill: {
      reducer: (state, action) => {
        const bill = action.payload;

        const totalAmount = bill.items.reduce(
          (total, item) =>
            total + Number(item.quantity || 0) * Number(item.price || 0),
          0
        );

        const received = Number(bill.received || 0);

        state.billList.push({
          ...bill,
          totalAmount,
          received,
          pending: totalAmount - received,
          status: totalAmount - received === 0 ? "PAID" : "PENDING",
          payments: received > 0
            ? [{
                id: nanoid(),
                amount: received,
                method: bill.paymentMethod || "Cash",
                date: bill.date
              }]
            : []
        });
      },

      prepare: (bill) => ({
        payload: {
          ...bill,
          _id: bill._id || nanoid()
        }
      })
    },

    // 2. Get all bills
    getBills: (state, action) => {
      state.billList = action.payload;
    },

    // 3. Update bill
    updateBill: (state, action) => {
      const updatedBill = action.payload;

      const index = state.billList.findIndex(
        bill => bill._id === updatedBill._id
      );

      if (index !== -1) {
        const existingBill = state.billList[index];

        const totalAmount = updatedBill.items.reduce(
          (total, item) =>
            total + Number(item.quantity || 0) * Number(item.price || 0),
          0
        );

        const received = Number(
          updatedBill.received ?? existingBill.received
        );

        state.billList[index] = {
          ...existingBill,
          ...updatedBill,
          totalAmount,
          received,
          pending: totalAmount - received,
          status: totalAmount - received === 0 ? "PAID" : "PENDING",
          payments: existingBill.payments || []
        };
      }
    },

    // 4. Delete bill
    deleteBill: (state, action) => {
      state.billList = state.billList.filter(
        bill => bill._id !== action.payload
      );
    },

    // 5. Add payment to existing bill
    addPayment: (state, action) => {
      const { billId, amount, method, date } = action.payload;

      const bill = state.billList.find(
        bill => bill._id === billId
      );

      if (!bill) return;

      const paymentAmount = Number(amount);

      if (
        paymentAmount <= 0 ||
        paymentAmount > bill.pending
      ) {
        return;
      }

      bill.payments.push({
        id: nanoid(),
        amount: paymentAmount,
        method,
        date
      });

      bill.received += paymentAmount;
      bill.pending = bill.totalAmount - bill.received;

      bill.status = bill.pending === 0 ? "PAID" : "PENDING";
    }

  }
});

export const {
  addBill,
  getBills,
  updateBill,
  deleteBill,
  addPayment
} = billingSlice.actions;

export default billingSlice.reducer;
