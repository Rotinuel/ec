import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export default async function Admin() {
  await connectDB();
  const users = await User.find({ approved: false });

  return (
    <div className="p-10">
      <h1>Pending Loans</h1>
      {users.map(u => (
        <form key={u._id} action="/api/admin/approve" method="POST">
          <input type="hidden" name="id" value={u._id} />
          {u.name} - ₦{u.loanAmount}
          <button>Approve</button>
        </form>
      ))}
    </div>
  );
}