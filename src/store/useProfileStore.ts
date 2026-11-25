import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProfileData, LinkItem } from "@/types";
import { initialProfileData } from "@/data/initialData";

interface ProfileState {
  profile: ProfileData;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  setLinks: (links: LinkItem[]) => void;
  addLink: (newLink: Omit<LinkItem, "id" | "order">) => void;
  deleteLink: (id: string) => void;
  toggleLinkActive: (id: string) => void;
  resetToDefault: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: initialProfileData,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      updateProfile: (data) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...data,
          },
        })),
      setLinks: (links) =>
        set((state) => ({
          profile: {
            ...state.profile,
            links,
          },
        })),
      addLink: (newLink) =>
        set((state) => {
          const nextOrder =
            state.profile.links.length > 0
              ? Math.max(...state.profile.links.map((l) => l.order)) + 1
              : 1;
          const created: LinkItem = {
            ...newLink,
            id: `link-${Date.now()}`,
            order: nextOrder,
          };
          return {
            profile: {
              ...state.profile,
              links: [...state.profile.links, created],
            },
          };
        }),
      deleteLink: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            links: state.profile.links.filter((l) => l.id !== id),
          },
        })),
      toggleLinkActive: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            links: state.profile.links.map((link) =>
              link.id === id ? { ...link, isActive: !link.isActive } : link
            ),
          },
        })),
      resetToDefault: () =>
        set({
          profile: initialProfileData,
        }),
    }),
    {
      name: "mylink-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
