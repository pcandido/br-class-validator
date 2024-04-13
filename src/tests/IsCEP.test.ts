import { validate } from 'class-validator'
import { IsCEP } from '../decorators'

class CEPTest {

    constructor(cep: string) {
        this.cep = cep
    }

    @IsCEP()
    cep: string

}

describe('IsCEP', () => {

    it('should not return errors if cep is valid', async () => {
        const sut = new CEPTest('20081-240')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if cep is invalid', async () => {
        const sut = new CEPTest('20081')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isCEP: 'cep must be a valid CEP' } }])
    })

})
