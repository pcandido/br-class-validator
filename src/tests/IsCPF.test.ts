import { validate } from 'class-validator'
import { IsCPF } from '../decorators'

class CPFTest {

    constructor(cpf: string) {
        this.cpf = cpf
    }

    @IsCPF()
    cpf: string

}

describe('IsCPF', () => {

    it('should not return errors if cpf is valid', async () => {
        const sut = new CPFTest('616.204.930-20')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if cpf is invalid', async () => {
        const sut = new CPFTest('616.204.930-00')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isCPF: 'cpf must be a valid CPF' } }])
    })

})
