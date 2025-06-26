<script>
    import { Settings2 } from '@lucide/svelte';

    let {
        title,
        postfix='',
        prefix='',
        value=$bindable(),
        min=0.01,
        max=1,
        step=0.01,
        Icon=Settings2,
    } = $props();

    const maxDigits = Math.max(min.toString().length, max.toString().length, step.toString().length, (max - step).toString().length);
    const maxDigitsAfterDecimal = step.toString().split('.')[1]?.length || 0;
    let padding = $derived(maxDigits - value.toString().length);
</script>

<div class="box">
    <div class="header">
        <div class="title">
            <Icon size=18px/>
            <div class="spacer"></div>
            <div class="titleText">
                {title}
            </div>
        </div>
        <div class="spacer"></div>
        <div style="display: flex">
            <input type="range" style="width: 200px" bind:value {min} {max} {step}/>
            <div class="spacer"></div>
            <code>
                {@html `${prefix}${'&nbsp;'.repeat(padding)}${value.toFixed(maxDigitsAfterDecimal)}${postfix}`}                 
            </code>
        </div>
    </div>
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
        align-items: center;
        justify-content: space-between;
        padding: 12px 12px 12px 15px;
        color: #282c34;
    }

    .title {
        display: flex;
    }

    .titleText {
        font-family: "abel";
    }

    .spacer {
        min-width: 7px;
    }
</style>