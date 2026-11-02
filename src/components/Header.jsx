import React from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { userProfile } from '../data/payments';

export default function Header({ onCopy, copiedId }) {
  const isPhoneCopied = copiedId === 'phone-header';

  return (
    <header className="pt-10 pb-8 px-4 border-b border-zinc-800/80 w-full max-w-full">
      <div className="max-w-2xl mx-auto text-center">
        {/* Verification Pill - High Contrast */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Wallets & Bankings</span>
        </div>

        {/* Profile Avatar / Monogram */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center mb-4 shadow-md">
          <span className="font-extrabold text-2xl text-white tracking-wider">
            KT
          </span>
        </div>

        {/* Name and Subtitle - Big & Bold */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {userProfile.name}
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 mt-2 font-medium">
          {userProfile.honorificName} • ဘဏ်နှင့် မိုဘိုင်းငွေစာရင်းများ
        </p>

        {/* NRC & Phone Badges - Generous, never-wrap sizing */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          {/* NRC */}
          <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-750 text-xs sm:text-sm text-zinc-200 flex items-center justify-center whitespace-nowrap shadow-sm">
            <span className="text-zinc-400 mr-2 font-medium">မှတ်ပုံတင် (NRC):</span>
            <span className="font-bold text-white">{userProfile.nrc}</span>
          </div>

          {/* Phone */}
          <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-750 text-xs sm:text-sm text-zinc-200 flex items-center justify-center gap-3 whitespace-nowrap shadow-sm">
            <span className="text-zinc-400 font-medium">ဖုန်း (Phone):</span>
            <span className="font-mono font-bold text-base text-white tracking-wider whitespace-nowrap">{userProfile.phone}</span>
            <button
              onClick={() => onCopy(userProfile.rawPhone, 'phone-header')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPhoneCopied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
              title="Copy Phone Number"
            >
              {isPhoneCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
