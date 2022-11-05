export const format = (value) => {
    let formattdedValue

    formattdedValue = value.replace(',', '.')
    formattdedValue = Number(formattdedValue.split('$')[1].trim())

    formattdedValue = String(value).includes('-') ? -formattdedValue : formattdedValue

    return formattdedValue
}

export const randomNumber = () => {
    return Math.floor(Math.random() * 101)
}


export const prepareLocalStorage = (win) => {
    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
            description: "Total",
            amount: randomNumber() * 100,
            date: "25/09/2022"
        },
        {
            description: 'Conta de energia',
            amount: -(randomNumber () * 100),
            date:"29/09/2022"
        }
    ])
  )
}