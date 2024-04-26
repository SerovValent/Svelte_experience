<script>
    import { onMount } from "svelte";
    import Currency from "./Currency.svelte";
    let error;
    let data = {};
    let rates = {};
    let a = 1;
    let b = 1;
    let leftKey = "AED";
    let rightKey = "AED";
    const key = "923921f70d726f542e938e87";
    const url = `https://v6.exchangerate-api.com/v6/${key}/latest/USD`;
    onMount(async () => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            data = await res.json();
            rates = data.conversion_rates || {};
            console.log(rates);
        } catch (err) {
            error = err;
        }
    });
    function setFromLeft(value) {
        const { [leftKey]: leftRate, [rightKey]: rightRate } = rates;
        a = +value;
        b = +((a / leftRate) * rightRate).toFixed(2);
    }
    function setFromRight(value) {
        const { [leftKey]: leftRate, [rightKey]: rightRate } = rates;
        b = +value;
        a = +((b / rightRate) * leftRate).toFixed(2);
    }
</script>


<main>
    <h1>CURRENCY CONVERTER</h1>
    <h3>KNOW YOUR CURRENCY EXCHANGE RATE</h3>
    <form>
        <Currency bind:selected={leftKey}/>
        <input type="number" value={a} on:input={(e)=>setFromLeft(e.target.value)}/>
        <Currency bind:selected={rightKey}/>
        <input type="number" value={b} on:input={(e)=>setFromRight(e.target.value)}/>
    </form>
</main>

<style>

</style>
