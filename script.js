// Auto-focus first field on page load
window.onload = () => {
    document.getElementById('a').focus();
};

document.getElementById('calculate').addEventListener('click', () => {
    const inputs = {
        a: parseFloat(document.getElementById('a').value),
        b: parseFloat(document.getElementById('b').value),
        c: parseFloat(document.getElementById('c').value),
        d: parseFloat(document.getElementById('d').value)
    };

    const errorElement = document.getElementById('error');
    
    // Count how many fields were manually filled (exclude calculated results)
    const filledFields = Object.entries(inputs).filter(([key, value]) => {
        const input = document.getElementById(key);
        return !isNaN(value) && input.value !== '' && !input.dataset.calculated;
    });
    
    if (filledFields.length !== 3) {
        errorElement.textContent = 'Fill exactly 3 fields';
        errorElement.classList.add('show');
        return;
    }

    errorElement.classList.remove('show');
    
    // Find the empty field
    const emptyField = Object.entries(inputs).find(([_, value]) => isNaN(value))[0];
    
    // Calculate based on which field is empty
    let result;
    switch(emptyField) {
        case 'a': result = (inputs.b * inputs.c) / inputs.d; break;
        case 'b': result = (inputs.a * inputs.d) / inputs.c; break;
        case 'c': result = (inputs.a * inputs.d) / inputs.b; break;
        case 'd': result = (inputs.b * inputs.c) / inputs.a; break;
    }

    const resultElement = document.getElementById(emptyField);
    resultElement.value = result.toFixed(2);
    resultElement.dataset.calculated = 'true';  // Mark as calculated
});

document.getElementById('clear').addEventListener('click', () => {
    ['a', 'b', 'c', 'd'].forEach(id => {
        const input = document.getElementById(id);
        input.value = '';
        delete input.dataset.calculated;  // Remove calculated mark
    });
    document.getElementById('error').classList.remove('show');
    document.getElementById('a').focus();
});

// Add input event listeners to all fields to validate input
['a', 'b', 'c', 'd'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', (e) => {
        delete e.target.dataset.calculated;  // Remove calculated mark when user types
        // Remove any non-numeric characters except decimal point
        e.target.value = e.target.value.replace(/[^\d.]/g, '');
        // Ensure only one decimal point
        if (e.target.value.split('.').length > 2) 
            e.target.value = e.target.value.replace(/\.+$/, '');
    });
}); 