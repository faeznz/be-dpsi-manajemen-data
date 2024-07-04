const Item = require('../models/item');

// Fungsi untuk mengelompokkan data berdasarkan bulan dan tahun
function groupByMonth(items) {
  return items.reduce((acc, item) => {
    const date = new Date(item.dateIn);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = {
        month,
        year,
        totalItemsIn: 0,
        totalItemsOut: 0,
        employeesPresent: Math.floor(Math.random() * 10) + 1
      };
    }

    acc[key].totalItemsIn += item.quantity;
    if (item.dateOut) {
      acc[key].totalItemsOut += item.quantity;
    }

    return acc;
  }, {});
}

exports.getMonthlyReport = async (req, res) => {
  try {
    const items = await Item.find();
    const groupedData = groupByMonth(items);

    const report = Object.values(groupedData);

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};
