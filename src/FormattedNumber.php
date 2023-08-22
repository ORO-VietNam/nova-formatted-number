<?php

namespace Oro\FormattedNumber;
use Laravel\Nova\Fields\Text;

class FormattedNumber extends Text
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'formatted-number';

    public function format($value = '0,0')
    {
        return $this->withMeta([
            'format' => $value
        ]);
    }
}
