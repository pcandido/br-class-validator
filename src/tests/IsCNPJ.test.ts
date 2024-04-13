import { validate } from 'class-validator'
import { IsCNPJ } from '../decorators'

class CNPJTest {

    constructor(cnpj: string) {
        this.cnpj = cnpj
    }

    @IsCNPJ()
    cnpj: string

}

describe('IsCNPJ', () => {

    it('should not return errors if cnpj is valid', async () => {
        const sut = new CNPJTest('60.382.747/0001-83')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if cnpj is invalid', async () => {
        const sut = new CNPJTest('60.382.747/0001-00')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isCNPJ: 'cnpj must be a valid CNPJ' } }])
    })

})
