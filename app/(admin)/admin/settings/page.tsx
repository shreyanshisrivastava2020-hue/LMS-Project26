"use client";

import { useEffect, useState } from "react";
import { Settings, CreditCard, Image, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({
    platformName: "",
    supportEmail: "",
    enableRegistration: true,
    commission: 10,
    currency: "INR",
    enablePayments: true,
    logoUrl: "",
    websiteTitle: "",
    maintenanceMode: false,
  });

  // 🔥 Fetch settings
  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const res = await fetch("/api/admin/settings");
  //       const data = await res.json();
  //       setSettings(data.data);
  //     } catch {
  //       toast.error("Failed to load settings");
  //     }
  //   };
  //   fetchSettings();
  // }, []);

  const handleChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("Settings updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Configure your LMS platform like a pro</p>
      </div>

      {/* GENERAL SETTINGS */}
      <Card className="rounded-2xl shadow-sm border">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">General Settings</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="platformName"
              value={settings.platformName}
              onChange={handleChange}
              placeholder="Platform Name"
            />
            <Input
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
              placeholder="Support Email"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Enable User Registration</span>
            <Switch
              checked={settings.enableRegistration}
              onCheckedChange={(val) =>
                setSettings({ ...settings, enableRegistration: val })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* PAYMENT SETTINGS */}
      <Card className="rounded-2xl shadow-sm border">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Payment Settings</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="commission"
              type="number"
              value={settings.commission}
              onChange={handleChange}
              placeholder="Commission (%)"
            />
            <Input
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              placeholder="Currency (INR, USD)"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Enable Payments</span>
            <Switch
              checked={settings.enablePayments}
              onCheckedChange={(val) =>
                setSettings({ ...settings, enablePayments: val })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* BRANDING */}
      <Card className="rounded-2xl shadow-sm border">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg font-semibold">Branding</h2>
          </div>

          <Input
            name="logoUrl"
            value={settings.logoUrl}
            onChange={handleChange}
            placeholder="Logo URL"
          />

          <Input
            name="websiteTitle"
            value={settings.websiteTitle}
            onChange={handleChange}
            placeholder="Website Title"
          />
        </CardContent>
      </Card>

      {/* SECURITY */}
      <Card className="rounded-2xl shadow-sm border">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>

          <div className="flex justify-between items-center">
            <span>Maintenance Mode</span>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(val) =>
                setSettings({ ...settings, maintenanceMode: val })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* STICKY SAVE BAR */}
      <div className="sticky bottom-4 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 rounded-xl shadow-lg"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
