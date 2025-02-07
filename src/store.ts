import { atom } from "nanostores";
import type { IDefs } from "./global/constants";

export const currentTab = atom<{ name: keyof IDefs; position: number }>({
  position: 0,
  name: "Frontend",
});

export const isOpenModal = atom<boolean>(false);

export const toggleModal = (flag?: boolean) =>
  isOpenModal.set(flag !== undefined ? flag : !isOpenModal.get());

export const isOpenNews = atom<boolean>(window.innerWidth > 640);
