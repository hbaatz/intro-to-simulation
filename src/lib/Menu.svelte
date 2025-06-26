<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import NavElement from '$lib/NavElement.svelte';
    import { ChevronDown, ChevronUp } from '@lucide/svelte';

    function extractInfo(relPath) {
        const chapter = relPath.split('/').at(-2)
        const section = relPath.split('/').at(-1).split('_').at(0)
        const name = relPath.split('/').at(-1).split('_').slice(1).join(' ')
        const path = base + relPath;

        return { chapter, section, name, path }
    }

    const modules = import.meta.glob('/src/routes/kapitel/*/*/+page.svelte');
    const pages = Object.keys(modules).map((path) => {return path.replace('/src/routes', '').replace('/+page.svelte', '')}).map(extractInfo)
    pages.shift();

    const currentPage = extractInfo($page.route.id);
    const pageIndex = pages.findIndex((page) => page.path === currentPage.path);
    const prevPage = pages[pageIndex - 1]?.path || (base ? base : '/');
    const nextPage = pages[pageIndex + 1]?.path;

    let open = $state(false);

    let headerButton = $state();
    let floatingContainer = $state();

    function onClick(e) {
        if (open && !floatingContainer.contains(e.target) && !headerButton.contains(e.target)) open = false;
    }
</script>

<svelte:document onclick={onClick}/>

<div class="container">
    <div class="header">
        <button class="headerButton" bind:this={headerButton} onclick={() => {open = true}}>
            <span style="color: #cccccc; width: 42px; text-align: left;">
                {`${currentPage.chapter}.${currentPage.section}:`}
            </span>
            {currentPage.name}
            <ChevronDown />
        </button>
        <NavElement {prevPage} {nextPage}/>
    </div>
</div>
{#if open}
    {@const offsets = headerButton.getBoundingClientRect()}
    <div class="floatingContainer" style="top: {offsets.top - 23}px; left: {offsets.left - 23}px;" bind:this={floatingContainer}>
        <button class="headerButton" onclick={() => {open = false}}>
            <span style="color: #cccccc; width: 42px; text-align: left;">
                {`${currentPage.chapter}.${currentPage.section}:`}
            </span>
            {currentPage.name}
            <ChevronUp />
        </button>
        <div class="elementContainer">
            {#each pages as page}
                <button class="elementButton" onclick={() => {page.path === currentPage.path ? open = false : goto(page.path)}}>
                    <div style="color: #cccccc; width: 35px; text-align: right; padding-right: 7px;">
                        {`${page.chapter}.${page.section}:`}
                    </div>
                    {page.name}
                </button>
            {/each}
        </div>
    </div>
{/if}

<style>
    .container {
        margin: 0px -10px 0px -10px;
        width: calc(100% + 20px);
    }

    .header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }

    .floatingContainer {
        position: absolute;
        background: #ffffff;
        padding: 9px;
        border-radius: 7px;
        box-shadow: 0px 0px 10px 3px rgb(0 0 0 / 0.15);
        z-index: 2;
    }

    .elementContainer {
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 50vh;
    }

    .headerButton {
        padding: 5px 5px 2px 10px;
        color: #282c34;
        background: #fff;
        border-radius: 5px;
        border: none;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: 'Boldonse', sans-serif;
        text-transform: uppercase;
    }
    .headerButton:hover {
        filter: brightness(90%);
    }
    .headerButton:active {
        filter: brightness(85%);
    }

    .elementButton {
        padding: 4px 5px 3px 10px;
        color: #282c34;
        background: #fff;
        border-radius: 5px;
        border: none;
        display: flex;
        align-items: center;
        font-size: 13px;
        font-family: 'Boldonse', sans-serif;
        text-transform: uppercase;
    }
    .elementButton:hover {
        filter: brightness(90%);
    }
    .elementButton:active {
        filter: brightness(85%);
    }
</style>