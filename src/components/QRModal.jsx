import React from 'react';
import { X, Download, Copy, Check, QrCode } from 'lucide-react';

export default function QRModal({ method, onClose, onCopy, copiedId }) {
  if (!method) return null;

  const isCopied = copiedId === method.id;

  const handleDownload = () => {
    if (!method.qrImage) return;
    const link = document.createElement('a');
    link.href = method.qrImage;
    link.download = `${method.name.toLowerCase().replace(/[\s\(\)\/]+/g, '_')}_qr.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border-2 border-zinc-700 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-4.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center border-2 border-zinc-300 shrink-0 shadow-sm">
              <img
                src={method.logoImage}
                alt={method.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">{method.name} Official QR</h3>
              <p className="text-xs text-zinc-300 font-medium">Wallet Payment QR Code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors cursor-pointer border border-zinc-650"
            title="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable if screen is small */}
        <div className="p-4 sm:p-5 flex flex-col items-center overflow-y-auto">
          {/* Authentic Real QR Code Card Container */}
          <div className="rounded-2xl border-2 border-zinc-750 bg-black flex items-center justify-center overflow-hidden shadow-xl max-h-[360px] w-full max-w-[320px]">
            {method.qrImage ? (
              <img
                src={method.qrImage}
                alt={`${method.name} Official QR Code`}
                className="w-full h-auto max-h-[360px] object-contain rounded-xl"
              />
            ) : (
              <div className="p-8 flex flex-col items-center justify-center text-zinc-500">
                <QrCode className="w-16 h-16 mb-2 opacity-40" />
                <span className="text-sm font-medium">QR Code မရှိသေးပါ</span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-zinc-200 mt-3 text-center font-medium bg-zinc-900 px-3.5 py-1.5 rounded-xl border border-zinc-800">
            📱 {method.name} သို့မဟုတ် သက်ဆိုင်ရာ App ဖြင့် Scan ဖတ်နိုင်ပါသည်
          </p>

          {/* Account Details Box */}
          <div className="w-full mt-3.5 p-3 rounded-xl bg-black border-2 border-zinc-800 text-xs sm:text-sm space-y-1.5">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="font-medium">ဖုန်းနံပါတ် / အကောင့်</span>
              <span className="text-zinc-300 font-semibold">{method.branch}</span>
            </div>

            <div className="font-mono font-extrabold text-base sm:text-lg text-white tracking-wider break-all flex items-center justify-between">
              <span>{method.accountNumber}</span>
              <button
                onClick={() => onCopy(method.cleanNumber || method.accountNumber, method.id)}
                className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all ${
                  isCopied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {isCopied ? 'ကူးယူပြီး ✓' : 'Copy'}
              </button>
            </div>

            <div className="pt-1.5 border-t border-zinc-850 flex justify-between text-xs sm:text-sm">
              <span className="text-zinc-400 font-medium">အမည် (Name):</span>
              <span className="text-white font-bold">{method.accountHolder}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-2.5 mt-3.5">
            <button
              onClick={handleDownload}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border-2 border-zinc-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>ပုံသိမ်းမည် (Save)</span>
            </button>
            <button
              onClick={() => onCopy(method.cleanNumber || method.accountNumber, method.id)}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'ကူးယူပြီး ✓' : 'Copy အကောင့်'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
