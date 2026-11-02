import React from 'react';
import { Search, Layers, Smartphone, Building2, X } from 'lucide-react';

export default function SearchAndFilter({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  counts
}) {
  const tabs = [
    { id: 'all', label: 'အားလုံး (All)', icon: Layers, count: counts.all },
    { id: 'wallet', label: 'Wallets (KPay/Wave)', icon: Smartphone, count: counts.wallet },
    { id: 'bank', label: 'ဘဏ်များ (Banks)', icon: Building2, count: counts.bank }
  ];

  return (
    <div className="max-w-xl md:max-w-5xl mx-auto px-4 my-6 space-y-3.5 w-full">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ဘဏ်အမည် သို့မဟုတ် နံပါတ်ဖြင့် ရှာဖွေပါ (Search Bank / Acc)..."
          className="w-full pl-12 pr-12 py-3 rounded-2xl bg-zinc-900 border-2 border-zinc-750 text-sm sm:text-base text-white placeholder-zinc-400 focus:outline-none focus:border-white transition-colors shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-2 ${
                isActive
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border-zinc-750'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
