import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFiles } from "../../redux/slice/file/fileThunk";
import { formatDistanceToNowStrict, differenceInDays } from "date-fns";
import {
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaFilePdf,
  FaFile,
  FaDownload,
  FaShare,
  FaEye,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";

const FileShow = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { files } = useSelector((state) => state.file);
  const [previewFile, setPreviewFile] = useState(null);
  const [shareFile, setShareFile] = useState(null);

  useEffect(() => {
    if (user) {
      const userId = user.id || user._id;
      if (userId) {
        console.log("Dispatching getUserFiles with ID:", userId);
        dispatch(getUserFiles(userId));
      } else {
        console.error("No valid user ID found in user object:", user);
      }
    }
  }, [user, dispatch]);

  const handleShare = (url) => {
    const encodedURL = encodeURIComponent(url);
    return {
      whatsapp: `https://wa.me/?text=${encodedURL}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      email: `mailto:?subject=File%20Share&body=Here's%20your%20file:%20${encodedURL}`,
      qr: `https://api.qrserver.com/v1/create-qr-code/?data=${encodedURL}&size=150x150`,
    };
  };

  // Function to get the appropriate file icon based on file type
  const getFileIcon = (fileType) => {
    if (!fileType) return <FaFileAlt className="text-gray-500" />;

    if (fileType.startsWith("image/"))
      return <FaFileImage className="text-green-500" />;
    if (fileType.startsWith("video/"))
      return <FaFileVideo className="text-purple-500" />;
    if (fileType.includes("pdf")) return <FaFilePdf className="text-red-500" />;

    return <FaFile className="text-blue-500" />;
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
          Your Uploaded Files
        </h2>
        <div className="ml-4 h-0.5 flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
      </div>

      {!files || files.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl text-gray-300 mb-4">
            <FaFileAlt />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            No files uploaded yet
          </h3>
          <p className="text-gray-500 mb-6">
            Upload your first file to get started
          </p>
          <button
            onClick={() =>
              document.querySelector('[data-tab="upload"]')?.click()
            }
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Upload Your First File
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files?.map((file) => {
                  const shareLinks = handleShare(file.shortUrl);
                  return (
                    <tr
                      key={file._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            {getFileIcon(file.type)}
                          </div>
                          <div
                            className="text-sm font-medium text-gray-900 truncate max-w-[150px]"
                            title={file.name}
                          >
                            {file.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {file.type?.split("/")[1]?.toUpperCase() || file.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaDownload className="text-gray-400 mr-2" />
                          {file.downloadedContent || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {file.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none transition"
                        >
                          <FaEye className="mr-1" /> Preview
                        </button>
                        <button
                          onClick={() => setShareFile(file)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none transition"
                        >
                          <FaShare className="mr-1" /> Share
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {differenceInDays(
                          new Date(file.expiresAt),
                          new Date()
                        ) > 0 ? (
                          <span className="text-green-600">
                            {differenceInDays(
                              new Date(file.expiresAt),
                              new Date()
                            )}{" "}
                            days
                          </span>
                        ) : (
                          <span className="text-red-600">Expired</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDistanceToNowStrict(new Date(file.createdAt), {
                          addSuffix: true,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                {getFileIcon(previewFile.type)}
                <span className="ml-2">{previewFile.name}</span>
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src={previewFile.path}
                title="File Preview"
                className="w-full h-96 border-0"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:shadow-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Share "{shareFile.name}"
              </h3>
              <button
                onClick={() => setShareFile(null)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Share link:</p>
                <div className="flex items-center bg-white border rounded-md overflow-hidden">
                  <input
                    type="text"
                    value={shareFile.shortUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareFile.shortUrl);
                      alert("Link copied to clipboard!");
                    }}
                    className="bg-gray-100 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href={handleShare(shareFile.shortUrl).whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <FaWhatsapp size={24} className="text-green-600 mb-1" />
                  <span className="text-xs text-gray-600">WhatsApp</span>
                </a>
                <a
                  href={handleShare(shareFile.shortUrl).facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <FaFacebook size={24} className="text-blue-600 mb-1" />
                  <span className="text-xs text-gray-600">Facebook</span>
                </a>
                <a
                  href={handleShare(shareFile.shortUrl).email}
                  className="flex flex-col items-center justify-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition"
                >
                  <FaEnvelope size={24} className="text-red-600 mb-1" />
                  <span className="text-xs text-gray-600">Email</span>
                </a>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  QR Code:
                </p>
                <div className="flex justify-center bg-white p-3 border rounded-lg">
                  <img
                    src={handleShare(shareFile.shortUrl).qr}
                    alt="QR Code"
                    className="h-32 w-32"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShareFile(null)}
                className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-md hover:shadow-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileShow;
