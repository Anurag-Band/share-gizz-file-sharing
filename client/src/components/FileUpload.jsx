import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../redux/slice/fileThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { SiSharex } from "react-icons/si";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaImage,
  FaVideo,
  FaFileArchive,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
} from "react-icons/fa";
import "./fileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, uploadProgress } = useSelector((state) => state.file);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Auth state:", auth);
  }, [auth]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const getFileIcon = () => {
    if (!file) return <FaCloudUploadAlt className="text-blue-500" size={48} />;

    const fileType = file.type;

    if (fileType.startsWith("image/"))
      return <FaImage className="text-green-500" size={48} />;
    if (fileType.startsWith("video/"))
      return <FaVideo className="text-purple-500" size={48} />;
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-red-500" size={48} />;
    if (fileType.includes("word") || fileType.includes("document"))
      return <FaFileWord className="text-blue-700" size={48} />;
    if (fileType.includes("excel") || fileType.includes("sheet"))
      return <FaFileExcel className="text-green-700" size={48} />;
    if (fileType.includes("powerpoint") || fileType.includes("presentation"))
      return <FaFilePowerpoint className="text-orange-600" size={48} />;
    if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileType.includes("compressed")
    )
      return <FaFileArchive className="text-yellow-600" size={48} />;

    return <FaFileAlt className="text-gray-500" size={48} />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Keep the dropzone for compatibility
  const { getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
      "application/pdf": [],
    },
    maxSize: 1024 * 1024 * 1024, // 1GB max size
    onDrop: (acceptedFiles) => {
      processFile(acceptedFiles[0]);
    },
    noClick: true, // We'll handle clicks manually
    noKeyboard: true,
  });

  const handleUpload = async () => {
    if (file) {
      // Get user ID from auth state
      const userId = auth.user?._id || auth.user?.id;

      console.log("User ID for upload:", userId);

      if (!userId) {
        toast.error("You must be logged in to upload files");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

        // Add additional metadata
        formData.append("customFileName", file.name);

        console.log(
          "Uploading file:",
          file.name,
          "Size:",
          file.size,
          "Type:",
          file.type
        );

        const response = await dispatch(uploadFile(formData));

        if (response.error) {
          toast.error(
            `File upload failed: ${
              response.payload?.error ||
              response.error.message ||
              "Server error"
            }`
          );
        } else {
          console.log("Upload successful, response:", response);
          toast.success("File uploaded successfully!");

          // Short delay to ensure state is updated
          setTimeout(() => {
            navigate("/preview");
          }, 500);
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("An unexpected error occurred during upload");
      }
    } else {
      toast.warning("Please select a file to upload");
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-4 px-4 md:px-8 lg:px-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Share Gizz
              </h1>
            </Link>
            <p className="ml-4 hidden md:block text-blue-100">
              Share files effortlessly, anywhere, anytime
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/dashboard"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium transition-all duration-300"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 animate-fadeIn max-w-6xl mx-auto w-full">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Upload Files
          </h2>
          <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                } transition-colors cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center py-6">
                  {getFileIcon()}

                  <h3 className="mt-4 text-xl font-medium text-gray-700">
                    {file ? file.name : "Drag & Drop your file here"}
                  </h3>

                  {file ? (
                    <p className="mt-1 text-sm text-gray-500">
                      {formatFileSize(file.size)} •{" "}
                      {file.type || "Unknown type"}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">
                      or click to browse files from your computer
                    </p>
                  )}

                  {loading && (
                    <div className="w-full mt-6">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {previewUrl && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                    Preview:
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-h-96 object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className={`w-full px-6 py-3 text-white font-medium rounded-xl shadow-sm transition-all duration-300 ${
                    !file || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg transform hover:-translate-y-1"
                  }`}
                >
                  {loading ? "Uploading..." : "Upload File"}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Upload Tips
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Select or drag a file
                    </h4>
                    <p className="text-xs text-gray-500">
                      Choose a file from your device or drag it into the upload
                      area.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Check file details
                    </h4>
                    <p className="text-xs text-gray-500">
                      Verify the file name, size, and type before uploading.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Click upload
                    </h4>
                    <p className="text-xs text-gray-500">
                      Click the upload button to start the upload process.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  Supported File Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white text-xs text-gray-700 rounded border border-gray-200">
                    Images
                  </span>
                  <span className="px-2 py-1 bg-white text-xs text-gray-700 rounded border border-gray-200">
                    Videos
                  </span>
                  <span className="px-2 py-1 bg-white text-xs text-gray-700 rounded border border-gray-200">
                    Documents
                  </span>
                  <span className="px-2 py-1 bg-white text-xs text-gray-700 rounded border border-gray-200">
                    Archives
                  </span>
                  <span className="px-2 py-1 bg-white text-xs text-gray-700 rounded border border-gray-200">
                    PDFs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>

      <Footer />
    </div>
  );
};

export default FileUpload;
