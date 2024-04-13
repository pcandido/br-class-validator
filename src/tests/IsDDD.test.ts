import { validate } from 'class-validator'
import { IsDDD } from '../decorators'

class DDDTest {

    constructor(ddd: string) {
        this.ddd = ddd
    }

    @IsDDD()
    ddd: string

}

describe('IsDDD', () => {

    it('should not return errors if ddd is valid', async () => {
        const sut = new DDDTest('11')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if ddd is invalid', async () => {
        const sut = new DDDTest('569')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isDDD: 'ddd must be a valid DDD' } }])
    })

})
