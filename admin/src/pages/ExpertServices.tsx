import PageMeta from "../components/common/PageMeta";
import { useEffect, useState } from "react";
import { apiPath } from "../config/api";
import Button from "../components/ui/button/Button";
import Alert from "../components/ui/alert/Alert";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

type Service = { _id?: string; serviceName: string };

export default function ExpertServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const qParam = query ? `&q=${encodeURIComponent(query)}` : "";
      const res = await fetch(apiPath(`/expert-services?page=${page}&limit=${limit}${qParam}`));
      const text = await res.text().catch(() => "");
      let j: any = {};
      try {
        j = text ? JSON.parse(text) : {};
      } catch (e) {
        return setError(`Failed to load expert services: ${res.status} ${text.slice(0, 300)}`);
      }
      if (j && j.success && Array.isArray(j.data)) {
        setServices(j.data);
        setTotal(typeof j.total === 'number' ? j.total : j.data.length);
      } else {
        return setError(j?.error || `Failed to load expert services: ${res.status} ${JSON.stringify(j).slice(0,300)}`);
      }
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, [page, query]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(null), 3500);
      return () => clearTimeout(t);
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const openAdd = () => { setEditing(null); setName(''); setShowModal(true); };
  const openEdit = (s: Service) => { setEditing(s); setName(s.serviceName); setShowModal(true); };

  const save = async () => {
    if (!name.trim()) return setError('Expert service name required');
    try {
      const body = { serviceName: name.trim() };
      let res;
      if (editing && editing._id) {
        res = await fetch(apiPath(`/expert-services/${editing._id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        res = await fetch(apiPath(`/expert-services`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      const text = await res.text().catch(() => "");
      let j: any = {};
      try { j = text ? JSON.parse(text) : {}; } catch (e) {
        return setError(`Save failed: ${res.status} ${text.slice(0,300)}`);
      }
      if (!j || !j.success) return setError(j?.error || `Save failed: ${res.status}`);
      setShowModal(false);
      setSuccess(editing ? 'Expert service updated' : 'Expert service created');
      fetchServices();
    } catch (e: any) {
      setError(e.message || String(e));
    }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this expert service?')) return;
    try {
      const res = await fetch(apiPath(`/expert-services/${id}`), { method: 'DELETE' });
      const text = await res.text().catch(() => "");
      let j: any = {};
      try { j = text ? JSON.parse(text) : {}; } catch (e) {
        return setError(`Delete failed: ${res.status} ${text.slice(0,300)}`);
      }
      if (!j || !j.success) return setError(j?.error || `Delete failed: ${res.status}`);
      setSuccess('Expert service deleted');
      const remaining = total - 1;
      const totalPages = Math.max(1, Math.ceil(remaining / limit));
      if (page > totalPages) setPage(totalPages);
      fetchServices();
    } catch (e: any) {
      setError(e.message || String(e));
    }
  };

  return (
    <>
      <PageMeta title="Expert Services" description="Expert services management" />
      <PageBreadcrumb pageTitle="Expert Services" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Expert Services</h3>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Search expert services"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  className="form-input rounded-md border px-3 py-1 text-sm"
                />
                <Button size="sm" variant="primary" onClick={openAdd}>Add New Expert Service</Button>
              </div>
            </div>

            {loading && <div>Loading...</div>}
            {success && <div className="mb-3"><Alert variant="success" title="Success" message={success} /></div>}
            {error && <div className="mb-3"><Alert variant="error" title="Error" message={error} /></div>}

            {!loading && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">SL No</th>
                      <th className="py-2">Expert Service Name</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s, idx) => (
                      <tr key={s._id} className="border-t">
                        <td className="py-2">{idx + 1}</td>
                        <td className="py-2">{s.serviceName}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              startIcon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                  <path d="M12 20h9" />
                                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                </svg>
                              }
                              onClick={() => openEdit(s)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              startIcon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                  <path d="M10 11v6" />
                                  <path d="M14 11v6" />
                                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                                </svg>
                              }
                              className="text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50"
                              onClick={() => remove(s._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {services.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-sm text-gray-500">No expert services found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                    <div className="text-sm">Page {page} / {Math.max(1, Math.ceil(total / limit))}</div>
                    <button
                      className="btn btn-sm"
                      onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / limit)), p + 1))}
                      disabled={page >= Math.max(1, Math.ceil(total / limit))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100000] overflow-auto flex items-start md:items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Expert Service' : 'Add Expert Service'}</h3>
              <Button size="sm" variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            </div>
            <div className="space-y-3">
              <label className="text-xs text-gray-500">Expert Service Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="form-input w-full rounded-md border px-3 py-2" />
              <div className="flex items-center justify-end gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button size="sm" variant="primary" onClick={save}>{editing ? 'Update' : 'Create'}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
