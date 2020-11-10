let tpBai
let cmpAlg
let inputValue = document.querySelector('#inputValor');
let valorSpan = document.querySelector('.valor');
let valorSpan2 = document.querySelector('.valor2');
// filtro avançado inicio
let banheiro = document.querySelector('#banheiro')
let quarto = document.querySelector('#quarto')
let spQuarto = document.querySelector('#spQuarto')
let spBanheiro = document.querySelector('#spBanheiro')
let spEstacionamento = document.querySelector('#spEstacionamento')
let estacionamento = document.querySelector('#estacionamento')
let checkBox = document.getElementsByName('filtro')
let quantidade = document.querySelector('#quantidade')
//filtro avançado fim
const btnListarTodos = document.querySelector('#btnListarTodos');
const templateHTML = document.querySelector('#templateHTML');
const templateSELECT = document.querySelector('#templateSELECT')
const btnListarMaior = document.querySelector("#btnListarMaior");
const btnListarMenor = document.querySelector("#btnListarMenor");
const carregarMaisImoveis = document.querySelector('#carregarMaisImoveis')
const comprAluga = document.querySelector('#comprAluga')

quarto.addEventListener('input', () => {
    spQuarto.textContent = quarto.value
})

banheiro.addEventListener('input', () => {
    spBanheiro.textContent = banheiro.value
})

estacionamento.addEventListener('input', () => {
    spEstacionamento.textContent = estacionamento.value
})


const filtroAvancado = () => {
    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked && checkBox[i].value == 1) {
            quantidade.style.display = 'block'
            return true;
        } else if (checkBox[i].checked && checkBox[i].value == 0) {
            quantidade.style.display = 'none';
            return false;
        }
    }
}


window.onload = () => {
    quantidade.style.display = 'none';
    sessionStorage.clear();
}


window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        let dados = sessionStorage.getItem('listaImoveis');
        if (dados != 0 && dados != null) {
            rolagemPag(templateHTML);
        }
    }
};

const guardarSessionStorage = (arrayListaResultados) => {
    let pagInicial = [];

    for (let i = 0; i <= 19; i++) {
        pagInicial.push(arrayListaResultados[i])
    }

    arrayListaResultados.splice(0, 20);

    sessionStorage.setItem('listaImoveis', JSON.stringify(arrayListaResultados));

    htmlPrinter(pagInicial, templateHTML)
}

const loadingPaginacao = (boleano) => {
    boleano ? carregarMaisImoveis.style.display = 'block' : carregarMaisImoveis.style.display = 'none'
}

const rolagemPag = (templateHTML) => {

    let origemLocalStorage = sessionStorage.getItem('listaImoveis');
    let recuperadosLocalSession = JSON.parse(origemLocalStorage)
    let loopLimite;

    if (recuperadosLocalSession.length != 0) {
        recuperadosLocalSession.length < 19 ? loopLimite = recuperadosLocalSession.length : loopLimite = 20;

        const proximaPagina = [];
        for (let i = 0; i < loopLimite; i++) {
            proximaPagina.push(recuperadosLocalSession[i])
        }

        recuperadosLocalSession.splice(0, loopLimite);

        sessionStorage.setItem('listaImoveis', JSON.stringify(recuperadosLocalSession));

        loadingPaginacao(true);

        htmlPrinter(proximaPagina, templateHTML)
        setTimeout(() => loadingPaginacao(false), 2000)

    }
}


btnListarTodos.addEventListener('click', () => {
    requestAPI(arrayListaCompleto);
});

btnListarMaior.addEventListener('click', () => {
    let arrayFA = []
    templateHTML.innerHTML = " ";
    sessionStorage.clear();
    if (inputValue.value != null && inputValue.value != '') {
        let listaMaior = imoveisValorMaior(arrayListaCompleto, replaces(inputValue.value))
        if (filtroAvancado()) {
            listaMaior.forEach(item => {
                if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.bedrooms == quarto.value && item.bathrooms == banheiro.value && item.parkingSpaces == estacionamento.value) {
                    arrayFA.push(item)
                }
            })
            arrayFA.length < 20 ? htmlPrinter(arrayFA, templateHTML) : guardarSessionStorage(arrayFA);
        } else {
            listaMaior.length < 20 ? htmlPrinter(listaMaior, templateHTML) : guardarSessionStorage(listaMaior);
        }
    } else {
        alert("Digite um valor para poder ser filtrado")
    }
})

