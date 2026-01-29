<template>
	<form ref="formElement" id="form-element-id" method="post" @submit.prevent="onClick" action="">
		<input name="ra" autocomplete="shipping address-line1" placeholder="street" />
		<input name="rc" autocomplete="shipping address-level2" placeholder="city" />
		<input name="rr" autocomplete="shipping address-level1" placeholder="region" />
		<input name="rp" autocomplete="shipping postal-code" placeholder="postcode" />
        <UButton type="submit">On Click</UButton>
	</form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { slpy } from 'slpy';
import 'slpy/dist/css/slpy-style.css';

const formElement = ref(null);

onMounted(() => {
    slpy.addressAutocomplete('form-element-id', {
        apiKey: 'your_api_key',
        country: 'PL'
    });
});

function onClick() {
    console.log(formElement)
}
</script>