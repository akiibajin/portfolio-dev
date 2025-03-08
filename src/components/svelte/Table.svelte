<script lang="ts">
  interface Props {
    firstTitle: string;
    secondTitle: string;
    additionalTitles?: Array<string>;
    cells: Array<Array<string>>;
  }
  const {firstTitle = $bindable(), secondTitle = $bindable(), additionalTitles=$bindable([]), cells=$bindable()} : Props = $props();
</script>

<table class="modal-table">
  <thead>
    <tr>
      <th contenteditable="false" class="main-header">{firstTitle}</th>
      <th contenteditable="false" class="second-header">{secondTitle}</th>
        {#each additionalTitles as title}
            <th contenteditable="false" class="second-header">{title}</th>
        {/each}
    </tr>
  </thead>
  <tbody class="modal-tbody">
    {#each cells as cell}
    <tr>
        {#each cell as _, i}
          <td>
            <div bind:innerHTML={cell[i]} contenteditable='false' ></div>
          </td>
        {/each}
      </tr> 
    {/each}      
  </tbody>
</table>

<style>
  .modal-table {
    width: 100%;
    background-color: #0a0a0a;
  }
  .modal-table thead {
    background-color: oklch(0.715 0.143 215.221);
  }
  .main-header {
    color: white;
    font-weight: 100;
    padding: 0.25rem 0.75rem;
  }
  .second-header {
    color: white;
    font-weight: 300;
    margin-inline: 0.75rem;
  }
  .modal-tbody tr{
    background-color: #262626;
    border: 1px solid oklch(0.609 0.126 221.723);
  }
  .modal-tbody td {
    padding: 0.125rem 1rem;
    border-left: 1px solid oklch(0.609 0.126 221.723);
    border: 1px solid oklch(0.609 0.126 221.723);
  }
  .modal-tbody td:hover {
    box-shadow: inset 5px 5px 10px oklch(0.609 0.126 221.723);
  }
</style>