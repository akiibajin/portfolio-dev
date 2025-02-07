<script lang="ts">
    import { currentTab } from "../../store"
    import getModalContent from "../../utils/getModalContent"
    import Table from "./Table.svelte";

    let firstTitle: string = '';
    let secondTitle: string = '';
    let additonalTitles: Array<string> = [];
    let body: Array<Array<string>> = [];
    currentTab.subscribe(value => {
        const { tableInfo }  = getModalContent(value.name)
        firstTitle = tableInfo.tableHead[0]
        secondTitle = tableInfo.tableHead[1]
        additonalTitles = [...tableInfo.tableHead.slice(2)]
        body = [...tableInfo.tableBody]
    })
</script>

<Table bind:firstTitle bind:secondTitle bind:additonalTitles bind:cells={body} ></Table>