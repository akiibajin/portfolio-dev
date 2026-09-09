<script lang="ts">
  import { currentTab, toggleModal } from "../../store"
  import icon from "../../assets/jin-tattoo.png";
  import type { TModalKey } from "../../utils/getModalContent";  
  type Ttabs =  Array<{
    name: TModalKey;
    path: string;
  }>;
  let { tabs, disabled, mode = "navigate" } = $props<{tabs: Ttabs, disabled?: boolean, mode?: "navigate" | "dialog"}>();  
</script>

<!-- Commented tailwindcss code due to bug: https://github.com/tailwindlabs/tailwindcss/issues/15794 -->
<nav class={/*"mx-auto lg:ml-12 mt-8 w-min lg:w-auto"*/"menu-nav"}>
  <ul class={/*"w-60 flex flex-col gap-2"*/ 'menu-list'}>
    {#each tabs as tab, i}
    <li
    class={/*"flex w-full group items-center gap-1"*/"menu-list-item"}
    id="tab"
    onmouseover={()=> currentTab.set({position: i,name: tab.name})}
    ontouchstart={()=> currentTab.set({position: i,name: tab.name})}
    onfocus={()=> currentTab.set({position: i,name: tab.name})}
  >
    <img
      src={icon.src}
      alt={"jin tattoo"}
      class={/*"h-6 w-4 opacity-0 group-active:opacity-100 group-focus:opacity-100 group-hover:opacity-100"*/'icon-img'}
      />
    {#if disabled}
    <button
      class={"item-button"}
      disabled
      aria-disabled="true"
    >
      {tab.name}
    </button>
    {:else if mode === "dialog"}
    <button
      class={"item-button"}
      onclick={() => toggleModal()}
    >
      {tab.name}
    </button>
    {:else}
    <a
      href={tab.path}
      class={"item-button"}
    >
      {tab.name}
    </a>
    {/if}
  </li>
    {/each}
  </ul>
</nav>


<style lang="css">
  .menu-nav{
    margin-inline: auto;
    margin-top: 2rem;
    width: min-content;
  }
  .menu-list{
    width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .menu-list-item{
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.25rem;
  }
  .icon-img{
    height: 1.5rem;
    width: 1rem;
    opacity: 0;
  }
  .item-button{
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: 0.25rem;
    padding-left: 0.75rem;
    opacity: 1;
    text-align: left;
    text-decoration: none;
    color: #fff;
    font-size: 1.25rem;
    transition: background-color 0.3s ease-in-out;
    border: none;
    background-color: transparent;
  }
  .item-button[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .menu-list-item:hover .icon-img,
  .menu-list-item:focus .icon-img
    {
    opacity: 1;
  }
  
  .menu-list-item:hover .item-button,
  .menu-list-item:focus .item-button {
    opacity: 1;
    background: linear-gradient(to right, #D43458, #553152);
  }

  .menu-list-item:hover button{
    box-shadow: 0 0 10px #553152, 0 0 20px #553152;
    background: linear-gradient(to right, #D43458, #553152);
    opacity: 1;
  }
  
  @media (width >= 64rem /* 1024px */) {
    .menu-nav{
      width: auto;
      margin-left: 3rem;
    }
    .item-button{
      opacity: 0.5;
    }
  }
</style>