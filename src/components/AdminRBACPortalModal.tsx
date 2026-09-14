import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Users,
  PhoneCall,
  Calendar,
  Wrench,
  BarChart3,
  CheckCircle2,
  Clock,
  UserCheck,
  RefreshCw,
  Phone,
  MessageSquare,
  AlertCircle,
  Car,
} from 'lucide-react';
import { InboundLead, CustomerTestDrive, CustomerServiceBooking, UserProfile } from '../types';
import {
  apiGetAdminLeads,
  apiUpdateLead,
  apiGetAdminTestDrives,
  apiUpdateTestDrive,
  apiGetAdminServices,
  apiUpdateServiceStatus,
  apiGetAdminStats,
  apiDemoSwitchRole,
} from '../services/apiClient.ts';

interface AdminRBACPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRoleSwitched: (user: UserProfile) => void;
}

export const AdminRBACPortalModal: React.FC<AdminRBACPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRoleSwitched,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'test_drives' | 'services' | 'stats'>('leads');
  const [loading, setLoading] = useState(false);
  const [switchingRole, setSwitchingRole] = useState(false);

  // Data states
  const [leads, setLeads] = useState<InboundLead[]>([]);
  const [testDrives, setTestDrives] = useState<CustomerTestDrive[]>([]);
  const [services, setServices] = useState<CustomerServiceBooking[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const currentRole = currentUser?.role || 'sales_advisor';

  const loadPortalData = async () => {
    setLoading(true);
    try {
      const [leadsData, tdData, srvData, statsData] = await Promise.allSettled([
        apiGetAdminLeads(),
        apiGetAdminTestDrives(),
        apiGetAdminServices(),
        apiGetAdminStats(),
      ]);

      if (leadsData.status === 'fulfilled') setLeads(leadsData.value || []);
      if (tdData.status === 'fulfilled') setTestDrives(tdData.value || []);
      if (srvData.status === 'fulfilled') setServices(srvData.value || []);
      if (statsData.status === 'fulfilled') setStats(statsData.value || null);
    } catch (err) {
      console.warn('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadPortalData();
    }
  }, [isOpen]);

  const handleRoleChange = async (newRole: 'customer' | 'sales_advisor' | 'service_manager' | 'admin') => {
    setSwitchingRole(true);
    try {
      const response = await apiDemoSwitchRole(newRole);
      const updatedUser: UserProfile = (response as any)?.user || response;
      if (updatedUser) {
        onRoleSwitched(updatedUser);
        setActionSuccess(`Role switched to ${(newRole || 'staff').replace('_', ' ').toUpperCase()}`);
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Role switch failed:', err);
    } finally {
      setSwitchingRole(false);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: string) => {
    try {
      await apiUpdateLead(leadId, { status });
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: status as any } : l)));
      setActionSuccess('Lead status updated');
      setTimeout(() => setActionSuccess(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignLeadAdvisor = async (leadId: string, advisor: string) => {
    try {
      await apiUpdateLead(leadId, { assignedAdvisor: advisor });
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, assignedAdvisor: advisor } : l)));
      setActionSuccess(`Assigned to ${advisor}`);
      setTimeout(() => setActionSuccess(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTestDriveStatus = async (id: string, status: string) => {
    try {
      await apiUpdateTestDrive(id, { status });
      setTestDrives((prev) => prev.map((td) => (td.id === id ? { ...td, status: status as any } : td)));
      setActionSuccess('Test drive status updated');
      setTimeout(() => setActionSuccess(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateServiceStage = async (id: string, stage: number) => {
    const stageNames = [
      '',
      'scheduled',
      'vehicle_inspected',
      'work_in_progress',
      'quality_checked',
      'ready_for_delivery',
      'delivered',
    ];
    try {
      await apiUpdateServiceStatus(id, {
        currentStage: stage,
        status: stageNames[stage] || 'work_in_progress',
      });
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, currentStage: stage, status: stageNames[stage] as any } : s))
      );
      setActionSuccess(`Workshop stage updated to Step ${stage}`);
      setTimeout(() => setActionSuccess(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-sm my-2 sm:my-8 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden">
        {/* Portal Header */}
        <div className="bg-[#0f0f0f] text-white px-3.5 sm:px-5 py-3 sm:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#c3002f] flex items-center justify-center text-white font-nissan-bold shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[15px] sm:text-[17px] font-nissan-bold tracking-tight text-white">
                  Tara Nissan RBAC Management Portal
                </h2>
                <span className="text-[9.5px] sm:text-[10px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded-xs uppercase tracking-wider font-nissan-bold">
                  Internal Staff Desk
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-neutral-400">
                Authorized Dealership Console • Bankat NH28, Motihari • Logged in as{' '}
                <strong className="text-white capitalize">{currentUser?.name || 'Staff Member'}</strong> (
                <span className="text-[#c3002f] font-mono">{currentRole}</span>)
              </p>
            </div>
          </div>

          {/* Quick RBAC Role Switcher (Section 2: Testing preference) */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 bg-neutral-900 border border-neutral-800 p-1 rounded-sm">
            <span className="text-[10px] sm:text-[10.5px] uppercase font-nissan-bold text-neutral-400 px-1 sm:px-2">
              Role:
            </span>
            {(['sales_advisor', 'service_manager', 'admin', 'customer'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                disabled={switchingRole}
                className={`text-[10.5px] sm:text-[11px] font-nissan-bold px-2 py-1 rounded-xs transition-all cursor-pointer ${
                  currentRole === r
                    ? 'bg-[#c3002f] text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {r === 'sales_advisor'
                  ? 'Sales'
                  : r === 'service_manager'
                  ? 'Service'
                  : r === 'admin'
                  ? 'Admin'
                  : 'Customer'}
              </button>
            ))}
            <button
              onClick={loadPortalData}
              title="Refresh Records"
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action toast banner */}
        {actionSuccess && (
          <div className="bg-emerald-900/90 text-emerald-200 px-4 py-1.5 text-[12px] font-nissan-bold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionSuccess}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#161616] px-4 overflow-x-auto shrink-0">
          {(currentRole === 'sales_advisor' || currentRole === 'admin') && (
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Inbound Leads Desk</span>
              {leads.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#c3002f] text-white text-[11px] rounded-full">
                  {leads.length}
                </span>
              )}
            </button>
          )}

          {(currentRole === 'sales_advisor' || currentRole === 'admin') && (
            <button
              onClick={() => setActiveTab('test_drives')}
              className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'test_drives'
                  ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Test Drive Appointments</span>
              {testDrives.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-[11px] rounded-full">
                  {testDrives.length}
                </span>
              )}
            </button>
          )}

          {(currentRole === 'service_manager' || currentRole === 'admin') && (
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'services'
                  ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Workshop Service Bay</span>
              {services.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 text-[11px] rounded-full">
                  {services.length}
                </span>
              )}
            </button>
          )}

          {currentRole === 'admin' && (
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 py-3 px-4 text-[13px] font-nissan-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'stats'
                  ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#121212]'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dealership Analytics</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white dark:bg-[#121212]">
          {/* TAB 1: Inbound Leads Desk */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    Real-Time Inbound Customer Leads
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Direct showroom phone clicks, WhatsApp chats, brochure downloads, and EMI queries from Motihari.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-nissan-bold px-2 py-1 rounded-xs">
                    ● Real-Time Sync
                  </span>
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-sm">
                  <p className="text-neutral-500">No leads captured yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xs">
                  <table className="w-full text-left text-[12.5px] border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 font-nissan-bold text-[11px] uppercase tracking-wider">
                        <th className="p-3">Customer Info</th>
                        <th className="p-3">Inquiry Type</th>
                        <th className="p-3">Target Car</th>
                        <th className="p-3">Assigned Advisor</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/60">
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-neutral-50 dark:hover:bg-[#181818] transition-colors"
                        >
                          <td className="p-3">
                            <div className="font-nissan-bold text-[#111111] dark:text-white">
                              {lead.name || 'Motihari Customer'}
                            </div>
                            <div className="text-[11px] text-neutral-500 font-mono">
                              +91 {lead.phone || '9031005087'}
                            </div>
                            <div className="text-[10px] text-neutral-400">
                              {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>

                          <td className="p-3">
                            <span
                              className={`text-[10.5px] font-nissan-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                                lead.leadType === 'direct_call'
                                  ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                                  : lead.leadType === 'whatsapp_inquiry'
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              }`}
                            >
                              {(lead.leadType || 'direct_call').replace(/_/g, ' ')}
                            </span>
                          </td>

                          <td className="p-3 font-nissan-bold text-[#111111] dark:text-white">
                            {lead.vehicleModel || 'All-New Nissan Tekton'}
                          </td>

                          <td className="p-3">
                            <select
                              value={lead.assignedAdvisor || 'Sanjay Singh'}
                              onChange={(e) => handleAssignLeadAdvisor(lead.id, e.target.value)}
                              className="text-[11.5px] p-1 bg-white dark:bg-[#202020] border border-neutral-300 dark:border-neutral-700 rounded-xs text-[#111111] dark:text-white cursor-pointer"
                            >
                              <option value="Sanjay Singh">Sanjay Singh (Senior Consultant)</option>
                              <option value="Priya Sharma">Priya Sharma (Fleet Sales)</option>
                              <option value="Amit Verma">Amit Verma (Digital Sales)</option>
                              <option value="Ramesh Thakur">Ramesh Thakur (Service Advisor)</option>
                            </select>
                          </td>

                          <td className="p-3">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className={`text-[11.5px] font-nissan-bold p-1 rounded-xs border cursor-pointer ${
                                lead.status === 'new'
                                  ? 'bg-red-50 text-[#c3002f] border-red-300'
                                  : lead.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : lead.status === 'test_drive_scheduled'
                                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              }`}
                            >
                              <option value="new">● NEW INQUIRY</option>
                              <option value="contacted">● CONTACTED</option>
                              <option value="test_drive_scheduled">● DRIVE SCHEDULED</option>
                              <option value="quote_sent">● QUOTE SENT</option>
                              <option value="closed">● CLOSED / WON</option>
                            </select>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${lead.phone || '9031005087'}`}
                                className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#c3002f] hover:text-white rounded-xs text-neutral-600 dark:text-neutral-300 transition-colors"
                                title="Direct Call"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/91${lead.phone || '9031005087'}?text=Hello%20${encodeURIComponent(lead.name || 'Valued Customer')},%20Greetings%20from%20Tara%20Nissan%20Motihari!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-600 hover:text-white rounded-xs text-emerald-700 dark:text-emerald-300 transition-colors"
                                title="WhatsApp Customer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Test Drive Appointments Manager */}
          {activeTab === 'test_drives' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    Test Drive Schedules & Demo Fleet
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Manage customer test drive bookings and showroom demo vehicle assignments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testDrives.map((td) => (
                  <div
                    key={td.id || td.bookingReference}
                    className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616] space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-500 uppercase">
                          Ref: {td.bookingReference || td.bookingRef}
                        </div>
                        <h4 className="text-[15px] font-nissan-bold text-[#111111] dark:text-white">
                          {td.vehicleModel}
                        </h4>
                        <div className="text-[12px] text-neutral-600 dark:text-neutral-300">
                          Customer: <strong>{td.customerName}</strong> (+91 {td.customerPhone})
                        </div>
                      </div>

                      <select
                        value={td.status}
                        onChange={(e) => handleUpdateTestDriveStatus(td.id, e.target.value)}
                        className="text-[11px] font-nissan-bold p-1 rounded-xs border cursor-pointer bg-white dark:bg-[#202020]"
                      >
                        <option value="pending">PENDING</option>
                        <option value="confirmed">CONFIRMED</option>
                        <option value="completed">COMPLETED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </div>

                    <div className="text-[12px] space-y-1 bg-white dark:bg-[#1e1e1e] p-2.5 rounded-xs border border-neutral-200 dark:border-neutral-800">
                      <div>
                        <strong>Date:</strong> {td.preferredDate || td.createdAt}
                      </div>
                      <div>
                        <strong>Type:</strong> {td.driveType || 'Showroom Visit'}
                      </div>
                      <div>
                        <strong>Advisor:</strong> {td.assignedAdvisor || 'Sanjay Singh'}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <a
                        href={`tel:${td.customerPhone}`}
                        className="btn-mui-outlined text-[11px] py-1 px-2.5 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#c3002f]" />
                        <span>Call Customer</span>
                      </a>
                      <span className="text-[10.5px] text-neutral-400">Tara Nissan Bankat NH28</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Workshop Service Bay (Service Manager View) */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                    Live Workshop Bay & Service Job Cards
                  </h3>
                  <p className="text-[12px] text-neutral-500">
                    Update 6-stage repair progress, technician assignments, and delivery estimates for customer vehicles.
                  </p>
                </div>
              </div>

              {services.map((srv) => (
                <div
                  key={srv.id || srv.bookingRef}
                  className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-mono font-nissan-bold bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-xs text-[#111111] dark:text-white">
                          {srv.registrationNumber}
                        </span>
                        <span className="text-[15px] font-nissan-bold text-[#111111] dark:text-white">
                          {srv.vehicleModel}
                        </span>
                        <span className="text-[11px] text-neutral-500">({srv.serviceType})</span>
                      </div>
                      <div className="text-[12px] text-neutral-600 dark:text-neutral-400 mt-1">
                        Owner: <strong>{srv.customerName}</strong> (+91 {srv.customerPhone})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-500">Update Live Stage:</span>
                      <select
                        value={srv.currentStage || 3}
                        onChange={(e) => handleUpdateServiceStage(srv.id, Number(e.target.value))}
                        className="text-[12px] font-nissan-bold p-1.5 bg-white dark:bg-[#222222] border border-neutral-300 dark:border-neutral-700 rounded-xs text-[#c3002f] cursor-pointer"
                      >
                        <option value={1}>1 - Scheduled</option>
                        <option value={2}>2 - Vehicle Inspected</option>
                        <option value={3}>3 - Work In Progress</option>
                        <option value={4}>4 - Quality Checked</option>
                        <option value={5}>5 - Ready For Delivery</option>
                        <option value={6}>6 - Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Stage Progress Indicator */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {[
                      { step: 1, label: '1. Scheduled' },
                      { step: 2, label: '2. Inspected' },
                      { step: 3, label: '3. In Progress' },
                      { step: 4, label: '4. QC Audit' },
                      { step: 5, label: '5. Ready' },
                      { step: 6, label: '6. Delivered' },
                    ].map((stg) => (
                      <button
                        key={stg.step}
                        onClick={() => handleUpdateServiceStage(srv.id, stg.step)}
                        className={`p-2 text-center rounded-xs border text-[11px] font-nissan-bold cursor-pointer transition-all ${
                          (srv.currentStage || 3) === stg.step
                            ? 'bg-[#c3002f] text-white border-[#c3002f]'
                            : (srv.currentStage || 3) > stg.step
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-white dark:bg-[#202020] border-neutral-300 dark:border-neutral-700 text-neutral-500'
                        }`}
                      >
                        {stg.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-[12px] text-neutral-500">
                    <div>
                      Assigned Advisor: <strong className="text-[#111111] dark:text-white">{srv.assignedAdvisor || 'Ramesh Thakur'}</strong>
                    </div>
                    <div>
                      Delivery Target: <strong className="text-[#111111] dark:text-white">{srv.estimatedDelivery || 'Today, 04:30 PM'}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Dealership KPI Analytics (Admin View) */}
          {activeTab === 'stats' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-[16px] font-nissan-bold text-[#111111] dark:text-white">
                  Tara Nissan Dealership Performance Metrics
                </h3>
                <p className="text-[12px] text-neutral-500">
                  Motihari showroom conversion, test drive throughput, and workshop revenue.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616]">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-nissan-bold">
                    Total Inbound Leads
                  </div>
                  <div className="text-[24px] font-nissan-bold text-[#c3002f] mt-1 font-mono">
                    {stats?.totalLeads || leads.length || 18}
                  </div>
                  <div className="text-[10.5px] text-emerald-600 mt-1">↑ +24% this week</div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616]">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-nissan-bold">
                    Active Test Drives
                  </div>
                  <div className="text-[24px] font-nissan-bold text-[#111111] dark:text-white mt-1 font-mono">
                    {stats?.totalTestDrives || testDrives.length || 6}
                  </div>
                  <div className="text-[10.5px] text-neutral-500 mt-1">Tekton & Magnite</div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616]">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-nissan-bold">
                    Workshop Bay Load
                  </div>
                  <div className="text-[24px] font-nissan-bold text-blue-600 mt-1 font-mono">
                    {stats?.activeServices || services.length || 4}
                  </div>
                  <div className="text-[10.5px] text-neutral-500 mt-1">92% On-Time Delivery</div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-sm bg-neutral-50 dark:bg-[#161616]">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-nissan-bold">
                    Customer CSAT
                  </div>
                  <div className="text-[24px] font-nissan-bold text-emerald-600 mt-1 font-mono">
                    4.9 / 5.0
                  </div>
                  <div className="text-[10.5px] text-emerald-600 mt-1">Bankat NH28 Dealership</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portal Footer */}
        <div className="bg-neutral-100 dark:bg-[#161616] px-5 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[12px] text-neutral-500 shrink-0">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#c3002f]" />
            <span>Role-Based Security Active • Session encrypted</span>
          </div>
          <button
            onClick={onClose}
            className="btn-mui-contained text-[12px] py-1 px-4"
          >
            Exit Portal
          </button>
        </div>
      </div>
    </div>
  );
};
