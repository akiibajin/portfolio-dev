<script lang="ts">
  import { currentTab, toggleModal } from "../../store"
  import icon from "../../assets/jin-tattoo.png";
  import type { IDefs } from '../../global/constants';  
  type Ttabs =  Array<{
    name: keyof IDefs;
    path: string;
  }>;
  let { tabs, disabled } = $props<{tabs: Ttabs, disabled: boolean | undefined}>();  
</script>


<nav class="mx-auto lg:ml-12 mt-8 w-min lg:w-auto">
  <ul class="w-60 flex flex-col gap-2">
    {#each tabs as tab, i}
    <li
    class="flex w-full group items-center gap-1"
    id="tab"
    onmouseover={()=> currentTab.set({position: i,name: tab.name})}
    ontouchstart={()=> currentTab.set({position: i,name: tab.name})}
    onfocus={()=> currentTab.set({position: i,name: tab.name})}
  >
    <img
      src={icon.src}
      alt={"jin tattoo"}
      class=" h-6 w-4 opacity-0 group-active:opacity-100 group-focus:opacity-100 group-hover:opacity-100"      
    />
    <button
      onclick={()=>!disabled &&  toggleModal()}
      class={`w-full cursor-pointer rounded-xs pl-3 text-left 
      group-active:bg-gradient-to-r 
      group-active:opacity-100
      group-active:[box-shadow:0_0_10px_#553152,0_0_20px_#553152]
      group-focus:bg-gradient-to-r 
      group-focus:opacity-100
      group-focus:[box-shadow:0_0_10px_#553152,0_0_20px_#553152]
      group-hover:[box-shadow:0_0_10px_#553152,0_0_20px_#553152] 
      group-hover:bg-gradient-to-r from-[#D43458] to-[#553152] 
      lg:group-hover:opacity-100
      text-xl text-gray-100 lg:opacity-50  
      transition-[background-color] delay-100 
      duration-300 ease-in-out`}      
    >
      {tab.name}
  </button>
  </li>
    {/each}
  </ul>
</nav>
