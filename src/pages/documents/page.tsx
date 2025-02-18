// import { useState, DragEvent } from "react";
// import {
//   ArchiveBoxIcon,
//   PencilIcon,
//   TrashIcon,
//   EyeIcon,
//   PlusIcon,
//   FolderIcon,
//   DocumentArrowDownIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { useDocument } from "../../hooks/useDoc";

// const DocumentVaultPage = () => {
//   const {
//     state: { documents, folders, selectedFolderId, searchTerm, isLoading },
//     uploadDocuments,
//     deleteDocument,
//     createFolder,
//     setSelectedFolder,
//     setSearchTerm,
//   } = useDocument();

//   const [isDragging, setIsDragging] = useState(false);
//   const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
//   const [folderName, setFolderName] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Get current folder name
//   const getCurrentFolder = () => {
//     return (
//       folders.find((f) => f.id === selectedFolderId) || {
//         id: "root",
//         name: "All Documents",
//       }
//     );
//   };

//   // Filter documents based on selected folder and search term
//   const filteredDocuments = documents.filter((doc) => {
//     // For "All Documents", show all documents regardless of folder
//     const matchesFolder =
//       selectedFolderId === "root"
//         ? true // Show all documents in root folder
//         : doc.folderId === selectedFolderId;

//     const matchesSearch = doc.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     return matchesFolder && matchesSearch;
//   });

//   const handleFileUpload = (files: FileList) => {
//     // Files will be uploaded to the currently selected folder
//     uploadDocuments(files);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleFileUpload(e.dataTransfer.files);
//       e.dataTransfer.clearData();
//     }
//   };

//   const handleCreateFolder = async () => {
//     if (folderName.trim()) {
//       await createFolder(folderName);
//       setFolderName("");
//       setShowCreateFolderModal(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-semibold text-gray-900">
//                 Manage Documents
//               </h1>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? (
//                 <XMarkIcon className="h-6 w-6" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6" />
//               )}
//             </button>

//             {/* Desktop Search */}
//             <div className="hidden sm:block">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search documents"
//                   className="w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none text-sm"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <DocumentMagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-2 text-gray-500" />
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="sm:hidden border-t border-gray-200 py-4">
//               <div className="space-y-4">
//                 {/* Mobile Search */}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search documents"
//                     className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none text-sm"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <DocumentMagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-2 text-gray-500" />
//                 </div>

//                 {/* Mobile Actions */}
//                 <div className="flex flex-col space-y-2">
//                   <label className="block">
//                     <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg w-full justify-center">
//                       <PlusIcon className="w-5 h-5 mr-2" />
//                       Upload Document
//                     </span>
//                     <input
//                       type="file"
//                       multiple
//                       className="hidden"
//                       onChange={(e) => {
//                         if (e.target.files) handleFileUpload(e.target.files);
//                       }}
//                     />
//                   </label>
//                   <button
//                     onClick={() => setShowCreateFolderModal(true)}
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg justify-center"
//                   >
//                     <FolderIcon className="w-5 h-5 mr-2" />
//                     New Folder
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Desktop Actions Bar */}
//         <div className="hidden sm:flex items-center space-x-4 mb-6">
//           <label className="block">
//             <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
//               <PlusIcon className="w-5 h-5 mr-2" />
//               Upload Document
//             </span>
//             <input
//               type="file"
//               multiple
//               className="hidden"
//               onChange={(e) => {
//                 if (e.target.files) handleFileUpload(e.target.files);
//               }}
//             />
//           </label>
//           <button
//             onClick={() => setShowCreateFolderModal(true)}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//           >
//             <FolderIcon className="w-5 h-5 mr-2" />
//             New Folder
//           </button>
//         </div>

//         {/* Main Layout */}
//         <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-sm border border-gray-200">
//           {/* Folder Tree */}
//           <div className="w-full lg:w-64 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Folders</h2>
//             <ul className="space-y-2">
//               {folders.map((folder) => {
//                 // For root folder (All Documents), show total count
//                 // For other folders, show only documents in that folder
//                 const folderDocCount =
//                   folder.id === "root"
//                     ? documents.length // Total count for All Documents
//                     : documents.filter((doc) => doc.folderId === folder.id)
//                         .length;

