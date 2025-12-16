export default function TransactionTable({ transactions }) {
  return (
    <table className="w-full mt-6 border">
      <thead>
        <tr className="bg-gray-100">
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t._id} className="text-center">
            <td>{new Date(t.createdAt).toLocaleDateString()}</td>
            <td>{t.type}</td>
            <td>₦{t.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}