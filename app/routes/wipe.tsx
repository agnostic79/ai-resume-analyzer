import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <h2>
        Authenticated as: <span className="font-semibold">{auth.user?.username}</span>
      </h2>
      <div className="text-xl  text-gray-700">Existing files:</div>
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <div key={file.id} className="flex flex-row gap-4">
            <p className="text-sm">{file.name}</p>
          </div>
        ))}
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => handleDelete()}>
          Wipe App Data
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
