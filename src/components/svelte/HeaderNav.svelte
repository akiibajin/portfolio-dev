
<script lang="ts">
    let { path } = $props();
    let isOpen = $state(false);
    let isClosing = $state(false);
    let menuButton: HTMLButtonElement | null = $state(null);
    const navTabs = [
      { name: "Knowledges", path: "/knowledges" },
      { name: "Experiences", path: "/experiences" },
      { name: "Learning", path: "/learning" },
      { name: "Contact me", path: "/contact" },
    ];

    function toggleMenu() {
      if (isOpen) {
        isClosing = true;
        setTimeout(() => { isOpen = false; isClosing = false; }, 300);
      } else {
        isOpen = true;
      }
    }

    function closeMenu() {
      if (isOpen) {
        isClosing = true;
        setTimeout(() => { isOpen = false; isClosing = false; }, 300);
      }
    }

    function onKeydown(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        menuButton?.focus();
      }
    }
</script>

<svelte:window on:click={(e) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.menu-button') && !target.closest('.menu-nav')) {
    closeMenu();
  }
}} on:keydown={onKeydown} />

<div class="header-nav">
    <button
    class="menu-button"
    type="button"
    aria-expanded={isOpen}
    aria-controls="primary-menu"
    bind:this={menuButton}
    onclick={toggleMenu}
    >
      <span>Open main menu</span>
      <svg
        class:hidden={isOpen}
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"></path></svg
      >
      <svg
        class:hidden={!isOpen}
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"></path></svg
      >
    </button>
  </div>
  <nav id="primary-menu" class='menu-nav' class:open={isOpen} class:closing={isClosing} aria-label="Main">
    <ul>
      {#each navTabs as tab}
        <li
          class={path.includes(tab.path) ? 'neon' : ''}
        >
          <a
            href={tab.path}
            aria-current={path.includes(tab.path) ? "page" : undefined}
            onclick={closeMenu}
            >{tab.name}</a
          >
          <div class='separator' aria-hidden="true"></div>
        </li>
      {/each}
    </ul>
  </nav>

  <style>
    .header-nav {
      display: flex;
      position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
    }
    .menu-button{
      display: inline-flex;
      align-items: center;
      padding: 0.5rem;
      margin-left: 0.25rem;
      color: #fff;
      border-radius: 0.25rem;
    }
    .menu-button:focus-visible {
      outline: 2px solid #D43458;
      outline-offset: 2px;
    }
    .menu-button span {
      position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
    }
    .menu-button svg {
      height: 1.5rem;
      width: 1.5rem;
    }
    .menu-button svg.hidden {
      display: none;
    }

    .menu-nav{
      display: none;
      top: 75px;
      left: 50%;
      transform: translate(-50%);
      transform-origin: top left;
      position: fixed;
      width: 80dvw;
      background-color: #333;
    }
    .menu-nav.open{
      display: block;
      animation: menu-in 0.3s ease-in-out;
    }
    @keyframes menu-in {
      from { opacity: 0; transform: translate(-50%) scale(0); }
      to { opacity: 1; transform: translate(-50%) scale(1); }
    }
    .menu-nav.closing{
      display: block;
      animation: menu-out 0.3s ease-in-out forwards;
    }
    @keyframes menu-out {
      from { opacity: 1; transform: translate(-50%) scale(1); }
      to { opacity: 0; transform: translate(-50%) scale(0); }
    }
    .menu-nav ul{
      display: flex;
      flex-direction: column;
      font-weight: 500;
      align-items: center;
    }
    .menu-nav ul li{
      width: 100%;
      border-bottom: 1px solid #fff;
      margin-right: 0;
      padding-bottom: 0.5rem;
      text-align: center;
    }
    .menu-nav ul li a{
      display: block;
      padding: 0.5rem 1rem 0 0.75rem;
      width: 100%;
      text-decoration: none;
      color: #fff;
    }
    .menu-nav ul li a:focus-visible {
      outline: 2px solid #D43458;
      outline-offset: -2px;
    }
    .separator {
      display: none;
      height: 1.5rem;
      border: 1px solid #d1d5dc;
      margin-inline: 0;
      margin-bottom: -0.375rem;
    }
    .neon {
      position: relative;

}
.neon:after {
  content: '';
  display: none;
  border-radius: 0.125rem;
  position: absolute;
  left: 0;
  bottom: 0.25rem;
  width: 100%;
  height: 4px;
  background-color: #D43458;
  box-shadow:0 0 10px #D43458, 0 0 20px #D43458
}
@media (width >= 64rem /* 1024px */) {
  .neon:after {
    display: block;
  }
}
    @media (min-width: 48rem){
      .header-nav{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      .menu-button{
        display: none;
      }
      .menu-nav{
        position: relative;
        height: auto !important;
        top: 0;
        left: 0;
        width: max-content;
        background-color: transparent;
        transform: none;
        display: flex !important;
        animation: none;
      }
      .menu-nav ul{
        flex-direction: row;
      }
      .menu-nav ul li{
        border-bottom: 0;
        width: auto;
        /* Right padding becomes the flex gap, so the separator still sits
           exactly one label-gap away from the text as it did when it was a
           sibling of the <li> and a direct flex item of the row. */
        padding: 0.75rem 0 0.75rem 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .menu-nav ul li a{
        color: #99a1af;
        width: auto;
        border: 0;
        padding: 0;
      }
      .menu-nav ul li a:hover{
        color: #fff;
      }
      .menu-nav ul li a:focus-visible {
        outline-offset: 3px;
      }
      .separator {
        display: block;
        flex: none;
      }
    }
  </style>
