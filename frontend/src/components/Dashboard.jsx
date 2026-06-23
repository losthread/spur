import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AnalyticsChart from "./Blocks/Chart";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";
import { Trash2, Pencil, Copy, Check, X } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [urls, setUrls] = useState([]);
  const [chartPoints, setChartPoints] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState("");
  const [editingUrlId, setEditingUrlId] = useState(null);
  const [editingNewUrl, setEditingNewUrl] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shortCode, setShortCode] = useState("");
  const [url, setURL] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  // fetch user details
  const getUserDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  const getUrlsDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/users/me/urls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      }
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  const getChartData = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChartPoints(data);
      }
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  const handleCopy = (shortCode) => {
    const fullUrl = `http://localhost:5173/go/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(shortCode);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (shortCode, urlId) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) {
      return;
    }

    setLoadingId(urlId);

    try {
      const response = await fetch(
        `http://localhost:8000/shorten/${shortCode}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok || response.status === 204) {
        // Remove the deleted URL from state
        setUrls((prevUrls) => prevUrls.filter((u) => u.url_id !== urlId));
        setError("");
      } else {
        const errorData = await response.json();
        setError(`Error deleting URL: ${errorData.detail}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  const handleUpdate = async (shortCode, urlId, newUrl) => {
    if (!newUrl.trim()) {
      setError("URL cannot be empty");
      return;
    }

    setLoadingId(urlId);

    try {
      const response = await fetch(
        `http://localhost:8000/shorten/${shortCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url: newUrl }),
        }
      );

      if (response.ok) {
        // Update the URL in the local state
        setUrls((prevUrls) =>
          prevUrls.map((u) =>
            u.url_id === urlId ? { ...u, url: newUrl } : u
          )
        );
        setEditingUrlId(null);
        setEditingNewUrl("");
        setError("");
      } else {
        const errorData = await response.json();
        setError(`Error updating URL: ${errorData.detail}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingUrlId(null);
    setEditingNewUrl("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShortCode("");

    try
    {
      const response = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({url})
      });

      const data = await response.json();

      if (response.ok)
      {
        setShortCode(data.short_code);
        await getUrlsDetails(token);
        await getChartData(token);
      }
      else
      {
        setError(data.detail || "Failed to shorten URL");
      }
    }

    catch (err)
    {
      setError(`Error: ${err}`);
    }

    finally
    {
      setIsLoading(false);
    }
  };

  // call once apis after rendering
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    const refetch = () => {
      getUserDetails(token);
      getUrlsDetails(token);
      getChartData(token);
    }

    refetch(); // initial load
    window.addEventListener("focus", refetch);
    return () => window.removeEventListener("focus", refetch);
  }, []);

  return (
    <section className="px-6 pt-10 mb-15 lg:p-8">
      <div>
        {error && (
          <div className="lg:mb-4 lg:p-4 bg-red-950 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* top left section user + quick overview */}
          <div className="flex flex-3 flex-col gap-4 lg:gap-8">
            <div className="hidden lg:block bg-zinc-950 border border-zinc-800 lg:rounded-xl lg:p-6">
              <h1 className="lg:text-2xl font-semibold">
                Welcome back, {user.username}
              </h1>

              <p className="text-zinc-400 lg:mt-2">
                Manage links, track clicks, and monitor performance from one
                place.
              </p>

              <div className="lg:mt-6 flex flex-col lg:gap-2 text-zinc-500">
                <span>{user.email}</span>

                <span>
                  Member since{" "}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h2 className="lg:text-xl text-center lg:text-left font-semibold mb-4">
                Quick Overview
              </h2>

              <div className="flex flex-col lg:gap-4">
                <div className="flex gap-3 lg:gap-0 lg:flex-col">
                  <p className="text-zinc-500 lg:text-sm">Total Links:</p>
                  <p className="lg:text-2xl font-semibold">{urls.length}</p>
                </div>

                <div className="flex gap-3 lg:gap-0 lg:flex-col">
                  <p className="text-zinc-500 lg:text-sm">Total Clicks:</p>
                  <p className="lg:text-2xl font-semibold">
                    {urls.reduce((sum, url) => sum + url.times_visited, 0)}
                  </p>
                </div>

                <div className="flex gap-3 lg:gap-0 lg:flex-col overflow-scroll">
                  <p className="text-zinc-500 lg:text-sm">Most Popular:</p>

                  <a
                    href={`http://localhost:5173/go/${
                      urls.reduce(
                        (best, current) =>
                          !best || current.times_visited > best.times_visited
                            ? current
                            : best,
                        null
                      )?.short_code
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 lg:text-lg hover:underline"
                  >
                    http://localhost:5173/go/
                    {
                      urls.reduce(
                        (best, current) =>
                          !best || current.times_visited > best.times_visited
                            ? current
                            : best,
                        null
                      )?.short_code || "-"
                    }
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Top right section chart */}
          <div className="flex-7">
            <AnalyticsChart data={chartPoints} />
          </div>
        </div>

        <div className="mt-5 lg:mt-10 flex flex-col gap-10 overflow-x-scroll">
          <form onSubmit={handleShorten}>
            <div className="w-full flex gap-4">
              <Input
                type="url"
                placeholder="https://example.com"
                className="lg:py-5 lg:px-6 overflow-x-scroll rounded-xl lg:text-lg"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-xl lg:text-lg lg:py-5"
              >
                {isLoading ? "Shortening..." : "Shorten"}
              </Button>
            </div>
          </form>

          <Table className='border border-zinc-800 lg:rounded-xl bg-zinc-950 lg:p-2'>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Original URL</TableHead>
                <TableHead>Short URL</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Last Visited</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {urls.map((u) => (
                <TableRow
                  key={u.url_id}
                  className="border-zinc-800 hover:bg-zinc-900/50 overflow-x-scroll"
                >
                  {/* Clickable original URL with edit on hover */}
                  <TableCell>
                    {editingUrlId === u.url_id ? (
                      <div className="flex lg:gap-2">
                        <input
                          type="text"
                          value={editingNewUrl}
                          onChange={(e) => setEditingNewUrl(e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-700 rounded lg:px-2 lg:py-1 text-sm text-white"
                          placeholder="Enter new URL"
                          autoFocus
                        />
                        <button
                          onClick={() =>
                            handleUpdate(u.short_code, u.url_id, editingNewUrl)
                          }
                          disabled={loadingId === u.url_id}
                          className="bg-green-700 hover:bg-green-600 disabled:bg-gray-600 text-white lg:px-2 lg:py-1 rounded lg:text-sm transition"
                        >
                          {loadingId === u.url_id ? "..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-zinc-700 hover:bg-zinc-600 text-white lg:px-2 lg:py-1 rounded lg:text-sm transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center group">
                        <a
                          href={u.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline truncate flex-1"
                        >
                          {u.url}
                        </a>
                        <button
                          className="lg:ml-2 opacity-0 group-hover:opacity-100 transition text-zinc-400 hover:text-white shrink-0"
                          onClick={() => {
                            setEditingUrlId(u.url_id);
                            setEditingNewUrl(u.url);
                          }}
                          title="Edit URL"
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                    )}
                  </TableCell>

                  {/* Short URL */}
                  <TableCell className="font-mono text-amber-500">
                    <a
                      href={`http://localhost:5173/go/${u.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {`http://localhost:5173/go/${u.short_code}`}
                    </a>
                  </TableCell>

                  <TableCell>{u.times_visited}</TableCell>

                  <TableCell>
                    {u.last_visited ? formatDate(u.last_visited) : "-"}
                  </TableCell>

                  <TableCell>{formatDate(u.created_at)}</TableCell>

                  <TableCell>{formatDate(u.updated_at)}</TableCell>

                  {/* Actions: Copy + Delete */}
                  <TableCell className="text-right flex justify-end gap-3">
                    {/* Copy button */}
                    <button
                      className="text-zinc-400 hover:text-white transition disabled:opacity-50"
                      onClick={() => handleCopy(u.short_code)}
                      title="Copy short URL"
                      disabled={loadingId === u.url_id}
                    >
                      {copiedId === u.short_code ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>

                    {/* Delete button */}
                    <button
                      className="text-red-500 hover:text-red-400 transition disabled:opacity-50"
                      onClick={() => handleDelete(u.short_code, u.url_id)}
                      title="Delete URL"
                      disabled={loadingId === u.url_id}
                    >
                      {loadingId === u.url_id ? (
                        <span className="lg:text-xs">...</span>
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
