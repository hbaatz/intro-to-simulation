<script>
    import { ChevronLeft, ChevronRight } from '@lucide/svelte';

    let {
        prevPage = null,
        nextPage = null
    } = $props()
</script>

{#snippet linkButton(page, icon)}
    {@const Icon = icon}
    <button class={page ? 'buttonBody' : 'buttonBodyNoLink'}>
        {#if page}
            <a href={page} style="color: inherit; text-decoration: none;">
                <Icon />
            </a>
        {:else}
            <Icon />
        {/if}
    </button>
{/snippet}

<div style="display: flex">
    {@render linkButton(prevPage, ChevronLeft)}
    {@render linkButton(nextPage, ChevronRight)}
</div>

<style>
    .buttonBody {
        border: none;
        background: #ffffff;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: baseline;
        color: #282c34;
    }
    .buttonBody:hover {
        filter: brightness(90%);
    }
    .buttonBody:active {
        filter: brightness(85%);
    }

    .buttonBodyNoLink {
        border: none;
        background: #ffffff;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: baseline;
        color: #cccccc;
    }
</style>