const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
})


export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}

// essa função será importada no StoreItem.tsx. O parâmetro number dessa função lá vai ser o number do price que tem em cada instrumento. Aí vai converter pra moeda e vai botar os 2 dígitos depois do número.