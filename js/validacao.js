document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContato');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    function validarEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
        return emailRegex.test(email);
    }
    function validarCpf(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
    }
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 11) value = value.substring(0, 11);
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        } else if (value.length > 0) {
            value = value.replace(/(\d{1,3})/, '$1');
        }
        e.target.value = value;
    });
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let isFormValid = true;
        if (!validarEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }
        if (!validarCpf(cpfInput.value)) {
            cpfInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            cpfInput.classList.remove('is-invalid');
        }
        if (isFormValid) {
            mensagemSucesso.classList.remove('d-none');
            this.reset();
            setTimeout(() => {
                mensagemSucesso.classList.add('d-none');
            }, 3000);
        }
    });
});