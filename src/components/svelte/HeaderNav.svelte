
<script lang="ts">
    let { path, redNeonBorder } = $props();
    let isOpen = $state(false);
</script>
<div class="flex not-sr-only lg:sr-only">
    <button
    onclick={()=>(isOpen = !isOpen)}
      class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"></path></svg
      >
      <svg
        class="hidden w-6 h-6"
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
  <div class:hidden={!isOpen} class='fixed sm:hidden top-0 left-0 w-dvw h-dvh bg-neutral-700/50 pointer-events-none z-2'></div>
  <div
    class={`${isOpen ? 'h-auto z-2 ' : 'h-0 overflow-hidden z-0 -translate-y-1/2 '}
    fixed -translate-x-1/2 top-20 bg-gray-800 transition-discrete
    left-1/2 w-[80dvw] transition-all duration-300 sm:relative 
    justify-between items-center lg:contents sm:w-max z-1 sm:z-0
    `}    
  >
    <ul
      class="flex flex-col font-medium items-center lg:flex-row lg:space-x-8 "
    >
      <li
        class={[
          "mr-0 w-full  lg:border-b-0 border-b-[1px] border-gray-400 text-center lg:w-auto lg:px-6 lg:py-3",
          path === "/knowledges" ? redNeonBorder : "",
        ]}
      >
        <a
          href="/knowledges"
          class="block py-2 w-full lg:w-auto pr-4 pl-3 text-white lg:hover:text-white lg:text-gray-400 lg:border-0 lg:hover:text-primary-700 lg:p-0"
          >Knowledges</a
        >
      </li> 
      <div class='border-l h-6 mx-0 -mb-1.5 hidden lg:block border-gray-300'></div>
      <li
        class={[
          "mr-0 w-full lg:border-b-0 border-b-[1px] border-gray-400 text-center lg:w-auto lg:px-6 lg:py-3",
          path === "/experiences" ? redNeonBorder : "",
        ]}
      >
        <a
          href="experiences"
          class="block py-2 w-full lg:w-auto pr-4 pl-3 text-white lg:hover:text-white lg:text-gray-400 lg:border-0 lg:hover:text-primary-700 lg:p-0"
          >experiences</a
        >
      </li>
      <div class='border-l h-6 mx-0 -mb-1.5 hidden lg:block border-gray-300'></div>
      <li
        class={[
          "mr-0 w-full lg:border-b-0 border-b-[1px] border-gray-400 text-center lg:w-auto lg:px-6 lg:py-3",
          path === "/learning" ? redNeonBorder : "",
        ]}
      >
        <a
          href="/learning"
          class="block py-2 w-full lg:w-auto pr-4 pl-3 text-white lg:hover:text-white lg:text-gray-400 lg:border-0 lg:hover:text-primary-700 lg:p-0"
          >Learning</a
        >
      </li>
      <div class='border-l h-6 mx-0 -mb-1.5 hidden lg:block border-gray-300'></div>
      <li
        class={[
          "mr-0 w-full lg:border-b-0 border-b-[1px] border-gray-400 text-center lg:w-auto lg:px-6 lg:py-3",
          path === "/contact" ? redNeonBorder : "",
        ]}
      >
        <a
          href="/contact"
          class="block py-2 w-full lg:w-auto pr-4 pl-3 text-white lg:hover:text-white lg:text-gray-400 lg:border-0 lg:hover:text-primary-700 lg:p-0"
          >Contact me</a
        >
      </li>
      <div class='border-l h-6 mx-0 -mb-1.5 hidden lg:block border-gray-300'></div>
    </ul>
  </div>