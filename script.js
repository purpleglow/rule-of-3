// Just focus the first field
window.onload = () => {
    document.getElementById('a').focus();
};

document.getElementById('calculate').addEventListener('click', () => {
    const inputs = {
        a: document.getElementById('a').value,
        b: document.getElementById('b').value,
        c: document.getElementById('c').value,
        d: document.getElementById('d').value
    };

    // Count filled fields and find the empty one
    let emptyField = null;
    let filledCount = 0;
    
    for (let field in inputs) {
        if (inputs[field] === '') {
            emptyField = field;
        } else {
            filledCount++;
        }
    }

    const errorElement = document.getElementById('error');

    if (filledCount !== 3) {
        errorElement.textContent = 'Fill exactly 3 fields';
        errorElement.classList.add('show');
        return;
    }

    errorElement.classList.remove('show');

    // Convert filled values to numbers
    for (let field in inputs) {
        if (inputs[field] !== '') {
            inputs[field] = parseFloat(inputs[field]);
        }
    }

    // Calculate missing value based on which field is empty
    let result;
    switch(emptyField) {
        case 'a': result = (inputs.b * inputs.c) / inputs.d; break;
        case 'b': result = (inputs.a * inputs.d) / inputs.c; break;
        case 'c': result = (inputs.a * inputs.d) / inputs.b; break;
        case 'd': result = (inputs.b * inputs.c) / inputs.a; break;
    }

    const isPrecise = document.getElementById('precise').checked;
    document.getElementById(emptyField).value = isPrecise ? 
        result.toFixed(2) : 
        Math.round(result);
});

document.getElementById('clear').addEventListener('click', () => {
    ['a', 'b', 'c', 'd'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('error').classList.remove('show');
    document.getElementById('a').focus();
});

// Add input event listeners to all fields to validate input
['a', 'b', 'c', 'd'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', (e) => {
        // Remove any non-numeric characters except decimal point
        e.target.value = e.target.value.replace(/[^\d.]/g, '');
        // Ensure only one decimal point
        if (e.target.value.split('.').length > 2) 
            e.target.value = e.target.value.replace(/\.+$/, '');
    });
}); 