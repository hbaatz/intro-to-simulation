<script>
    import { Lightbulb, Eye, EyeOff } from '@lucide/svelte';

    let {
        title,
        subtitle=null,
        children,
        Icon=Lightbulb,
        unfoldDefault=false,
        allowFold=true
    } = $props();

    let unfold = $state(unfoldDefault);
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
            <Icon size=18px/>
            <div class="spacer"></div>
            <div class="titleText">
                <b>{title}</b>
                {#if subtitle}
                    {subtitle}
                {/if}
            </div>
        </div>
        {#if allowFold}
            <div style="display: flex">
                {@render button(EyeOff, () => {unfold = !unfold}, Eye, unfold)}
            </div>
        {/if}
    </div>
    {#if unfold}
        <div class="content">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .box {
        border-radius: 5px;
        background: #eeeeee;
        overflow: hidden;
        margin-top: 7px;
        margin-bottom: 7px;
    }
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 12px 12px 15px;
        color: #282c34;
    }

    .title {
        display: flex;
    }

    .titleText {
        font-family: "abel";
    }

    .content {
        overflow-y: auto;
        padding: 0px 12px 12px 18px;
        color: #282c34;
    }

    .buttonBody {
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
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