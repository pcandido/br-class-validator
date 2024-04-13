import { validate } from 'class-validator'
import { IsCPFOrCNPJ } from '../decorators'

class CPFOrCNPJTest {

    constructor(cpfOrCnpj: string) {
        this.cpfOrCnpj = cpfOrCnpj
    }

    @IsCPFOrCNPJ()
    cpfOrCnpj: string

}

describe('IsCPFOrCNPJ', () => {

    it('should not return errors if it is a valid cpf', async () => {
        const sut = new CPFOrCNPJTest('616.204.930-20')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should not return errors if it is a valid cnpj', async () => {
        const sut = new CPFOrCNPJTest('60.382.747/0001-83')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if it is an invalid value', async () => {
        const sut = new CPFOrCNPJTest('616.204.930-00')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isCPFOrCNPJ: 'cpfOrCnpj must be a valid CPF or CNPJ' } }])
    })

})
