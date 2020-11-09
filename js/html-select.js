const htmlSELECT = (respose, target) => {
    let montarTemplate = ''

    let novo = respose.map(item => item.address.neighborhood);

    [...new Set(novo)].forEach(item => {

        montarTemplate += `
        <option value="${item}">${item}</option>
        `
    });

    templateSELECT.innerHTML = ''

    target.insertAdjacentHTML('afterbegin', '<option value="" selected>Todos</option>' + montarTemplate)
}


