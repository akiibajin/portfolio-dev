<script lang="ts">
    import './modaltable.css'
    import { currentTab } from "../../store"
    import getModalContent from "../../utils/getModalContent"
    import Table from "./Table.svelte";
    let firstTitle: string = $state('');
    let secondTitle: string = $state('');
    let additionalTitles: Array<string> = $state([]);
    let body: Array<Array<string>> = $state([]);
    currentTab.subscribe(value => {
        const { tableInfo }  = getModalContent(value.name)
        firstTitle = tableInfo.tableHead[0] || ''
        secondTitle = tableInfo.tableHead[1] || ''
        additionalTitles = [...tableInfo.tableHead.slice(2)]
        body = [...tableInfo.tableBody]
    })
</script>

<Table bind:firstTitle bind:secondTitle bind:additionalTitles bind:cells={body} ></Table>