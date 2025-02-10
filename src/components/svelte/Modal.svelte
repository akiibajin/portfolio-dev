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
    const modalPopover = document.getElementById("news");
    if (isOpen) {
      modalPopover && modalPopover.hidePopover();
      document.addEventListener("keydown", closeOnKeyDown);    
  }
  return () => {
    modalPopover && modalPopover.showPopover();
    document.removeEventListener("keydown", closeOnKeyDown);
  }
  });
</script>

<div class:modal-dark-veil={isOpen}></div>
<dialog
  class="dialog"
  open={isOpen}
>
    <button class="close-button" onclick={() => toggleModal(false)}>
      ✖
    </button>
    <div class="modal-header">
      <h4 class="text-center" bind:innerHTML={titleEl} contenteditable="true"></h4>
    </div>
    <div class="modal-body">
      <div bind:innerHTML={contentEl} class="slot" contenteditable="true"></div>
      <ModalTable />
    </div>
</dialog>

<style>
  .modal-dark-veil {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: block;
  }
  .dialog[open] {
    scale: 1;
    transition: scale 0.15s ease-in-out;
    @starting-style {
      scale: 0;
    }
  }
  .dialog {
    transition: scale 0.15s ease, display 0.15s ease allow-discrete;
    background-color: black;
    color: white;
    border-radius: 0.25rem;
    border: 1px solid oklch(0.45 0.085 224.283);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1px;
    z-index: 2;
    width: 100%;
    scale: 0;
  }
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    line-height: calc(2 / 1.5);
  }
  .modal-header {
    border-radius: 0.25rem 0.25rem 0 0;
    width: 100%;
    background-color: oklch(0.609 0.126 221.723);
    padding: 0.5rem;
  }
  .modal-body {
    background-color: #4a5565;
    border-radius: 0 0 0.25rem 0.25rem;
    padding:1.5rem 2rem;
  }
  .slot {
    margin-bottom: 1.5rem;
  }
  @media (width >= 40rem) {
    .dialog {
        max-width: 32rem
    }
  }
</style>