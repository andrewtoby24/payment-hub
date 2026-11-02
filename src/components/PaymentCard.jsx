import React from 'react';
import { Copy, Check, QrCode, Building2 } from 'lucide-react';

export default function PaymentCard({ method, onSelectQR, onCopy, copiedId }) {
  const isCopied = copiedId === method.id;
  const isWallet = method.type === 'wallet';

  return (
    <div className="mono-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between w-full border-2 border-zinc-750 hover:border-zinc-500 bg-zinc-950 transition-colors shadow-lg overflow-hidden">
      <div>
        {/* Top: Large Real Logo, Title, and QR Button (Only for Wallets) */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* Real Bank Logo Container */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md border-2 border-zinc-300">
              <img
                src={method.logoImage}
                alt={`${method.name} official logo`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight truncate">
                  {method.name}
                </h3>
                {method.recommended && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-zinc-800 text-zinc-200 border border-zinc-650 shrink-0">
                    လူသုံးများ (Popular)
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 font-medium truncate">
                {isWallet ? 'Wallet Payment' : (method.branch || 'ဘဏ်စာရင်း (Bank Transfer)')}
              </p>
            </div>
          </div>

          {/* QR Icon Button - ONLY for Wallets */}
          {isWallet ? (
            <button
              onClick={() => onSelectQR(method)}
              className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border-2 border-zinc-700 hover:border-white transition-all cursor-pointer shrink-0 shadow-sm"
              title="Scan QR Code"
            >
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          ) : (
            <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/40 text-zinc-500 border border-zinc-800 shrink-0" title="Direct Bank Transfer">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          )}
        </div>

        {/* Account Number Box - Perfectly Fitted, Never Overflows */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-black border-2 border-zinc-750 mb-3.5 shadow-inner">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5 flex items-center justify-between">
            <span>{isWallet ? 'ဖုန်းနံပါတ် / PHONE NUMBER' : 'အကောင့်နံပါတ် / ACCOUNT NUMBER'}</span>
          </div>

          <div className="flex items-center justify-between gap-2 min-w-0">
            {/* Account Number */}
            <span className="font-mono text-sm sm:text-base lg:text-lg font-extrabold text-white tracking-normal sm:tracking-tight select-all whitespace-nowrap min-w-0">
              {method.accountNumber}
            </span>

            {/* Copy Button */}
            <button
              onClick={() => onCopy(method.cleanNumber || method.accountNumber, method.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md whitespace-nowrap ${
                isCopied
                  ? 'bg-emerald-500 text-white border border-emerald-400'
                  : 'bg-white text-black hover:bg-zinc-200 border border-white active:scale-95'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>ကူးယူပြီး ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 shrink-0" />
                  <span>Copy ကူးမည်</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Account Holder Name & Branch */}
        <div className="space-y-1 text-xs sm:text-sm text-zinc-300 px-0.5">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-medium">အမည် (Name):</span>
            <span className="text-white font-bold text-sm sm:text-base truncate ml-2">{method.accountHolder}</span>
          </div>

          {method.branch && !isWallet && (
            <div className="flex items-center justify-between pt-1 border-t border-zinc-850">
              <span className="text-zinc-400 font-medium">ဘဏ်ခွဲ (Branch):</span>
              <span className="text-zinc-200 font-semibold truncate ml-2">{method.branch}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Button: QR Code for Wallets, Direct Transfer Notice for Banks */}
      {isWallet ? (
        <button
          onClick={() => onSelectQR(method)}
          className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-white border-2 border-zinc-700 hover:border-zinc-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <QrCode className="w-4 h-4 text-white" />
          <span>QR Code ဖွင့်မည် (Scan to Pay)</span>
        </button>
      ) : (
        <div className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 text-center select-none">
          <Building2 className="w-4 h-4 text-zinc-400" />
          <span>ဘဏ်အကောင့် သို့ တိုက်ရိုက် လွှဲနိုင်ပါသည် (Direct Transfer)</span>
        </div>
      )}
    </div>
  );
}