btnListarMenor.addEventListener('click', () => {
    let arrayFA = []
    templateHTML.innerHTML = " ";
    sessionStorage.clear();
    if (inputValue.value != null && inputValue.value != '') {
        let listaMenor = imoveisValorMenor(arrayListaCompleto, replaces(inputValue.value))
        if (filtroAvancado()) {
            listaMenor.forEach(item => {
                if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.bedrooms == quarto.value && item.bathrooms == banheiro.value && item.parkingSpaces == estacionamento.value) {
                    arrayFA.push(item)
                }
            })
            arrayFA.length < 20 ? htmlPrinter(arrayFA, templateHTML) : guardarSessionStorage(arrayFA);
        } else {
            listaMenor.length < 20 ? htmlPrinter(listaMenor, templateHTML) : guardarSessionStorage(listaMenor);
        }
    } else {
        alert("Digite um valor para poder ser filtrado")
    }

})


const tpNegocio = (e, arrayCompleto) => {
    let tpArray = []
    arrayCompleto.forEach(item => {
        if (item.pricingInfos.businessType === e && item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0) {
            tpArray.push(item)
        }
    })
    return tpArray
}

comprAluga.addEventListener('change', e => {
    cmpAlg = tpNegocio(e.target.value, arrayListaCompleto)
    htmlSELECT(cmpAlg, templateSELECT)
})


const replaces = ev => {
    return ev.replaceAll("R$", "").replaceAll(",00", "").replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "")
}

const mascara = ev => {
    if (event.keyCode === 8) {
        replaces(inputValue.value)
        return inputValue.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(replaces(ev).substring(0, replaces(ev).length - 2));
    }

    replaces(inputValue.value)
    return inputValue.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(replaces(ev))
}


const requestAPI = (dados) => {
    fluxoPrincipal(dados)
}

const imoveisValidos = (dados) => dados.filter(item => {
    if (comprAluga.value == '') {
        return item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0
    }
    if (templateSELECT.value === '') {
        return item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.pricingInfos.businessType === comprAluga.value
    } else {
        return item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.pricingInfos.businessType === comprAluga.value && item.address.neighborhood === templateSELECT.value
    }
})

const imoveisValorMaior = (dados, valor) => {
    let validos = [];
    dados.filter((item) => {
        if (comprAluga.value == '') {
            if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && parseInt(item.pricingInfos.price) > parseInt(valor, 10)) {
                validos.push(item)
            } 
        }
        if (templateSELECT.value === '') {
            if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.pricingInfos.businessType === comprAluga.value && parseInt(item.pricingInfos.price) > parseInt(valor, 10)) {
                validos.push(item)
            }
        } else {
            if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.pricingInfos.businessType === comprAluga.value && parseInt(item.pricingInfos.price) > parseInt(valor, 10) && item.address.neighborhood === templateSELECT.value) {
                validos.push(item)
            }
        }
    }, [valor]);

    if (validos.length > 0) {
        return validos;
    } else {
        alert("Não há resultados para sua pesquisa")
    }

}

const imoveisValorMenor = (dados, valor) => {
    let validos = [];
    dados.filter((item) => {
        if (comprAluga.value == '') {
            if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && parseInt(item.pricingInfos.price) < parseInt(valor, 10)) {
                validos.push(item)
            } 
        }
        if (templateSELECT.value === '') {
            if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.pricingInfos.businessType === comprAluga.value && parseInt(item.pricingInfos.price) < parseInt(valor, 10)) {
                validos.push(item)
            }
        } else {
            if (item.address.geoLocation.location.lat != 0 && item.address.geoLocation.location.lon != 0 && item.pricingInfos.businessType === comprAluga.value && parseInt(item.pricingInfos.price) < parseInt(valor, 10) && item.address.neighborhood === templateSELECT.value) {
                validos.push(item)
            }
        }
    }, [valor]);

    if (validos.length > 0) {
        return validos;
    } else {
        alert("Não há resultados para sua pesquisa")
    }
};



inputValue.addEventListener("keyup", () => {
    insereTexto(replaces(inputValue.value))
})


const insereTexto = (ev) => {

    valores = `<span>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(ev, 10))}</span>`;

    valorSpan.innerHTML = valores
    valorSpan2.innerHTML = valores
}

// metodo principal
const fluxoPrincipal = () => {
    let arrayFA = []
    sessionStorage.clear();
    templateHTML.innerHTML = " ";
    let listarTodos = imoveisValidos(arrayListaCompleto)
    if (filtroAvancado()) {
        listarTodos.forEach(item => {
            if (item.bedrooms == quarto.value && item.bathrooms == banheiro.value && item.parkingSpaces == estacionamento.value) {
                arrayFA.push(item)
            }
        })
        arrayFA.length < 20 ? htmlPrinter(arrayFA, templateHTML) : guardarSessionStorage(arrayFA);
    } else {
        listarTodos.length < 20 ? htmlPrinter(listarTodos, templateHTML) : guardarSessionStorage(listarTodos);
    }
}