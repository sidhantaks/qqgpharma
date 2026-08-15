import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import Button from "../components/ui/button/Button";
import Alert from "../components/ui/alert/Alert";

type Category = { _id?: string; name: string };

export default function ServiceCategories() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const tryApi = async (url: string) => {
        const res = await fetch(url);
        const text = await res.text().catch(() => "");
        let j: any = {};
        try { j = text ? JSON.parse(text) : {}; } catch (e) { throw new Error(`Invalid JSON from ${url}`); }
        return { ok: res.ok, body: j };
      };

      let result = await tryApi(apiPath(`/service-categories`));
      // fallback to same proxied API path (no external debug server)
      if ((!result.ok || !result.body?.success) && result.body?.error === 'Not Found') {
        result = await tryApi(`/api/service-categories`);
      }
      if (result.body && result.body.success && Array.isArray(result.body.data)) {
        setItems(result.body.data);
      } else {
        return setError(result.body?.error || 'Failed to load categories');
      }
    } catch (e: any) {
      setError(e.message || String(e));
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  useEffect(() => { if (success) { const t = setTimeout(() => setSuccess(null), 3000); return () => clearTimeout(t); } }, [success]);
  useEffect(() => { if (error) { const t = setTimeout(() => setError(null), 5000); return () => clearTimeout(t); } }, [error]);

  const openAdd = () => { setEditing(null); setName(''); setShowModal(true); };
  const openEdit = (c: Category) => { setEditing(c); setName(c.name); setShowModal(true); };

  const save = async () => {
    if (!name.trim()) return setError('Category name required');
    try {
      const body = { name: name.trim() };
      let res;
      if (editing && editing._id) {
        res = await fetch(apiPath(`/service-categories/${editing._id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        res = await fetch(apiPath(`/service-categories`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      const text = await res.text().catch(() => "");
      let j: any = {}; try { j = text ? JSON.parse(text) : {}; } catch (e) { return setError(`Save failed: ${res.status} ${text.slice(0,300)}`); }
      if (!j || !j.success) return setError(j?.error || `Save failed: ${res.status}`);
      setShowModal(false);
      setSuccess(editing ? 'Category updated' : 'Category created');
      fetchItems();
    } catch (e: any) { setError(e.message || String(e)); }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this category?')) return;
    try {
      const res = await fetch(apiPath(`/service-categories/${id}`), { method: 'DELETE' });
      const text = await res.text().catch(() => "");
      let j: any = {}; try { j = text ? JSON.parse(text) : {}; } catch (e) { return setError(`Delete failed: ${res.status} ${text.slice(0,300)}`); }
      if (!j || !j.success) return setError(j?.error || `Delete failed: ${res.status}`);
      setSuccess('Category deleted');
      fetchItems();
    } catch (e: any) { setError(e.message || String(e)); }
  };

  return (
    <>
      <PageMeta title="Service Categories" description="Manage service categories" />
      <PageBreadcrumb pageTitle="Service Categories" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Service Categories</h3>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="primary" onClick={openAdd}>Add New Category</Button>
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
                      <th className="py-2">Category Name</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c, idx) => (
                      <tr key={c._id} className="border-t">
                        <td className="py-2">{idx + 1}</td>
                        <td className="py-2">{c.name}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEdit(c)}>Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => remove(c._id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-sm text-gray-500">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100000] overflow-auto flex items-start md:items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Category' : 'Add Category'}</h3>
              <Button size="sm" variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            </div>
            <div className="space-y-3">
              <label className="text-xs text-gray-500">Category Name</label>
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
