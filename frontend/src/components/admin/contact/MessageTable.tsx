import { useState } from "react";
import { Mail, MailOpen, Trash2, X } from "lucide-react";
import {
  useContactMessages, useUpdateReadStatus, useDeleteContactMessage,
} from "../../../hooks/useContact";
import type { ContactMessage } from "../../../api/contact.api";

const formatDateTime = (dateString: string) =>
  new Date(dateString).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

const MessageTable = () => {
  const { data: messages, isLoading, isError } = useContactMessages();
  const { mutate: updateRead } = useUpdateReadStatus();
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteContactMessage();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      updateRead({ id: message.id, isRead: true });
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMessage(deleteTarget.id, {
      onSuccess: () => {
        setDeleteTarget(null);
        if (selectedMessage?.id === deleteTarget.id) setSelectedMessage(null);
      },
    });
  };

  const unreadCount = messages?.filter((m) => !m.isRead).length ?? 0;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-white light:!text-gray-900 text-2xl font-bold">Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-gray-500 light:!text-gray-600 text-sm mt-1">Messages submitted through your contact form.</p>
      </div>

      {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm">Loading messages...</p>}
      {isError && <p className="text-red-400 text-sm">Couldn't load messages right now.</p>}
      {messages && messages.length === 0 && (
        <p className="text-gray-500 light:!text-gray-600 text-sm">No messages yet.</p>
      )}

      {messages && messages.length > 0 && (
        <div className="space-y-2">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => openMessage(message)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                message.isRead
                  ? "bg-white/[0.02] light:!bg-gray-50 border-white/5 light:!border-gray-200 hover:border-white/10 light:hover:!border-gray-300"
                  : "bg-indigo-500/[0.04] light:!bg-indigo-50 border-indigo-500/20 hover:border-indigo-500/40"
              }`}
            >
              {message.isRead ? (
                <MailOpen className="w-4 h-4 text-gray-500 light:!text-gray-600 shrink-0" />
              ) : (
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm truncate ${message.isRead ? "text-gray-300 light:!text-gray-600" : "text-white light:!text-gray-900 font-semibold"}`}>
                    {message.name}
                  </p>
                  <span className="text-gray-600 light:!text-gray-500 text-xs shrink-0">{message.email}</span>
                </div>
                <p className={`text-sm truncate ${message.isRead ? "text-gray-500 light:!text-gray-600" : "text-gray-300 light:!text-gray-700"}`}>
                  {message.subject}
                </p>
              </div>

              <span className="text-gray-600 light:!text-gray-500 text-xs shrink-0 hidden sm:block">
                {formatDateTime(message.createdAt)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedMessage(null)} />
          <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-7">
              <h3 className="text-white light:!text-gray-900 font-bold text-lg mb-1">{selectedMessage.subject}</h3>
              <p className="text-gray-500 light:!text-gray-600 text-xs mb-5">
                {formatDateTime(selectedMessage.createdAt)}
              </p>

              <div className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-xl p-4 mb-5">
                <p className="text-white light:!text-gray-900 text-sm font-medium">{selectedMessage.name}</p>
                <p className="text-indigo-400 text-xs">{selectedMessage.email}</p>
              </div>

              <p className="text-gray-300 light:!text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                {selectedMessage.message}
              </p>

              <div className="flex items-center gap-3">
                
                 <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-full transition-colors"
                >
                  Reply by Email
                </a>
                <button
                  onClick={() => setDeleteTarget(selectedMessage)}
                  className="w-11 h-11 shrink-0 rounded-full bg-white/5 light:!bg-gray-100 hover:bg-red-500/10 flex items-center justify-center text-gray-400 light:!text-gray-600 hover:text-red-400 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-white light:!text-gray-900 font-bold mb-2">Delete Message</h3>
            <p className="text-gray-400 light:!text-gray-600 text-sm mb-6">
              Are you sure you want to delete this message from{" "}
              <span className="text-white light:!text-gray-900">{deleteTarget.name}</span>? This can't be undone.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-white/5 light:!bg-gray-100 hover:bg-white/10 light:hover:!bg-gray-200 text-gray-300 light:!text-gray-600 text-sm font-medium py-2.5 rounded-full transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-full transition-colors disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageTable;