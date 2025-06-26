<script>
    import { beforeNavigate } from "$app/navigation";
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { browser } from "$app/environment";
    import { onMount, tick } from "svelte";
    import { page } from '$app/stores'
    import { FileCode, Save, RefreshCcw, ChevronsUpDown, ChevronsDownUp } from '@lucide/svelte';

    let {
        title,
        codeTemplate,
        stepFuncCode = $bindable(),
        errorMsg = null
    } = $props();

    stepFuncCode = codeTemplate;
    let codeTitle = $state(title);
    let unfold = $state(true)
    let saved = $state(true);

    onMount(async () => {
        // Read cookie
        if (browser) {
            await tick();
            const cookieName = `${$page.url.pathname}_stepFuncCode`;
            const cookieValue = document.cookie.split('; ').find(substr => substr.startsWith(cookieName));
            if (cookieValue) {
                stepFuncCode = decodeURI(cookieValue.replace(cookieName + '=', ''));
            }
        }
    });

    function onSave() {
        // Write cookie
        if (browser) {
            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000);
            const cookieStr = `${$page.url.pathname}_stepFuncCode=${encodeURI(stepFuncCode)}; expires=${expirationDate.toUTCString()}; path=/`;
            document.cookie = cookieStr;
        }

        saved = true;
    }

    function onKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            onSave();
        }
    }

    beforeNavigate(({ type, cancel }) => {
        if (!saved && (type === 'leave' || !confirm('Möchtest du die Seite verlassen, ohne deine Änderungen zu speichern?'))) cancel();
    });
</script>

<svelte:document onkeydown={onKeyDown}/>

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
                {codeTitle}{saved ? '' : ' *'}
            </div>
        </div>
        <div style="display: flex">
            {@render button(Save, onSave)}
            {@render button(RefreshCcw, () => {stepFuncCode = codeTemplate})}
            {@render button(ChevronsDownUp, () => {unfold = !unfold}, ChevronsUpDown, unfold)}
        </div>
    </div>
    <div class={unfold ? "content" : "contentCollapsed"}>
        <CodeMirror bind:value={stepFuncCode} lang={python()} theme={oneDark} on:change={() => saved = false}/>
    </div>
</div>

<style>
    .box {
        background: #282c34;
        overflow: hidden;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 12px 8px 15px;
        color: white;
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
        background: linear-gradient(to bottom, transparent, #282c34);
        pointer-events: none;
        z-index: 1;
    }

    .buttonBody {
        border: none;
        background: #282c34;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    }
    .buttonBody:hover {
        filter: brightness(160%);
    }
    .buttonBody:active {
        filter: brightness(180%);
    }

    .spacer {
        min-width: 7px;
    }
</style>