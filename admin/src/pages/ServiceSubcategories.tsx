import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import { apiPath } from "../config/api";
import Button from "../components/ui/button/Button";
import Alert from "../components/ui/alert/Alert";

type Category = { _id?: string; name: string };
type Subcategory = { _id?: string; name: string; category?: Category | string };

export default function ServiceSubcategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Subcategory | null>(null);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const fetchCategories = async () => {
    try {
      try {
        const res = await fetch(apiPath(`/service-categories`));
        const j = await res.json().catch(() => ({}));
        if (j && j.success && Array.isArray(j.data)) { setCategories(j.data); return; }
      } catch (e) { /* ignore */ }
      // fallback to proxied API
      const fallback = await fetch('/api/service-categories').then(r=>r.json()).catch(()=>({}));
      if (fallback && fallback.success && Array.isArray(fallback.data)) setCategories(fallback.data);
    } catch (e) { }
  };

  const fetchItems = async () => {
    setLoading(true); setError(null);
    try {
      let res = await fetch(apiPath(`/service-subcategories`));
      let text = await res.text().catch(() => "");
      let j: any = {}; try { j = text ? JSON.parse(text) : {}; } catch (e) { return setError(`Failed to load: ${res.status} ${text.slice(0,300)}`); }
      if ((!res.ok || !j?.success) && j?.error === 'Not Found') {
        res = await fetch('/api/service-subcategories');
        text = await res.text().catch(() => "");
        j = text ? JSON.parse(text) : {};
      }
      if (j && j.success && Array.isArray(j.data)) setItems(j.data);
      else return setError(j?.error || `Failed to load: ${res.status}`);
    } catch (e: any) { setError(e.message || String(e)); } finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); fetchItems(); }, []);
  useEffect(() => { if (success) { const t = setTimeout(() => setSuccess(null), 3000); return () => clearTimeout(t); } }, [success]);
  useEffect(() => { if (error) { const t = setTimeout(() => setError(null), 5000); return () => clearTimeout(t); } }, [error]);

  const openAdd = () => { setEditing(null); setName(''); setCategoryId(categories[0]?._id); setShowModal(true); };
  const openEdit = (s: Subcategory) => { setEditing(s); setName(s.name); setCategoryId(typeof s.category === 'string' ? s.category : (s.category?._id)); setShowModal(true); };

  const save = async () => {
    if (!name.trim() || !categoryId) return setError('Category and subcategory name required');
    try {
      const body = { categoryId, name: name.trim() };
      let res;
      if (editing && editing._id) {
        res = await fetch(apiPath(`/service-subcategories/${editing._id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        res = await fetch(apiPath(`/service-subcategories`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      const text = await res.text().catch(() => ""); let j: any = {}; try { j = text ? JSON.parse(text) : {}; } catch (e) { return setError(`Save failed: ${res.status} ${text.slice(0,300)}`); }
      if (!j || !j.success) return setError(j?.error || `Save failed: ${res.status}`);
      setShowModal(false); setSuccess(editing ? 'Subcategory updated' : 'Subcategory created'); fetchItems();
    } catch (e: any) { setError(e.message || String(e)); }
  };

  const remove = async (id?: string) => {
    if (!id) return; if (!confirm('Delete this subcategory?')) return;
    try {
      const res = await fetch(apiPath(`/service-subcategories/${id}`), { method: 'DELETE' });
      const text = await res.text().catch(() => ""); let j: any = {}; try { j = text ? JSON.parse(text) : {}; } catch (e) { return setError(`Delete failed: ${res.status} ${text.slice(0,300)}`); }
      if (!j || !j.success) return setError(j?.error || `Delete failed: ${res.status}`);
      setSuccess('Subcategory deleted'); fetchItems();
    } catch (e: any) { setError(e.message || String(e)); }
  };

  return (
    <>
      <PageMeta title="Service Subcategories" description="Manage service subcategories" />
      <PageBreadcrumb pageTitle="Service Subcategories" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Service Subcategories</h3>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="primary" onClick={openAdd}>Add New Subcategory</Button>
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
                      <th className="py-2">Category</th>
                      <th className="py-2">Subcategory Name</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((s, idx) => (
                      <tr key={s._id} className="border-t">
                        <td className="py-2">{idx + 1}</td>
                        <td className="py-2">{typeof s.category === 'string' ? s.category : s.category?.name}</td>
                        <td className="py-2">{s.name}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEdit(s)}>Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => remove(s._id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-sm text-gray-500">No subcategories found.</td>
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
              <h3 className="text-lg font-semibold">{editing ? 'Edit Subcategory' : 'Add Subcategory'}</h3>
              <Button size="sm" variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            </div>
            <div className="space-y-3">
              <label className="text-xs text-gray-500">Category</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-input w-full rounded-md border px-3 py-2">
                <option value="">Select category</option>
                {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
              </select>
              <label className="text-xs text-gray-500">Subcategory Name</label>
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
