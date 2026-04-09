import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function AdminResults() {
  const [data, setData] = useState<any>({ responses: [], contractResults: [], surveys: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type: string, id: string | number) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  if (loading) return <div className="p-8">Loading data...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Data Viewer (Local SQLite)</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Questionnaire Responses ({data.responses.length})</h2>
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Completed</th>
                <th className="px-4 py-3">Recommendation</th>
                <th className="px-4 py-3">Scores (Var,V1,V3,Dyn)</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.responses.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 truncate max-wxs" title={item.id}>{item.id.substring(0,8)}...</td>
                  <td className="px-4 py-3">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{item.is_completed ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{item.recommended_contract_type || '-'}</td>
                  <td className="px-4 py-3">
                    {item.score_variabel?.toFixed(1) || 0}, {item.score_vast1?.toFixed(1) || 0}, {item.score_vast3?.toFixed(1) || 0}, {item.score_dynamisch?.toFixed(1) || 0}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('responses', item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {data.responses.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contract Results Analysis ({data.contractResults.length})</h2>
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Response ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Recommended</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.contractResults.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3 truncate max-wxs" title={item.response_id}>{item.response_id?.substring(0,8)}...</td>
                  <td className="px-4 py-3">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{item.recommended_type}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('contract-results', item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {data.contractResults.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Feedback Surveys ({data.surveys.length})</h2>
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Question</th>
                <th className="px-4 py-3">Answer / Rating</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.surveys.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 max-w-md truncate" title={item.question_text}>{item.question_text}</td>
                  <td className="px-4 py-3">
                    {item.answer_type === 'rating' ? (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">{item.rating} / 5</span>
                    ) : (
                      <span title={item.answer_text} className="truncate inline-block max-w-[200px]">{item.answer_text || '-'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('survey', item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {data.surveys.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
