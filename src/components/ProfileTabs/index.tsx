"use client";

import { trackEvent } from "@/utils/analytics";
import { ReactNode, useState } from "react";

type TabId = "workHistory" | "projects";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "workHistory", label: "경력" },
  { id: "projects", label: "개인 프로젝트" },
];

type ProfileTabsProps = {
  projects: ReactNode;
  workHistory: ReactNode;
};

const ProfileTabs = ({ projects, workHistory }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("workHistory");
  const handleTabClick = (tab: (typeof tabs)[number]) => {
    setActiveTab(tab.id);
    trackEvent("Profile Tab Click", {
      tab: tab.id,
      label: tab.label,
    });
  };

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div
        aria-label="프로필 섹션"
        className="mx-auto mb-10 flex w-full rounded-lg border border-gray-300 bg-gray-100 p-1 dark:border-slate-600 dark:bg-slate-800 sm:w-fit"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              aria-controls={`${tab.id}-panel`}
              aria-selected={isActive}
              className={`min-h-11 flex-1 rounded-md px-5 text-sm font-semibold transition-colors sm:flex-none ${
                isActive
                  ? "bg-white text-teal-700 shadow-sm dark:bg-slate-950 dark:text-teal-300"
                  : "text-gray-600 hover:bg-white/70 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white"
              }`}
              id={`${tab.id}-tab`}
              onClick={() => handleTabClick(tab)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        aria-labelledby={`${activeTab}-tab`}
        id={`${activeTab}-panel`}
        role="tabpanel"
      >
        {activeTab === "workHistory" ? workHistory : projects}
      </div>
    </section>
  );
};

export default ProfileTabs;
