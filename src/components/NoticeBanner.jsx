import React from 'react';
import { AlertCircle } from 'lucide-react';
import { userProfile } from '../data/payments';

export default function NoticeBanner() {
  return (
    <div className="max-w-xl md:max-w-5xl mx-auto px-4 mt-8 mb-12">
      <div className="rounded-2xl p-4 sm:p-5 bg-zinc-950 border-2 border-zinc-750 shadow-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-1">
            <span className="font-bold text-white block text-sm sm:text-base">
              အရေးကြီး သတိပြုရန် (Important Notice)
            </span>
            <p className="text-zinc-300">
              ငွေမလွှဲမီ လက်ခံသူအမည် <strong>&quot;{userProfile.name}&quot;</strong> (သို့မဟုတ်) <strong>&quot;{userProfile.honorificName}&quot;</strong> မှန်ကန်ကြောင်း သေချာစွာ စစ်ဆေးပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs sm:text-sm text-zinc-500 font-medium">
        <p>© {new Date().getFullYear()} {userProfile.name} • Official Payment Portal</p>
      </footer>
    </div>
  );
}
