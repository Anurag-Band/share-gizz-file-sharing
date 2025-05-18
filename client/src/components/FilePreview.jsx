import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { deleteFile } from "../redux/slice/fileSlice";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaDownload,
  FaCopy,
  FaEllipsisV,
  FaTrash,
  FaFile,
  FaFileImage,
  FaFileVideo,
  FaFilePdf,
  FaFileAlt,
  FaQrcode,
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./filePreview.css";

const FilePreview = () => {
  const { files } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(null);
  const qrCodeRef = useRef({});

  // Log files for debugging
  useEffect(() => {
    console.log("Files in preview:", files);
  }, [files]);

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertSVGToCanvas = (svgElement) => {
    return new Promise((resolve, reject) => {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };

      img.onerror = reject;
      img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
    });
  };

  const handleDownloadQR = async (path) => {
    const qrSvg = qrCodeRef.current[path].querySelector("svg");
    if (qrSvg) {
      try {
        const canvas = await convertSVGToCanvas(qrSvg);
        const qrImageUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = qrImageUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error converting SVG to Canvas:", error);
      }
    } else {
      console.error("QR SVG not found");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(index));
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Function to get the appropriate file icon based on file type
  const getFileIcon = (fileType) => {
    if (!fileType) return <FaFileAlt className="text-gray-500" size={24} />;

    if (fileType.startsWith("image/"))
      return <FaFileImage className="text-green-500" size={24} />;
    if (fileType.startsWith("video/"))
      return <FaFileVideo className="text-purple-500" size={24} />;
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-red-500" size={24} />;

    return <FaFile className="text-blue-500" size={24} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
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
              to="/upload"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium transition-all duration-300"
            >
              Upload More
            </Link>
            <Link
              to="/dashboard"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium transition-all duration-300"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 animate-fadeIn max-w-6xl mx-auto w-full">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Your Uploaded Files
          </h2>
          <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </div>

        {files.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FaFileAlt />
            </div>
            <h3 className="empty-state-text">No files uploaded yet</h3>
            <Link to="/upload" className="empty-state-button">
              Upload Your First File
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6 overflow-visible">
            <div className="custom-scrollbar overflow-visible">
              <table className="modern-table overflow-visible">
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Uploaded</th>
                    <th>Preview</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files?.map((file, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center">
                          <div className="file-icon bg-blue-50 mr-3">
                            {getFileIcon(file?.data?.type)}
                          </div>
                          <div
                            className="truncate max-w-[200px]"
                            title={file?.data?.name || "Unknown"}
                          >
                            {file?.data?.name || "Unknown"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                          {file?.data?.type?.split("/")[1]?.toUpperCase() ||
                            "Unknown"}
                        </span>
                      </td>
                      <td>
                        {file?.data?.size
                          ? (file.data.size / (1024 * 1024)).toFixed(2) + " MB"
                          : "Unknown"}
                      </td>
                      <td>
                        {file?.data?.createdAt
                          ? new Date(file.data.createdAt).toLocaleString()
                          : "Unknown"}
                      </td>
                      <td>
                        {file?.data?.type?.startsWith("image") ? (
                          <div className="file-preview-image">
                            <img
                              src={file?.path}
                              alt={file?.data?.name || "File"}
                              className="h-16 w-16 object-cover rounded"
                            />
                          </div>
                        ) : file?.data?.type?.startsWith("video") ? (
                          <div className="file-preview-image">
                            <video
                              src={file?.path}
                              className="h-16 w-16 object-cover rounded"
                              controls
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No preview
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleDownload(file?.path, file?.data.name)
                            }
                            className="action-button bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full"
                            title="Download"
                          >
                            <FaDownload size={16} />
                          </button>

                          <button
                            onClick={() => handleCopyUrl(file?.path)}
                            className="action-button bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-full"
                            title="Copy URL"
                          >
                            <FaCopy size={16} />
                          </button>

                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(index)}
                              className="action-button bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-2 rounded-full"
                              title="More Actions"
                            >
                              <FaEllipsisV size={16} />
                            </button>

                            {openDropdown === index && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[1000] py-2 transform translate-y-0">
                                <button
                                  onClick={() => handleDownloadQR(file?.path)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                >
                                  <FaQrcode className="mr-2 text-blue-500" />
                                  Download QR
                                  <div
                                    ref={(el) =>
                                      (qrCodeRef.current[file?.path] = el)
                                    }
                                    style={{ display: "none" }}
                                  >
                                    <QRCode value={file?.path} />
                                  </div>
                                </button>

                                <div className="border-t border-gray-100 my-1"></div>

                                <div className="px-4 py-2">
                                  <p className="text-xs text-gray-500 mb-2">
                                    Share via:
                                  </p>
                                  <div className="flex space-x-3">
                                    <FacebookShareButton
                                      url={file?.path}
                                      className="share-button"
                                    >
                                      <FaFacebook
                                        className="text-blue-600"
                                        size={20}
                                      />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                      url={file?.path}
                                      className="share-button"
                                    >
                                      <FaTwitter
                                        className="text-blue-400"
                                        size={20}
                                      />
                                    </TwitterShareButton>
                                    <WhatsappShareButton
                                      url={file?.path}
                                      className="share-button"
                                    >
                                      <FaWhatsapp
                                        className="text-green-500"
                                        size={20}
                                      />
                                    </WhatsappShareButton>
                                  </div>
                                </div>

                                <div className="border-t border-gray-100 my-1"></div>

                                <button
                                  onClick={() => handleDelete(index)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <FaTrash className="mr-2" />
                                  Delete File
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default FilePreview;
