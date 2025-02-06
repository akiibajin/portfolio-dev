<script lang="ts">
    export let firstTitle: string
    export let secondTitle: string
    export let additonalTitles: Array<string> | undefined;
    export let cells: Array<Array<string>>
</script>

<table class="w-full bg-neutral-950">
  <thead class="bg-cyan-500">
    <tr>
      <th class="font-thin text-center py-1 px-3">{firstTitle}</th>
      <th class="font-light mx-3">{secondTitle}</th>
        {#each additonalTitles as title}
            <th class="font-light mx-3">{title}</th>
        {/each}
    </tr>
  </thead>
  <tbody>
    {#each cells as cell}
    <tr class="bg-neutral-800 border-b-1 border-b-cyan-600">
        {#each cell as C}
          <td class="inset-shadow-sm hover:inset-shadow-cyan-500 border-l-1 px-4 border-l-cyan-600">
            <div bind:innerHTML={C} contenteditable='true' ></div>
          </td>
        {/each}
      </tr> 
    {/each}      
  </tbody>
</table>