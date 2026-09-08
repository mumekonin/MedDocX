import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, User, Lock, BarChart3 } from "lucide-react";
import {
  siteStatsSchema, profileSchema, passwordSchema,
  type SiteStatsFormValues, type ProfileFormValues, type PasswordFormValues,
} from "../../schemas/settings.schema";
import {
  useSiteStats, useUpdateSiteStats, useUpdateProfile, useChangePassword,
} from "../../hooks/useSettings";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
  const { user } = useAuth();
  const { data: stats } = useSiteStats();
  const { mutate: updateStats, isPending: isSavingStats, isSuccess: statsSaved } = useUpdateSiteStats();
  const { mutate: updateProfile, isPending: isSavingProfile, isSuccess: profileSaved, isError: profileError } = useUpdateProfile();
  const { mutate: changePassword, isPending: isSavingPassword, isSuccess: passwordSaved, isError: passwordError, reset: resetPasswordMutation } = useChangePassword();

  const [statsFeedback, setStatsFeedback] = useState(false);

  // --- Site stats form ---
  const statsForm = useForm<SiteStatsFormValues>({
    resolver: zodResolver(siteStatsSchema),
    values: stats,
  });

  const onSaveStats = (values: SiteStatsFormValues) => {
    updateStats(values, {
      onSuccess: () => {
        setStatsFeedback(true);
        setTimeout(() => setStatsFeedback(false), 2500);
      },
    });
  };

  // --- Profile form ---
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: user ? { name: user.name, email: user.email } : undefined,
  });

  const onSaveProfile = (values: ProfileFormValues) => {
    updateProfile(values);
  };

  // --- Password form ---
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onChangePassword = (values: PasswordFormValues) => {
    changePassword(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => passwordForm.reset() },
    );
  };

  useEffect(() => {
    if (passwordSaved) {
      const timeout = setTimeout(() => resetPasswordMutation(), 2500);
      return () => clearTimeout(timeout);
    }
  }, [passwordSaved, resetPasswordMutation]);

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-white light:!text-gray-900 text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 light:!text-gray-600 text-sm mt-1">Manage your site details and account.</p>
      </div>

      <div className="space-y-6">
        {/* Site Stats */}
        <section className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <BarChart3 className="w-4.5 h-4.5 text-indigo-400" />
            <h2 className="text-white light:!text-gray-900 font-semibold">Homepage Stats</h2>
          </div>
          <form onSubmit={statsForm.handleSubmit(onSaveStats)} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Patients</label>
                <input
                  {...statsForm.register("patientsCount")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                  placeholder="3,000+"
                />
              </div>
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Doctors</label>
                <input
                  {...statsForm.register("doctorsCount")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                  placeholder="50+"
                />
              </div>
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Emergency Care</label>
                <input
                  {...statsForm.register("emergencyCareLabel")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                  placeholder="24/7"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSavingStats}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {isSavingStats ? "Saving..." : "Save Stats"}
              </button>
              {statsFeedback && <span className="text-green-400 text-sm">Saved</span>}
            </div>
          </form>
        </section>

        {/* Profile */}
        <section className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <User className="w-4.5 h-4.5 text-indigo-400" />
            <h2 className="text-white light:!text-gray-900 font-semibold">Profile</h2>
          </div>
          {profileError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              Something went wrong. That email may already be in use.
            </div>
          )}
          <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Name</label>
                <input
                  {...profileForm.register("name")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                />
                {profileForm.formState.errors.name && (
                  <p className="text-red-400 text-xs mt-1">{profileForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  {...profileForm.register("email")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                />
                {profileForm.formState.errors.email && (
                  <p className="text-red-400 text-xs mt-1">{profileForm.formState.errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {isSavingProfile ? "Saving..." : "Save Profile"}
              </button>
              {profileSaved && <span className="text-green-400 text-sm">Saved</span>}
            </div>
          </form>
        </section>

        {/* Password */}
        <section className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Lock className="w-4.5 h-4.5 text-indigo-400" />
            <h2 className="text-white light:!text-gray-900 font-semibold">Change Password</h2>
          </div>
          {passwordError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              Current password is incorrect.
            </div>
          )}
          <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
            <div>
              <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Current Password</label>
              <input
                type="password"
                {...passwordForm.register("currentPassword")}
                className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-red-400 text-xs mt-1">{passwordForm.formState.errors.currentPassword.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">New Password</label>
                <input
                  type="password"
                  {...passwordForm.register("newPassword")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-red-400 text-xs mt-1">{passwordForm.formState.errors.newPassword.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  {...passwordForm.register("confirmPassword")}
                  className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSavingPassword}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {isSavingPassword ? "Updating..." : "Update Password"}
              </button>
              {passwordSaved && <span className="text-green-400 text-sm">Password updated</span>}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;