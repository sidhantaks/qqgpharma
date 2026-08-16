import { useEffect, useMemo, useState } from "react";
import PageMeta from "../components/common/PageMeta";
import Button from "../components/ui/button/Button";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

type Customer = any;

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Customer | null>(null);
  

  useEffect(() => {
    let cancelled = false;
    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const qParam = query ? `&q=${encodeURIComponent(query)}` : "";
        const url = `/api/registration?page=${page}&limit=${pageSize}${qParam}`;
        const res = await fetch(url);
        const text = await res.text().catch(() => "");
        let j: any = {};
        try {
          j = text ? JSON.parse(text) : {};
        } catch (e) {
          throw new Error("Invalid JSON response from server: " + text.slice(0, 200));
        }

        if (cancelled) return;

        if (j && j.success && Array.isArray(j.data)) {
          setCustomers(j.data);
          setTotal(typeof j.total === 'number' ? j.total : j.data.length);
        } else if (Array.isArray(j)) {
          setCustomers(j);
          setTotal(j.length);
        } else {
          setCustomers([]);
          setTotal(0);
          setError("Failed to load customers");
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPage();
    return () => {
      cancelled = true;
    };
  }, [page, query]);

  

  // Server-side pagination: `customers` already contains current page items
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = customers;

  const formatLabel = (k: string) => {
    if (!k) return "";
    // replace underscores/dashes with spaces
    let s = k.replace(/[_-]+/g, " ");
    // split camelCase: fooBar -> foo Bar
    s = s.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    s = s.replace(/\s+/g, " ").trim();
    const words = s.split(" ").filter(Boolean).slice(0, 2);
    return words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const LABEL_OVERRIDES: { [k: string]: string } = {
    fullName: "Full Name",
    registrationDate: "Registration Date",
    numberOfEmployees: "Number Of Employees",
    userCategory: "User Category",
    userCategoryOther: "User Category Other",
    primaryMobile: "Primary Mobile",
    alternateMobile: "Alternate Mobile",
    registrationNumber: "Registration Number",
    title: "Title",
    password: "Password",
  };

  const formatDateDMY = (val: any) => {
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val || "");
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const displayEntries = useMemo(() => {
    if (!selected) return [] as { key: string; label: string; value: any }[];
    const used = new Set<string>();
    const out: { key: string; label: string; value: any }[] = [];

    // Combine title + fullName into Full Name
    const title = selected.title || "";
    const fullname = selected.fullName || "";
    if (title || fullname) {
      out.push({ key: 'fullName', label: LABEL_OVERRIDES.fullName || formatLabel('fullName'), value: `${title ? title + ' ' : ''}${fullname}`.trim() });
      used.add('title');
      used.add('fullName');
    }

    for (const [k, v] of Object.entries(selected)) {
      if (!k) continue;
      // hide internal, sensitive or removed fields
      if (['_id', 'title', 'fullName', 'username', 'password', 'createdAt', 'created_at', '__v', 'v', 'keywords', 'education', 'servicesRequired', 'servicesOffered', 'availability', 'consultationCharges'].includes(k)) continue;
      if (used.has(k)) continue;
      let label = LABEL_OVERRIDES[k] || formatLabel(k);
      // avoid duplicate labels
      if (out.some((e) => e.label === label)) continue;

      let value: any = v;
      if (k === 'registrationDate') value = formatDateDMY(v);
      out.push({ key: k, label, value });
      used.add(k);
    }

    return out;
  }, [selected]);

  return (
    <>
      <PageMeta title="Customers List" description="Customer management" />
      <PageBreadcrumb pageTitle="Customers List" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Customers List</h3>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  className="form-input rounded-md border px-3 py-1 text-sm"
                />               
              </div>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">SL No</th>
                      <th className="py-2">Name</th>
                      <th className="py-2">Organization</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Mobile</th>
                      <th className="py-2">Category</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((c, idx) => (
                      <tr key={c._id} className="border-t">
                        <td className="py-2">{(page - 1) * pageSize + idx + 1}</td>
                        <td className="py-2">{c.fullName || "—"}</td>
                        <td className="py-2">{c.organization || "—"}</td>
                        <td className="py-2">{c.email || "—"}</td>
                        <td className="py-2">{c.primaryMobile || c.alternateMobile || "—"}</td>
                        <td className="py-2">{c.userCategory || "—"}</td>
                        <td className="py-2">
                          <Button
                            size="sm"
                            variant="primary"
                            startIcon={
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            }
                            onClick={() => setSelected(c)}
                            className=""
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {pageItems.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-4 text-center text-sm text-gray-500">
                          No customers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">Showing {total} results</div>
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <div className="text-sm">Page {page} / {totalPages}</div>
                <button
                  className="btn btn-sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100000] overflow-auto flex items-start md:items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold"><u>{(selected.title || selected.fullName) ? 'Customer Details' : ''}</u></h3>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button size="sm" variant="outline" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {displayEntries.map(({ key, label, value }) => (
                <div key={key}>
                  <div className="text-xs text-gray-400">{label}</div>
                  <div className="font-medium break-words">{String(value ?? '')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