//                 return (
//                   <li
//                     key={folder.id}
//                     className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors ${
//                       selectedFolderId === folder.id
//                         ? "bg-gray-100 text-gray-900"
//                         : "text-gray-600 hover:bg-gray-50"
//                     }`}
//                     onClick={() => setSelectedFolder(folder.id)}
//                   >
//                     <FolderIcon className="w-5 h-5 mr-3" />
//                     <span className="font-medium">{folder.name}</span>
//                     <span className="ml-auto text-sm text-gray-500">
//                       {folderDocCount}
//                     </span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           {/* Document List */}
//           <div
//             className={`flex-1 p-4 lg:p-6 ${
//               isDragging
//                 ? "bg-gray-50 border-2 border-dashed border-gray-300"
//                 : ""
//             }`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             {/* Current Folder Header */}
//             <div className="mb-6">
//               <h2 className="text-lg font-medium text-gray-900">
//                 {getCurrentFolder().name}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {selectedFolderId === "root"
//                   ? `${documents.length} total document${
//                       documents.length !== 1 ? "s" : ""
//                     }`
//                   : `${filteredDocuments.length} document${
//                       filteredDocuments.length !== 1 ? "s" : ""
//                     }`}
//               </p>
//             </div>

//             {filteredDocuments.length === 0 ? (
//               <div className="text-center py-12">
//                 <ArchiveBoxIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//                 <p className="text-gray-500 mb-4">
//                   {searchTerm
//                     ? `No documents found in "${
//                         getCurrentFolder().name
//                       }" matching "${searchTerm}"`
//                     : `No documents in "${
//                         getCurrentFolder().name
//                       }". Upload your first document to get started.`}
//                 </p>
//                 <label className="inline-block">
//                   <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
//                     <PlusIcon className="w-5 h-5 mr-2" />
//                     Upload Document
//                   </span>
//                   <input
//                     type="file"
//                     multiple
//                     className="hidden"
//                     onChange={(e) => {
//                       if (e.target.files) handleFileUpload(e.target.files);
//                     }}
//                   />
//                 </label>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="hidden sm:table-header-group">
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left pb-3 px-4 text-sm font-medium text-gray-500">
//                         Name
//                       </th>
//                       <th className="text-left pb-3 px-4 text-sm font-medium text-gray-500">
//                         Type
//                       </th>
//                       <th className="text-right pb-3 px-4 text-sm font-medium text-gray-500">
//                         Size
//                       </th>
//                       <th className="text-left pb-3 px-4 text-sm font-medium text-gray-500">
//                         Uploaded
//                       </th>
//                       <th className="text-center pb-3 px-4 text-sm font-medium text-gray-500">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {filteredDocuments.map((doc) => (
//                       <tr key={doc.id} className="group hover:bg-gray-50">
//                         {/* Desktop View */}
//                         <td className="hidden sm:table-cell py-4 px-4">
//                           <span className="text-gray-900 font-medium hover:text-gray-600 cursor-pointer">
//                             {doc.name}
//                           </span>
//                         </td>
//                         <td className="hidden sm:table-cell py-4 px-4">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                             {doc.type.toUpperCase()}
//                           </span>
//                         </td>
//                         <td className="hidden sm:table-cell p-2 text-right text-xs text-gray-500">
//                           {(doc.size / 1024).toFixed(1)} KB
//                         </td>
//                         <td className="hidden sm:table-cell py-4 px-4 text-xs text-gray-500">
//                           {doc.dateUploaded}
//                         </td>
//                         <td className="hidden sm:table-cell py-4 px-4">
//                           <div className="flex justify-center space-x-2 opacity-100 group-hover:opacity-80 transition-opacity">
//                             <button
//                               onClick={() => deleteDocument(doc.id)}
//                               className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
//                             >
//                               <TrashIcon className="w-5 h-5 text-red-500" />
//                             </button>
//                             <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
//                               <EyeIcon className="w-5 h-5 text-gray-600" />
//                             </button>
//                           </div>
//                         </td>

