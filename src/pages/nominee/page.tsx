/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import {
  UserIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { Nominee, NotificationProps } from "../../types/nomine";
import { useNominee } from "../../hooks/useNomine";
import { EnhancedEmptyState } from "../../components/nominee/EmptyState";
import { Notification } from "../../components/nominee/Notification";
import { NomineeDrawer } from "../../components/nominee/NomineDrawer";
import { DeleteModal } from "../../components/nominee/DeleteModal";

/* ==================================================
     Main Page Component
  ================================================== */

const ManageNomineesPage: React.FC = () => {
  const { state, addNominee, updateNominee, deleteNominee, setSearchQuery } =
    useNominee();
  const { nominees, isLoading, searchQuery } = state;

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [editingNominee, setEditingNominee] = useState<Nominee | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [nomineeToDelete, setNomineeToDelete] = useState<Nominee | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  // Filter nominees based on search query
  const filteredNominees = nominees.filter(
    (nominee) =>
      nominee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nominee.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nominee.phoneNumber.includes(searchQuery) ||
      nominee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nominee.identificationType
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message, onClose: () => setNotification(null) });
  };

  const openDrawerForAdd = () => {
    setEditingNominee(null);
    setDrawerOpen(true);
  };

  const openDrawerForEdit = (nominee: Nominee) => {
    setEditingNominee(nominee);
    setDrawerOpen(true);
  };

  const handleSaveNominee = async (nominee: Nominee) => {
    try {
      if (editingNominee) {
        await updateNominee(nominee);
        showNotification("success", "Nominee updated successfully");
      } else {
        await addNominee(nominee);
        showNotification("success", "New nominee added successfully");
      }
      setDrawerOpen(false);
      setEditingNominee(null);
    } catch (error) {
      showNotification("error", "Failed to save nominee");
    }
  };

  const openDeleteModal = (nominee: Nominee) => {
    setNomineeToDelete(nominee);
    setDeleteModalOpen(true);
  };

  const handleDeleteNominee = async () => {
    if (nomineeToDelete) {
      try {
        await deleteNominee(nomineeToDelete.id);
        showNotification("success", "Nominee deleted successfully");
        setDeleteModalOpen(false);
        setNomineeToDelete(null);
      } catch (error) {
        showNotification("error", "Failed to delete nominee");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          {/* Title and Add Nominee Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                Manage Nominees
              </h1>
              <p className="text-slate-500 text-sm">
                Add and manage your account nominees securely
              </p>
            </div>
            {nominees.length > 0 && (
              <button
                onClick={openDrawerForAdd}
                className="flex items-center px-5 py-2.5 bg-white text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
              >
                <UserPlusIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span className="font-medium">Add Nominee</span>
              </button>
            )}
          </div>

          {/* Search and Stats Card */}
          {nominees.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Bar Card */}
              <div
                className="md:col-span-2 bg-white rounded-lg border border-slate-200 p-4 
              shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search nominees by name, relationship, or contact info..."
                    className="w-full py-2 focus:outline-none placeholder:text-md placeholder-slate-400 text-slate-700"
                  />
                </div>
              </div>

              {/* Total Nominees Card */}
              <div className="bg-gradient-to-l from-gray-600 to-gray-700 rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-100">
                      Total Nominees
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {nominees.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-blue-100" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {nominees.length === 0 ? (
          <EnhancedEmptyState onAddNominee={openDrawerForAdd} />
        ) : (
          <div className="space-y-6">
            {/* Nominees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNominees.map((nominee) => (
                <div
                  key={nominee.id}
                  className="group relative z-0 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {nominee.avatarUrl ? (
                          <img
                            src={nominee.avatarUrl}
                            alt={nominee.fullName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 group-hover:border-slate-300 transition-colors duration-300"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                            <UserIcon className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors duration-300">
                            {nominee.fullName}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {nominee.relationship}
                            {nominee.relationship === "Other" &&
                            nominee.relationshipOther
                              ? ` (${nominee.relationshipOther})`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="flex items-center text-sm text-slate-600">
                        <PhoneIcon className="w-4 h-4 mr-2 text-slate-400" />
                        {nominee.phoneNumber}
                      </div>
                      {nominee.email && (
                        <div className="flex items-center text-sm text-slate-600">
                          <EnvelopeIcon className="w-4 h-4 mr-2 text-slate-400" />
                          {nominee.email}
                        </div>
                      )}
                      {nominee.identificationType && (
                        <div className="flex items-center text-sm text-slate-600">
                          <IdentificationIcon className="w-4 h-4 mr-2 text-slate-400" />
                          <span className="font-medium">
                            {nominee.identificationType}:
                          </span>
                          <span className="ml-1">
                            {nominee.identificationNumber}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button
                        type="button"
                        onClick={() => openDrawerForEdit(nominee)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border 
                        border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white
                         hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-slate-500 cursor-pointer z-5 relative"
                      >
                        <PencilIcon className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(nominee)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border
                         border-red-200 rounded-lg text-sm font-medium text-red-600 bg-white
                          hover:bg-red-50 transition-all duration-300 focus:outline-none focus:ring-2 
                          focus:ring-offset-2 focus:ring-red-500 cursor-pointer z-5 relative"
                      >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        {/* Drawer */}
        {drawerOpen && (
          <NomineeDrawer
            initialData={editingNominee}
            onClose={() => {
              setDrawerOpen(false);
              setEditingNominee(null);
            }}
            onSave={handleSaveNominee}
            isLoading={isLoading}
          />
        )}

        {/* Delete Modal */}
        {deleteModalOpen && nomineeToDelete && (
          <DeleteModal
            nominee={nomineeToDelete}
            onCancel={() => setDeleteModalOpen(false)}
            onDelete={handleDeleteNominee}
          />
        )}
      </div>
    </div>
  );
};

export default ManageNomineesPage;
