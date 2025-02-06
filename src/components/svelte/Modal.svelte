<script lang="ts">
  import { toggleModal, currentTab, isOpenModal } from "../../store";
  import ModalTable from "./ModalTable.svelte";
  import getModalContent from "../../utils/getModalContent";

  let isOpen = $state(false);
  let titleEl = $state("");
  let contentEl = $state("");

  currentTab.subscribe((value) => {
    const { title, content } = getModalContent(value.name);
    titleEl = title;
    contentEl = content;
  });

  isOpenModal.subscribe((value) => {
    isOpen = value;
  });

  const closeOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      toggleModal(false);
    }
  };

  $effect (() => {
    if (isOpen) {
      document.addEventListener("keydown", closeOnKeyDown);    
  }
  return () => {
    document.removeEventListener("keydown", closeOnKeyDown);
  }
  });
</script>

<div class="top-0 left-0 w-dvw h-dvh z-1 bg-black/75" class:hidden={!isOpen} class:fixed={isOpen} ></div>
<dialog
  class="bg-black text-white border-[1px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2   border-cyan-800 p-px max-w-lg rounded-sm shadow-lg transition duration-300 z-1"
  open={isOpen}
>
    <button
      onclick={() => toggleModal(false)}
      class="cursor-pointer absolute top-2 right-4 text-2xl"
    >
      ✖
    </button>
    <div class="w-full rounded-t-sm bg-cyan-600 p-2">
      <h4 class="text-center" bind:innerHTML={titleEl} contenteditable="true"></h4>
    </div>
    <div class="bg-gray-600 rounded-b-sm py-6 px-8">
      <div bind:innerHTML={contentEl} contenteditable="true"></div>
      <ModalTable />
    </div>
</dialog>

<style>
  dialog[open] {
    scale: 1;
    transition: scale 0.3s ease-in-out;
    @starting-style {
      scale: 0;
    }
  }
  dialog {
    transition: scale 0.3s ease, display 0.3s ease allow-discrete;
    scale: 0;
  }

</style>