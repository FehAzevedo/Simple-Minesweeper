import { Dimensions } from 'react-native'

const params = {
    blockSize: 30,
    borderSize : 5,
    fontSize: 16,
    headerRatio: 0.15, //proporção do cabeçalho
    difficultLevel: 0.1, //Porcentagem de campos com mina
    getColumnsAmount() {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default params