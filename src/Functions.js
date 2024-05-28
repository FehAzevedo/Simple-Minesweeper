const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length

    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const colSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][colSel].mined) {
            board[rowSel][colSel].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c!== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length

            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)

const hadExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0

const pendding = field => (field.mined && !field.flagged)
    || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pendding).lenght === 0

const squaresLeft = board => { return(fields(board).filter(pendding).lenght) }

const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const frasesDerrota = [
    "O problema não sou eu, é você",
    "Você quase acertou, mas você já está acostumado com isso",
    "Porque você ainda tenta?",
    "Faz o L",
    "É por isso que seu pai foi comprar cigarro",
    "Ela pode até voltar, mas seus neurônios não",
    "Burro burro burro, sua mãe é burra, seus pais são burros",
    "Se o objetivo fosse explodir todas as bombas, você já estaria no profissional", 
    "Imagina se a sua vida dependesse disso",
    "Você teria mais chance de ganhar jogando de Yummi Toplaner",
    "Sua mãe não te ensinou nada de útil mesmo",
    "Vai ver a culpa foi do touch"
]

const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed,
    frasesDerrota
}