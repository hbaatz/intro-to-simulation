<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { theme } from "$lib/CodeMirror/LightTheme.js";
    import { FileCode, ChevronsUpDown, ChevronsDownUp } from '@lucide/svelte';

    let {
        title,
        code,
        allowFold = false,
    } = $props();

    let unfold = $state(true)
</script>

{#snippet button(icon, onclick=() => {}, icon_off=null, value=true)}
    {@const Icon = value ? icon : icon_off}
    <button class="buttonBody" {onclick}>
        <Icon />
    </button>
{/snippet}

<div class="box">
    <div class="header">
        <div class="title">
            <FileCode size=18px/>
            <div class="spacer"></div>
            <div class="titleText">
                {title}
            </div>
        </div>
        {#if allowFold}
            <div style="display: flex">
                {@render button(ChevronsDownUp, () => {unfold = !unfold}, ChevronsUpDown, unfold)}
            </div>
        {/if}
    </div>
    <div class={unfold ? "content" : "contentCollapsed"}>
        <CodeMirror value={code} lang={python()} {theme} editable={false}/>
    </div>
</div>

<style>
    .box {
        border-radius: 5px;
        background: #eeeeee;
        overflow: hidden;
        margin-bottom: 7px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 12px 8px 15px;
        color: #282c34;
    }

    .title {
        display: flex;
    }

    .titleText {
        font-family: abel;
    }

    .content {
        overflow-y: auto;
        max-height: 50vh;
        padding: 0px 7px 3px 7px;
    }

    .contentCollapsed {
        max-height: 41px;
        padding: 0px 7px 3px 7px;
        position: relative;
    }

    .contentCollapsed::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, transparent, #eeeeee);
        pointer-events: none;
        z-index: 1;
    }

    .buttonBody {
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        color: #282c34;
        background: #eeeeee;
    }
    .buttonBody:hover {
        filter: brightness(90%);
    }
    .buttonBody:active {
        filter: brightness(85%);
    }

    .spacer {
        min-width: 7px;
    }
</style>