import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Address } from '../../types/grocery';
import { 
  MapPin, 
  Home, 
  Briefcase, 
  Plus, 
  Check, 
  Trash2, 
  Edit3,
  ShieldCheck
} from 'lucide-react';

interface SavedAddressesViewProps {
  onOpenAddModal: () => void;
}

export const SavedAddressesView: React.FC<SavedAddressesViewProps> = ({ onOpenAddModal }) => {
  const { savedAddresses, selectedAddress, setSelectedAddress } = useCart();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header (Stitch basketfresh_saved_addresses) */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 font-display flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-700" />
            <span>Saved Delivery Addresses ({savedAddresses.length})</span>
          </h1>
          <p className="text-xs text-neutral-500">Manage locations for instant 10-minute micro darkstore drops</p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {savedAddresses.map((addr) => {
          const isSelected = selectedAddress.id === addr.id;
          const isHome = addr.type.toLowerCase() === 'home';
          const isWork = addr.type.toLowerCase() === 'work';

          return (
            <div
              key={addr.id}
              onClick={() => setSelectedAddress(addr)}
              className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                  : 'border-neutral-200/80 hover:border-neutral-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                      {isHome ? <Home className="w-4 h-4 text-emerald-700" /> : isWork ? <Briefcase className="w-4 h-4 text-blue-700" /> : <MapPin className="w-4 h-4 text-amber-700" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-neutral-900 capitalize">{addr.type}</h4>
                      <span className="text-[11px] text-neutral-500">{addr.name} • {addr.phone}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase rounded-md flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                  {addr.flatNo ? `${addr.flatNo}, ` : ''}{addr.street}
                  {addr.landmark ? `, Near ${addr.landmark}` : ''}, {addr.city} - {addr.pincode}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAddress(addr);
                  }}
                  className={`font-bold text-xs ${isSelected ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-900'}`}
                >
                  {isSelected ? 'Default Delivery Address' : 'Set as Current Address'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAddModal();
                    }}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Serviceability Guarantee Box */}
      <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h5 className="font-extrabold text-emerald-950">10-Minute Serviceability Guarantee</h5>
          <p className="text-neutral-600 leading-relaxed">
            All your saved addresses are mapped to nearby automated fulfillment darkstores ensuring cold-chain items arrive chilled and fresh.
          </p>
        </div>
      </div>

    </div>
  );
};
