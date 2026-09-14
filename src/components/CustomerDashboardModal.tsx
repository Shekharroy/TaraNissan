import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Wrench,
  Car,
  FileText,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Printer,
  ChevronRight,
  ShieldCheck,
  User,
  Phone,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { CustomerTestDrive, CustomerServiceBooking, SavedCarConfiguration, GSTInvoice, UserProfile } from '../types';
import { apiGetCustomerDashboard, apiDeleteCarConfiguration } from '../services/apiClient.ts';

interface CustomerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenTestDrive: (carId?: string) => void;
}

export const CustomerDashboardModal: React.FC<CustomerDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenTestDrive,
}) => {
  const [activeTab, setActiveTab] = useState<'test_drives' | 'services' | 'configurations' | 'invoices'>('test_drives');
  const [loading, setLoading] = useState(true);
  const [testDrives, setTestDrives] = useState<CustomerTestDrive[]>([]);
  const [serviceBookings, setServiceBookings] = useState<CustomerServiceBooking[]>([]);
  const [configurations, setConfigurations] = useState<SavedCarConfiguration[]>([]);
  const [invoices, setInvoices] = useState<GSTInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<GSTInvoice | null>(null);

  const customerPhone = currentUser?.phone || currentUser?.phoneNumber || '9876543210';
  const customerName = currentUser?.fullName || currentUser?.name || 'Vikram Mehta';

  const formatSafeDate = (dateVal?: string | Date | number, options?: Intl.DateTimeFormatOptions) => {
    if (!dateVal) return 'Recently';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return 'Recently';
      return d.toLocaleDateString('en-IN', options);
    } catch {
      return 'Recently';
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await apiGetCustomerDashboard(customerPhone);
      if (data) {
        setTestDrives(data.testDrives || []);
        setServiceBookings(data.serviceBookings || []);
        setConfigurations(data.configurations || []);
        setInvoices(data.invoices || []);
      }
    } catch (err) {
      console.warn('Dashboard fetch fallback to local:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDashboardData();
    }
  }, [isOpen, customerPhone]);

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('[Print] Browser print blocked or unsupported in current container:', err);
    }
  };

  const handleDeleteConfig = async (id: string) => {
    try {
      await apiDeleteCarConfiguration(id);
      setConfigurations((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const serviceStages = [
    { step: 1, label: 'Scheduled', desc: 'Slot confirmed' },
    { step: 2, label: 'Inspected', desc: 'Job card created' },
    { step: 3, label: 'In Progress', desc: 'Mechanical audit' },
    { step: 4, label: 'Quality Check', desc: 'Diagnostics & test' },
    { step: 5, label: 'Ready', desc: 'Washed & polished' },
    { step: 6, label: 'Delivered', desc: 'Handed over' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-sm my-2 sm:my-8 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#111111] text-white px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#c3002f] flex items-center justify-center text-white font-nissan-bold text-[13px] sm:text-[14px] shrink-0">
              {(customerName || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[15px] sm:text-[17px] font-nissan-bold tracking-tight text-white">{customerName}</h2>
                <span className="text-[9.5px] sm:text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-xs uppercase tracking-wider font-nissan-bold">
                  Verified Owner
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-neutral-400">
                Customer Dashboard • Tara Nissan Motihari (Bankat NH28) • +91 {customerPhone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={fetchDashboardData}
              title="Refresh Records"
              className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#161616] px-4 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('test_drives')}
            className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'test_drives'
                ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Scheduled Test Drives</span>
            {testDrives.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-[11px] rounded-full">
                {testDrives.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Active Service Bookings</span>
            {serviceBookings.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-[11px] rounded-full">
                {serviceBookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('configurations')}
            className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'configurations'
                ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Saved Car Configurations</span>
            {configurations.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-[11px] rounded-full">
                {configurations.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>GST Invoices & Receipts</span>
            {invoices.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-[11px] rounded-full">
                {invoices.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white dark:bg-[#121212]">
          {/* TAB 1: Scheduled Test Drives */}
          {activeTab === 'test_drives' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    Scheduled Test Drives
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Track your upcoming vehicle evaluations at Bankat NH28 or doorstep VIP drives.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenTestDrive();
                  }}
                  className="btn-mui-contained text-[12px] py-1.5 px-3"
                >
                  + Book Another Drive
                </button>
              </div>

              {testDrives.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-sm">
                  <Car className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 dark:text-neutral-300 font-nissan-bold">No test drives scheduled yet</p>
                  <p className="text-[12px] text-neutral-500 mt-1">
                    Experience the All-New Nissan Tekton or Magnite KURO at Tara Nissan Motihari.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTestDrive();
                    }}
                    className="mt-3 btn-mui-contained text-[12px] py-1.5 px-4"
                  >
                    Schedule Test Drive Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testDrives.map((td) => (
                    <div
                      key={td.id || td.bookingReference}
                      className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10.5px] font-nissan-bold uppercase tracking-wider text-[#c3002f] bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-xs border border-red-200 dark:border-red-900/50">
                            {td.driveType || 'Showroom Visit'}
                          </span>
                          <h4 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white mt-1.5">
                            {td.vehicleModel}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-nissan-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
                            ● {(td.status || 'confirmed').toUpperCase()}
                          </span>
                          <div className="text-[10px] text-neutral-500 mt-1 font-mono">
                            Ref: {td.bookingReference || td.bookingRef || 'TARA-TD-2025'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2 text-[12.5px] text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800/80 pt-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#c3002f]" />
                          <span>
                            <strong>Date:</strong> {formatSafeDate(td.preferredDate || td.createdAt, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#c3002f]" />
                          <span>
                            <strong>Location:</strong> {td.pickupAddress || td.dealershipLocation || 'Bankat NH28, Motihari'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#c3002f]" />
                          <span>
                            <strong>Assigned Consultant:</strong> {td.assignedAdvisor || 'Sanjay Singh (Tara Nissan Sales Desk)'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                        <a
                          href="tel:+919031005087"
                          className="text-[12px] font-nissan-bold text-[#c3002f] hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Contact Sales Concierge</span>
                        </a>
                        <span className="text-[11px] text-neutral-500">Motihari NH28 Branch</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Active Service Bookings with Live Repair Stage Tracking */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    Active Workshop Service Bookings
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Live telemetry and repair stage progress at Tara Nissan Authorized Service Bay, Motihari.
                  </p>
                </div>
                <span className="text-[11px] bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 px-2.5 py-1 font-nissan-bold">
                  Express Quick-Service Active
                </span>
              </div>

              {serviceBookings.map((sb) => {
                const currentStageNumber = sb.currentStage || 3;
                return (
                  <div
                    key={sb.id || sb.bookingRef}
                    className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-nissan-bold bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-xs text-[#111111] dark:text-white">
                            {sb.registrationNumber}
                          </span>
                          <span className="text-[14px] font-nissan-bold text-[#111111] dark:text-white">
                            {sb.vehicleModel}
                          </span>
                        </div>
                        <p className="text-[12.5px] text-neutral-600 dark:text-neutral-300 mt-1">
                          {sb.serviceType}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-[11px] font-nissan-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 px-2.5 py-1 rounded-xs uppercase">
                          ● {(sb.status || 'in_progress').replace(/_/g, ' ')}
                        </span>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          Estimated Delivery: <strong className="text-[#111111] dark:text-white">{sb.estimatedDelivery || 'Today, 04:30 PM'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* 6-Stage Timeline Progress Bar */}
                    <div>
                      <div className="text-[12px] font-nissan-bold uppercase tracking-wider text-neutral-500 mb-3">
                        Live Workshop Stage Tracker
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                        {serviceStages.map((stage) => {
                          const isCompleted = currentStageNumber > stage.step;
                          const isCurrent = currentStageNumber === stage.step;
                          return (
                            <div
                              key={stage.step}
                              className={`p-2.5 rounded-xs border text-center transition-all ${
                                isCurrent
                                  ? 'bg-red-50 dark:bg-red-950/50 border-[#c3002f] shadow-xs'
                                  : isCompleted
                                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                                  : 'bg-white dark:bg-[#1e1e1e] border-neutral-200 dark:border-neutral-800 opacity-60'
                              }`}
                            >
                              <div className="flex items-center justify-center mb-1">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                ) : isCurrent ? (
                                  <div className="w-4 h-4 rounded-full bg-[#c3002f] text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                                    {stage.step}
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-neutral-400 text-[10px] flex items-center justify-center text-neutral-500">
                                    {stage.step}
                                  </div>
                                )}
                              </div>
                              <div
                                className={`text-[11px] font-nissan-bold ${
                                  isCurrent
                                    ? 'text-[#c3002f]'
                                    : isCompleted
                                    ? 'text-emerald-700 dark:text-emerald-300'
                                    : 'text-neutral-500'
                                }`}
                              >
                                {stage.label}
                              </div>
                              <div className="text-[9.5px] text-neutral-500 mt-0.5">{stage.desc}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[12px] text-neutral-600 dark:text-neutral-400">
                      <div>
                        Service Advisor: <strong className="text-[#111111] dark:text-white">{sb.assignedAdvisor || 'Ramesh Thakur (Service Head)'}</strong>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href="tel:+919031005087"
                          className="btn-mui-outlined text-[11px] py-1 px-2.5 flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-[#c3002f]" />
                          <span>Call Workshop Bay</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: Saved Car Configurations */}
          {activeTab === 'configurations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    Saved Car Configurations
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Your customized Nissan specifications with Motihari on-road price estimates.
                  </p>
                </div>
              </div>

              {configurations.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-sm">
                  <Car className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 dark:text-neutral-300 font-nissan-bold">No saved configurations</p>
                  <p className="text-[12px] text-neutral-500 mt-1">
                    Customize your Nissan Tekton or Magnite in the showroom lineup.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {configurations.map((cfg) => (
                    <div
                      key={cfg.id}
                      className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-nissan-bold uppercase tracking-wider text-[#c3002f]">
                              CUSTOM CONFIGURATION
                            </span>
                            <h4 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white mt-1">
                              {cfg.vehicleName}
                            </h4>
                            <div className="text-[13px] text-neutral-600 dark:text-neutral-400 font-medium">
                              Grade: {cfg.variantGrade} • {cfg.transmission}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteConfig(cfg.id)}
                            title="Remove Configuration"
                            className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Color Swatch */}
                        <div className="mt-3 flex items-center gap-2 text-[12px] text-neutral-600 dark:text-neutral-300">
                          <span
                            className="w-4 h-4 rounded-full border border-neutral-400 shadow-2xs"
                            style={{ backgroundColor: cfg.colorHex }}
                          />
                          <span>{cfg.colorName}</span>
                          <span className="text-neutral-400">•</span>
                          <span>{cfg.fuelType}</span>
                        </div>

                        {/* Pricing Overview */}
                        <div className="mt-4 p-3 bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800 rounded-xs space-y-1.5 text-[12px]">
                          <div className="flex justify-between text-neutral-500">
                            <span>Ex-Showroom Price:</span>
                            <span className="font-mono font-medium text-[#111111] dark:text-white">
                              ₹ {cfg.exShowroomPrice?.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between font-nissan-bold text-[13px] text-[#111111] dark:text-white border-t border-neutral-100 dark:border-neutral-800 pt-1.5">
                            <span>On-Road Price (Motihari):</span>
                            <span className="text-[#c3002f]">
                              ₹ {cfg.onRoadPriceEstimateMotihari?.toLocaleString('en-IN')}*
                            </span>
                          </div>
                          <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <span>Estimated EMI:</span>
                            <span>From ₹ {cfg.monthlyEmiEstimate?.toLocaleString('en-IN')}/month*</span>
                          </div>
                        </div>

                        {/* Selected Accessories */}
                        {cfg.selectedAccessories && cfg.selectedAccessories.length > 0 && (
                          <div className="mt-3">
                            <div className="text-[11px] font-nissan-bold text-neutral-500 uppercase tracking-wider mb-1">
                              Included Accessories:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {cfg.selectedAccessories.map((acc, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-xs text-neutral-700 dark:text-neutral-300"
                                >
                                  + {acc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenTestDrive(cfg.vehicleModelId);
                          }}
                          className="btn-mui-contained text-[11.5px] py-1.5 px-3 flex items-center gap-1.5"
                        >
                          <span>Book Test Drive With This Spec</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10.5px] text-neutral-400">
                          Saved on {formatSafeDate(cfg.savedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Downloadable GST Invoices */}
          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    GST Invoices & Tax Copies
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Official GST compliance invoices issued by Tara Nissan Authorized Dealership (GSTIN: 10AAACT7829M1ZQ).
                  </p>
                </div>
              </div>

              {invoices.map((inv) => (
                <div
                  key={inv.id || inv.invoiceNumber}
                  className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-mono font-nissan-bold text-[#c3002f]">
                          {inv.invoiceNumber}
                        </span>
                        <span className="text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 font-mono">
                          HSN: {inv.hsnCode || '8703'}
                        </span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-nissan-bold px-2 py-0.5 uppercase">
                          {inv.paymentStatus}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-nissan-bold text-[#111111] dark:text-white mt-1">
                        {inv.vehicleModel} - {inv.vehicleVariant}
                      </h4>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-[18px] font-nissan-bold text-[#111111] dark:text-white font-mono">
                        ₹ {inv.totalInvoiceValue?.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Date: {inv.invoiceDate}
                      </div>
                    </div>
                  </div>

                  {/* GST & Vehicle Specs Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] bg-white dark:bg-[#1a1a1a] p-3 border border-neutral-200 dark:border-neutral-800/80 rounded-xs">
                    <div>
                      <span className="text-[10.5px] text-neutral-500 block uppercase">VIN / Chassis</span>
                      <strong className="font-mono text-[#111111] dark:text-white">{inv.chassisNumber}</strong>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-neutral-500 block uppercase">Engine No.</span>
                      <strong className="font-mono text-[#111111] dark:text-white">{inv.engineNumber}</strong>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-neutral-500 block uppercase">Dealership GSTIN</span>
                      <strong className="font-mono text-[#111111] dark:text-white">{inv.dealershipGstin}</strong>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-neutral-500 block uppercase">Taxable Value</span>
                      <strong className="font-mono text-[#111111] dark:text-white">
                        ₹ {inv.exShowroomAmount?.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  {/* Tax Breakdown table */}
                  <div className="text-[12px] border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden">
                    <div className="grid grid-cols-4 bg-neutral-100 dark:bg-neutral-800 p-2 font-nissan-bold text-[11px] text-neutral-600 dark:text-neutral-300">
                      <div>Tax Component</div>
                      <div>Rate (%)</div>
                      <div>Amount</div>
                      <div className="text-right">Remarks</div>
                    </div>
                    <div className="divide-y divide-neutral-200 dark:divide-neutral-800/60 p-1">
                      <div className="grid grid-cols-4 p-1.5 text-neutral-700 dark:text-neutral-300">
                        <div>CGST (Central Tax)</div>
                        <div>{inv.cgstRate}%</div>
                        <div className="font-mono">₹ {inv.cgstAmount?.toLocaleString('en-IN')}</div>
                        <div className="text-right text-neutral-400">Section 9 CGST Act</div>
                      </div>
                      <div className="grid grid-cols-4 p-1.5 text-neutral-700 dark:text-neutral-300">
                        <div>SGST (Bihar State Tax)</div>
                        <div>{inv.sgstRate}%</div>
                        <div className="font-mono">₹ {inv.sgstAmount?.toLocaleString('en-IN')}</div>
                        <div className="text-right text-neutral-400">Bihar GST 2017</div>
                      </div>
                      <div className="grid grid-cols-4 p-1.5 text-neutral-700 dark:text-neutral-300">
                        <div>Compensation Cess</div>
                        <div>{inv.compensationCessRate || 1}%</div>
                        <div className="font-mono">₹ {inv.compensationCessAmount?.toLocaleString('en-IN')}</div>
                        <div className="text-right text-neutral-400">GST Cess Act</div>
                      </div>
                      <div className="grid grid-cols-4 p-1.5 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/30">
                        <div>Road Tax (Bihar RTO)</div>
                        <div>Registration</div>
                        <div className="font-mono">₹ {inv.roadTaxRTO?.toLocaleString('en-IN')}</div>
                        <div className="text-right text-neutral-400">Motihari DTO</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[11.5px] text-neutral-500">
                      Official digitally signed GST invoice for vehicle registration and claim.
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="btn-mui-outlined text-[12px] py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print / View Tax Copy</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedInvoice(inv);
                          setTimeout(() => handlePrint(), 300);
                        }}
                        className="btn-mui-contained text-[12px] py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-neutral-100 dark:bg-[#161616] px-5 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[12px] text-neutral-500 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c3002f]" />
            <span>Tara Nissan Customer Privileges • Motihari NH28 Dealership</span>
          </div>
          <button
            onClick={onClose}
            className="btn-mui-outlined text-[12px] py-1 px-4 text-[#111111] dark:text-white"
          >
            Close
          </button>
        </div>
      </div>

      {/* Printable GST Invoice Modal View */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-2 sm:p-3 overflow-y-auto">
          <div className="bg-white text-black p-4 sm:p-8 max-w-2xl w-full rounded-xs shadow-2xl border border-neutral-400 text-[12px] font-sans my-2 sm:my-4 max-h-[96vh] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-black pb-3 sm:pb-4 gap-2">
              <div>
                <h2 className="text-[16px] sm:text-[18px] font-bold tracking-tight">TARA AUTOMOBILES (NISSAN DEALERSHIP)</h2>
                <p className="text-[11px] text-neutral-700">
                  NH28 Bankat, Bapudham Motihari, East Champaran, Bihar - 845402
                </p>
                <p className="text-[11px] text-neutral-700">
                  <strong>GSTIN:</strong> 10AAACT7829M1ZQ • <strong>State Code:</strong> 10 (Bihar)
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="inline-block bg-black text-white text-[11px] font-bold px-2 py-0.5 mb-1">
                  TAX INVOICE
                </span>
                <p className="font-mono text-[12px] font-bold">{selectedInvoice.invoiceNumber}</p>
                <p className="text-[11px]">Date: {selectedInvoice.invoiceDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4 p-3 bg-neutral-100 rounded-xs">
              <div>
                <div className="font-bold text-[11px] uppercase text-neutral-600">Billed To Customer:</div>
                <div className="font-bold text-[13px]">{selectedInvoice.customerName}</div>
                <div className="text-[11px]">{selectedInvoice.customerAddress}</div>
                <div className="text-[11px]">Mobile: +91 {selectedInvoice.customerPhone}</div>
              </div>
              <div>
                <div className="font-bold text-[11px] uppercase text-neutral-600">Vehicle Description:</div>
                <div className="font-bold text-[13px]">{selectedInvoice.vehicleModel} - {selectedInvoice.vehicleVariant}</div>
                <div className="text-[11px] font-mono">Chassis: {selectedInvoice.chassisNumber}</div>
                <div className="text-[11px] font-mono">Engine: {selectedInvoice.engineNumber}</div>
                <div className="text-[11px]">HSN Tariff Code: 8703</div>
              </div>
            </div>

            <div className="overflow-x-auto max-w-full my-4">
              <table className="min-w-full w-full border-collapse border border-neutral-300 text-left text-[11.5px]">
                <thead>
                  <tr className="bg-neutral-200">
                    <th className="border border-neutral-300 p-1.5">Description</th>
                    <th className="border border-neutral-300 p-1.5">Rate</th>
                    <th className="border border-neutral-300 p-1.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 p-1.5">Ex-Showroom Taxable Value</td>
                    <td className="border border-neutral-300 p-1.5">-</td>
                    <td className="border border-neutral-300 p-1.5 text-right font-mono">{(selectedInvoice.exShowroomAmount || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-1.5">CGST (Central Goods & Services Tax)</td>
                    <td className="border border-neutral-300 p-1.5">{selectedInvoice.cgstRate || 0}%</td>
                    <td className="border border-neutral-300 p-1.5 text-right font-mono">{(selectedInvoice.cgstAmount || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-1.5">SGST (Bihar Goods & Services Tax)</td>
                    <td className="border border-neutral-300 p-1.5">{selectedInvoice.sgstRate || 0}%</td>
                    <td className="border border-neutral-300 p-1.5 text-right font-mono">{(selectedInvoice.sgstAmount || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-1.5">GST Compensation Cess</td>
                    <td className="border border-neutral-300 p-1.5">{selectedInvoice.compensationCessRate || 1}%</td>
                    <td className="border border-neutral-300 p-1.5 text-right font-mono">{(selectedInvoice.compensationCessAmount || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-1.5">Road Tax & Motihari DTO Registration</td>
                    <td className="border border-neutral-300 p-1.5">RTO</td>
                    <td className="border border-neutral-300 p-1.5 text-right font-mono">{(selectedInvoice.roadTaxRTO || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-1.5">Comprehensive Insurance & FASTag</td>
                    <td className="border border-neutral-300 p-1.5">Standard</td>
                    <td className="border border-neutral-300 p-1.5 text-right font-mono">{(selectedInvoice.fastagInsurance || 0).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-neutral-100 font-bold">
                    <td colSpan={2} className="border border-neutral-300 p-2 text-right">TOTAL INVOICE VALUE (INR):</td>
                    <td className="border border-neutral-300 p-2 text-right font-mono text-[13px]">₹ {(selectedInvoice.totalInvoiceValue || 0).toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-neutral-300 pt-3 flex justify-between items-end text-[11px] text-neutral-600">
              <div>
                <p>E.&O.E. Subject to Motihari, Bihar jurisdiction.</p>
                <p>Thank you for choosing Tara Nissan!</p>
              </div>
              <div className="text-right">
                <p className="font-bold">For TARA AUTOMOBILES</p>
                <div className="h-10"></div>
                <p className="border-t border-neutral-400 pt-1">Authorized Signatory</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 print:hidden border-t pt-3">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-3 py-1.5 border border-neutral-400 text-neutral-700 hover:bg-neutral-100 rounded-xs cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-[#c3002f] text-white font-bold rounded-xs flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