//                         {/* Mobile View */}
//                         <td className="sm:hidden block py-4 px-4">
//                           <div className="flex flex-col space-y-2">
//                             <div className="flex justify-between items-start">
//                               <div>
//                                 <div className="text-gray-900 font-medium">
//                                   {doc.name}
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                   {doc.dateUploaded}
//                                 </div>
//                               </div>
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                 {doc.type.toUpperCase()}
//                               </span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span className="text-sm text-gray-500">
//                                 {(doc.size / 1024).toFixed(1)} KB
//                               </span>
//                               <div className="flex space-x-3">
//                                 <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
//                                   <DocumentArrowDownIcon className="w-5 h-5 text-gray-600" />
//                                 </button>
//                                 <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
//                                   <PencilIcon className="w-5 h-5 text-gray-600" />
//                                 </button>
//                                 <button
//                                   onClick={() => deleteDocument(doc.id)}
//                                   className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                                 >
//                                   <TrashIcon className="w-5 h-5 text-red-500" />
//                                 </button>
//                                 <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
//                                   <EyeIcon className="w-5 h-5 text-gray-600" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Create Folder Modal */}
//       {showCreateFolderModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//               Create New Folder
//             </h3>
//             <input
//               type="text"
//               placeholder="Enter folder name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none"
//               value={folderName}
//               onChange={(e) => setFolderName(e.target.value)}
//             />
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => {
//                   setShowCreateFolderModal(false);
//                   setFolderName("");
//                 }}
//                 className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateFolder}
//                 className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 Create Folder
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentVaultPage;
import { useState, DragEvent } from "react";
import {
  ArchiveBoxIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  FolderIcon,
  DocumentArrowDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDocument } from "../../hooks/useDoc";
import { DigiLockerButton } from "../../components/document/DigiBtn";
import { useDigiLocker } from "../../hooks/useDigilocker";
import { DigiLockerModal } from "../../components/document/DigiLockerModal";

const DocumentVaultPage = () => {
  const {
    state: { documents, folders, selectedFolderId, searchTerm, isLoading },
    uploadDocuments,
    deleteDocument,
    createFolder,
    setSelectedFolder,
    setSearchTerm,
  } = useDocument();

  // DigiLocker integration
  const {
    isConnecting,
    isConnected,
    documents: digiLockerDocs,
    error: digiLockerError,
    downloadProgress,
    connect: handleDigiLockerConnect,
    importDocument,
    importAllDocuments,
  } = useDigiLocker();

  const [isDragging, setIsDragging] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);

  // Existing functions
  const getCurrentFolder = () => {
    return (
      folders.find((f) => f.id === selectedFolderId) || {
        id: "root",
        name: "All Documents",
      }
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesFolder =
      selectedFolderId === "root" ? true : doc.folderId === selectedFolderId;
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleFileUpload = (files: FileList) => {
    uploadDocuments(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleCreateFolder = async () => {
    if (folderName.trim()) {
      await createFolder(folderName);
      setFolderName("");
      setShowCreateFolderModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Manage Documents
              </h1>
            </div>

            <button
              className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            <div className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents"
                  className="w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DocumentMagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-2 text-gray-500" />
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search documents"
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <DocumentMagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-2 text-gray-500" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="block">
                    <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg w-full justify-center">
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Upload Document
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) handleFileUpload(e.target.files);
                      }}
                    />
                  </label>
                  <button
                    onClick={() => setShowCreateFolderModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg justify-center"
                  >
                    <FolderIcon className="w-5 h-5 mr-2" />
                    New Folder
                  </button>
                  <DigiLockerButton
                    onClick={() => setShowDigiLockerModal(true)}
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Actions Bar */}
        <div className="hidden sm:flex items-center space-x-4 mb-6">
          <label className="block">
            <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
              <PlusIcon className="w-5 h-5 mr-2" />
              Upload Document
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFileUpload(e.target.files);
              }}
            />
          </label>
          <button
            onClick={() => setShowCreateFolderModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <FolderIcon className="w-5 h-5 mr-2" />
            New Folder
          </button>
          <DigiLockerButton
            onClick={() => setShowDigiLockerModal(true)}
            variant="secondary"
          />
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Folder Tree */}
          <div className="w-full lg:w-64 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Folders</h2>
            <ul className="space-y-2">
              {folders.map((folder) => {
                const folderDocCount =
                  folder.id === "root"
                    ? documents.length
                    : documents.filter((doc) => doc.folderId === folder.id)
                        .length;

                return (
                  <li
                    key={folder.id}
                    className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors ${
                      selectedFolderId === folder.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <FolderIcon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{folder.name}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {folderDocCount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Document List */}
          <div
            className={`flex-1 p-4 lg:p-6 ${
              isDragging
                ? "bg-gray-50 border-2 border-dashed border-gray-300"
                : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Current Folder Header */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {getCurrentFolder().name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedFolderId === "root"
                  ? `${documents.length} total document${
                      documents.length !== 1 ? "s" : ""
                    }`
                  : `${filteredDocuments.length} document${
                      filteredDocuments.length !== 1 ? "s" : ""
                    }`}
              </p>
            </div>

            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <ArchiveBoxIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? `No documents found in "${
                        getCurrentFolder().name
                      }" matching "${searchTerm}"`
                    : `No documents in "${
                        getCurrentFolder().name
                      }". Upload your first document to get started.`}
                </p>
                <label className="inline-block">
                  <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Upload Document
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handleFileUpload(e.target.files);
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="hidden sm:table-header-group">
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 px-4 text-sm font-medium text-gray-500">
                        Name
                      </th>
                      <th className="text-left pb-3 px-4 text-sm font-medium text-gray-500">
                        Type
                      </th>
                      <th className="text-right pb-3 px-4 text-sm font-medium text-gray-500">
                        Size
                      </th>
                      <th className="text-left pb-3 px-4 text-sm font-medium text-gray-500">
                        Uploaded
                      </th>
                      <th className="text-center pb-3 px-4 text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="group hover:bg-gray-50">
                        {/* Desktop View */}
                        <td className="hidden sm:table-cell py-4 px-4">
                          <span className="text-gray-900 font-medium hover:text-gray-600 cursor-pointer">
                            {doc.name}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {doc.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell p-2 text-right text-xs text-gray-500">
                          {(doc.size / 1024).toFixed(1)} KB
                        </td>
                        <td className="hidden sm:table-cell py-4 px-4 text-xs text-gray-500">
                          {doc.dateUploaded}
                        </td>
                        <td className="hidden sm:table-cell py-4 px-4">
                          <div className="flex justify-center space-x-2 opacity-100 group-hover:opacity-80 transition-opacity">
                            <button
                              onClick={() => deleteDocument(doc.id)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <TrashIcon className="w-5 h-5 text-red-500" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                              <EyeIcon className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </td>

                        {/* Mobile View */}
                        <td className="sm:hidden block py-4 px-4">
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-gray-900 font-medium">
                                  {doc.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {doc.dateUploaded}
                                </div>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {doc.type.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">
                                {(doc.size / 1024).toFixed(1)} KB
                              </span>
                              <div className="flex space-x-3">
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                  <DocumentArrowDownIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                  <PencilIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                  onClick={() => deleteDocument(doc.id)}
                                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <TrashIcon className="w-5 h-5 text-red-500" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                  <EyeIcon className="w-5 h-5 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DigiLocker Modal */}
      <DigiLockerModal
        isOpen={showDigiLockerModal}
        onClose={() => setShowDigiLockerModal(false)}
        isConnecting={isConnecting}
        isConnected={isConnected}
        documents={digiLockerDocs}
        error={digiLockerError}
        downloadProgress={downloadProgress}
        onConnect={handleDigiLockerConnect}
        onImportAll={importAllDocuments}
        onImportDocument={importDocument}
      />

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Create New Folder
            </h3>
            <input
              type="text"
              placeholder="Enter folder name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateFolderModal(false);
                  setFolderName("");
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVaultPage;
