
const htmlPrinter = (response, targets) => {
    let templateMontado = '';

    response.forEach(item => {
        templateMontado += `
        <div class="card">
    <div class="apImg">
        <div id="${item.id}" class="lista">
            <img class="testeCarrossel" alt="" src="${item.images[0]}">
            <img class="testeCarrossel" alt="" src="${item.images[1]}">
            <img class="testeCarrossel" alt="" src="${item.images[2]}">
            <img class="testeCarrossel" alt="" src="${item.images[3]}">
            <img class="testeCarrossel" alt="" src="${item.images[4]}">
        </div>
    </div>
    <div class="apText">
        <div class="ajusteText">
            <div class="local">
                <span><small>${item.address.neighborhood} - ${item.address.city}</small></span>
            </div>
            <div class="titulo">
                <h3 style="margin-top: 0px;">Area: ${item.usableAreas}m² Quarto(s): ${item.bedrooms} Banheiro(s):
                    ${item.bathrooms} Estacionamento(s): ${item.parkingSpaces} </h3>
            </div>
            <div class="esp">
                <small> Modalidade:<strong> ${item.pricingInfos.businessType}</strong></small>
            </div>
            <div style="margin-bottom: 18px;" class="dtt">
                <span class="distintivos"> jardim </span>
                <span class="distintivos"> Playground </span>
                <span class="distintivos"> Salão de festas </span>
                <span class="distintivos"> Churrasqueira </span>
                <span class="distintivos"> Piscina </span>
                <span class="distintivos"> ... </span>
            </div>
            <div class="final">
                <div>
                    <h3 style="margin-bottom: 0px;">${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.pricingInfos.price)}</h3>
                    <div style="margin-left: 2px;"><small><span>Condomínio: <strong>${new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(item.pricingInfos.monthlyCondoFee)}</strong></span></small>
                    </div>
                </div>
                <div class="logotipo">
                    <img class="logo" src="image/logotipo.jpg" alt="logotipo" height="50px" width="50px">
                </div>
                <div class="btns">
                    <button class="btn3" class="btn2"><strong>VER TELEFONE</strong></button>
                    <button class="btn4" class="btn2"><strong>ENVIAR MENSAGEM</strong></button>
                </div>
            </div>
        </div>
    </div>
</div>
        `

    })
    templateHTML.innerHTML = " ";

    targets.insertAdjacentHTML("beforeend", templateMontado);
}





