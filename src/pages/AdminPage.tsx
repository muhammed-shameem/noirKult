import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="pt-32 pb-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tighter">ADMIN DASHBOARD</h1>
          <div className="px-4 py-1 bg-black text-white text-[10px] font-bold tracking-widest rounded">
            {user?.role}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "TOTAL SALES", value: "₹1,24,500", trend: "+12%" },
            { label: "TOTAL ORDERS", value: "450", trend: "+5%" },
            { label: "NEW CUSTOMERS", value: "120", trend: "+18%" },
          ].map(stat => (
            <div key={stat.label} className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-2">{stat.label}</p>
              <p className="text-3xl font-black mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-emerald-500">{stat.trend} vs last month</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold tracking-tight">RECENT ORDERS</h3>
            <button className="text-xs font-bold text-gray-400 hover:text-black">VIEW ALL</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold tracking-widest text-gray-400">
                  <th className="px-6 py-4">ORDER ID</th>
                  <th className="px-6 py-4">CUSTOMER</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="text-sm">
                    <td className="px-6 py-4 font-bold">#NK-2026-{i}</td>
                    <td className="px-6 py-4">Customer {i}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">DELIVERED</span>
                    </td>
                    <td className="px-6 py-4 font-bold">₹2,499</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
