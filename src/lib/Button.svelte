<script>
    let {
        icon=null,
        iconOff=null,
        text=null,
        textOff=null,
        background='#282c34',
        backgroundOff='#777777',
        value=$bindable(true),
        onclick=null,
        onclickOff=null,
        active=true
    } = $props()

    function toggle() {
        value = !value
    }

    var click = $state(toggle)
    if (onclick && onclickOff) {
        click = () => {
            toggle()
            if (value) {
                onclickOff()
            } else {
                onclick()
            }
        }
    } else if (onclick) {
        click = onclick
    }
</script>

<link href="https://fonts.googleapis.com/css2?family=Fredoka" rel="stylesheet">

<div class='buttonBackground'>
    <button 
        class={active ? 'buttonBody' : 'buttonDeactivatedBody'}
        style:background={active ? (value ? background : backgroundOff) : '#777777'}
        onclick={active ? click : () => {}}
    >
        {#if icon}
            {@const Icon = value || iconOff == null ? icon : iconOff}
            <Icon size=22/>
        {:else if text}
            <p class='text'>
                {value || textOff == null ? text : textOff}
            </p>
        {/if}
    </button>
</div>

<style>
    .buttonBackground {
        background: white;
        display: flex;
    }

    .buttonBody {
        color: white;
        width: 50px;
        height: 35px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .buttonBody:hover {
        filter: opacity(80%);
    }
    .buttonBody:active {
        filter: opacity(70%);
    }

    .buttonDeactivatedBody {
        color: white;
        width: 50px;
        height: 35px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text {
        font-size: 20px;
        color: #ffffff;
        font-family: 'Fredoka', sans-serif;
        font-weight: 300;
    }
</style>