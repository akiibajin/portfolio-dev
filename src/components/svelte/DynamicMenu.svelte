<script lang="ts">
  import { currentTab, toggleModal } from "../../store";
  import icon from "../../assets/jin-tattoo.png";
  import type { TModalKey } from "../../utils/getModalContent";

  type Ttabs = Array<{
    name: TModalKey;
    path: string;
  }>;

  let {
    tabs,
    disabled,
    mode = "navigate",
  }: { tabs: Ttabs; disabled?: boolean; mode?: "navigate" | "dialog" } = $props();

  let menuEl: HTMLElement | null = $state(null);

  // Local reactive mirror of the nanostore so the active item can be marked
  // without pulling in @nanostores/svelte.
  let active = $state(currentTab.get());
  $effect(() => currentTab.subscribe((value) => (active = value)));

  function onKeydown(event: KeyboardEvent) {
    if (disabled) return;
    const last = tabs.length - 1;
    const index = tabs.findIndex((tab) => tab.name === active.name);
    let next: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = index >= last ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = index <= 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    currentTab.set({ position: next, name: tabs[next].name });
    menuEl?.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(".item-button")[
      next
    ]?.focus();
  }
</script>

<!-- Commented tailwindcss code due to bug: https://github.com/tailwindlabs/tailwindcss/issues/15794 -->
<nav class="menu-nav" aria-label="Sections" bind:this={menuEl} onkeydown={onKeydown}>
  <ul class="menu-list">
    {#each tabs as tab, i (tab.name)}
      <li
        class="menu-list-item"
        class:is-active={i === active.position}
        onmouseover={() => currentTab.set({ position: i, name: tab.name })}
        ontouchstart={() => currentTab.set({ position: i, name: tab.name })}
        onfocusin={() => currentTab.set({ position: i, name: tab.name })}
      >
        <img src={icon.src} alt="" class="icon-img" aria-hidden="true" />
        {#if disabled}
          <button class="item-button" disabled aria-disabled="true">
            {tab.name}
          </button>
        {:else if mode === "dialog"}
          <button
            class="item-button"
            aria-haspopup="dialog"
            onclick={() => {
              // Set the tab explicitly instead of depending on a prior
              // mouseover/touchstart, so the dialog can never open showing
              // the previous section's content.
              currentTab.set({ position: i, name: tab.name });
              toggleModal(true);
            }}
          >
            {tab.name}
          </button>
        {:else}
          <a
            href={tab.path}
            class="item-button"
            aria-current={i === active.position ? "page" : undefined}
          >
            {tab.name}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style lang="css">
  .menu-nav {
    margin-inline: auto;
    margin-top: 2rem;
    width: min-content;
  }
  .menu-list {
    width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .menu-list-item {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.25rem;
  }
  .icon-img {
    height: 1.5rem;
    width: 1rem;
    opacity: 0;
    flex: 0 0 auto;
    transition: opacity 0.15s ease-in-out;
  }
  .item-button {
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: 0.25rem;
    padding-left: 0.75rem;
    padding-block: 0.25rem;
    opacity: 1;
    text-align: left;
    text-decoration: none;
    color: #fff;
    font-size: 1.25rem;
    line-height: 1.2;
    transition: background-color 0.3s ease-in-out;
    border: none;
    background-color: transparent;
  }
  .item-button[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .menu-list-item:hover .icon-img,
  .menu-list-item:focus-within .icon-img {
    opacity: 1;
  }

  .menu-list-item:hover .item-button,
  .menu-list-item:focus-within .item-button,
  .menu-list-item.is-active .item-button {
    opacity: 1;
    background: linear-gradient(to right, #d43458, #553152);
  }

  .menu-list-item:hover button,
  .menu-list-item:focus-within button {
    box-shadow: 0 0 10px #553152, 0 0 20px #553152;
    background: linear-gradient(to right, #d43458, #553152);
    opacity: 1;
  }

  .item-button:focus-visible {
    outline: 2px solid #d43458;
    outline-offset: 2px;
  }

  @media (width >= 64rem /* 1024px */) {
    .menu-nav {
      width: auto;
      margin-left: 3rem;
    }
    .item-button {
      opacity: 0.5;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .icon-img,
    .item-button {
      transition: none;
    }
  }
</style>
