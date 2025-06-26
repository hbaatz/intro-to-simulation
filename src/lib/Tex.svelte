<script>
    import { math as mat, display as disp } from 'mathlifier';

    let { 
        math = null,
        display = null,
        } = $props();
</script>

{#if math}
    {@html mat(math)}
{:else}
    <div class="spacer"></div>
    {#if Array.isArray(display)}
        {#each display as d}
            {@html disp(d)}
        {/each}
    {:else}
        {@html disp(display)}
    {/if}
    <div class="spacer"></div>
{/if}

<style>
    .spacer {
        min-width: 10px;
        min-height: 10px;
    }
</style>