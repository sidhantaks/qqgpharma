import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

type Reg = any;

export default function Home() {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [totalServices, setTotalServices] = useState<number | null>(null);
  const [recentRegs, setRecentRegs] = useState<Reg[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchCounts = async () => {
      try {
        const r1 = await fetch(`/api/registration?page=1&limit=1`);
        const t1 = await r1.text().catch(() => "");
        const j1 = t1 ? JSON.parse(t1) : {};
        if (!cancelled && j1 && typeof j1.total === 'number') setTotalCustomers(j1.total);
      } catch (e) {
        // ignore
      }

      try {
        const r2 = await fetch(`/api/services?page=1&limit=1`);
        const t2 = await r2.text().catch(() => "");
        const j2 = t2 ? JSON.parse(t2) : {};
        if (!cancelled && j2 && typeof j2.total === 'number') setTotalServices(j2.total);
      } catch (e) {
        // ignore
      }

      try {
        const r3 = await fetch(`/api/registration?page=1&limit=4`);
        const t3 = await r3.text().catch(() => "");
        const j3 = t3 ? JSON.parse(t3) : {};
        if (!cancelled && j3 && Array.isArray(j3.data)) setRecentRegs(j3.data);
      } catch (e) {
        // ignore
      }
    };

    fetchCounts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageMeta
        title="Admin Dashboard - QG Pharma"
        description="Admin Dashboard for QG Pharma"
      />
      <PageBreadcrumb pageTitle="Dashboard" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md hover:shadow-lg transition-shadow duration-200 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z" fill="currentColor"/>
                      <path d="M4 21C4 16.5817 7.58172 13 12 13H20C20 17.4183 16.4183 21 12 21H4Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Customers</h4>
                    <div className="text-xs text-gray-400">Total registered</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">{totalCustomers ?? "--"}</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md hover:shadow-lg transition-shadow duration-200 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-green-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 7H21V9H3V7Z" fill="currentColor"/>
                      <path d="M5 11H19V13H5V11Z" fill="currentColor"/>
                      <path d="M7 15H17V17H7V15Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Services</h4>
                    <div className="text-xs text-gray-400">Available services</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">{totalServices ?? "--"}</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md hover:shadow-lg transition-shadow duration-200 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 2H17V4H7V2Z" fill="currentColor"/>
                      <path d="M5 6H19V20H5V6Z" fill="currentColor"/>
                      <path d="M9 10H15V12H9V10Z" fill="white" opacity="0.9"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Recent Registrations</h4>
                    <div className="text-xs text-gray-400">Latest four</div>
                  </div>
                </div>
                <a href="/customers" className="text-sm text-indigo-600 hover:underline">View all</a>
              </div>
              <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto custom-scrollbar pt-2">
                {recentRegs.length === 0 && <li className="text-sm text-gray-500">No recent registrations</li>}
                {recentRegs.map((r, i) => (
                  <li key={r._id || i} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <img src="/images/user/user-01.jpg" alt="avatar" className="h-9 w-9 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-gray-800">{r.fullName || r.organization || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{r.organization || r.email || ''}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{new Date(r.registrationDate || r.createdAt || Date.now()).toLocaleDateString()}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
