import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import PaymentCard from './components/PaymentCard';
import QRModal from './components/QRModal';
import NoticeBanner from './components/NoticeBanner';
import { paymentMethods } from './data/payments';
import { Check } from 'lucide-react';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQR, setSelectedQR] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Handle Copy function
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToastMessage(`ကူးယူပြီးပါပြီ: ${text} ✓`);

    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
      setToastMessage('');
    }, 2500);
  };

  // Filtered payment methods
  const filteredMethods = useMemo(() => {
    return paymentMethods.filter((item) => {
      if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCode = item.code.toLowerCase().includes(query);
        const matchNumber = item.accountNumber.includes(query) || item.cleanNumber.includes(query);
        const matchHolder = item.accountHolder.toLowerCase().includes(query);
        const matchBranch = item.branch ? item.branch.toLowerCase().includes(query) : false;

        return matchName || matchCode || matchNumber || matchHolder || matchBranch;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: paymentMethods.length,
      wallet: paymentMethods.filter((m) => m.type === 'wallet').length,
      bank: paymentMethods.filter((m) => m.type === 'bank').length
    };
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-black text-zinc-100 flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white shadow-2xl border-2 border-emerald-300 flex items-center gap-2.5 text-sm sm:text-base font-extrabold animate-in fade-in slide-in-from-bottom-3 duration-200 whitespace-nowrap">
          <Check className="w-5 h-5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full flex-1 pb-10">
        <Header onCopy={handleCopy} copiedId={copiedId} />

        <SearchAndFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          counts={counts}
        />

        {/* Payment Cards Grid - max-w-5xl gives ample space on laptops */}
        <div className="max-w-xl md:max-w-5xl mx-auto px-4 w-full">
          {filteredMethods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredMethods.map((method) => (
                <PaymentCard
                  key={method.id}
                  method={method}
                  onSelectQR={setSelectedQR}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center rounded-2xl bg-zinc-950 border-2 border-zinc-800 text-zinc-300">
              <p className="text-sm sm:text-base font-semibold">ရှာဖွေမှုနှင့် ကိုက်ညီသော Payment နည်းလမ်း မတွေ့ရှိပါ</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-white text-black text-xs sm:text-sm font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                မူလအတိုင်း ပြန်ပြမည် (Reset)
              </button>
            </div>
          )}
        </div>

        <NoticeBanner />
      </main>

      {/* QR Code Modal */}
      <QRModal
        method={selectedQR}
        onClose={() => setSelectedQR(null)}
        onCopy={handleCopy}
        copiedId={copiedId}
      />
    </div>
  );
}
