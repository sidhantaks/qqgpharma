import { useEffect, useState } from "react";
import { apiPath } from "../../config/api";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

type Reg = any;

export default function Home() {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [serviceCategoriesCount, setServiceCategoriesCount] = useState<number | null>(null);
  const [serviceSubcategoriesCount, setServiceSubcategoriesCount] = useState<number | null>(null);
  const [integratedServicesCount, setIntegratedServicesCount] = useState<number | null>(null);
  const [recentRegs, setRecentRegs] = useState<Reg[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchCounts = async () => {
      try {
        const r1 = await fetch(apiPath(`/registration?page=1&limit=1`));
        const t1 = await r1.text().catch(() => "");
        const j1 = t1 ? JSON.parse(t1) : {};
        if (!cancelled && j1 && typeof j1.total === 'number') setTotalCustomers(j1.total);
      } catch (e) {
        // ignore
      }

      // (totalServices removed - not used in UI)

      // Service categories/subcategories/integrated services counts
      try {
        const rc = await fetch(apiPath(`/service-categories`));
        const tc = await rc.text().catch(() => "");
        const jc = tc ? JSON.parse(tc) : {};
        if (!cancelled && Array.isArray(jc.data)) setServiceCategoriesCount(jc.data.length);
        else if (!cancelled && Array.isArray(jc)) setServiceCategoriesCount(jc.length);
      } catch (e) {
        try {
          const fb = await fetch('/api/service-categories');
          const jb = await fb.json().catch(()=>({}));
          if (!cancelled && jb && Array.isArray(jb.data)) setServiceCategoriesCount(jb.data.length);
        } catch (e) { }
      }

      try {
        const rs = await fetch(apiPath(`/service-subcategories`));
        const ts = await rs.text().catch(() => "");
        const js = ts ? JSON.parse(ts) : {};
        if (!cancelled && Array.isArray(js.data)) setServiceSubcategoriesCount(js.data.length);
        else if (!cancelled && Array.isArray(js)) setServiceSubcategoriesCount(js.length);
      } catch (e) {
        try {
          const fb = await fetch('/api/service-subcategories');
          const jb = await fb.json().catch(()=>({}));
          if (!cancelled && jb && Array.isArray(jb.data)) setServiceSubcategoriesCount(jb.data.length);
        } catch (e) { }
      }

      try {
        const ri = await fetch(apiPath(`/integrated-services`));
        const ti = await ri.text().catch(() => "");
        const ji = ti ? JSON.parse(ti) : {};
        if (!cancelled && Array.isArray(ji.data)) setIntegratedServicesCount(ji.data.length);
        else if (!cancelled && Array.isArray(ji)) setIntegratedServicesCount(ji.length);
      } catch (e) {
        try {
          const fb = await fetch('/api/integrated-services');
          const jb = await fb.json().catch(()=>({}));
          if (!cancelled && jb && Array.isArray(jb.data)) setIntegratedServicesCount(jb.data.length);
        } catch (e) { }
      }

      try {
        const r3 = await fetch(apiPath(`/registration?page=1&limit=4`));
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
            <div className="rounded-2xl p-5 shadow-lg transform hover:scale-[1.01] transition-all bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z" fill="currentColor"/>
                      <path d="M4 21C4 16.5817 7.58172 13 12 13H20C20 17.4183 16.4183 21 12 21H4Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Customers</h4>
                    <div className="text-xs text-white/80">Total registered</div>
                    <div className="mt-2">
                      {totalCustomers != null && (
                        <svg width="80" height="24" viewBox="0 0 80 24" className="inline-block">
                          {Array.from({ length: 6 }).map((_, i) => {
                            const base = totalCustomers || 0;
                            const h = Math.max(3, (base + i * 5) % 22 + 3);
                            const x = i * 12;
                            return <rect key={i} x={x} y={24 - h} width={8} height={h} rx={1} fill="#dbeafe" />;
                          })}
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">{totalCustomers ?? "--"}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a href="/customers" className="text-sm text-white/90 hover:underline">Manage</a>
                <div className="text-xs text-white/80">Updated just now</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition-all bg-gradient-to-br from-pink-500 to-pink-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20V8H4V6Z" fill="currentColor"/>
                      <path d="M6 10H18V12H6V10Z" fill="currentColor"/>
                      <path d="M8 14H16V16H8V14Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Service Categories</h4>
                    <div className="text-xs text-white/80">Total categories</div>
                    <div className="mt-2">
                      {serviceCategoriesCount != null && (
                        <svg width="80" height="24" viewBox="0 0 80 24" className="inline-block">
                          {Array.from({ length: 6 }).map((_, i) => {
                            const h = Math.max(3, ((serviceCategoriesCount || 0) + i * 3) % 20 + 4);
                            const x = i * 12;
                            return <rect key={i} x={x} y={24 - h} width={8} height={h} rx={1} fill="#e9d5ff" />;
                          })}
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">{serviceCategoriesCount ?? "--"}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a href="/service-categories" className="text-sm text-white/90 hover:underline">Manage</a>
                <div className="text-xs text-white/80">Updated just now</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition-all bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 4H17V6H7V4Z" fill="currentColor"/>
                      <path d="M5 8H19V20H5V8Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Service Subcategories</h4>
                    <div className="text-xs text-white/80">Total subcategories</div>
                    <div className="mt-2">
                      {serviceSubcategoriesCount != null && (
                        <svg width="80" height="24" viewBox="0 0 80 24" className="inline-block">
                          {Array.from({ length: 6 }).map((_, i) => {
                            const h = Math.max(3, ((serviceSubcategoriesCount || 0) * (i + 1)) % 22 + 3);
                            const x = i * 12;
                            return <rect key={i} x={x} y={24 - h} width={8} height={h} rx={1} fill="#fff7ed" />;
                          })}
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">{serviceSubcategoriesCount ?? "--"}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a href="/service-subcategories" className="text-sm text-white/90 hover:underline">Manage</a>
                <div className="text-xs text-white/80">Updated just now</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl p-5 shadow-lg transform hover:-translate-y-1 transition-all bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                      <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="white" opacity="0.9"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Integrated Services</h4>
                    <div className="text-xs text-white/80">Total integrated services</div>
                    <div className="mt-2">
                      {integratedServicesCount != null && (
                        <svg width="80" height="24" viewBox="0 0 80 24" className="inline-block">
                          {Array.from({ length: 6 }).map((_, i) => {
                            const base = integratedServicesCount || 0;
                            const h = Math.max(3, (base + i * 7) % 24);
                            const x = i * 12;
                            return <rect key={i} x={x} y={24 - h} width={8} height={h} rx={1} fill="#e0f2fe" />;
                          })}
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">{integratedServicesCount ?? "--"}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a href="/integrated-services" className="text-sm text-white/90 hover:underline">Manage</a>
                <div className="text-xs text-white/80">Updated just now</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl p-5 shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/20 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 2H17V4H7V2Z" fill="currentColor"/>
                      <path d="M5 6H19V20H5V6Z" fill="currentColor"/>
                      <path d="M9 10H15V12H9V10Z" fill="white" opacity="0.9"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Recent Registrations</h4>
                    <div className="text-xs text-white/80">Latest four</div>
                  </div>
                </div>
                <a href="/customers" className="text-sm text-white/90 hover:underline">View all</a>
              </div>
              <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto custom-scrollbar pt-2">
                {recentRegs.length === 0 && <li className="text-sm text-gray-500">No recent registrations</li>}
                {recentRegs.map((r, i) => (
                  <li key={r._id || i} className="flex items-center justify-between p-2 rounded-md hover:bg-white/10">
                    <div className="flex items-center gap-3">
                      <img src="/images/user/user-01.jpg" alt="avatar" className="h-9 w-9 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-white">{r.fullName || r.organization || 'Unknown'}</div>
                        <div className="text-xs text-white/80">{r.organization || r.email || ''}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/80">{new Date(r.registrationDate || r.createdAt || Date.now()).toLocaleDateString()}</div>
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
