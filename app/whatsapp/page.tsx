'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WhatsAppAutomationPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const response = await fetch('/api/whatsapp/contacts');
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = data.details ? JSON.stringify(data.details) : '';
        throw new Error(`${data.error || 'Failed to send message'} ${errorDetails}`);
      }

      setStatus({ type: 'success', message: 'WhatsApp message sent successfully!' });
      setPhoneNumber('');
      setMessage('');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'An error occurred' });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="bg-black">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          WhatsApp Automation & CRM
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Architecture & Workflow */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Data Flow Architecture</h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 font-mono text-sm text-gray-700 leading-relaxed overflow-x-auto">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-sm w-full max-w-xs">Customer sends WhatsApp Message</div>
                  <div className="text-gray-400">│</div>
                  <div className="text-gray-400">▼</div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow-sm w-full max-w-xs">WhatsApp Business API</div>
                  <div className="text-gray-400">│</div>
                  <div className="text-gray-400">▼</div>
                  <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold shadow-sm w-full max-w-xs">CRM Backend</div>
                  <div className="text-gray-400">│</div>
                  <div className="text-gray-400">▼</div>
                  <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-semibold shadow-sm w-full max-w-xs">Database (MongoDB/MySQL)</div>
                  <div className="text-gray-400">│</div>
                  <div className="text-gray-400">▼</div>
                  <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold shadow-sm w-full max-w-xs">Contacts Table</div>
                  <div className="text-gray-400">│</div>
                  <div className="text-gray-400">▼</div>
                  <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold shadow-sm w-full max-w-xs">Displayed on this page</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Integration Steps Completed</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Added <b>WHATAPI_URL</b> and <b>KEY</b> to environment variables</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Built API route `/api/whatsapp` for secure messaging</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Built API route `/api/whatsapp/contacts` for fetching CRM data</li>
              </ul>
            </div>
          </div>

          {/* Test Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 918217794751"
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your automated message here..."
                  required
                  rows={4}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.type === 'loading' ? 'Sending...' : 'Send WhatsApp Message'}
              </button>

              {status.message && (
                <div
                  className={`p-4 rounded-lg mt-4 text-sm ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : status.type === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* CRM Contacts Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">CRM Contacts Data</h2>
            <button 
              onClick={fetchContacts}
              disabled={loadingContacts}
              className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none flex items-center gap-2"
            >
              {loadingContacts ? 'Syncing...' : 'Sync Database'}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Channels</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">First Name</th>
                  <th className="px-6 py-4">WhatsApp Number</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Created On</th>
                  <th className="px-6 py-4">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-500 block"></span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs border border-green-200 shadow-sm">
                          {contact.channel === 'WhatsApp' ? 'WA' : contact.channel}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{contact.name}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {contact.name.split(' ')[0]} {/* Derived first name for display */}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">{contact.whatsapp}</td>
                      <td className="px-6 py-4 text-gray-500">{contact.email}</td>
                      <td className="px-6 py-4 text-gray-500">{contact.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {contact.tags && contact.tags.map((tag: string, tIndex: number) => (
                            <span key={tIndex} className="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{contact.createdAt}</td>
                      <td className="px-6 py-4 text-gray-500">{contact.lastSeen}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                      {loadingContacts ? 'Syncing with database...' : 'No contacts found. Click Sync Database.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <Footer />
      </div>
    </main>
  );
}
