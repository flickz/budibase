<script>
  import { CoreSelect, CoreRadioGroup } from "@budibase/bbui"
  import Field from "./Field.svelte"
  import { getOptions } from "./optionsParser"
  export let field
  export let label
  export let placeholder
  export let disabled = false
  export let optionsType = "select"
  export let validation
  export let defaultValue
  export let optionsSource = "schema"
  export let dataProvider
  export let labelColumn
  export let valueColumn
  export let customOptions
  export let autocomplete = false
  export let direction = "vertical"
  export let onChange
  export let sort = true

  let fieldState
  let fieldApi
  let fieldSchema

  $: flatOptions = optionsSource == null || optionsSource === "schema"
  $: options = getOptions(
    optionsSource,
    fieldSchema,
    dataProvider,
    labelColumn,
    valueColumn,
    customOptions
  )

  const handleChange = e => {
    fieldApi.setValue(e.detail)
    if (onChange) {
      onChange({ value: e.detail })
    }
  }
</script>

<Field
  {field}
  {label}
  {disabled}
  {validation}
  {defaultValue}
  type="options"
  bind:fieldState
  bind:fieldApi
  bind:fieldSchema
>
  {#if fieldState}
    {#if !optionsType || optionsType === "select"}
      <CoreSelect
        value={fieldState.value}
        id={fieldState.fieldId}
        disabled={fieldState.disabled}
        error={fieldState.error}
        {options}
        {placeholder}
        on:change={handleChange}
        getOptionLabel={flatOptions ? x => x : x => x.label}
        getOptionValue={flatOptions ? x => x : x => x.value}
        {autocomplete}
        {sort}
      />
    {:else if optionsType === "radio"}
      <CoreRadioGroup
        value={fieldState.value}
        id={fieldState.fieldId}
        disabled={fieldState.disabled}
        error={fieldState.error}
        {options}
        {direction}
        on:change={handleChange}
        getOptionLabel={flatOptions ? x => x : x => x.label}
        getOptionValue={flatOptions ? x => x : x => x.value}
      />
    {/if}
  {/if}
</Field>
