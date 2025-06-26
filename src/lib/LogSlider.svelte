<script>
    import { Settings2 } from '@lucide/svelte';

    let {
        title,
        prefix='',
        postfix='',
        value=$bindable(),
        fromMagnitude,
        toMagnitude,
        Icon=Settings2,
    } = $props();

    const maxDigitsBeforeDecimal = Math.max(toMagnitude + 1, 1);
    const maxDigitsAfterDecimal = Math.max(-fromMagnitude, 0);

    let initialMagnitude = Math.floor(Math.log10(value))
    let sliderValue = $state(value * Math.pow(10, -initialMagnitude - 1) + initialMagnitude - fromMagnitude);

    $effect(() => {
        const sliderBucket = Math.ceil(sliderValue);
        const magnitude = fromMagnitude + sliderBucket;
        value = (sliderValue - sliderBucket + 1) * Math.pow(10, magnitude)
    })

    let padding = $derived(maxDigitsBeforeDecimal - Math.floor(value).toString().length);
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
            <input type="range" style="width: 200px" bind:value={sliderValue} min=0.1 max={toMagnitude - fromMagnitude} step=0.1/>
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