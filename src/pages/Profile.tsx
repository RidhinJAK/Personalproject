import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Home, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setDisplayName(data.display_name);
      setNewDisplayName(data.display_name);
      setJoinDate(new Date(data.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    }
  };

  const handleSave = async () => {
    if (!user || !newDisplayName.trim()) return;

    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from('user_profiles')
      .update({ display_name: newDisplayName.trim() })
      .eq('id', user.id);

    if (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } else {
      setDisplayName(newDisplayName.trim());
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }

    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.'
    );

    if (!confirmed) return;

    const doubleConfirm = confirm(
      'This is your final warning. Deleting your account will remove all your mood logs, journal entries, and other data. Continue?'
    );

    if (!doubleConfirm) return;

    try {
      await supabase.from('user_profiles').delete().eq('id', user.id);
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage({ type: 'error', text: 'Failed to delete account' });
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <User className="w-10 h-10 mr-3 text-slate-600" />
            Profile Settings
          </h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border-2 border-green-200'
                : 'bg-red-50 text-red-800 border-2 border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-xl font-semibold hover:from-slate-700 hover:to-gray-700 transition-all disabled:opacity-50"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNewDisplayName(displayName);
                        }}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900 font-medium">{displayName}</span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-slate-600 hover:text-slate-700 font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user?.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Danger Zone</h2>
              <p className="text-gray-600 mb-6">
                Deleting your account will permanently remove all your data, including mood logs,
                journal entries, and achievements. This action cannot be undone.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Privacy & Security</h3>
              <ul className="space-y-3 text-sm opacity-90">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your data is encrypted and secure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>We never share your personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You have full control over your data</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All conversations remain private</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                If you have questions or need support, feel free to reach out.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-xl font-semibold hover:from-slate-700 hover:to-gray-700 transition-all"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
