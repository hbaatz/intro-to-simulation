<script>
    let { value, active } = $props();
</script>

<div class={active ? 'timer' : 'timerDeactivated'}>
    {value}
</div>

<style>
    .timer {    
        background: #282c34;
        width: 80px;
        height: 35px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #ffffff;
        font-family: 'Fredoka', sans-serif;
        font-weight: 300;
    }

    .timerDeactivated {
        background: #777777;
        width: 80px;
        height: 35px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #ffffff;
        font-family: 'Fredoka', sans-serif;
        font-weight: 300;
    }
</style>