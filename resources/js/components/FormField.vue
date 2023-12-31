<template>
    <DefaultField
        :field="currentField"
        :errors="errors"
        :show-help-text="showHelpText"
        :full-width-content="fullWidthContent"
    >
        <template #field>
            <div class="space-y-1">
                <input
                    v-bind="extraAttributes"
                    class="w-full form-control form-input form-input-bordered"
                    @input="handleChange"
                    :value="formattedNumber"
                    :id="currentField.uniqueKey"
                    :dusk="field.attribute"
                    :disabled="currentlyIsReadonly"
                    :maxlength="field.enforceMaxlength ? field.maxlength : -1"
                />

                <datalist v-if="suggestions.length > 0" :id="suggestionsId">
                    <option
                        :key="suggestion"
                        v-for="suggestion in suggestions"
                        :value="suggestion"
                    />
                </datalist>

                <CharacterCounter
                    v-if="field.maxlength"
                    :count="value.length"
                    :limit="field.maxlength"
                />
            </div>
        </template>
    </DefaultField>
</template>

<script>
import {
    DependentFormField,
    FieldSuggestions,
    HandlesValidationErrors,
} from '@/mixins'
import numeral from "numeral";

export default {
    mixins: [DependentFormField, FieldSuggestions, HandlesValidationErrors],
    methods: {

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(
                this.field.attribute,
                numeral(this.formattedNumber).value() || ""
            );
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value.target.value;
        }
    },
    computed: {
        defaultAttributes() {
            return {
                type: this.currentField.type || 'text',
                placeholder: this.currentField.placeholder || this.field.name,
                class: this.errorClasses,
                min: this.currentField.min,
                max: this.currentField.max,
                step: this.currentField.step,
                pattern: this.currentField.pattern,

                ...this.suggestionsAttributes,
            }
        },

        extraAttributes() {
            const attrs = this.currentField.extraAttributes

            return {
                // Leave the default attributes even though we can now specify
                // whatever attributes we like because the old number field still
                // uses the old field attributes
                ...this.defaultAttributes,
                ...attrs,
            }
        },
        formattedNumber(number) {
            return numeral(number.value).format(this.field.format);
        }
    },
}
</script>
