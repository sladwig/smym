import React, { useState } from 'react';
import { ValueObject } from '../services/nlp';

export function TransactionForm({ name, value, description }: ValueObject) {
    return (
        <div>
            {name} {description} {value}
        </div>
    );
}
