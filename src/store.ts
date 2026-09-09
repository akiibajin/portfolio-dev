import { atom } from "nanostores";
import type { TModalKey } from "./utils/getModalContent";

export const currentTab = atom<{ name: TModalKey; position: number }>({
  position: 0,
  name: "Frontend",
});

export const isOpenModal = atom<boolean>(false);

export const toggleModal = (flag?: boolean) =>
  isOpenModal.set(flag !== undefined ? flag : !isOpenModal.get());